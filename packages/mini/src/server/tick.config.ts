

export type SubPackage = {
  root: string,
  pages: string[]
}

export type Page = {
  [key: string]: any
}

export type TickMiniAppConfig = {
  accountInfo: any,
  appLaunchInfo: any,
  pages?: string[],
  page?: Page,
  subPackages?: SubPackage[],
  entryPagePath?: string,
  permission?: any,
  global?: any,
  tabBar: {
    color?: string,
    selectedColor?: string,
    backgroundColor?: string,
    borderStyle?: string,
    list?: any[]
  }
}

export type TickMiniConfig = {
  root?: string,
  files?: any,
  config: TickMiniAppConfig
}

export type TickSystemConfig = {
  networkType: string,
  safeArea: {
    width: number,
    height: number,
    top: number,
    bottom: number,
    left: number,
    right: number,
  },
  system: string,
  version: string,
  brand: string,
  pixelRatio: number,
  platform: string,
  language: string,
  power: number,
  model: string,
  fontSizeSetting: number,
  deviceOrientation: string,
  screenHeight: number,
  screenWidth: number,
  windowWidth: number,
  windowHeight: number,
}

export type TickConfig = {
  port: number,
  appType: number,
  networkTimeout: {
    request: number,
    uploadFile: number,
    connectSocket: number,
    downloadFile: number,
  },
  extAppid: string,
  deprecated: boolean,
  env: {
    USER_DATA_PATH: string
  },
  wxAppInfo: {
    maxRequestConcurrent: number,
    maxUploadConcurrent: number,
    maxDownloadConcurrent: number,
    maxWorkerConcurrent: number,
    maxWebsocketConnect: number,
  },
  debug: boolean,
  envVersion: string
  system: TickSystemConfig,
  mini: TickMiniConfig,
  platform: string
}

export type TickUserConfig = {
  networkTimeout?: {
    request?: number,
    uploadFile?: number,
    connectSocket?: number,
    downloadFile?: number,
  },
  extAppid?: string,
  debug?: boolean,
  envVersion?: string,
  system?: TickSystemConfig,
  mini: TickMiniConfig,
}

const defaultMini = {
  root: process.cwd(),
  files: {
    config: 'app-config.json',
    frame: 'app-frame.js',
    service: 'appservice.js',
    wxss: 'appwxss.js',
  },
  config: {
    accountInfo: null,
    appLaunchInfo: null,
    tabBar: {}
  }
}

const defaultSystem = {
  networkType: 'wifi',
  safeArea: {
    width: 375,
    height: 667,
    top: 0,
    left: 0,
    bottom: 667,
    right: 375,
  },
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
  fontSizeSetting: 16
}

const defaultNetworkConfig = {
  request: 6000,
  uploadFile: 6000,
  connectSocket: 6000,
  downloadFile: 6000,
}

export const defaultConfig: TickConfig = {
  port: 3000,
  appType: 0,
  extAppid: '',
  deprecated: false,

  env: {
    USER_DATA_PATH: '/Users/weiyanhai/.tick/mini'
  },

  wxAppInfo: {
    maxRequestConcurrent: 10,
    maxUploadConcurrent: 10,
    maxDownloadConcurrent: 10,
    maxWorkerConcurrent: 1,
    maxWebsocketConnect: 2,
  },

  debug: false,
  envVersion: 'release',

  get mini () {
    return defaultMini;
  },

  get networkTimeout () {
    return defaultNetworkConfig
  },

  get system () {
    return defaultSystem;
  },

  get platform () {
    return defaultSystem.platform
  }
}

function setConfig (target: any, source: any) {
  const t = typeof target;
  
  if (t === 'object') {
    for (const key in target) {
      if (key in source) {
        target[key] = source[key];
      }
    }
  }
}

export function defineUserConfig (config: TickUserConfig): TickConfig {
  for (const key in config) {
    if (config.hasOwnProperty(key)) {
      switch (key) {
        case 'networkTimeout': {
          setConfig(defaultNetworkConfig, config.networkTimeout);
          break;
        }

        case 'system': {
          setConfig(defaultSystem, config.system)
          break;
        }

        case 'mini': {
          setConfig(defaultMini, config.mini);
          break;
        }
      }
    }
  }

  return defaultConfig;
}