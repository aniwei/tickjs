import { ServiceRuntime } from './ServiceRuntime';

import { DefaultMessage, RuntimeInvokeResult, RuntimeInvokeResultStatus } from './Runtime';
import * as shared from './shared';

const debug = shared.debug(`Service`);

function getApplicationServiceRuntime () {
  const service = ServiceRuntime.sharedRuntime();

  service.run(() => {
    debug(`服务准备就绪`);

    service.publish({
      name: 'clientready',
      id: 'service',
      options: {}
    })
  });


  const onDefaultSubscribeHandler = (event: DefaultMessage) => {
    const { name, data, options, id } = event;
    (globalThis as any).WeixinJSBridge.subscribeHandler(name, data || options, id);
  }

  const onDefaultInvokeCallbackHandler = (
    event: DefaultMessage,
    result: RuntimeInvokeResult
  ) => {
    const { callbackId, name } = event;
    (globalThis as any).WeixinJSBridge.invokeCallbackHandler(callbackId, {
      errMsg: `${name}:${result.status}`,
      ...result.data
    })
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

  const onDefaultPublishOptionsHandler = (event: DefaultMessage, name?: string) => {
    service.publish({ 
      ...event, 
      name: name || event.name,
      options: JSON.parse(event.options) 
    })
  }

  WeixinJSCore?.on('custom_event_onAppRoute', onDefaultPublishDataHandler);
  WeixinJSCore?.on('custom_event_vdSync', (event: DefaultMessage) => {
    onDefaultPublishDataHandler(event, 'service.custom_event_vdSync');
  });
  WeixinJSCore?.on('custom_event_checkWebviewAlive', onDefaultPublishDataHandler);
  WeixinJSCore?.on('custom_event_vdSyncBatch', onDefaultPublishDataHandler);
  WeixinJSCore?.on('custom_event_invokeWebviewMethod', onDefaultPublishDataHandler);
  
  WeixinJSCore?.on('navigateTo', onDefaultPublishOptionsHandler);
  WeixinJSCore?.on('navigateBack', onDefaultPublishOptionsHandler);
  WeixinJSCore?.on('redirectTo', onDefaultPublishOptionsHandler);
  WeixinJSCore?.on('switchTab', onDefaultPublishOptionsHandler);
  WeixinJSCore?.on('reLaunch', onDefaultPublishOptionsHandler);

  WeixinJSCore?.on('showToast', onDefaultPublishOptionsHandler);
  WeixinJSCore?.on('hideToast', onDefaultPublishOptionsHandler);
  

  const onDefaultInvokeHandler = (
    event: DefaultMessage,
    method?: keyof ServiceRuntime, 
    async?: boolean,
    name?: string,
  ) => {
    const options = JSON.parse(event.options);
    
    name = name || event.name;
    method = method || 'invoke';
    async = typeof async === 'boolean' ? async : true;

    service[method]({
      ...event,
      options,
      name,
    }, (res: RuntimeInvokeResult) => {
      onDefaultInvokeCallbackHandler(event, res);
    }, async);
  }

  WeixinJSCore?.on('login', onDefaultInvokeHandler);
  WeixinJSCore?.on('createRequestTask', (event: DefaultMessage) => {
    onDefaultInvokeHandler(event, 'request', true);
  });
  WeixinJSCore?.on('getStorage', onDefaultInvokeHandler);
  WeixinJSCore?.on('getStorageSync', (event: DefaultMessage) => {
    event.name = 'getStorage';
    onDefaultInvokeHandler(event, 'invoke', false, 'getStorage');
  });
  WeixinJSCore?.on('setStorage', onDefaultInvokeHandler);
  WeixinJSCore?.on('setStorageSync', (event: DefaultMessage) => {
    onDefaultInvokeHandler(event, 'invoke', false, `setStorage`);
  });

  WeixinJSCore?.on('getSystemInfo', (event: DefaultMessage) => {
    onDefaultInvokeCallbackHandler(event, {
      status: RuntimeInvokeResultStatus.OK,
      data: (service.context as any).system
    });
  });

  

  WeixinJSCore?.on('getNetworkType', (event: DefaultMessage) => {
    onDefaultInvokeCallbackHandler(event, {
      status: RuntimeInvokeResultStatus.OK,
      data: {
        networkType: (service.context as any).system.networkType
      }
    });
  });

  return service;
}

getApplicationServiceRuntime();