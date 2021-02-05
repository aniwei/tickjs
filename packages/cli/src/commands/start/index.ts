import debug from 'debug';
import * as uuid from 'uuid';
import fs from 'fs-extra';
import { resolve } from 'path';
import { fork, spawn, spawnSync } from 'child_process';

import {
  TICKRC,
  NODE_ENV
} from '../../shared/env'

import { 
  CommandResponseStatusCode, 
  Commands 
} from '../../shared/command';

function isExistFile (root, filename) {
  const path = resolve(root, filename);

  return fs.existsSync(path);
}

function isNotExistTickProject (proj) {
  return !(
    isExistFile(proj, TICKRC) &&
    isExistFile(proj, 'package.json')
  );
}

export async function start (payload, message, commandar, daemon?) {
  return new Promise((resolve, reject) => {

    const { proj, env } = payload;
  
    debug('start')('执行 START 命令');
  
    if (isNotExistTickProject(proj)) {
      resolve({
        code: CommandResponseStatusCode.FAIL,
        message: `该目录不存在 Tick 项目`
      })
    }
  
    const child = fork('./project', {
      cwd: __dirname,
      detached: false,
      stdio: 'inherit',
      env: {
        PROJ_ID: uuid.v4(),
        PROJ_DIR: proj,
        NODE_ENV: env
      }
    });

    child.unref();

    child.on('close', () => {
      debug('start')('关闭项目容器：%o', child.pid);
    });

    child.on('error', (error) => {
      debug('start')('项目容器发生错误：%s', error.message || error);
    });

    child.on('message', (message) => {
      debug('start')('接收项目容器消息：%s', message);
    });

    debug('start')('运行项目容器：%s', child.pid);
    
    // resolve({
    //   code: CommandResponseStatusCode.SUCCESS,
    //   message: `START 命令执行成功`
    // })
  })

}

