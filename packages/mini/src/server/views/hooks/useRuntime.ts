import { useMemo } from 'react';
import { DefaultMessage } from 'src/server/@tickjs/Runtime';

import { getApplicationNativeRuntime, ClientTypes } from '/@tickjs/transit';

export enum RuntimeState {
  SERVICE = 0b1,
  CLIENT = 0b10,
  DONE = 0b11
}

export function useRuntime (onReady: Function, config: any) {
  const runtime = useMemo(() => {
    const runtime = new getApplicationNativeRuntime(config);
    const worker: Worker = new Worker('@tickjs/service');

    worker.addEventListener('message', function onMessage(event) {
      runtime.state |= RuntimeState.SERVICE;

      worker.removeEventListener('message', onMessage);
      runtime.connect(
        event.data.id, 
        worker, 
        worker, 
        ClientTypes.SERVICE
      );

      onReady(runtime.state);
    });

    window.addEventListener('message', function onMessage (event) {
      if (event.data.name === 'clientready') {
        runtime.state |= RuntimeState.CLIENT;

        const receiver = window;
        const sender = event.source;

        runtime.connect(
          event.data.id, 
          sender, 
          receiver, 
          ClientTypes.VIEW
        );

        runtime.launch(event.data.id);
      }
    });
    
    return runtime;
  }, []);

  return runtime;
}