import { ServiceRuntime } from './ServiceRuntime';

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

  service.on('onAppRoute', (event: any) => {
    WeixinJSBridge.subscribeHandler(event.name, event.data, event.id);
  });

  service.on('custom_event_tapAnyWhere', (event: any) => {
    WeixinJSBridge.subscribeHandler(event.name, event.data, event.id);
  });

  service.on('view.custom_event_vdSync', (event: DefaultMessage) => {
    WeixinJSBridge.subscribeHandler('custom_event_vdSync', event.data, event.id);
  });

  service.on('onRequestTaskStateChange', (event: DefaultMessage) => {
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

  WeixinJSCore?.on('custom_event_vdSync', (event: DefaultMessage) => {
    const data = JSON.parse(event.data);
    
    service.publish({
      ...event,
      name: `service.custom_event_vdSync`,
      data,
    });
  })

  WeixinJSCore?.on('custom_event_checkWebviewAlive', (event: DefaultMessage) => {
    const data = JSON.parse(event.data);
    
    service.publish({
      ...event,
      data,
    });
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

  WeixinJSCore?.on('login', (event: DefaultMessage) => {
    const options = JSON.parse(event.options);

    service.invoke({
      ...event,
      options,
    }, (result: any) => {
      WeixinJSBridge.invokeCallbackHandler(event.callbackId, {
        errMsg: `${event.name}:ok`,
        ...result
      });
    });

  });

  WeixinJSCore?.on('createRequestTask', (event: DefaultMessage) => {
    const options = JSON.parse(event.options);

    service.request({
      ...event,
      options,
    }, (requestTaskId) => {
      WeixinJSBridge.invokeCallbackHandler(event.callbackId, {
        errMsg: `${event.name}:ok`,
        requestTaskId
      });
    });

  });

  WeixinJSCore?.on('getStorage', (event: DefaultMessage) => {
    const options = JSON.parse(event.options);

    service.invoke({
      ...event,
      options
    }, (result: any) => {
      serviceDebug(result.data)  
      if (result.data) {
        WeixinJSBridge.invokeCallbackHandler(event.callbackId, {
          errMsg: `${event.name}:${result.data ? 'ok' : 'fail'}`,
          data: result.data
        })
      }
    });
  });

  WeixinJSCore?.on('getStorageSync', (event: DefaultMessage) => {
    const options = JSON.parse(event.options);

    service.invoke({
      ...event,
      name: 'getStorage',
      options
    }, (result: any) => {
      if (result.data) {
        WeixinJSBridge.invokeCallbackHandler(event.callbackId, {
          errMsg: `${event.name}:${result.data ? 'ok' : 'fail'}`,
          data: result.data
        })
      }
    }, false);
  });

  WeixinJSCore?.on('setStorage', (event: DefaultMessage) => {
    const options = JSON.parse(event.options);

    service.invoke({
      ...event,
      options
    }, (result: any) => {
      if (result.data) {
        WeixinJSBridge.invokeCallbackHandler(event.callbackId, {
          errMsg: `${event.name}:ok`,
        })
      }
    });
  });

  WeixinJSCore?.on('setStorageSync', (event: DefaultMessage) => {
    const options = JSON.parse(event.options);

    service.invoke({
      ...event,
      name: 'setStorage',
      options
    }, (result: any) => {
      if (result.data) {
        WeixinJSBridge.invokeCallbackHandler(event.callbackId, {
          errMsg: `${event.name}:ok`,
        })
      }
    }, false);
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

  return service;
}

getApplicationServiceRuntime();