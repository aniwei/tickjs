import { resolve, parse } from 'path';
import fs from 'fs-extra'
import npmintall from 'npminstall';
import mem from 'mem-fs';
import editor from 'mem-fs-editor';
import {
  TICKRC,
} from '../../shared/env';

import {
  Commands,
  ServerCommand,
  CommandResponseStatusCode, 
  CommandSpinnerState,
  CommandMessage
} from '../../shared/command';

function isExistFile (root, filename) {
  const path = resolve(root, filename);

  return fs.existsSync(path);
}

function createProject (dest, context) {
  const PROJ_TPL = resolve(__dirname, '--project--');
  const store = mem.create();
  const fs = editor.create(store);

  return new Promise((resolve) => {
    fs.copyTpl(PROJ_TPL, dest, context);
    fs.commit(resolve);
  });
}

async function inquire (commandar: ServerCommand, message: CommandMessage) {
  const { payload, clientId } = message;
  const { proj } = payload as any;

  const parsed = parse(proj);

  return await commandar.send(clientId as string, {
    command: Commands.INIT_INQUIRER,
    payload: [
      {
        type: 'input',
        name: 'projectNode',
        label: '项目名称',
        message: '请输入项目名称',
        default: parsed.name,
        required: true
      }, {
        type: 'input',
        name: 'AppID',
        label: '项目AppID',
        message: '请输入项目 AppID',
        default: '',
        required: false
      }, {
        type: 'choice',
        name: 'AppID',
        label: '项目AppID',
        message: '请输入项目 AppID',
        default: '',
        required: false
      }
    ]
  }) as any;
}

async function copyTemplate (commandar: ServerCommand, message: CommandMessage, name: string, appid?: string) {
  const { payload, clientId } = message;
  const { proj } = payload as any;

  commandar.send(clientId as string, {
    command: Commands.SPIN,
    payload: {
      id: 'tpl',
      state: CommandSpinnerState.READY,
      text: `初始化项目模版`
    }
  });

  await createProject(proj, {
    miniprogramRoot: '',
    projectName: name,
    appid,
  });

  await commandar.send(clientId as string, {
    command: Commands.SPIN,
    payload: {
      id: 'tpl',
      state: CommandSpinnerState.DONE,
      text: `初始化项目模版`
    }
  });
}

async function installDependences (commandar: ServerCommand, message: CommandMessage) {
  const { payload, clientId } = message;
  const { proj } = payload as any;

  await commandar.send(clientId as string, {
    command: Commands.SPIN,
    payload: {
      id: 'install',
      state: CommandSpinnerState.READY,
      text: `安装项目依赖`
    }
  });

  try {
    await npmintall({ 
      root: proj
    });

    await commandar.send(clientId as string, {
      command: Commands.SPIN,
      payload: {
        id: 'install',
        state: CommandSpinnerState.DONE,
        text: `安装项目依赖`
      }
    });
  } catch (error) {
    await commandar.send(clientId as string, {
      command: Commands.SPIN,
      payload: {
        id: 'install',
        state: CommandSpinnerState.FAIL,
        text: `安装项目依赖`,
        description: error.stack || error.message
      }
    });
  }  
}

export async function init (payload, message, commandar, daemon?) {
  const { clientId } = message;
  const { proj } = payload;

  if (
    isExistFile(proj, TICKRC) &&
    isExistFile(proj, 'package.json')
  ) {
    return {
      code: CommandResponseStatusCode.FAIL,
      message: `该目录已经存在 Tick 项目` 
    }
  }

  const { name, appid } = await inquire(commandar, message);

  await copyTemplate(commandar, message, name, appid);
  await installDependences(commandar, message);

  return {
    code: CommandResponseStatusCode.SUCCESS,
    message: '项目初始化完成'
  }
}