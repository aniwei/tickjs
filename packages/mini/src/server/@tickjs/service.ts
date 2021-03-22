import { ServiceRuntime } from './ServiceRuntime';

import { DefaultMessage } from './Runtime';
import { nextTick } from './shared';



function getApplicationServiceRuntime () {
  const service = ServiceRuntime.sharedRuntime();

  service.run(() => {
    service.publish({
      name: 'clientready',
      id: 'service',
      options: {}
    })
  });

  service.on('onAppRoute', (event: any) => {
    WeixinJSBridge.subscribeHandler(event.name, event.data, event.id);
  });

  service.on('custom_event_tapAnyWhere', (event: any) => {
    WeixinJSBridge.subscribeHandler(event.name, event.data, event.id);
  });

  service.on('custom_event_vdSync', (event: DefaultMessage) => {
    WeixinJSBridge.subscribeHandler(event.name, event.data, event.id);
  });

  const { WeixinJSCore } = service;

  WeixinJSCore?.on('custom_event_onAppRoute', (event: DefaultMessage) => {
    const data = JSON.parse(event.data);
    
    service.publish({
      ...event,
      data,
    })
  });

  WeixinJSCore?.on('custom_event_vdSyncBatch', (event: DefaultMessage) => {
    const data = JSON.parse(event.data);
    
    service.publish({
      ...event,
      data,
    })
  });

  WeixinJSCore?.on('custom_event_invokeWebviewMethod', (event: DefaultMessage) => {
    const data = JSON.parse(event.data);
    
    service.publish({
      ...event,
      data,
    })
  });

  WeixinJSCore?.on('createRequestTask', (event: DefaultMessage) => {
    const options = JSON.parse(event.options);

    service.publish({
      ...event,
      options,
    })

  });

  WeixinJSCore?.on('getStorage', (event: DefaultMessage) => {
    const options = JSON.parse(event.options);
    const { key, storageId } = options;

    nextTick(() => {
      const data = localStorage.getItem(`${storageId}:${key}`);

      WeixinJSBridge.invokeCallbackHandler(event.callbackId, {
        errMsg: `${event.name}:${data ? 'ok' : 'fail'}`,
        data,
      })
    })
  });

  WeixinJSCore?.on('getStorageSync', (event: DefaultMessage) => {
    const options = JSON.parse(event.options);
    const { key, storageId } = options;
    const data = localStorage.getItem(`${storageId}:${key}`);

    WeixinJSBridge.invokeCallbackHandler(event.callbackId, {
      errMsg: `${event.name}:${data ? 'ok' : 'fail'}`,
      data,
    })
  });

  WeixinJSCore?.on('setStorage', (event: DefaultMessage) => {
    const options = JSON.parse(event.options);
    const { key, storageId, data } = options;

    nextTick(() => {
      localStorage.setItem(`${storageId}:${key}`, data);

      WeixinJSBridge.invokeCallbackHandler(event.callbackId, {
        errMsg: `${event.name}:ok`,
        data,
      })
    })
  });

  WeixinJSCore?.on('setStorageSync', (event: DefaultMessage) => {
    const options = JSON.parse(event.options);
    const { key, storageId, data } = options;
    
    localStorage.setItem(`${storageId}:${key}`, data);

    WeixinJSBridge.invokeCallbackHandler(event.callbackId, {
      errMsg: `${event.name}:ok`,
    })
  });

  WeixinJSCore?.on('getSystemInfo', (event: DefaultMessage) => {
    WeixinJSBridge.invokeCallbackHandler(event.callbackId, {
      errMsg: `${event.name}:ok`,
      ...service.context.system
    })
  });

  WeixinJSCore?.on('getNetworkType', (event: DefaultMessage) => {
    WeixinJSBridge.invokeCallbackHandler(event.callbackId, {
      errMsg: `${event.name}:ok`,
      networkType: service.context.system.networkType
    })
  });

  WeixinJSCore?.on('login', (event: DefaultMessage) => {
    nextTick(() => {
      WeixinJSBridge.invokeCallbackHandler(event.callbackId, {
        errMsg: `${event.name}:ok`,
        code: `test`
      })
    })
  });

  return service;
}

getApplicationServiceRuntime();