import { ServiceRuntime, ServiceInvokeResult } from './ServiceRuntime';

import { DefaultMessage } from './Runtime';
import { debug } from './shared';

const serviceDebug = debug(`API`);

function getApplicationServiceRuntime () {
  const service = ServiceRuntime.sharedRuntime();

  service.run(() => {
    service.publish({
      name: 'clientready',
      id: 'service',
      options: {}
    })
  });

  const WeixinJSBridge = globalThis.WeixinJSBridge;

  const onDefaultSubscribeHandler = (event: DefaultMessage) => {
    const { name, data, options, id } = event;
    WeixinJSBridge.subscribeHandler(name, data || options, id);
  }

  service.on('onAppRoute', onDefaultSubscribeHandler);
  service.on('custom_event_tapAnyWhere', onDefaultSubscribeHandler);
  service.on('custom_event_vdSync', onDefaultSubscribeHandler);
  service.on('onRequestTaskStateChange', onDefaultSubscribeHandler);

  const { WeixinJSCore } = service;
  
  const onDefaultPublishDataHandler = (event: DefaultMessage, name?: string) => {
    service.publish({ 
      ...event, 
      name: name || event.name,
      data: JSON.parse(event.data) 
    })
  }

  WeixinJSCore?.on('custom_event_onAppRoute', onDefaultPublishDataHandler);
  WeixinJSCore?.on('custom_event_vdSync', onDefaultPublishDataHandler.bind(null, 'service.custom_event_vdSync'));
  WeixinJSCore?.on('custom_event_checkWebviewAlive', onDefaultPublishDataHandler);
  WeixinJSCore?.on('custom_event_vdSyncBatch', onDefaultPublishDataHandler);
  WeixinJSCore?.on('custom_event_invokeWebviewMethod', onDefaultPublishDataHandler);
  
  WeixinJSCore?.on('navigateTo', onDefaultPublishDataHandler);
  WeixinJSCore?.on('navigateBack', onDefaultPublishDataHandler);
  WeixinJSCore?.on('redirectTo', onDefaultPublishDataHandler);
  WeixinJSCore?.on('switchTab', onDefaultPublishDataHandler);
  WeixinJSCore?.on('reLaunch', onDefaultPublishDataHandler);

  const onDefaultInvokeHandler = (event: DefaultMessage, method: string = 'invoke', async: boolean = true) => {
    const options = JSON.parse(event.options);

    method = method || 'invoke';

    service[method]({
      ...event,
      options,
    }, (res: ServiceInvokeResult) => {
      const { callbackId, name } = event;
      WeixinJSBridge.invokeCallbackHandler(callbackId, {
        errMsg: `${name}:${res.status}`,
        ...res.data
      })
    }, async);
  }

  WeixinJSCore?.on('login', onDefaultInvokeHandler);
  WeixinJSCore?.on('createRequestTask', onDefaultInvokeHandler.bind(null, 'request'));
  WeixinJSCore?.on('getStorage', onDefaultInvokeHandler);
  WeixinJSCore?.on('getStorageSync', onDefaultInvokeHandler.bind(null, 'invoke', false));
  WeixinJSCore?.on('setStorage', onDefaultInvokeHandler);
  WeixinJSCore?.on('setStorageSync', onDefaultInvokeHandler.bind(null, 'invoke', false));

  WeixinJSCore?.on('getSystemInfo', (event: DefaultMessage) => {
    WeixinJSBridge.invokeCallbackHandler(event.callbackId, {
      errMsg: `${event.name}:ok`,
      ...(service.context as any).system
    })
  });

  WeixinJSCore?.on('getNetworkType', (event: DefaultMessage) => {
    WeixinJSBridge.invokeCallbackHandler(event.callbackId, {
      errMsg: `${event.name}:ok`,
      networkType: (service.context as any).system.networkType
    })
  });

  return service;
}

getApplicationServiceRuntime();