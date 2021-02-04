import debug from 'debug';
import { fork } from 'child_process';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { 
  Commands,
  CommandSource, 
  ClientCommand, 
  CommandServerState, 
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
  VERSION,
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

    this.client.command(Commands.LOG, ({ type, message }) => {
      debug('client')('接收日志信息：%s', message);
      console.log(message);
    });

    this.spinner = new Spinner(this.client);
    
    return await this.client.connect(TICK_DAEMON_SOCK + '?id=cli');
  }

  async fork (childProcessConfig?): Promise<string> {
    return new Promise((resolve) => {
      const child = fork('./daemon/index', { 
        cwd: __dirname,
        detached: true,
        stdio: 'inherit',
        ...childProcessConfig
      });

      child.unref();

      child.on('message', (message) => {
        debug('CLI')('启动 Daemon 进程完毕 %s', message);
        resolve(PingState.OK);
      });

      child.on('exit', () => {
        child.removeAllListeners();
      });

      child.on('error', (error) => {
        console.log(error)
      });
    })
  }

  async ping () : Promise<CommandServerState> {
    return await ClientCommand.ping(TICK_DAEMON_SOCK);
  }

  async send (command: Commands, payload?) {
    return this.client?.send({
      command,
      payload: {
        version: VERSION,
        proj: PROJ_DIR,
        ...payload
      }
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
      proj: PROJ_DIR,
      version: VERSION
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
    const result: CommandResponse = await this.send(Commands.START, ARGV) as CommandResponse;

    if (result.code === CommandResponseStatusCode.FAIL) {
      debug('CLI')('start 命令执行失败：%s', result.message);
    } else {
      debug('CLI')('start 命令执行完毕');
    }

    this.client?.close();
  }

  stop = async () => {
    if (await this.ping()) {
      await this.connect();

      const result: CommandResponse = await this.send(Commands.STOP) as CommandResponse;

      if (result.code === CommandResponseStatusCode.FAIL) {
        debug('CLI')('stop 命令执行失败：%s', result.message);
      } else {
        debug('CLI')('stop 命令执行完毕');
      }

      this.client?.close();
    }
  }
}

const cli = new CLI();

cli.stop()
