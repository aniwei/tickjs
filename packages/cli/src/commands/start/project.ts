import { EventEmitter } from 'events';
import npminstall from 'npminstall';
import debug from 'debug';
import * as uuid from 'uuid';

import { 
  ClientCommand, 
  CommandServerState, 
  Commands,
  CommandSource, 
  CommandResponse,
  CommandResponseStatusCode,
} from '../../shared/command';

import {
  PROJ_DIR,
  TICK_DAEMON_SOCK,
} from '../../shared/env';

export class Project extends EventEmitter {
  public client: ClientCommand | null = null;
  public id: string | null = null;
  public projDir: string | null = null;

  constructor (id, projDir) {
    super();

    this.id = id;
    this.projDir = projDir;
  }

  async connect (childProcessConfig?) {
    if (await this.ping() === CommandServerState.OPENED) {
    }

    debug(`project`)('链接 Daemon')

    this.client = new ClientCommand(CommandSource.CLI);
    this.client.on('close', () => {
      this.client?.removeAllListeners();
      this.client?.close();
    });

    this.client.on('error', (error) => {
      debug('project')('连接服务器错误：%s', error.code || error.message);
      this.client?.removeAllListeners();
      this.client?.close();
    });

    this.client.on('connect', async () => {
      debug('project')('连接服务器错误');
    });
    
    return await this.client.connect(TICK_DAEMON_SOCK + `?id=${this.id}`);
  }

  async ping () : Promise<CommandServerState> {
    return await ClientCommand.ping(TICK_DAEMON_SOCK);
  }
}

const env = process.env;
const project = new Project(env.PROJ_ID, env.PROJ_DIR);

project.connect();
