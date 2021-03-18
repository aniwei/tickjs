declare type TickAppSubPackage = {
  root: string,
  pages: string[]
}

declare type TickAppGlobal = {
  [key: string]: {
    window: any
  }
}

declare type TickAppPage = {
  [key: string]: any
}

declare type TickAppPermission = {
  [key: string]: any
}

declare type TickAppTabBarItem = {
  text: string,
  pagePath: string,
  iconData: string,
  selectedIconData: string,
}

declare type TickAppTabBar = {
  color?: string,
  selectedColor?: string,
  backgroundColor?: string,
  borderStyle?: string,
  list: TickAppTabBarItem[] | null
}

declare type TickAppConfig = {
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

declare type TickAppProjFiles = {
  service: string
  config: string,
  frame: string,
  wxss: string
}

declare type TickMiniConfig = {
  root: string | null,
  cache: boolean | null,
  files: TickAppProjFiles | null,
  config: TickAppConfig
}

declare type TickNetworkTimeoutConfig = {
  request: number,
  uploadFile: number,
  connectSocket: number,
  downloadFile: number,
}

declare type TickSystemSafeArea = {
  width: number,
  height: number,
  top: number,
  bottom: number,
  left: number,
  right: number,
}

declare type TickSystemConfig = {
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

declare type TickWXInfo = {
  maxRequestConcurrent: number,
  maxUploadConcurrent: number,
  maxDownloadConcurrent: number,
  maxWorkerConcurrent: number,
  maxWebsocketConnect: number,
}

declare type TickEnvConfig = {
  USER_DATA_PATH: string
}

declare type TickConfig = {
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

declare type TickUserMiniConfig = {
  root?: string | null,
  cache?: boolean | null,
  files?: TickAppProjFiles | null,
  config: TickAppConfig
}

declare type TickUserConfig = {
  networkTimeout?: TickNetworkTimeoutConfig,
  extAppid?: string,
  debug?: boolean,
  envVersion?: string,
  system?: TickSystemConfig,
  mini: TickUserMiniConfig,
}
