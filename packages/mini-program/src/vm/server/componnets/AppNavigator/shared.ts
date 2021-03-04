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
        label: tabItem.text,
        path: tabItem.pagePath,
        icon: tabItem.iconData,
        selectedIcon: tabItem.selectedIconData
      }
    })
  }
}

export function getApplicationPages (config) {
  const { pages } = config;

  return pages;
}