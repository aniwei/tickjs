import { 
  TickAppGlobal, 
  TickAppPage, 
  TickAppTabBar, 
  TickViewTabBar,
  TickAppTabBarItem, 
  TickViewSubPackage,
  TickAppConfig
} from '../../../types';

export function getApplicationConfig (config: TickAppConfig) {
  const subPackages = mapSubPackages(config);
  const subPages = mapSubPackagesToSubPage(subPackages);

  return {
    subPages,
    subPackages,
    pages: getApplicationPages(config, subPages),
    bottomTabBar: getApplicationTabBar(config),
    launchOptions: getApplicationLaunchOptions(config)
  }
}

export function mapSubPackages (config: TickAppConfig) {
  const { subPackages } = config;
  const packages: Map<string, TickViewSubPackage> = new Map();

  if (subPackages) {
    for (const subPackage of subPackages) {
      const { root } = subPackage;
      packages.set(root, subPackage);
    }
  }

  return packages;
}

export function mapSubPackagesToSubPage (subPackages: Map<string, TickViewSubPackage>) {
  const subPages: Map<string, TickViewSubPackage> = new Map();

  for (const [name, subPackage] of subPackages) {
    for (const route of subPackage.pages) {
      subPages.set(route + '.html', subPackage);
    }
  }

  return subPages;
}

export function getApplicationTabBar (config: TickAppConfig) : TickViewTabBar {
  const tabBar = config.tabBar as TickAppTabBar;
  const list: TickAppTabBarItem[] = tabBar.list || [];

  return {
    activeTintColor: tabBar.selectedColor || null,
    inactiveTintColor: tabBar.color || null,
    inactiveBackgroundColor: tabBar.backgroundColor || null,
    activeBackgroundColor: tabBar.backgroundColor || null,
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

export function getApplicationLaunchOptions (config: TickAppConfig) {
  const { appLaunchInfo } = config;
  
  return { ...appLaunchInfo }
}

export function getApplicationPages (config: TickAppConfig, subPages: Map<string, TickViewSubPackage>) {
  const pages = config.pages || [];
  const pageConfig = getApplicationPageConfig(config);

  return pages.map(route => {
    return {
      __MAIN_PACKAGE: !subPages.has(route),
      route: route + '.html',
      config: pageConfig.get(route)
    }
  });
}

export function getApplicationPageConfig (config: TickAppConfig) {
  const global: TickAppGlobal = config.global || {};
  const pages: string[] = config.pages || [];
  const page: TickAppPage = config.page || {};

  const configMap: Map<string, TickAppPage> = new Map();

  for (const r of pages) {
    const key = r + '.html';
    const cfg = page[key] as TickAppPage;

    configMap.set(key, {
      ...global,
      ...cfg,
      window: {
        ...global.window,
        ...cfg.window,
        usingComponents: {
          ...cfg.usingComponents
        }
      }
    })
  }

  return configMap;
}