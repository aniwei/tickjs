import { 
  TickNetworkTimeoutConfig, 
  TickSystemConfig, 
  TickSystemSafeArea, 
  TickUserConfig,
  TickMiniConfig,
  TickWXInfo,
  TickConfig,
  TickAppConfig,
  TickAppProjFiles,
} from '../types';

export const defaultNetworkConfig: TickNetworkTimeoutConfig = {
  request: 6000,
  uploadFile: 6000,
  connectSocket: 6000,
  downloadFile: 6000,
}

export const defaultWXInfo: TickWXInfo = {
  maxRequestConcurrent: 10,
  maxUploadConcurrent: 10,
  maxDownloadConcurrent: 10,
  maxWorkerConcurrent: 1,
  maxWebsocketConnect: 2,
}

export const defaultSafeArea: TickSystemSafeArea = {
  width: 375,
  height: 667,
  top: 0,
  left: 0,
  bottom: 667,
  right: 375,
}

export const defaultSystem: TickSystemConfig = {
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

  get safeArea () {
    return defaultSafeArea
  }
}

export const defaultEnv = {
  USER_DATA_PATH: '/Users/weiyanhai/.tick/mini'
}

export const defaultMini = {
  root: process.cwd(),
  cache: false,
  files: {
    config: 'app-config.json',
    frame: 'app-frame.js',
    service: 'appservice.js',
    wxss: 'appwxss.js',
  },
  config: {
    accountInfo: null,
    appLaunchInfo: null,
    entryPagePath: null,
    subPackages: null,
    permission: null,
    pages: null,
    page: null,
    tabBar: null,
  }
}

export const defaultConfig: TickConfig = {
  port: 3000,
  appType: 0,
  extAppid: '',
  deprecated: false,
  debug: false,
  envVersion: 'release',

  get wxAppInfo () {
    return defaultWXInfo
  },

  get env () {
    return defaultEnv
  },

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

type DefineTarget = (
  TickConfig & 
  TickSystemConfig &
  TickMiniConfig &
  TickNetworkTimeoutConfig &
  TickAppConfig &
  TickAppProjFiles
);

type DefineSource = (
  TickUserConfig | 
  TickSystemConfig |
  TickMiniConfig | 
  TickNetworkTimeoutConfig |
  TickAppConfig |
  TickAppProjFiles
);

enum DefineTypes {
  REF = 'ref',
  PRIMITIVE = 'primitive',
}

function configType (object: any) {
  if (Array.isArray(object) || typeof object === 'object') {
    return DefineTypes.REF;
  }

  return DefineTypes.PRIMITIVE;
}

export function defineConfig (
  target: any,
  source: DefineSource,
): DefineTarget {
  const keys: string[] = Object.keys(source);

  for (const key of keys) {
    const src = (<any>source)[key];
    const tar = (<any>target)[key];

    if (configType(src) === DefineTypes.REF) {
      if (tar === null) {
        (<any>target)[key] = Array.isArray(src) ? [] : {};
      }

      defineConfig((<any>target)[key], src);
    } else if (configType(src) === DefineTypes.PRIMITIVE) {
      (<any>target)[key] = src;
    }    
  }

  return target;
}


export function defineUserConfig (
  source: DefineSource
): TickConfig {
  defineConfig(defaultConfig, source);

  return defaultConfig;
}


export class TickMiniConfigError extends Error {}

export function isMiniConfigIllegal (mini: TickMiniConfig) {
  if (
    mini.config.accountInfo === undefined ||
    mini.config.accountInfo === null
  ) {
    throw new TickMiniConfigError(`Missing account information`);
  } else if (
    mini.config.appLaunchInfo === undefined ||
    mini.config.appLaunchInfo === null
  ) {
    throw new TickMiniConfigError(`Missing app luanch information`);
  } else if (
    mini.config.entryPagePath === undefined ||
    mini.config.entryPagePath === null ||
    mini.config.entryPagePath === ''
  ) {
    throw new TickMiniConfigError(`Missing entry page path`);
  }
}
