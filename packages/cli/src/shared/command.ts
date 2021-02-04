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
  LS = 'ls',
  START = 'start',
  BUILD = 'build',
  STOP = 'stop',
  LOG = 'log',
  PROJ_LOG = 'proj_log',
  SPIN = 'spin',
}

export enum CommandSpinnerState {
  READY = 0,
  PENDING = 1,
  DONE = 4,
  FAIL = 5
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
  public commands: Map<string, any> = new Map;

  constructor (source: CommandSource, transport) {
    super();

    this.source = source;
    this.transport = transport;

    this.command(Commands.CALLBACK, (payload, { sourceId }) => {
      this.emit(sourceId, payload);
    })
  }

  async onMessage (message: CommandMessage, reply: Function, sock?: net.Socket);

  async onMessage (message, reply: Function, sock?: net.Socket) {
    debug('Commands')('接收消息：%o', message);

    const { command, payload, id } = message;
    const isNotCallbackCommand = command !== Commands.CALLBACK;

    for (const [key, { prefixTasks, handle }] of this.commands) {
      if (key === command) {
        if (prefixTasks.length > 0) {
          for (const task of prefixTasks) {
            await task(payload, message, sock);
          }
        }

        const result = await handle(payload, message, sock);

        if (isNotCallbackCommand) {
          return reply({
            sourceId: id,
            command: Commands.CALLBACK,
            payload: result instanceof Promise ? (await result) : (result || null),
            id: getMessageId()
          })
        }

      }
    }

    if (isNotCallbackCommand) {
      reply({
        sourceId: id,
        command: Commands.CALLBACK,
        payload: null,
        id: getMessageId()
      });
    }
  }

  command (type: Commands, prefixTasks: Function[] | Function, handle?: Function) {
    if (typeof prefixTasks === 'function') {
      handle = prefixTasks;
      prefixTasks = [];
    }

    this.commands.set(type, {
      prefixTasks,
      handle,
    });

    return this;
  }
}

export class ServerCommand extends Command {
  public clients: Map<string, net.Socket | null> = new Map()

  constructor () {
    super(CommandSource.DAEMON, new Server());
  }

  listen (uri) {
    if (this.transport instanceof Server) {

      this.transport?.on('listening', () => {
        debug(`ServerCommand`)(`服务器已经启动`);
        this.emit('listening');
      });

      this.transport?.on('error', (error) => {
        this.transport?.removeAllListeners();
      });

      this.transport?.on('disconnect', (sock) => {
        for (const [id, client] of this.clients) {
          if (client === sock) {
            debug(`ServerCommand`)(`断开连接：%s`, id);
            this.clients.delete(id);
            break;
          }
        }
      });

      this.transport?.on('message', this.onMessage.bind(this));
      this.transport?.listen(uri);

      this.command(Commands.PING, () => {
        debug(`ServerCommand`)(`客户端 Ping 请求`);
      });

      this.command(Commands.CONNECT, (payload, message, sock) => {
        console.log(payload)
        debug(`ServerCommand`)(`接收客户端连接请求：%s`, payload.id);
        this.clients.set(payload.id, sock);
      });

      this.command(Commands.LOG, ({ message }) => {
        console.log(message);
      })  
    }
  }

  send (clientId: string, payload: object) {
    return new Promise((resolve, reject) => {
      const client = this.clients.get(clientId);
      const message = {
        source: this.source,
        id: getMessageId(),
        ...payload,
      }

      if (client) {
        client?.write(pack([message]));
  
        this.once(message.id, (res) => {
          resolve(res);
        })
      } else {
        reject();
      }
    });
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
        this.transport?.once('error', (error) => {
          reject(error);
        });
        this.transport?.on('message', this.onMessage.bind(this));
        this.transport?.once('connect', async () => {
          const parsed = URL.parse(uri);
          const query = qs.parse(parsed.query || '');
          const id: string = query.id ? query.id : uuid.v4();

          try {
            await this.send({
              command: Commands.CONNECT,
              payload: { id }
            });

            this.id = id;
            this.emit('connect');

            resolve();
          } catch (error) {

            reject(error);
          }
        });

        this.transport?.connect(uri);
      } else {
        reject();
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
        
        this.once(message.id, (res) => {
          resolve(res);
        });
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
        this.close();
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
}