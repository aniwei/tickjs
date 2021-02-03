import fs from 'fs-extra';
import debug from 'debug';
import axios from 'axios';

import {
  ServerCommand,
  Commands
} from '../shared/command';

import {
  TICK_DAEMON_SOCK,
  TICK_DAEMON_CACHE,
  TICK_NPM,
} from '../shared/env';

import {
  init
} from '../commands/init';

import {
  start
} from '../commands/start';

import {
  ls
} from '../commands/ls';


function isNotExist (sock) {
  return !fs.existsSync(sock)
}

export const daemon = new class {
  public commandar: ServerCommand | null = null;
  public projects = [];

  getLatestNotifycation = async (clientId) => {
    debug('daemon')(`执行最新推送`);
  }

  getLatestTick = async (payload) => {
    debug('daemon')(`获取Tick最新版本`);

    const result: any = await axios.get(TICK_NPM);
    
    console.log(result.body);
  }

  getLatestProject (payload) {
    debug('daemon')(`获取项目列表`);
  }

  statister = async (payload) => {
    debug('daemon')(`执行上报统计`);
  }
  
  launch () {
    if (isNotExist(TICK_DAEMON_CACHE)) {
      debug('daemon')('不存在 Tick 缓存地址 %s', TICK_DAEMON_SOCK);
    }

    this.commandar = new ServerCommand();
    this.commandar.on('listening', this.onListening);

    this.commandar.listen(TICK_DAEMON_SOCK);

    const mustExecutePrefixTasks = [
      this.getLatestNotifycation, 
      this.getLatestTick, 
      this.getLatestProject, 
      this.statister
    ];

    this.commandar.command(
      Commands.INIT, 
      [...mustExecutePrefixTasks], 
      (payload, message) => init(payload, message, this.commandar, this)
    );

    this.commandar.command(
      Commands.START, 
      [...mustExecutePrefixTasks], 
      (payload, message) => start(payload, message, this.commandar, this)
    );

    this.commandar.command(
      Commands.LS, 
      [...mustExecutePrefixTasks], 
      (payload, message) => ls(payload, message, this.commandar, this)
    );
  }

  onListening = () => { 
    debug('daemon')('服务已经启动，服务地址：%s', TICK_DAEMON_SOCK);
  }

  onError = (error) => {
    console.log(error)
  }
}

daemon.launch();
