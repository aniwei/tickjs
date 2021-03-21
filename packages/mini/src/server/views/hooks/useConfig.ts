import { useMemo } from 'react';
import { Config } from 'src/server/TickMini';

export type SubPackage = {
  root: string,
  pages: string[]
}

export type SubPages = Map<string, SubPackage>
export type Packages = Map<string, SubPackage>


export type TabBarItem = {
  label: string,
  path: string,
  icon: string,
  selectedIcon: string
}

export type TabBar = {
  activeTintColor: string,
  inactiveTintColor: string,
  inactiveBackgroundColor: string,
  activeBackgroundColor: string,
  tabItems: TabBarItem[]
}


export type AppConfig = {
  subPages: SubPages,
  subPackages: Packages,
  pages: any[],
  bottomTabBar: TabBar,
  launchOptions: any
}

export function getApplicationConfig (config: any) {
  const subPackages = mapSubPackagesForSubPackage(config);
  const subPages = mapSubPackagesForSubPage(subPackages);

  return {
    subPages,
    subPackages,
    pages: getApplicationPages(config, subPages),
    bottomTabBar: getApplicationTabBar(config),
    launchOptions: getApplicationLaunchOptions(config)
  }
}

export function mapSubPackagesForSubPackage (config: any) {
  const { subPackages } = config;
  const packages: Packages = new Map();

  if (subPackages) {
    for (const subPackage of subPackages) {
      const { root } = subPackage;
      packages.set(root, subPackage);
    }
  }

  return packages;
}

export function mapSubPackagesForSubPage (subPackages: Packages) {
  const subPages: SubPages = new Map();

  for (const [name, subPackage] of subPackages) {
    for (const route of subPackage.pages) {
      subPages.set(route + '.html', subPackage);
    }
  }

  return subPages;
}

export function getApplicationTabBar (config: any) : TabBar {
  const tabBar = config.tabBar;
  const list = tabBar.list;

  return {
    activeTintColor: tabBar.selectedColor || null,
    inactiveTintColor: tabBar.color || null,
    inactiveBackgroundColor: tabBar.backgroundColor || null,
    activeBackgroundColor: tabBar.backgroundColor || null,
    tabItems: list.map((tabItem: any) => {
      return {
        path: tabItem.pagePath,
        label: tabItem.text,
        icon: tabItem.iconData,
        selectedIcon: tabItem.selectedIconData
      }
    })
  }
}

export function getApplicationLaunchOptions (config: any) {
  const { appLaunchInfo } = config;
  
  return { ...appLaunchInfo }
}

export function getApplicationPages (config: any, subPages: SubPages) {
  const pages = config.pages || [];
  const pageConfig = getApplicationPageConfig(config);

  return pages.map((route: string) => {
    return {
      __MAIN_PACKAGE: !subPages.has(route),
      route: route + '.html',
      config: pageConfig.get(route + '.html')
    }
  });
}


export type PageConfig = Map<string, any>;

export function getApplicationPageConfig (config: any) {
  const global = config.global;
  const pages: string[] = config.pages;
  const page = config.page;

  const pageConfig: PageConfig = new Map();

  for (const r of pages) {
    const key = r + '.html';
    const cfg = page[key];

    pageConfig.set(key, {
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

  return pageConfig;
}


export function useConfig (config: any) {
  return useMemo(() => {
    return getApplicationConfig(config)
  }, [])
}