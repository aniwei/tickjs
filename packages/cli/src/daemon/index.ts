import fs from 'fs-extra';
import debug from 'debug';

import {
  CommandSource,
  ServerCommand,
  CommandResponse,
  Commands
} from '../shared/command';

import {
  TICK_DAEMON_SOCK,
  TICK_DAEMON_CACHE,
} from '../shared/env';

import {
  init
} from '../commands/init';

import {
  start
} from '../commands/start';

import {
  getLatestNotifycation
} from './notification'

function isNotExist (sock) {
  return !fs.existsSync(sock)
}

export const daemon = new class {
  public command: ServerCommand | null = null;
  public projects = [];
  
  launch () {
    if (isNotExist(TICK_DAEMON_CACHE)) {
      debug('daemon')('不存在 Tick 缓存地址 %s', TICK_DAEMON_SOCK);
    }

    this.command = new ServerCommand();
    this.command.on('message', this.onMessage);
    this.command.on('listening', this.onListening);

    this.command.listen(TICK_DAEMON_SOCK);
  }

  onMessage = (message, reply) => {
    const { source } = message;

    switch (source) {
      case CommandSource.CLI: {
        this.onMessageFromCLI(message, reply);
        break;
      }
    }
  }

  onMessageFromCLI = async (message, reply: Function) => {
    const { command, payload, clientId } = message;

    await getLatestNotifycation(clientId);

    switch (command) {
      case Commands.INIT: {
        const result = await init(message, this.command);

        reply(result);
        break;
      }

      case Commands.START: {
        const result = await start(message, this.command);

        reply(result);
        break;
      }
    }
  }

  onListening = () => { 
    debug('daemon')('服务已经启动，服务地址：%s', TICK_DAEMON_SOCK);
  }

  onError = (error) => {
    console.log(error)
  }
}


export function launch (process: any) {
  daemon.launch();
}

launch(process);