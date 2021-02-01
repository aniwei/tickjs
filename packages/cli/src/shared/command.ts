import { EventEmitter } from 'events';
import net from 'net';
import qs from 'qs';
import URL from 'url';
import debug from 'debug';
import * as uuid from 'uuid';
import { 
  Client, 
  Server, 
} from './sock';

export let messageId = 0;
export function getMessageId () {
  return uuid.v4();
}

export enum CommandSource {
  CLI = 'cli',
  PROJ = 'proj',
  DAEMON = 'daemon',
}

export enum CommandType {
  SERVER = 'server',
  CLIENT = 'client'
}

export enum CommandServerState {
  OPENED = 'opened',
  CLOSED = 'closed'
}

export enum CommandMessageDirection {
  ONE_WAY = 'one-way',
  TWO_WAY = 'two-way'
}

export enum Commands {
  PING = 'ping',
  CONNECT = 'connect',
  CALLBACK = 'callback',
  INIT = 'init',
  START = 'start',
  BUILD = 'build'
}

export type CommandMessage = {
  source: CommandSource,
  command: Commands,
  payload: object,
  id: string,
  sourceId?: string,
  clientId?: string
}


export class Command extends EventEmitter {
  public source: CommandSource;
  public transport: Server | Client | null = null;
  public type: CommandType | null = null;

  constructor (source: CommandSource, transport) {
    super();

    this.source = source;
    this.transport = transport;
  }
}

export class ServerCommand extends Command {
  public clients: Map<string, net.Socket | null> = new Map()

  constructor () {
    super(CommandSource.DAEMON, new Server());
  }

  listen (uri) {
    if (this.transport instanceof Server) {
      this.transport?.on('listening', this.onListening);
      this.transport?.on('message', this.onMessage);
      this.transport?.on('disconnect', this.onDisconnect);
      this.transport?.on('error', this.onError);

      this.transport?.listen(uri)
    }
  }

  onListening = () => {
    debug(`ServerCommand`)(`服务器已经启动`);
    this.emit('listening');
  }

  onError = (error) => {
    this.emit('error', error);
    this.transport?.removeAllListeners();
  }

  reply (id: string, reply: Function);
  reply (id: string, payload: any, reply: Function)

  reply (id: string, payload?: any, reply?: Function) {
    if (typeof payload === 'function') {
      reply = payload;
      payload = null;
    }

    if (reply) {
      reply({
        sourceId: id,
        command: Commands.CALLBACK,
        payload,
        id: getMessageId()
      })
    }
  }

  onDisconnect = (sock) => {
    for (const [id, client] of this.clients) {
      if (client === sock) {
        debug(`ServerCommand`)(`断开连接：%s`, id);
        this.clients.delete(id);
        break;
      }
    }
  }

  onMessage = (message, reply: Function, sock?: net.Socket) => {
    debug('ServerCommand')('接收消息：%s', message);

    const { command, payload, id } = message;

    switch (command) {
      case Commands.PING: {
        debug(`ServerCommand`)(`接收 Ping 请求`);
        
        this.reply(id, reply)
        break;
      }

      case Commands.CONNECT: {
        debug(`ServerCommand`)(`接收客户端连接请求：%s`, payload.id);

        this.clients.set(payload.id, sock || null);
        
        this.reply(id, reply)
        break;
      }

      default: {         
        this.emit('message', message, (data) => {
          this.reply(id, data, reply);
        });
        break;
      }
    }
  }
}

export class ClientCommand extends Command {
  public id: string | null = null;

  static async ping (uri) {
    const client = new ClientCommand(CommandSource.CLI);

    return await client.ping(uri);
  }

  constructor (source) {
    super(source, new Client);
  }

  connect (uri): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.transport instanceof Client) {
        const onConnect = async () => {
          
          const parsed = URL.parse(uri);

          if (parsed.query) {
            const query = qs.parse(parsed.query);

            this.send({
              command: Commands.CONNECT,
              payload: { id: query.id }
            }, () => {
              resolve();

              this.id = query.id;
            });
          } else {
            this.emit('connect');
            this.transport?.off('connect', onConnect);
            resolve();
          }
        }

        const onError = (error) => {
          reject(error);
          this.transport?.off('connect', onConnect);
          this.transport?.off('error', onError);
        }

        this.transport?.connect(uri);

        this.transport?.on('message', this.onMessage);
        this.transport?.on('connect', onConnect);
        this.transport?.on('error', onError);
      }
    });
  }

  send (command, callback?: Function) {
    if (this.transport instanceof Client) {
      const message = {
        clientId: this.id,
        source: this.source,
        id: getMessageId(),
        ...command,
      }

      this.transport.send(message);
      
      if (callback) {
        const messageCallback = (...argv) => {
          callback(...argv, message);
          this.off(message.id, messageCallback);
        }
        
        this.on(message.id, messageCallback);
      }
    }
  }

  ping (uri): Promise<CommandServerState> {
    return new Promise(async (resolve) => {
      try {
        await this.connect(uri);
        
        this.send({ command: Commands.PING }, (res) => {
          debug('ClientCommand')('Ping 通服务');
          resolve(CommandServerState.OPENED);
          this.close();
        });
      } catch (error) {
        debug('ClientCommand')('无法 Ping 通服务')
        resolve(CommandServerState.CLOSED);
        this.close();
      }
    })
  }

  close () {
    this.transport?.close();
    this.transport?.removeAllListeners();
  }

  onMessage = (message, reply?: Function, sock?: net.Socket) => {
    const { command, sourceId, payload } = message;

    debug('ClientCommand')('接收消息：%s', message);

    switch (command) {
      case Commands.CALLBACK: {
        this.emit(sourceId, payload);
        break;
      }

      default: {
        this.emit('message', payload, reply, sock);
      }
    }
  }
}