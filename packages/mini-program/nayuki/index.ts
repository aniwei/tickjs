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
      if (url.indexOf('/passport/authenticate/wxapp/verify') > -1) {
        return NativeMethodsResponse.json({
          statusCode: 200,
          header: {

          },
          data: {
            "code": 0,
            "message": "",
            "data": {
              "accessToken": "eyJhbGciOiJIUzI1NiJ9.eyJ1bmlvbkNvZGUiOiJQNDA0MDE1NDcyNzA4NTA1NjAwIiwidXNlcklkIjoiMTA1MDkxMTkwIiwiYnJhbmQiOiIyNjAwMDI1MiIsInBob25lIjoib2I5eUE0cUo1WGpnZlE1RE8xQWhYdGRnWFQ4SSIsImlzcyI6InBkLXBhc3Nwb3J0Iiwic3ViIjoiMTA1MDkxMTkwIiwiaWF0IjoxNjA5MzAyODI5LCJleHAiOjE2MTk2NzA4Mjl9.r2_32rfLgqd-E7pA7khl7yleo2Oo5IQWTrVwi0XOUgs",
              "bindCode": 0,
              "firstLogin": false,
              "needInfo": false
            },
            "dataType": "UserLoginVO",
            "success": true
          }
        })
      }
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
    path: 'pages/order/orderList/orderList',
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
