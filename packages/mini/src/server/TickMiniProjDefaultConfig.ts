export class TickMiniProjDefaultConfigError extends Error {
  type = 'ConfigError'
}

const TickMiniDefaultSystemConfig = {
  networkType: 'wifi',
  system: 'macOS 10.15.7',
  version: '7.0.8',
  brand: 'MacBookPro16,1',
  windowHeight: 667,
  pixelRatio: 2,
  platform: 'mac',
  screenHeight: 603,
  language: 'zh_CN',
  power: 100,
  statusBarHeight: 22,
  deviceOrientation: 'portrait',
  windowWidth: 375,
  model: 'MacBookPro16,1',
  screenWidth: 375,
  fontSizeSetting: 16,
  safeArea: {
    width: 375,
    height: 667,
    top: 0,
    left: 0,
    bottom: 667,
    right: 375,
  }
}

export const TickMiniProjDefaultConfig = {
  appType: 0,
  extAppid: '',
  deprecated: false,
  debug: false,
  envVersion: 'release',
  wxAppInfo: {
    maxRequestConcurrent: 10,
    maxUploadConcurrent: 10,
    maxDownloadConcurrent: 10,
    maxWorkerConcurrent: 1,
    maxWebsocketConnect: 2,
  },
  env: {
    USER_DATA_PATH: '/'
  },
  networkTimeout: {
    request: 6000,
    uploadFile: 6000,
    connectSocket: 6000,
    downloadFile: 6000,
  },
  get platform () {
    return TickMiniDefaultSystemConfig.platform;
  },

  set platform (platform) {
    TickMiniDefaultSystemConfig.platform = platform;
  }
}