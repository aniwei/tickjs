
import { useContext } from 'react';
import { AppContext } from '../componnets/TickApp/AppContext';
import { useSubscribe } from './useSubscribe';

export function useAppNavigatorSubscribe () {
  const { appnavigator } = useContext(AppContext);

  useSubscribe([
    `service.custom_event_onAppRoute`,
    `service.custom_event_invokeWebviewMethod`,
    `service.custom_event_checkWebviewAlive`,
    `service.custom_event_vdSync`,
    `service.custom_event_vdSyncBatch`,
  ], (name, data, id, options, nid) => {
    appnavigator.subscribeHandler(nid, name, data, id, options)
  });
}