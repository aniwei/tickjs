import App, { defineUserConfig } from '../src/server';

const config = defineUserConfig({
  mini: {
    config: {
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
    }
  }
})

App(config);
