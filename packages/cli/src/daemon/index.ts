import { resolve } from 'path';
import fs from 'fs-extra';
import debug from 'debug';
import axios from 'axios';
import compare from 'compare-versions';
import notifier from 'node-notifier';


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
  init,
  start,
  ls,
  stop
} from '../commands';

function isNotExist (sock) {
  return !fs.existsSync(sock)
}

export const daemon = new class {
  public commandar: ServerCommand | null = null;
  public version: any | null = null;

  readTickJSONData = async () => {
    const filename = resolve(TICK_DAEMON_CACHE, 'tick.json');
    let data;

    if (!fs.existsSync(filename)) {
      data = {
        version: {
          notification: {
            current: Date.now() / 1000,
            next: Date.now() / 1000 + 4 * 3600
          }
        },

        projects: []
      };

      fs.writeJSONSync(filename, data);
    } else {
      data = fs.readJson(filename); 
    }

    this.version = data.version;
    // this.projects = data.projects;
  }

  getLatestNotifycation = async (clientId) => {
    debug('daemon')(`执行最新推送`);
  }

  getLatestTick = async (payload) => {
    debug('daemon')(`获取Tick最新版本`);

    const result: any = await axios.get(TICK_NPM);
    const data = result.data;

    const dist = data['dist-tags'].latest;
    const versions = data.versions;
    const compared = compare(dist, payload.version);

    debug('daemon')('Tick 最新版本：%s', dist);
    debug('daemon')('Tick 最新版本：%o', compared);

    if (compared > 0) {
      notifier.notify({
        title: 'Tick 有可更新版本',
        message: '主要修复',
        icon: resolve(__dirname, '../shared/logo.jpeg')
      });

      notifier.once('click', () => {
        debug('daemon')('点击 Notifier');
      })

      notifier.once('timeout', () => {
        debug('daemon')('Notifier 超时');
        notifier.removeAllListeners();
      })
    }
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
      this.readTickJSONData,
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

    this.commandar.command(
      Commands.STOP,
      [...mustExecutePrefixTasks],
      (payload, message) => stop(payload, message, this.commandar, this)
    )
  }

  onListening = () => { 
    debug('daemon')('服务已经启动，服务地址：%s', TICK_DAEMON_SOCK);
    const send = (<any>process)?.send;

    if (send) {
      (<any>process)?.send('OK');
    }
  }

  onError = (error) => {
    console.log(error)
  }
}

daemon.launch();
