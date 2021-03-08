export const device = {
  width: 375,
  pixelRatio: 2
}

export const port = 3000;

export const system = {
  networkType: 'wifi',
  safeArea: {
    bottom: 667,
    height: 667,
    top: 0,
    width: device.width,
    right: device.width,
    left: 0,
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
  windowWidth: device.width,
  model: 'MacBookPro16,1',
  screenWidth: device.width,
  fontSizeSetting: 16
}

export const config = {
  platform: 'mac',
  appType: 0,
  networkTimeout: {
    request: 60000,
    uploadFile: 60000,
    connectSocket: 60000,
    downloadFile: 60000,
  },
  extAppid: '',
  deprecated: false,
  env: {
    USER_DATA_PATH: '/Users/weiyanhai/.tick/program'
  },
  ext: {},
  wxAppInfo: {
    maxRequestConcurrent: 10,
    maxUploadConcurrent: 10,
    maxDownloadConcurrent: 10,
    maxWorkerConcurrent: 1,
    maxWebsocketConnect: 2,
  },
  debug: 0,
  entryPagePath: 'pages/index/index.html',
  envVersion: 'release',
}

export const REMOTE = 'remote';
export const LOCALE = 'locale';

export const types = {
  arrayBufferToBase64: LOCALE,
  base64ToArrayBuffer: LOCALE,
  canIUse: LOCALE,
  getSystemInfo: LOCALE,
  getStorage: LOCALE,
  getStorageSync: LOCALE,
  setStorage: LOCALE,
  setStorageSync: LOCALE,
  showLaoding: LOCALE,
  showModal: LOCALE,
  setNavigationBarTitleText: LOCALE,

  login: REMOTE,
}

export function getApplicationConfig (config) {
  const subPackages = getApplicationSubPackages(config);
  const subPages = getApplicationSubPages(subPackages);

  return {
    subPages,
    subPackages,
    pages: getApplicationPages(config, subPages),
    bottomTabBar: getApplicationBottomTabBar(config),
    launchOptions: getApplicationLaunchOptions(config)
  }
}

export function getApplicationSubPages (subPackages) {
  const subPages = new Map();

  for (const [name, pkg] of subPackages) {
    for (const route of pkg.pages) {
      subPages.set(route + '.html', pkg);
    }
  }

  return subPages;
}

export function getApplicationSubPackages (config) {
  const { subPackages } = config;
  const packages = new Map();

  for (const pkg of subPackages) {
    packages.set(pkg.root, pkg);
  }

  return packages;
}

export function getApplicationBottomTabBar (config) {
  const { tabBar } = config;
  const { list } = tabBar;

  return {
    activeTintColor: tabBar.selectedColor,
    inactiveTintColor: tabBar.color,
    inactiveBackgroundColor: tabBar.backgroundColor,
    activeBackgroundColor: tabBar.backgroundColor,
    tabItems: list.map(tabItem => {
      return {
        route: tabItem.pagePath,
        label: tabItem.text,
        path: tabItem.pagePath,
        icon: tabItem.iconData,
        selectedIcon: tabItem.selectedIconData
      }
    })
  }
}

export function getApplicationLaunchOptions (config) {
  const { appLaunchInfo } = config;
  
  return {
    ...appLaunchInfo
  }
}

export function getApplicationPages (config, subPages) {
  const { pages } = config;
  const pageConfig = getApplicationPageConfig(config);

  return pages.map(route => {
    return {
      __MAIN_PACKAGE: !subPages.has(route),
      route: route + '.html',
      config: pageConfig[route]
    }
  });
}

export function getApplicationPageConfig (config) {
  const { global, page, pages } = config;
  const pageConfig = {};

  for (const route of pages) {
    const config = page[`${route}.html`]
    pageConfig[route] = {
      __IS_SUB_PACKAGE: false,
      ...global,
      ...config,
      window: {
        ...global.window,
        ...config.window,
        usingComponents: {
          ...config.usingComponents
        }
      }
    }
  }

  return pageConfig;
}