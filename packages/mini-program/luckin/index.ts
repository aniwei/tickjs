import fs from 'fs-extra';
import path from 'path';
import { createMiniProgram } from '../src/runtime';

import {
  NativeMethodsResponse,
  getDefaultNativeMethods
} from '../src/runtime/NativeMethods';

const nativeMethods = getDefaultNativeMethods({
  beforeRequest (name, context) {
    const { url } = context.request.body;

    if (name === 'createRequestTask') {
      console.log(url);
    }
  }
});

createMiniProgram({
  appservice: fs.readFileSync(path.resolve(__dirname, 'app-service.js')),
  appwxss: fs.readFileSync(path.resolve(__dirname, 'app-wxss.js'))
}, {
  accountInfo: {
    appId: 'wx21c7506e98a2fe75',
    icon: 'http://mmbiz.qpic.cn/mmbiz_png/IhibnWnu9biaWTJW5PagGC5j5sk0UKqxyEyXfibdmXJwYEAMUmvOD7KjDM7UtZj6pFHibOSk1An3egDycZbBPPosVw/640?wx_fmt=png&wxfrom=200',
    nickname: 'luckincoffee瑞幸咖啡'
  },
  appLaunchInfo: {
    path: 'pages/index/home',
    query: {},
    scene: 1001,
    shareTicket: null,
    referrerInfo: {
      appid: 'wx21c7506e98a2fe75'
    },
  },
  debug: 0,
  entryPagePath: 'pages/home/index.html',
  ...fs.readJSONSync(path.resolve(__dirname, 'app-config.json'))
}, nativeMethods.request);
