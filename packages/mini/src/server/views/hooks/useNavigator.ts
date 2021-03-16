import URL from 'url-parse';
import qs from 'qs';
import { useMemo, useEffect } from 'react';

import AppRuntime from '../../@tickjs/AppRuntime'
import { usePackageLoader } from './usePackageLoader';

function getJSBridgeHandler (ref) {
  return {
    subscribeHandler (...args) {
      const WeixinJSBridge = ref.current ? 
        ref.current.contentWindow.WeixinJSBridge : null;
      
        if (WeixinJSBridge) {
        WeixinJSBridge.subscribeHandler(...args);
      }
    },
    invokeCallbackHandler (...args) {
      const WeixinJSBridge = ref.current ? 
        ref.current.contentWindow.WeixinJSBridge : null;
      if (WeixinJSBridge) {
        WeixinJSBridge.subscribeHandler(...args);
      }
    },
  }
}

export function useNavigator (runtime: AppRuntime, config: any) {
  const packageLoader = usePackageLoader(runtime, config);

  return useMemo(() => {
    class Navigator {
      public id: number | null = null;
      public navigation: any | null = null;
      public route: string | null = null;
      public bridge: any | null = null;
    
      constructor (id: number, { navigation, route, bridge }) {
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

      focus (nav: Navigator) {
        navigator.focus(nav);
      }

      distroy (nav: Navigator) {
        navigator.distroy(nav);
      }
    }

    class AppNavigator extends Map {
      public id: number = 0;
      public isLaunch: boolean = true;
      public current: Navigator | null = null;
      public subPages: object = config.subPages;

      init = (nav) => {
        return new Navigator(this.id++, nav);
      }

      has = (navigator: Navigator): boolean => {
        return super.has(navigator.id);
      }

      set = (navigator: Navigator) => {
        super.set(navigator.id, navigator);
        return this;
      }

      get = (navigator: Navigator | number) => {
        if (navigator instanceof Navigator) {
          return super.get(navigator.id);
        }

        return super.get(navigator);
      }

      delete = (navigator: Navigator) => {
        if (navigator instanceof Navigator) {
          return super.delete(navigator.id);
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

      create (nav: Navigator, { path, query }) {
        
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

    const navigator = new AppNavigator();

    runtime.on('navigateTo', (data: any, callbackId: number) => {
      const uri = new URL(data.url) as any;
      const query = qs.parse(uri.query.slice(1));

      navigator.push(uri, query);

      runtime.callback({
        callbackId,
        errMsg: `navigateTo:ok`,
        options: {}
      });
    });

    return navigator;
  }, [runtime]);
}

export function useInit ({ navigation, route, ref, __TYPE }) {
  const { navigator } = useContext(AppContext);

  return useMemo(() => {
    const nav = navigator.init({
      navigation,
      route,
      type: __TYPE || 'switchTab',
      bridge: getJSBridgeHandler(ref)
    })

    return nav
  }, [navigation]);
}

export function useCreate (nav) {
  useEffect(() => {
    nav.create();
  }, [nav])
}

export function useFocus (nav) {
  useEffect(() => {
    nav.focus();
  }, [nav])
}

export function useDistory (nav) {
  useEffect(() => {
    nav.distory();
  }, [nav])
}