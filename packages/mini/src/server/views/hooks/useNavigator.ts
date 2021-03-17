import URL from 'url-parse';
import { 
  useMemo, 
  useEffect, 
  useContext 
} from 'react';

import AppRuntime from '@tickjs/AppRuntime';

import { usePackageLoader } from './usePackageLoader';

import { 
  ITickNavigator, 
  TickNavigatorConfig,
  ITickNavigatorManager,
} from '../../../types';
import { AppContext } from '../component/TickApp/AppContext'
import { TickJSBridge } from '../../TickJSBridge';
import URLParse from 'url-parse';

export function useNavigator (runtime: AppRuntime, config: any) {
  return useMemo(() => {
    class TickNavigator implements ITickNavigator {
      public id: number | null = null;
      public navigation: any | null = null;
      public route: string | null = null;
      public bridge: any | null = null;
    
      constructor (config: TickNavigatorConfig) {
        const { id, navigation, route, bridge } = config;
        this.id = id;
        this.navigation = navigation;
        this.route = route;
        this.bridge = bridge;
      }
    
      push (uri: URL, query: object) {
        const pathname = uri.pathname[0] === '/' ? 
          uri.pathname.slice(1) : uri.pathname;

        packageLoader(pathname).then(() => {
          this.navigation.push(pathname, query);
        })
      }

      navigate (uri: URL, query: object) {
        const pathname = uri.pathname[0] === '/' ? 
          uri.pathname.slice(1) : uri.pathname;

        packageLoader(pathname).then(() => {
          this.navigation.navigate(pathname, query);
        })
      }

      pop (delta: number = 1) {
        this.navigation.pop(delta);
      }

      focus () {
        navigator.focus(this);
      }

      ready () {
        navigator.ready(this);
      }

      distroy () {
        navigator.distroy(this);
      }
    }

    class TickNavigatorManager extends Map implements ITickNavigatorManager {
      public id: number = 0;
      public isLaunch: boolean = true;
      public current: Navigator | null = null;
      public subPages: object = config.subPages;

      init = (nav) => {
        return new Navigator(this.id++, nav);
      }

      has = (nav: Navigator): boolean => {
        return super.has(nav.id);
      }

      set = (nav: Navigator) => {
        super.set(nav.id, nav);
        return this;
      }

      get = (nav: Navigator | number) => {
        if (nav instanceof Navigator) {
          return super.get(nav.id);
        }

        return super.get(navigator);
      }

      delete = (nav: Navigator) => {
        if (nav instanceof Navigator) {
          return super.delete(nav.id);
        }

        return super.delete(navigator);
      }

      push = (uri: URL, query: object) => {
        const nav = this.current;
        if (nav) {
          nav.push(uri, query);
        }
      }

      pop = (delta: number) => {
        const nav = this.current;
        if (nav) {
          nav.pop(delta);
        }
      }

      ready (nav: Navigator) {
        
      }

      navigate (uri: URL, query: object) {
        const nav = this.current;

        if (nav) {
          nav.navigate(uri, query);
        }
      }

      focus (nav: Navigator) {
        this.current = nav;
      }

      distroy (nav: Navigator) {
        this.delete(nav);
      }
    }

    const navigatorManager = new TickNavigatorManager();

    runtime.on('navigateTo', (data: any, callbackId: number) => {
      const uri = new URLParse(data.url) as any; 
      const query = URLParse.qs.parse(uri.query.slice(1));

      navigatorManager.push(uri, query);

      runtime.callback({
        callbackId,
        errMsg: `navigateTo:ok`,
        options: {}
      });
    });

    return navigatorManager;
  }, [runtime]);
}

export function useInit ({ navigation, route, ref, __TYPE }) {
  const { navigator } = useContext(AppContext);

  return useMemo(() => {
    const nav = navigator.init({
      navigation,
      route,
      type: __TYPE || 'switchTab',
      bridge: new TickJSBridge(ref)
    })

    return nav
  }, [navigation]);
}

export function useReady (nav: ITickNavigator) {
  useEffect(() => {
    nav.ready();
  }, [nav])
}

export function useFocus (nav: ITickNavigator) {
  useEffect(() => {
    nav.focus();
  }, [nav])
}

export function useDistroy (nav: ITickNavigator) {
  useEffect(() => {
    nav.distroy();
  }, [nav])
}