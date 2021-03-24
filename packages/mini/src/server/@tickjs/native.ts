import { NativeRuntime } from './NativeRuntime'
import { DefaultMessage } from './Runtime';

export function getApplicationTransitRuntime (config: any) {
  const native = new NativeRuntime(config)

  native.on('custom_event_onAppRoute', (event: DefaultMessage) => {
    const { name } = event;
    const data = event.data.data;
    const { webviewId } = data;
    const client = native.clients.get(webviewId);

    if (client) {
      const { runtime } = client;

      runtime.subscribe(name, event.data, webviewId)
    }
  });

  native.on('custom_event_vdSyncBatch', (event: DefaultMessage) => {
    const { webviewId } = event;
    const ids = JSON.parse(webviewId);

    for (const id of ids) {
      const client = native.clients.get(id);

      if (client) {
        const { runtime } = client;
        runtime.subscribe({
          ...event,
          webviewId: id 
        })
      }
    }

  });

  native.on('custom_event_invokeWebviewMethod', (event: DefaultMessage) => {
    const { webviewId } = event;
    const ids = JSON.parse(webviewId);

    for (const id of ids) {
      const client = native.clients.get(id);

      if (client) {
        const { runtime } = client;
        runtime.subscribe({
          ...event,
          webviewId: id 
        })
      }
    }

  });

  native.on('custom_event_tapAnyWhere', (event: DefaultMessage) => {
    const client = native.clients.get('service');

    if (client) {
      const { runtime } = client;
      runtime.subscribe(event);
    }
  });

  native.on('custom_event_vdSync', (event: DefaultMessage) => {
    const client = native.clients.get('service');

    if (client) {
      const { runtime } = client;
      runtime.subscribe(event);
    }
  });

  native.on('createRequestTask', (event: DefaultMessage) => {
    native.request(event);
  });

  return native;
}

export { ClientTypes } from './NativeRuntime';