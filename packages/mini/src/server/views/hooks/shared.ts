import { 
  TickMiniAppConfig,
  SubPackage,
  Page
} from '../../tick.config'


export type SubPage = {
  [key: string]: SubPackage
}

export type Package = {
  [key: string]: SubPackage
}

export type PageConfig = {
  [key: string]: any
}

export type BottomTabBarItem = {
  route: string,
  path: string,
  label: string,
  icon: string,
  selectedIcon: string
}

export type BottomTabBar = {
  activeTintColor: string,
  inactiveTintColor: string,
  inactiveBackgroundColor: string,
  activeBackgroundColor: string,
  tabItems: BottomTabBarItem[]
}

export type AppConfig = TickMiniAppConfig & {
  subPackages: object[],
  pages: string[],
  page: object
}

export function getApplicationConfig (config: AppConfig) {
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

export function getApplicationSubPages (subPackages: any) {
  const subPages = new Object();

  for (const [name, pkg] of subPackages) {
    for (const route of pkg.pages) {
      (<SubPage>subPages)[route + '.html'] = pkg;
    }
  }

  return subPages;
}

export function getApplicationSubPackages (config: AppConfig) {
  const { subPackages } = config;
  const packages = new Object();

  for (const pkg of subPackages) {
    (<Package>packages)[pkg.root] = pkg;
  }

  return packages;
}

export function getApplicationBottomTabBar (config: AppConfig) : BottomTabBar {
  const { tabBar } = config;
  const { list } = tabBar;

  return {
    activeTintColor: tabBar.selectedColor,
    inactiveTintColor: tabBar.color,
    inactiveBackgroundColor: tabBar.backgroundColor,
    activeBackgroundColor: tabBar.backgroundColor,
    tabItems: list.map((tabItem: any) => {
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

export function getApplicationLaunchOptions (config: AppConfig) {
  const { appLaunchInfo } = config;
  
  return {
    ...appLaunchInfo
  }
}

export function getApplicationPages (config: AppConfig, subPages: any) {
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

export function getApplicationPageConfig (config: AppConfig) {
  const { global, page, pages } = config;
  const map = {};

  for (const route of pages) {
    const c: Page = page[`${route}.html`]

    (<PageConfig>pages)[route] = {
      ...global,
      ...c,
      window: {
        ...global.window,
        ...c.window,
        usingComponents: {
          ...c.usingComponents
        }
      }
    }
  }

  return map;
}