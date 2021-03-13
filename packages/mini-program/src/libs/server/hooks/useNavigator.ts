import URL from 'url-parse';
import qs from 'qs';
import { useMemo } from 'react';
import { usePackageLoader } from './usePackageLoader'

export function useNavigator (appruntime, appconfig) {
  const packageLoader = usePackageLoader(appruntime, appconfig);

  return useMemo(() => {
    class Navigator {
      public id: number | null = null;
      public navigation: any | null = null;
    
      constructor (id, navigation) {
        this.id = id;
        this.navigation = navigation;
      }
    
      push (uri, query) {
        const pathname = uri.pathname[0] === '/' ? 
          uri.pathname.slice(1) : uri.pathname;

        packageLoader(pathname).then(() => {
          this.navigation.push(pathname, query);
        }).catch(error => {
          ///
        })
      }

      navigate (uri, query) {
        const pathname = uri.pathname[0] === '/' ? 
          uri.pathname.slice(1) : uri.pathname;

        packageLoader(pathname).then(() => {
          this.navigation.navigate(pathname, query);
        }).catch(error => {
          ///
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
      public subPages: object = appconfig.subPages;

      create = (navigation) => {
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

      delete = (navigator) => {
        if (navigator instanceof Navigator) {
          return super.delete(navigator.id);
        }

        return super.delete(navigator);
      }

      push = (url, query) => {
        const nav = this.current;
        if (nav) {
          nav.push(url, query);
        }
      }

      pop = (delta) => {
        const nav = this.current;
        if (nav) {
          nav.pop(delta);
        }
      }

      navigate (url, query) {
        const nav = this.current;

        if (nav) {
          nav.navigate(url, query);
        }
      }
    }

    const appnavigator = new AppNavigator();

    appruntime.on('navigateTo', (data, callbackId) => {
      const url = new URL(data.url);
      const query = qs.parse(url.query.slice(1));

      appnavigator.push(url, query);
      appruntime.invokeCallbackHandler(callbackId, {
        errMsg: `navigateTo:ok`
      });
    });

    appruntime.on('reLaunch', (name, data, callbackId) => {
      const url = new URL(data.url);
      const query = qs.parse(url.query.slice(1));

      // appnavigator.reLaunch(url, query);
      appruntime.invokeCallbackHandler(callbackId, {
        errMsg: `reLaunch:ok`
      });
    });

    return appnavigator;
  }, [appruntime]);
}