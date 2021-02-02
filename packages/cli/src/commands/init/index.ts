import { resolve } from 'path';
import fs from 'fs-extra'
import npmintall from 'npminstall';
import {
  TICKRC,
} from '../../shared/env';

import {
  CommandResponseStatusCode, 
  Commands
} from '../../shared/command'

import {
  create
} from '../../project/create'

function isExistFile (root, filename) {
  const path = resolve(root, filename);

  return fs.existsSync(path);
}

export async function init (message, commandar) {
  const { payload, clientId } = message;
  const { proj, name, appid } = payload;

  if (
    isExistFile(proj, TICKRC) &&
    isExistFile(proj, 'package.json')
  ) {
    return {
      code: CommandResponseStatusCode.FAIL,
      message: `该目录已经存在 Tick 项目` 
    }
  }

  await commandar.log(clientId, `正在初始化项目模版...`);

  await create(proj, {
    miniprogramRoot: '',
    projectName: name,
    appid,
  });

  await commandar.log(clientId, `正在安装项目依赖...`);
  // await npmintall({ root: proj });

  return {
    code: CommandResponseStatusCode.SUCCESS,
    message: '项目初始化完成'
  }
}