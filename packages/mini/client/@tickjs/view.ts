import { DefaultMessage, Runtime, RuntimeInvokeResult } from './Runtime';
import { ViewRuntime } from './ViewRuntime'

export function getApplicationViewRuntime (id: number) {
  const runtime = ViewRuntime.sharedRuntime(id);

  const { WeixinJSCore } = runtime;

  const onDefaultSubscribeHandler = (event: DefaultMessage, name?: string) => {
    const { data, options } = event;
    (window as any).WeixinJSBridge.subscribeHandler(name || event.name, data, 0, options);
  }

  runtime.on('custom_event_invokeWebviewMethod', onDefaultSubscribeHandler)
  runtime.on('custom_event_onAppRoute', onDefaultSubscribeHandler);
  runtime.on('custom_event_checkWebviewAlive', onDefaultSubscribeHandler);
  runtime.on('custom_event_vdSyncBatch', onDefaultSubscribeHandler);
  runtime.on('custom_event_vdSync', onDefaultSubscribeHandler);

  const onDefulatPublishHandler = (event: DefaultMessage, name?: string) => {
    const data = JSON.parse(event.data);
    runtime.publish({
      ...event,
      name: name || event.name,
      data,
      id
    });
  }

  // for develop
  WeixinJSCore.on('hotModuleReplacement', (event: DefaultMessage) => {
    const { data } = event.options;

    try {
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      (iframe.contentWindow as any).eval(`${data.code} //# sourceURL=./HMR/${data.filename}`);

      runtime.refresh(iframe.contentWindow.$gwx(`./${data.filename}.wxml`))
    } catch (error) {
      debugger;
    }
  });

  WeixinJSCore?.on('custom_event_tapAnyWhere', onDefulatPublishHandler);
  WeixinJSCore?.on('custom_event_webviewCreated', onDefulatPublishHandler);
  WeixinJSCore?.on('custom_event_GenerateFuncReady', onDefulatPublishHandler);
  WeixinJSCore?.on('custom_event_initReady_getPerformance', onDefulatPublishHandler);
  WeixinJSCore?.on('custom_event_batchGetPluginPermissionBytes', onDefulatPublishHandler);
  WeixinJSCore?.on('custom_event_DOMReady', onDefulatPublishHandler);
  WeixinJSCore?.on('custom_event_PAGE_EVENT', onDefulatPublishHandler);
  WeixinJSCore?.on('custom_event_vdSync', (event: DefaultMessage) => {
    onDefulatPublishHandler(event, 'view.custom_event_vdSync');
  });

  const onDefaultInvokeCallbackHandler = (
    event: DefaultMessage,
    result: RuntimeInvokeResult
  ) => {
    const { callbackId, name } = event;
    (window as any).WeixinJSBridge.invokeCallbackHandler(callbackId, {
      errMsg: `${name}:${result.status}`,
      ...result.data
    })
  }

  const onDefaultInvokeHandler = (
    event: DefaultMessage,
    method?: keyof ViewRuntime, 
    async?: boolean,
    name?: string,
  ) => {
    const options = JSON.parse(event.options);
    
    name = name || event.name;
    method = method || 'invoke';
    async = typeof async === 'boolean' ? async : true;

    runtime[method]({
      ...event,
      options,
      name,
    }, (res: RuntimeInvokeResult) => {
      onDefaultInvokeCallbackHandler(event, res);
    }, async);
  }

  WeixinJSCore?.on('operateWXData', (event: DefaultMessage) => {
    onDefaultInvokeHandler(event, 'invoke', false, `operateWXData`);
  });

  return runtime;
}