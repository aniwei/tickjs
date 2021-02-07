import debug from 'debug';

export function getWXConfig() {
  return {
    "pages": ["pages/index/index", "pages/logs/logs"], 
    "resizable": false, 
    "debug": true, 
    "widgets": [], 
    "customClose": false, 
    "workers": "", 
    "cloud": false, 
    "global": { 
      "window": { 
        "backgroundColor": 
        "#ffffff", 
        "backgroundTextStyle": "light", 
        "navigationBarBackgroundColor": "#fff", 
        "navigationBarTitleText": "Weixin", 
        "navigationBarTextStyle": "black" 
      } 
    }, 
    "page": { 
      "pages/index/index.html": { "window": { "usingComponents": {} } }, 
      "pages/logs/logs.html": { "window": { "navigationBarTitleText": "查看启动日志", "usingComponents": {} } } 
    }, 
    "networkTimeout": { 
      "request": 60000, "uploadFile": 60000, "connectSocket": 60000, "downloadFile": 60000 
    }, 
    "ext": {}, 
    "extAppid": "", 
    "mainPlugins": {}, 
    "style": "v2", 
    "useExtendedLib": {}, 
    "__warning__": "", 
    "entryPagePath": "pages/index/index.html", 
    "tabBar": { "list": [] }, 
    "appType": 0, 
    "urlCheck": true, 
    "wxAppInfo": { "maxRequestConcurrent": 10, "maxUploadConcurrent": 10, "maxDownloadConcurrent": 10, "maxWorkerConcurrent": 1 }, 
    "accountInfo": { "appId": "wx3ce645f632f26623", "nickname": "yandiv的接口测试号", "icon": "https://mmbiz.qpic.cn/mmbiz_png/icTdbqWNOwNQ0ia79enzYJBsZ3CIkLQGe39qeOxbpT9oM9KaCthzBa0PF75xzBGjZQGlM69TDggxpNX7ACibCjjtw/0?wx_fmt=png" }, 
    "platform": "mac", 
    "appLaunchInfo": { "scene": 1001, "path": "pages/index/index", "query": {} }, 
    "env": { "USER_DATA_PATH": "http://usr" }, 
    "envVersion": "develop", 
    "brand": "devtools", 
    "model": "iPhone 5", 
    "pixelRatio": 2, 
    "version": "7.0.4", 
    "language": "zh", 
    "screenWidth": 320, 
    "screenHeight": 568
  }
}