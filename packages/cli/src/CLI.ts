import debug from 'debug';
import { fork } from 'child_process';
import { 
  ClientCommand, 
  CommandServerState, 
  Commands,
  CommandSource 
} from './shared/command';

import {
  TICK_DAEMON_SOCK,
  ARGV
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
        stdio: 'inherit',
        ...childProcessConfig
      });

      child.unref();
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
    await this.connect();
    await this.command(Commands.INIT);

    this.client?.close();

    if (ARGV.d) {
      debug('CLI')('后台运行指令');
    } else {
      
    }
  }

  start = async () => {
    await this.connect();
    await this.command(Commands.START);
  }
}

const cli = new CLI();

cli.init()
