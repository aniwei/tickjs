import { DefaultMessage } from './Runtime';
import { ViewRuntime } from './ViewRuntime'

export function getApplicationViewRuntime (id: number) {
  const runtime = ViewRuntime.sharedRuntime(id);

  const { WeixinJSCore } = runtime;

  runtime.on('custom_event_invokeWebviewMethod', (event: DefaultMessage) => {
    WeixinJSBridge.subscribeHandler(event.name, event.data, event.options)
  })

  runtime.on('custom_event_onAppRoute', (event: DefaultMessage) => {
    WeixinJSBridge.subscribeHandler(event.name, event.data, event.options)
  });

  runtime.on('custom_event_vdSyncBatch', (event: DefaultMessage) => {
    WeixinJSBridge.subscribeHandler(event.name, event.data, event.options)
  })

  WeixinJSCore?.on('custom_event_vdSync', (event: DefaultMessage) => {
    const data = JSON.parse(event.data);
    runtime.publish({
      ...event,
      data,
      id
    });
  });

  WeixinJSCore.on('custom_event_tapAnyWhere', (event: DefaultMessage) => {
    const data = JSON.parse(event.data);
    runtime.publish({
      ...event,
      data,
      id
    });
  });

  return runtime;
}