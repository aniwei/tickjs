declare type TickViewSubPackage = {
  root: string,
  pages: string[]
}

declare type TickViewPageConfig = {
  [key: string]: any
}

declare type TickViewPagePackage = {
  [key: string]: TickViewSubPackage
}

declare type TickViewPackage = {
  [key: string]: TickViewSubPackage
}

declare type TickAppSubPagePackage = {
  [key: string]: TickViewSubPackage
}

declare type TickViewTabBarItem = {
  path: string,
  label: string,
  icon: string,
  selectedIcon: string
}

declare type TickViewTabBar = {
  activeTintColor: string | null,
  inactiveTintColor: string | null,
  inactiveBackgroundColor: string | null,
  activeBackgroundColor: string | null,
  tabItems: TickViewTabBarItem[]
}


declare type TickAppContext = {
  navigator: INavigatorManager | null,
  runtime: IAppRuntime | null,
  config: TickAppConfig | null
}