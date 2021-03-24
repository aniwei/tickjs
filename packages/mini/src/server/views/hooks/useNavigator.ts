import URL from 'url-parse';
import { 
  useMemo, 
  useEffect, 
  useContext 
} from 'react';

import AppRuntime from '/@tickjs/AppRuntime';

import { AppContext } from '../component/TickApp/AppContext';
import { TickJSBridgeOwner } from '../../TickJSBridgeOwner';
import { AppConfig } from './useConfig';

export type InitOptions = {
  navigation: any,
  ref?: any,
  route: any,
  type: any,
  bridge?: TickJSBridgeOwner
}

export class Navigator {
  public id: number | null = null;
  public navigation: any | null = null;
  public route: string | null = null;
  public bridge: any | null = null;
  public manager: NavigatorManager | null = null;

  constructor (id: number, manager: NavigatorManager, config: InitOptions) {
    const { navigation, route, bridge } = config;
    this.id = id;
    this.navigation = navigation;
    this.route = route;
    this.bridge = bridge;
    this.manager = manager;
  }

  push (uri: URL): void {
    const pathname = uri.pathname[0] === '/' ? 
      uri.pathname.slice(1) : uri.pathname;
  }

  navigate (uri: URL, query: object) {
    const pathname = uri.pathname[0] === '/' ? 
      uri.pathname.slice(1) : uri.pathname;
  }

  pop (delta: number = 1) {
    this.navigation.pop(delta);
  }

  focus () {
    this.manager?.focus(this);
  }

  ready () {
    this.manager?.ready(this);
  }

  distroy () {
    this.manager?.distroy(this);
  }
}

export class NavigatorManager extends Map {
  public id: number = 1;
  public isLaunch: boolean = true;
  public runtime: AppRuntime | null = null;
  public config: any | null = null;
  public current: Navigator | null = null;
  public subPages: any[] = [];

  constructor (runtime: AppendMode, config: any) {
    super();

    this.runtime = runtime;
    this.config = config;
  }

  init = (initOptions: InitOptions): Navigator => {
    return new Navigator(this.id++, this, initOptions);
  }

  has = (nav: Navigator): boolean => {
    return super.has(nav.id as number);
  }

  set = (nav: Navigator) => {
    super.set(nav.id, nav);
    return this;
  }

  get = (nav: Navigator | number) => {
    if (nav instanceof Navigator) {
      return super.get((nav as Navigator).id);
    }

    return super.get(navigator);
  }

  delete = (nav: Navigator) => {
    if (nav instanceof Navigator) {
      return super.delete(nav.id);
    }

    return super.delete(navigator);
  }

  ready (nav: Navigator) {
    
  }

  focus (nav: Navigator) {
    this.current = nav;
  }

  distroy (nav: Navigator) {
    this.delete(nav);
  }
}

export function useNavigator (runtime: AppRuntime, config: AppConfig) {
  return useMemo(() => {
    const manager = new NavigatorManager(runtime, config);

    return manager;
  }, [runtime]);
}

export function useInit (initOptions: InitOptions) {
  const { navigation, route, ref, type } = initOptions;
  const context = useContext(AppContext);

  const manager = context.manager as any;

  return useMemo(() => {
    context;
    const nav = manager.init({
      navigation,
      route,
      type: type || 'switchTab',
      bridge: new TickJSBridgeOwner(ref)
    })

    return nav
  }, [navigation]);
}

export function useReady (nav: Navigator) {
  useEffect(() => {
    nav.ready();
  }, [nav])
}

export function useFocus (nav: Navigator) {
  useEffect(() => {
    nav.focus();
  }, [nav])
}

export function useDistroy (nav: Navigator) {
  useEffect(() => {
    nav.distroy();
  }, [nav])
}