import { useMemo, useContext } from 'react';
import { AppContext } from '../componnets/TickApp/AppContext';

export function useAppNavigator (appservice) {
  const context = useContext(AppContext);

  return useMemo(() => {
    const appnavigator = {
      id: 0,
      isFrist: true,
      navigators: new Map(),
      current: null,
      create () {
        return appnavigator.id++;
      },
      has (navigator) {
        return appnavigator.navigators.get(navigator.id);
      },
      set (navigator) {
        return appnavigator.navigators.set(navigator.id, navigator);
      },
      get (id) {
        return appnavigator.navigators.get(id);
      },
      delete (navigator) {
        if (this.get(navigator.id) === navigator) {
          appnavigator.navigators.delete(navigator.id);
        }
      },
      push (url, query) {
        const navigator = appnavigator.current;
        const pathname = url.pathname[0] === '/' ? 
          url.pathname.slice(1) : url.pathname;

        navigator.navigation.push(pathname, query);
      },
      navigate (url, query) {
        const navigator = appnavigator.current;
        const pathname = url.pathname[0] === '/' ? 
          url.pathname.slice(1) : url.pathname;

        navigator.navigation.navigate(pathname, query);
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
          options = {  ...options, ...context.appconfig?.launchOptions }
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