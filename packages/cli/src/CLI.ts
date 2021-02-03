import debug from 'debug';
import { fork } from 'child_process';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { 
  ClientCommand, 
  CommandServerState, 
  Commands,
  CommandSource, 
  CommandResponse,
  CommandResponseStatusCode,
} from './shared/command';

import {
  Spinner
} from './shared/Spinner'

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
  public spinner: Spinner | null = null;

  async connect (childProcessConfig?) {
    if (await this.ping() === CommandServerState.CLOSED) {
      await this.fork(childProcessConfig);
    }

    this.client = new ClientCommand(CommandSource.CLI);
    this.client.on('close', () => {
      this.client?.removeAllListeners();
      this.client?.close();

      this.spinner = null;
    });

    this.client.on('error', (error) => {
      debug('client')('连接服务器错误：%s', error.code || error.message);
      this.client?.removeAllListeners();
      this.client?.close();

      this.spinner = null;
    });

    this.client.command(Commands.LOG, ({ message }) => {
      debug('client')('接收日志信息：%s', message);
      console.log(message);
    });

    this.spinner = new Spinner(this.client);
    
    return await this.client.connect(TICK_DAEMON_SOCK + '?id=cli');
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

  async send (command: Commands, payload?) {
    return this.client?.send({
      command,
      payload
    });
  }

  async command (type: Commands, func: Function) {
    return this.client?.command(type, func);
  }

  init = async () => {
    await this.connect();

    this.command(Commands.INIT_INQUIRER, async (prompts) => {
      return await inquirer.prompt(prompts.map(prompt => {
        return  {
          ...prompt,
          message: prompt.label,
          validate (input) {
            const done = this.async();
            if (prompt.required) {
              if (!input) {
                return done(prompt.message);
              }

              done(null, true);
            } else {
              done(null, true);
            }
          }
        }
      }));
    });
    
    const result: CommandResponse = await this.send(Commands.INIT, {
      proj: PROJ_DIR
    }) as CommandResponse;

    if (result.code === CommandResponseStatusCode.FAIL) {
      debug('CLI')('init 命令执行失败：%s', result.message);
      console.log(chalk.yellow(result.message));
    } else {
      debug('CLI')('init 命令执行完毕：%s', result.message);
    }

    this.client?.close();
  }

  start = async () => {
    await this.connect();
    await this.send(Commands.START, ARGV);
  }
}

const cli = new CLI();

cli.init()
