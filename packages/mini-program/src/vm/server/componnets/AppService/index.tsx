import { useMemo } from 'react';
import { View, Text } from 'react-native-web'
import { useScript } from '../../hooks/useScript';
import { useSubscribe } from '../../hooks/useSubscribe';
import { useInvokeHandlerRegistry } from '../../hooks/useInvokeHandlerRegistry';

export function AppService (props) {
  const service = useMemo(() => ({
    invokeCallbackHandler (...args) {
      WeixinJSBridge.invokeCallbackHandler(...args);
    },
    subscribeHandler (...args) {
      WeixinJSBridge.subscribeHandler(...args);
    },
  }), []);

  const getTaskId = useMemo(() => {
    let taskId = 1;

    return () => taskId++;
  }, []);

  useScript([`/WAService.js`, `/appservice`], () => {
    const { onLoad } = props;
    
    onLoad(service);
  });

  useSubscribe([
      `webview.custom_event_GenerateFuncReady`,
      `webview.custom_event_PAGE_EVENT`,
      `webview.custom_event_initReady_getPerformance`,
      `webview.custom_event_vdSync`,
      `webview.custom_event_tapAnyWhere`
  ], (...args) => {
    service.subscribeHandler(...args);
  });

  useInvokeHandlerRegistry(`service.getSystemInfo`, ({ callbackId, name }) => {
    service.invokeCallbackHandler(callbackId, { 
      errMsg: `${name}:ok`,
      ...__TICK_MINI_PROGRAM.system
    });
  });

  useInvokeHandlerRegistry(`service.getNetworkType`, ({ callbackId, name }) => {
    service.invokeCallbackHandler(callbackId, { 
      errMsg: `${name}:ok`,
      networkType: __TICK_MINI_PROGRAM.system.networkType
    });
  });

  useInvokeHandlerRegistry(`service.getStorage`, ({ callbackId, name, data }) => {
    const { key } = data;
    
    __TICK_MINI_PROGRAM.nextTick(() => {
      const data = __TICK_MINI_PROGRAM.storage.getItem(key);

      service.invokeCallbackHandler(callbackId, { 
        errMsg: `${name}:ok`,
        data
      });
    });
  });

  useInvokeHandlerRegistry(`service.getStorageSync`, ({ callbackId, name, data }) => {
    const { key } = data;
    
    service.invokeCallbackHandler(callbackId, { 
      errMsg: `${name}:ok`,
      data: __TICK_MINI_PROGRAM.storage.getItem(key)
    });
  });

  useInvokeHandlerRegistry(`service.setStorage`, ({ callbackId, name, data }) => {
    const { key } = data;
    
    __TICK_MINI_PROGRAM.nextTick(() => {
      __TICK_MINI_PROGRAM.storage.setItem(key, data.data);

      service.invokeCallbackHandler(callbackId, { 
        errMsg: `${name}:ok`,
      });
    });
  });

  useInvokeHandlerRegistry(`service.getStorageSync`, ({ callbackId, name, data }) => {
    const { key } = data;
    
    service.invokeCallbackHandler(callbackId, { 
      errMsg: `${name}:ok`,
      data: __TICK_MINI_PROGRAM.storage.getItem(key, data.data)
    });
  });

  useInvokeHandlerRegistry(`service.createRequestTask`, ({ callbackId, name, data }) => {
    const taskId = getTaskId();

    service.invokeCallbackHandler(callbackId, { 
      errMsg: `${name}:ok`,
      requestTaskId: taskId
    });

    __TICK_MINI_PROGRAM.remote
      .createRequestTask(JSON.stringify(data)).then(res => res.json()).then(res => {
        service.subscribeHandler('onRequestTaskStateChange', {
          requestTaskId: taskId,
          state: 'success',
          data: JSON.stringify(res.data),
          statusCode: res.statusCode,
          header: res.header
        });
      }).catch(error => {
        service.subscribeHandler('onRequestTaskStateChange', {
          requestTaskId: taskId,
          state: 'error',
          statusCode: error.statusCode,
          header: error.header
        });
      })
  });

  useInvokeHandlerRegistry('service.login', ({ callbackId, name, data }) => {
    __TICK_MINI_PROGRAM.remote
      .login(data).then(res => res.json()).then((res) => {
        service.invokeCallbackHandler(callbackId, {
          errMsg: `${name}:ok`,
          code: res.code
        });
      }).catch(error => {
        service.invokeCallbackHandler(callbackId, {
          errMsg: `${name}:fail`,
        });
      })
  });
  
  const { onNavigate } = props;
  useInvokeHandlerRegistry('service.navigateTo', async ({ callbackId, name, data }) => {
    try {
      onNavigate(JSON.parse(data));

      service.invokeCallbackHandler(callbackId, {
        errMsg: `${name}:ok`
      });
    } catch (error) {

    }
  });

  useInvokeHandlerRegistry('service.redirect', () => {

  });
  
  return <View style={{ display: 'none' }}>
    <Text>AppService</Text>
  </View>
}
