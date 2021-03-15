import URL from 'url-parse';
import qs from 'qs';
import { useMemo } from 'react';

import AppRuntime from '../@tickjs/AppRuntime'
import { usePackageLoader } from './usePackageLoader';

export function useNavigator (runtime: AppRuntime, config: any) {
  const packageLoader = usePackageLoader(runtime, config);

  return useMemo(() => {
    class Navigator {
      public id: number | null = null;
      public navigation: any | null = null;
    
      constructor (id: number, navigation: any) {
        this.id = id;
        this.navigation = navigation;
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
    }

    class AppNavigator extends Map {
      public id: number = 0;
      public isLaunch: boolean = true;
      public current: Navigator | null = null;
      public subPages: object = config.subPages;

      create = (navigation: any) => {
        return new Navigator(this.id++, navigation);
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

      navigate (uri: URL, query: object) {
        const nav = this.current;

        if (nav) {
          nav.navigate(uri, query);
        }
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