
export type TickAppSubPackage = {
  root: string,
  pages: string[]
}

export type TickAppGlobal = {
  [key: string]: {
    window: any
  }
}

export type TickAppPage = {
  [key: string]: any
}

export type TickAppPermission = {
  [key: string]: any
}

export type TickAppTabBarItem = {
  text: string,
  pagePath: string,
  iconData: string,
  selectedIconData: string,
}

export type TickAppTabBar = {
  color?: string,
  selectedColor?: string,
  backgroundColor?: string,
  borderStyle?: string,
  list: TickAppTabBarItem[] | null
}

export type TickAppConfig = {
  accountInfo: any,
  appLaunchInfo: any,
  pages?: string[] | null,
  page?: TickAppPage | null,
  subPackages?: TickAppSubPackage[] | null,
  entryPagePath?: string | null,
  permission?: TickAppPermission | null,
  global?: TickAppGlobal | null,
  tabBar?: TickAppTabBar | null
}

export type TickAppProjFiles = {
  service: string
  config: string,
  frame: string,
  wxss: string
}

export type TickMiniConfig = {
  root: string | null,
  cache: boolean | null,
  files: TickAppProjFiles | null,
  config: TickAppConfig
}

export type TickNetworkTimeoutConfig = {
  request: number,
  uploadFile: number,
  connectSocket: number,
  downloadFile: number,
}

export type TickSystemSafeArea = {
  width: number,
  height: number,
  top: number,
  bottom: number,
  left: number,
  right: number,
}

export type TickSystemConfig = {
  networkType: string,
  safeArea: TickSystemSafeArea,
  system: string,
  version: string,
  brand: string,
  pixelRatio: number,
  platform: string,
  language: string,
  power: number,
  model: string,
  statusBarHeight: number,
  fontSizeSetting: number,
  deviceOrientation: string,
  screenHeight: number,
  screenWidth: number,
  windowWidth: number,
  windowHeight: number,
}

export type TickWXInfo = {
  maxRequestConcurrent: number,
  maxUploadConcurrent: number,
  maxDownloadConcurrent: number,
  maxWorkerConcurrent: number,
  maxWebsocketConnect: number,
}

export type TickEnvConfig = {
  USER_DATA_PATH: string
}

export type TickConfig = {
  port: number,
  appType: number,
  networkTimeout: TickNetworkTimeoutConfig,
  extAppid: string,
  deprecated: boolean,
  env: TickEnvConfig,
  wxAppInfo: TickWXInfo,
  debug: boolean,
  envVersion: string
  system: TickSystemConfig,
  mini: TickMiniConfig,
  platform: string,
  plugins: any[],
  alias: {
    [key: string]: string
  }
}

export type TickUserMiniConfig = {
  root?: string | null,
  cache?: boolean | null,
  files?: TickAppProjFiles | null,
  config: TickAppConfig
}

export type TickUserConfig = {
  networkTimeout?: TickNetworkTimeoutConfig,
  extAppid?: string,
  debug?: boolean,
  envVersion?: string,
  system?: TickSystemConfig,
  mini: TickUserMiniConfig,
}