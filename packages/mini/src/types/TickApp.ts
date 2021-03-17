import AppRuntime from "../server/@tickjs/AppRuntime"
import { TickAppConfig } from "./TickConfig"
import { ITickNavigatorManager, TickNavigatorConfig } from "./TickNavigator"

export type TickViewSubPackage = {
  root: string,
  pages: string[]
}

export type TickViewPageConfig = {
  [key: string]: any
}

export type TickViewPagePackage = {
  [key: string]: TickViewSubPackage
}

export type TickViewPackage = {
  [key: string]: TickViewSubPackage
}

export type TickAppSubPagePackage = {
  [key: string]: TickViewSubPackage
}

export type TickViewTabBarItem = {
  path: string,
  label: string,
  icon: string,
  selectedIcon: string
}

export type TickViewTabBar = {
  activeTintColor: string | null,
  inactiveTintColor: string | null,
  inactiveBackgroundColor: string | null,
  activeBackgroundColor: string | null,
  tabItems: TickViewTabBarItem[]
}


export type TickAppContext = {
  navigator: ITickNavigatorManager | null,
  runtime: AppRuntime | null,
  config: TickAppConfig | null
}