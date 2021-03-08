import { useMemo, useContext } from 'react';
import { AppContext } from '../componnets/TickApp/AppContext';

export function useAppNavigator (appservice) {
  const { appconfig } = useContext(AppContext);

  return useMemo(() => {
    const appnavigator = {
      id: 0,
      isFrist: true,
      navigators: new Map(),
      current: null,
      create () {
        return appnavigator.id++;
      },
      subscribeHandler (id, ...args) {
        const navigator = appnavigator.navigators.get(id);

        if (navigator) {
          navigator.subscribeHandler(...args);
        }
      },
      onFocus (navigator) {
        if (appnavigator.navigators.has(navigator.id)) {
          appnavigator.current = navigator;
        }
      },
      onCreated (navigator, options) {
        appnavigator.navigators.set(navigator.id, navigator);
        appnavigator.current = navigator;

        if (appnavigator.isFrist) {
          appnavigator.isFrist = false;
          options = {  ...options, ...appconfig?.launchOptions }
        }
        
        appservice.subscribeHandler('onAppRoute', options, navigator.id);
      },
      onDistroy (navigator) {
        if (navigator.get(navigator.id) === navigator) {
          navigator.delete(navigator.id, navigator);
        }
      }
    }

    return appnavigator;
  }, [appservice]);
}