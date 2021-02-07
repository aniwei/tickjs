import debug from 'debug';

export function getWX () {
  return {
    env: {
      USER_DATA_PATH: '',
      OPEN_DATA_PATH: '',
      platform: 'mac',

    },
    appLaunchInfo: {
      path: "pages/mall_fusion/index", 
      query: {
        suid: "ec588dcf-ca17-4c29-b51a-9a06c6e69f6d"
      }, 
      scene: 1074, 
      shareTicket: undefined, 
      referrerInfo: {
        appId: "wx696a42df4f2456d3", 
        extraData: undefined
      }
    },
    version: {
      "updateTime": "2020.9.28 21:50:51",
      "version": "2.13.2",
      "features": {
        "pruneWxConfigByPage": true,
        "injectGameContextPlugin": true,
        "lazyCodeLoading2": true,
        "injectAppSeparatedPlugin": true,
        "nativeTrans": true
      }
    }
  }
}