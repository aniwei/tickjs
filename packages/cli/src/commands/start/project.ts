import debug from 'debug';
import fs from 'fs-extra';
import { resolve } from 'path';
import { spawn } from 'child_process';
import { EventEmitter } from 'events';
import { template } from './template';

import { 
  ClientCommand, 
  CommandServerState, 
  CommandSource, 
} from '../../shared/command';

import {
  TICKRC,
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
      (<any>process)?.send('OK');
      debug('project')('连接服务');

      let tickrc = require(resolve(this.projDir as string, TICKRC));
      tickrc = tickrc.default || tickrc; 

      (<any>process)?.send(JSON.stringify(tickrc))
       
      await template.clean(this.projDir);
      await template.create(this.projDir, {
        beautify: true,
        thirdParty: tickrc.thirdParty
      });
    });
    
    return await this.client.connect(TICK_DAEMON_SOCK + `?id=${this.id}`);
  }

  async ping () : Promise<CommandServerState> {
    return await ClientCommand.ping(TICK_DAEMON_SOCK);
  }
}

const env = process.env;

debug('project')('项目允许环境：%o', env);

const project = new Project(env.PROJ_ID, env.PROJ_DIR);

project.connect();
