import debug from 'debug';
import path from 'path';
import { fork } from 'child_process';
import inquirer from 'inquirer';
import * as art from 'ascii-art';
import { 
  ClientCommand, 
  CommandServerState, 
  Commands,
  CommandSource, 
  CommandResponse,
  CommandResponseStatusCode
} from './shared/command';

import {
  ARGV,
  PROJ_DIR,
  TICK_DAEMON_SOCK,
} from './shared/env';

enum PingState {
  OK = 'ok',
  TIMEOUT = 'timeout'
}

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

    this.client.on('message', this.onMessage)
    
    return await this.client.connect(TICK_DAEMON_SOCK + '?id=cli');
  }

  onMessage = async (message, reply) => {
    const { command, payload } = message;

    switch (command) {
      case Commands.INIT_INQUIRER: {
        const result = await inquirer.prompt(payload.inquirers);

        reply()

        break;
      }
    }
  }

  async fork (childProcessConfig?): Promise<string> {
    return new Promise((resolve) => {
      debug('CLI')('开始启动 Daemon 进程');

      const child = fork('./daemon/index', { 
        cwd: __dirname,
        detached: true,
        stdio: 'ignore',
        ...childProcessConfig
      });

      child.unref();

      resolve(PingState.OK);
    })
  }

  async ping () : Promise<CommandServerState> {
    return await ClientCommand.ping(TICK_DAEMON_SOCK);
  }

  async command (command: Commands, payload?) {
    return this.client?.send({
      command,
      payload
    });
  }

  init = async () => {
    const parsed = path.parse(PROJ_DIR);
    const payload = await inquirer.prompt([
      {
        type: 'input',
        message: '请输入项目名称:',
        name: 'name',
        default: parsed.name
      }
    ]);

    await this.connect();
    
    const result: CommandResponse = await this.command(Commands.INIT, {
      ...payload,
      proj: PROJ_DIR
    }) as CommandResponse;

    if (result.code !== CommandResponseStatusCode.FAIL) {
      debug('CLI')('init 命令执行失败：%s', result.message);
    }

    this.client?.close();
  }

  start = async () => {
    await this.connect();
    await this.command(Commands.START, ARGV);
  }
}

const cli = new CLI();

cli.init()
