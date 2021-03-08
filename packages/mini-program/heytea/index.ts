import fs from 'fs-extra';
import path from 'path';
import { createMiniProgram } from '../src/vm';

import {
  NativeMethodsResponse,
  getDefaultNativeMethods
} from '../src/vm/NativeMethods';

const nativeMethods = getDefaultNativeMethods({
  beforeRequest (name, context) {
    const { url } = context.request.body;

    // if (name === 'createRequestTask') {
    //   if (url.indexOf('/api/service-login/openapi/vip/user/login_v1') > -1) {
    //     return NativeMethodsResponse.json({
    //       statusCode: 200,
    //       header: {

    //       },
    //       data: {
    //         "code": 0,
    //         "message": "SUCCESS",
    //         "requestId": null,
    //         "data": {
    //           "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2MzU2MjU1IiwidXNlcl9tYWluX2lkIjoyMjg0MDI1NSwiY2hhbm5lbCI6IlciLCJzb3VyY2UiOiJhcGkiLCJpc19ndWVzdCI6ZmFsc2UsImxhYmVsIjoiY2xpZW50OndlYXBwIiwiaWF0IjoxNjE1MDQ5NDk2LCJuYmYiOjE2MTUwNDk0OTYsImV4cCI6MTYxNTA1NjY5NiwiaXNzIjoiaGV5dGVhIn0.2QRNp9otcKCmc_V6WJtgLwGwJNu4zlE5nk4zdhtiPjY",
    //           "nickName": "Aniwei",
    //           "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLribspDrHFPbbn9GuLnbwr2Xb8Sib7lFI5k9UVuxlqwjcaAQbEqoicRAlChxU08uxMMrAaPmIVVibU8g/132",
    //           "authorized": true,
    //           "bindPhone": true,
    //           "bindEmail": false,
    //           "guest": false,
    //           "expired_at": "2021-03-07T02:51:36.788"
    //         }
    //       }
    //     })
    //   }
    // }
  }
});

createMiniProgram({
  appservice: fs.readFileSync(path.resolve(__dirname, 'app-service.js')),
  appwxss: fs.readFileSync(path.resolve(__dirname, 'app-wxss.js'))
}, {
  accountInfo: {
    appId: 'wxab7430e6e8b9a4ab',
    icon: 'http://mmbiz.qpic.cn/mmbiz_png/6teukYZkxfiarzZVdKR1GpHQSlQKpuiaKyVbW9pG22NbRpzWqB2LuNTUwAmHGZjUncgYrc6SMbf1B7jYu1LPiavUA/640?wx_fmt=png&wxfrom=200',
    nickname: '亚朵ATOUR'
  },
  appLaunchInfo: {
    path: 'pages/mall_fusion/index',
    query: {
      scene: '',
      shareCode: 'LKYP_91959434850184',
      type: '1',
      suid: '2d444f77-cf85-438e-8369-175cea90aa5b',
      ic: '8SZS84AB'
    },
    scene: 1001,
    shareTicket: null,
    referrerInfo: {
      appid: 'wxab7430e6e8b9a4ab'
    },
  },
  debug: 0,
  entryPagePath: 'pages/index/index.html',
  ...fs.readJSONSync(path.resolve(__dirname, 'app-config.json'))
}, nativeMethods.request);
