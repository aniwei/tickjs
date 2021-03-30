import { useMemo, useContext } from 'react';
import { DefaultMessage } from 'src/server/@tickjs/Runtime';
import { AppContext } from '../component/TickApp/AppContext';

//@ts-ignore
import { getApplicationTransitRuntime, ClientTypes } from '/@tickjs/transit';

export enum RuntimeState {
  SERVICE = 0b1,
  CLIENT = 0b10,
  DONE = 0b11
}

export function useRuntime (onReady: Function, config: any) {
  const runtime = useMemo(() => {
    const runtime = new getApplicationTransitRuntime(config);
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

        const data = event.data

        runtime.navigate(
          data.id, 
          data.route,
          data.openType || 'switchTab',
          data.query
        );
      }
    });
    
    return runtime;
  }, []);

  return runtime;
}