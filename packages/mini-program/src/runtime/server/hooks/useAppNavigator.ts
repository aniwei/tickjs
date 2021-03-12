import { useMemo } from 'react';
import { AppPackageLoader } from '../componnets/AppPackageLoader';



export function useAppNavigator (appruntime, appconfig) {
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

        }).catch(error => {

        }).final(() => {
          this.navigation.push(pathname, query);
        });
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
          navigator.push(url, query);
        }
      }
    }

    const appnavigator = new AppNavigator();

    const appnavigator = {
      
      pop (delta) {
        const navigator = appnavigator.current;
        if (navigator) {
          navigator.navigation.pop(delta);
        }
      },

      push (url, query) {
        const navigator = appnavigator.current;
        const pathname = url.pathname[0] === '/' ? 
          url.pathname.slice(1) : url.pathname;

        if (appconfig.subPages[pathname]) {
          const pkg = appconfig.subPages[pathname];
          const pakcageLoader = new AppPackageLoader(pathname, pkg);

          pakcageLoader
            .injectAppServiceContext()
            .then(() => {
              navigator.navigation.push(pathname, query);
            })
            .catch(error => {

            });
        } else {
          navigator.navigation.push(pathname, query);
        }
      },
      navigate (url, query) {
        const navigator = appnavigator.current;
        const pathname = url.pathname[0] === '/' ? 
          url.pathname.slice(1) : url.pathname;

        navigator.navigation.navigate(pathname, query);
      },
      setNavigationBarTitle (title) {
        appnavigator.current.navigation.setOptions({ title });
      },
      setNavigationBarColor (data) {
        // appnavigator.current.navigation.setOptions({ title });
      },
      showTabBar () {
        
      },
      subscribeHandler (id, ...args) {
        const navigator = appnavigator.get(id);

        if (navigator) {
          navigator.subscribeHandler(...args);
        }
      },
      onFocus (navigator, options) {
        
        if (appnavigator.has(navigator)) {
          appnavigator.current = navigator;
          options.openType = navigator.type;
          appservice.subscribeHandler('onAppRoute', options, navigator.id);
        }
      },
      onCreated (navigator, options) {
        appnavigator.set(navigator);
        appnavigator.current = navigator;

        if (appnavigator.isFrist) {
          appnavigator.isFrist = false;
          options = {  ...options, ...appconfig?.launchOptions }
        }

        options.openType = navigator.type;
        
        appservice.subscribeHandler('onAppRoute', options, navigator.id);
      },
      onDistroy (navigator) {
        appnavigator.delete(navigator);
      }
    }

    return appnavigator;
  }, [appservice]);
}