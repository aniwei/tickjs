
import { useContext } from 'react';
import { AppContext } from '../componnets/TickApp/AppContext';
import { useSubscribe } from './useSubscribe';

export function useAppServiceSubscribe () {
  const { appservice } = useContext(AppContext);

  useSubscribe([
    `webview.custom_event_GenerateFuncReady`,
    `webview.custom_event_PAGE_EVENT`,
    `webview.custom_event_initReady_getPerformance`,
    `webview.custom_event_vdSync`,
    `webview.custom_event_tapAnyWhere`
  ], (...args) => {
    appservice.subscribeHandler(...args);
  });
}