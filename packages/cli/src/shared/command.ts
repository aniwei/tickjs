import { EventEmitter } from 'events';
import net from 'net';
import qs from 'qs';
import URL from 'url';
import debug from 'debug';
import * as uuid from 'uuid';
import { 
  Client, 
  Server, 
  pack
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
  INIT_INQUIRER = 'init_inquirer',
  START = 'start',
  BUILD = 'build',
  LOG = 'log',


}

export type CommandMessage = {
  source: CommandSource,
  command: Commands,
  payload: object,
  id: string,
  sourceId?: string,
  clientId?: string
}

export enum CommandResponseStatusCode {
  SUCCESS = 'success',
  FAIL = 'fail'
}

export type CommandResponse = {
  code: CommandResponseStatusCode,
  message: string
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

  send (clientId: string, payload: object, callback?: Function) {
    let clients;

    if (typeof clientId === 'object') {
      clients = this.clients;
    } else if (typeof clientId === 'string') {
      clients = new Map();
      clients.set(clientId, this.clients.get(clientId));
    }

    for (const [id, client] of clients) {
      if (client.writable) {
        const id = getMessageId();

        client.write(pack([{
          source: this.source,
          ...payload,
          id
        }]));
      }
    }
  }

  log (clientId, message) {
    return this.send(clientId, {
      command: Commands.LOG,
      payload: { message }
    })
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


  onListening = () => {
    debug(`ServerCommand`)(`服务器已经启动`);
    this.emit('listening');
  }

  onError = (error) => {
    this.emit('error', error);
    this.transport?.removeAllListeners();
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
    return new Promise(async (resolve, reject) => {
      if (this.transport instanceof Client) {
        const onConnect = async () => {
          const parsed = URL.parse(uri);
          const query = qs.parse(parsed.query || '');
          const id: string = query ? query.id : uuid.v4();

          try {
            await this.send({
              command: Commands.CONNECT,
              payload: { id }
            });

            resolve();

            this.emit('connect');
            this.transport?.off('connect', onConnect);
          } catch (error) {
            reject(error);
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

  send (command) {
    return new Promise((resolve, reject) => {
      if (this.transport instanceof Client) {
        const message: CommandMessage = {
          clientId: this.id,
          source: this.source,
          id: getMessageId(),
          ...command
        }

        this.transport.send(message);
        
        const callback = (res) => {
          resolve(res);

          this.off(message.id, callback);
        }

        this.on(message.id, callback);
      } else {
        reject(new Error(`Error`))
      }
    });
  }

  ping (uri): Promise<CommandServerState> {
    return new Promise(async (resolve) => {
      try {
        await this.connect(uri);
        await this.send({ command: Commands.PING });

        debug('ClientCommand')('Ping 通服务');
        resolve(CommandServerState.OPENED);
      } catch (error) {
        debug('ClientCommand')('无法 Ping 通服务')
        resolve(CommandServerState.CLOSED);
      }

      this.close();
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
        this.emit('message', message, reply, sock);
        break;
      }
    }
  }
}