let navigationControllerId = 1;

export function getNavigationControllerId () {
  return navigationControllerId++;
}

export function getBottomTarBar (config) {
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

export function getApplicationPages (config) {
  const { pages } = config;
  const pageConfig = getApplicationPageConfig(config);

  return pages.map(route => {
    return {
      route: route + '.html',
      config: pageConfig[route]
    }
  })
}

export function getApplicationPageConfig (config) {
  const { global, page, pages } = config;
  const pageConfig = {};

  for (const route of pages) {
    const config = page[`${route}.html`]
    pageConfig[route] = {
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