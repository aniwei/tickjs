import fs from 'fs-extra';
import debug from 'debug';

import {
  CommandSource,
  ServerCommand,
  Commands
} from '../shared/command';

import {
  TICK_DAEMON_SOCK,
  TICK_DAEMON_CACHE,
} from '../shared/env';

export enum DaemonProcessState {
  OK = 'ok'
}

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

  onMessageFromCLI = (message, reply: Function) => {
    const { command } = message;

    switch (command) {
      case Commands.INIT: {
        reply({
          command: Commands.CALLBACK,
        });
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