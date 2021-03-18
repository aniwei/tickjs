declare type NavigatorConfig = {
  id: number | null,
  type: string | null,
  route: string | null,
  bridge: WeixinJSBridge | null,
  navigation: any | null,
}

declare interface INavigator {
  id: number | null;
  route: string | null;
  bridge: WeixinJSBridge | null;
  navigation: any | null;


  navigate(uri: URL): void;
  push (uri: URL): void;
  distroy (): void;
  pop (delta: number): void;
  focus (): void;
  ready (): void;
}

interface INavigatorManager {
  init (nav: NavigatorConfig): Navigator;
  has (nav: Navigator): boolean;
  get (nav: Navigator | number): Navigator | void;
  delete (nav: Navigator): void;
}


