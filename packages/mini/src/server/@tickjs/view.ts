import { DefaultMessage } from './Runtime';
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

  WeixinJSCore?.on('custom_event_tapAnyWhere', onDefulatPublishHandler);
  WeixinJSCore?.on('custom_event_webviewCreated', onDefulatPublishHandler);
  WeixinJSCore?.on('custom_event_GenerateFunc', onDefulatPublishHandler);
  WeixinJSCore?.on('custom_event_DOMReady', onDefulatPublishHandler);
  WeixinJSCore?.on('custom_event_vdSync', (event: DefaultMessage) => {
    onDefulatPublishHandler(event, 'view.custom_event_vdSync');
  });

  return runtime;
}