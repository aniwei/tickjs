import fs from 'fs-extra';
import { resolve } from 'path';

import { MiniProgramNativeLayerNodeImpl } from '../NativeLayer';


const miniProgram = new MiniProgramNativeLayerNodeImpl({
  ...fs.readJSONSync(resolve(__dirname, 'app-config.json')),
  appLaunchInfo: {
    path: 'pages/order/orderList/orderList',
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
      appid: 'wx42c1491feb6d12a1'
    },
  },
  env: {
    USER_DATA_PATH: '/Users/weiyanhai/.tick/program',
    OPEN_DATA_PATH: '/Users/weiyanhai/.tick/program',
    HAS_SPLASHSCREEN: false
  },
  ext: {},
  scrollBarMode: 0,
  screenWidth: 414.000000,
  screenHeight: 896.000000,
  preload: true,
  wxAppInfo: {
    maxRequestConcurrent: 10,
    maxUploadConcurrent: 10,
    maxDownloadConcurrent: 10,
    maxWorkerConcurrent: 1,
    maxWebsocketConnect: 2,
  },
  debug: 1,
  clientDebug: 1,
  envVersion: 'release',
  accountInfo: {
    "appId": "wxab7430e6e8b9a4ab",
    "nickname": "奈雪点单",
    "icon": "http://mmbiz.qpic.cn/mmbiz_png/6teukYZkxfiarzZVdKR1GpHQSlQKpuiaKyVbW9pG22NbRpzWqB2LuNTUwAmHGZjUncgYrc6SMbf1B7jYu1LPiavUA/640?wx_fmt=png&wxfrom=200"
  },
  system: 'mac',
  platform: 'mac',
  appType: 0,
  networkTimeout: {
    request: 60000,
    uploadFile: 60000,
    connectSocket: 60000,
    downloadFile: 60000,
  },
  extAppid: '',
  appContactInfo: {
    call_plugin_info: [],
    user_version: '4.1.27'
  },
  isIsolateContext: false,
  operationInfo: {
    jsonInfo: {
      bgKeepAlive: {
        music: 0
      },
      privacy: {
        banGetWifiListIfEmptyDesc: 1,
        banLocationIfEmptyDesc: 1
      },
      apiAvailable: {
        navigateToMiniProgramConfig: 0,
        gameSceneFromMyApp: 0,
        shareCustomImageUrl: 1,
        h5PayDisableForward: 0,
        share: 0,
        authorize: 0,
        navigateToMiniProgram: 1,
        getUserInfo: 0,
        screenCanvasReadPixelsFreely: 0,
        openSetting: 0
      },
      misc_ban_info: {
        minigame_freeze_status: 0
      },
      warning_info: {
        jsapi_alter: []
      },
      jumpWeAppFromLongPressCodeBanInfo: {
        banJumpApp: 0,
        banJumpGame: 0
      },
      op_info: {
        grow_protect: 1
      },
      navigate_ban_info: {
        navigate_ban_rule_list: [],
        do_report: 0
      }
    }
  }
});

miniProgram.import({
  wxss: resolve(__dirname, 'app-wxss.js'),
  service: resolve(__dirname, 'app-service.js')
}).launch()