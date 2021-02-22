import fs from 'fs-extra';
import { resolve } from 'path';

import { MiniProgramNativeLayerNodeImpl } from '../NativeLayer';

const config = fs.readJSONSync(resolve(__dirname, 'app-config.json'));

const miniProgram = MiniProgramNativeLayerNodeImpl
.import({
  config: resolve(__dirname, 'app-config.json'),
  wxss: resolve(__dirname, 'app-wxss.js'),
  service: resolve(__dirname, 'app-service.js')
})
.launch({
  ...config,
  env: {
    USER_DATA_PATH: '/Users/weiyanhai/.tick/program'
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
  envVersion: 'release',
  accountInfo: {
    appId: 'wx42c1491feb6d12a1',
    icon: 'https://mmbiz.qpic.cn/mmbiz_png/icTdbqWNOwNQ0ia79enzYJBsZ3CIkLQGe39qeOxbpT9oM9KaCthzBa0PF75xzBGjZQGlM69TDggxpNX7ACibCjjtw/0?wx_fmt=png',
    nickname: '亚朵ATOUR'
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
})