import debug from 'debug';
import path from 'path';
import { fork } from 'child_process';
import inquirer from 'inquirer';
import { 
  ClientCommand, 
  CommandServerState, 
  Commands,
  CommandSource 
} from './shared/command';

import {
  TICK_DAEMON_SOCK,
  ARGV,
  PROJECT_DIR,
} from './shared/env';

import {
  DaemonProcessState
} from './daemon/index'


export class CLI {
  public client: ClientCommand | null = null;

  async connect (childProcessConfig?) {
    if (await this.ping() === CommandServerState.CLOSED) {
      await this.fork(childProcessConfig);
    }

    this.client = new ClientCommand(CommandSource.CLI);
    this.client.on('close', () => {
      this.client?.removeAllListeners();
      this.client?.close();
    });

    this.client.on('error', (error) => {
      debug('client')('连接服务器错误：%s', error.code || error.message);
      this.client?.removeAllListeners();
      this.client?.close();
    });
    
    return await this.client.connect(TICK_DAEMON_SOCK + '?id=cli');
  }

  async fork (childProcessConfig?): Promise<DaemonProcessState> {
    return new Promise((resolve) => {
      debug('CLI')('开始启动 Daemon 进程');

      const child = fork('./daemon/index', { 
        cwd: __dirname,
        detached: true,
        stdio: 'ignore',
        ...childProcessConfig
      });

      child.unref();

      
      resolve(DaemonProcessState.OK);
    })
  }

  async ping () : Promise<CommandServerState> {
    return await ClientCommand.ping(TICK_DAEMON_SOCK);
  }

  async command (command: Commands, payload?) {
    return new Promise((resolve, reject) => {
      this.client?.send({
        command,
        payload
      }, (res) => {
        resolve(res)
      });
    })
  }

  init = async () => {
    const parsed = path.parse(PROJECT_DIR);
    const payload = await inquirer.prompt([
      {
        type: 'input',
        message: '请输入项目名称:',
        name: 'name',
        default: parsed.name
      }
    ]);

    await this.connect();
    await this.command(Commands.INIT, payload);

    this.client?.close();
  }

  start = async () => {
    await this.connect();
    await this.command(Commands.START, ARGV);
  }
}

const cli = new CLI();

cli.init()
