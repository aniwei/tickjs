
import { resolve } from 'path';
import debug from 'debug';
import fs from 'fs-extra';
import vm, { RunningScriptOptions } from 'vm';
import { MiniProgram } from '../MiniProgram';
import { navigator } from './context/navigator';

class MiniProgramImpl extends MiniProgram {
  evaluateScript (code: string, filename?: string) {
    vm.runInNewContext(code, this.context, {
      filename
    });
  }

  runInContext (context: any | null) {
    this.context = context;
  }


  invokeHandler = (name, options, callbackId) => {
    debug('MiniProgramImpl')('调用原生能力：%s, %d', name, callbackId);

    if (name === 'getStorageSync' && options.indexOf('name') > -1) {
      this.invokeCallbackHandler(callbackId, {
        
        data: 'test',
        dataType: 'String'
      });
    }

  }

  publishHandler = () => {

  }
}

export async function createMiniProgram ({ appid, application, config }) {
  const miniProgram = new MiniProgramImpl();

  miniProgram.injectContext('setTimeout', setTimeout);
  miniProgram.injectContext('setInterval', setInterval);
  miniProgram.injectContext('clearTimeout', clearTimeout);
  
  miniProgram.injectContext('navigator', {
    userAgent: ''
  });

  miniProgram.injectContext('__wxConfig', config);

  const SDKFilePath = (resolve(__dirname, '../MiniProgram/WASDK'));
  const service = (await fs.readFile(resolve(SDKFilePath, 'WAService.js'))).toString();

  miniProgram.evaluateScript(service, 'WAService.js');
  miniProgram.evaluateScript(application, 'app-service.js');

  return miniProgram;
}

export async function runMiniProgram (config) {
  const SDKFilePath = (resolve(__dirname, '../MiniProgram/WASDK'));
  const application = (await fs.readFile(resolve(SDKFilePath, 'app-service.js'))).toString();

  const miniProgram = await createMiniProgram({
    appid: '',
    application,
    config,
  });

  return miniProgram;
}


async function main () {

  const miniProgram = await runMiniProgram({
    deprecated: false,
    env: {
      USER_DATA_PATH: '/Users/weiyanhai/.tick/program'
    },
    appLaunchInfo: {
      path: 'pages/index/index',
      query: {},
      scene: 1001,
      shareTicket: undefined,
      referrerInfo: {},
    },
    ext: {},
    wxAppInfo: {
      maxRequestConcurrent: 10,
      maxUploadConcurrent: 10,
      maxDownloadConcurrent: 10,
      maxWorkerConcurrent: 1,
      maxWebsocketConnect: 2,
    },
    debug: true,
    entryPagePath: 'pages/index/index',
    envVersion: 'release',
    tabBar: {
      list: []
    },
    pages: [
      'pages/index/index',
      'pages/logs/logs'
    ],
    page: {
      'pages/index/index.html': {
        window: {
  
        }
      }
    },
    accountInfo: {
      appId: 'wx3ce645f632f26623',
      icon: 'https://mmbiz.qpic.cn/mmbiz_png/icTdbqWNOwNQ0ia79enzYJBsZ3CIkLQGe39qeOxbpT9oM9KaCthzBa0PF75xzBGjZQGlM69TDggxpNX7ACibCjjtw/0?wx_fmt=png',
      nickname: 'yandiv的接口测试号'
    },
    global: {
      window: {
  
      }
    },
    platform: 'mac',
    appType: 0,
    networkTimeout: {
      request: 60000,
      uploadFile: 60000,
      connectSocket: 60000,
      downloadFile: 60000,
    },
    extAppid: ''
  });
}


main()