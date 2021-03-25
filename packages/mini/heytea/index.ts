import App, { defineUserConfig } from '../src/server';


const config = defineUserConfig({
  proj: {
    accountInfo: {
      appId: 'wxab7430e6e8b9a4ab',
      icon: 'http://mmbiz.qpic.cn/mmbiz_png/6teukYZkxfiarzZVdKR1GpHQSlQKpuiaKyVbW9pG22NbRpzWqB2LuNTUwAmHGZjUncgYrc6SMbf1B7jYu1LPiavUA/640?wx_fmt=png&wxfrom=200',
      nickname: '亚朵ATOUR'
    },
    appLaunchInfo: {
      path: 'pages/my/index',
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
  }
})

App(config);