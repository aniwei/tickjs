import URL from 'url-parse';

export interface ITickJSBridge {
  invokeCallbackHandler (callbackId: number, options: any): void;
  subscribeHandler (name: string, data: any, options: number): void;
}

export type TickNavigatorConfig = {
  id: number | null,
  type: string | null,
  route: string | null,
  bridge: ITickJSBridge | null,
  navigation: any | null,
}

export interface ITickNavigator {
  id: number | null;
  route: string | null;
  bridge: ITickJSBridge | null;
  navigation: any | null;


  navigate(uri: URL, query: object): void;
  push (uri: URL, query: object): void;
  pop (delta: number): void;
  focus (): void;
  ready (): void;
  distroy (): void;
}

export interface ITickNavigatorManager {
  init (nav: TickNavigatorConfig): ITickNavigator;
  has (nav: ITickNavigator): boolean;
  get (nav: ITickNavigator | number): ITickNavigator | void;
  delete (nav: ITickNavigator): void;
  push (uri: URL, query: any): void
}


