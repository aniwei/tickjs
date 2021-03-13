export function getApplicationConfig (__TICK_RUNTIME) {
  const subPackages = getApplicationSubPackages(__TICK_RUNTIME);
  const subPages = getApplicationSubPages(subPackages);

  return {
    subPages,
    subPackages,
    pages: getApplicationPages(__TICK_RUNTIME, subPages),
    bottomTabBar: getApplicationBottomTabBar(__TICK_RUNTIME),
    launchOptions: getApplicationLaunchOptions(__TICK_RUNTIME)
  }
}

export function getApplicationSubPages (subPackages) {
  const subPages = new Object();

  for (const [name, pkg] of subPackages) {
    for (const route of pkg.pages) {
      subPages[route + '.html'] = pkg;
    }
  }

  return subPages;
}

export function getApplicationSubPackages ({ config }) {
  const { subPackages } = config;
  const packages = new Object();

  for (const pkg of subPackages) {
    packages[pkg.root] = pkg;
  }

  return packages;
}

export function getApplicationBottomTabBar ({ config }) {
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

export function getApplicationLaunchOptions ({ config }) {
  const { appLaunchInfo } = config;
  
  return {
    ...appLaunchInfo
  }
}

export function getApplicationPages ({ config }, subPages) {
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