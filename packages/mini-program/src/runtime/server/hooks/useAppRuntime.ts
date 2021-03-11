import { useMemo } from 'react';

export function useAppRuntime () {
  useMemo(() => {
    const worker = new Worker('/appruntime');

    worker.addEventListener('message', ({ data }) => {
      const { name, detail } = data;
    });

    worker.addEventListener('error', () => {

    });

    const runtime = {
      on (name, callback) {
        worker.addEventListener(name, callback, false);
        return this;
      },

      once (name, callback) {
        const once = (...argv) => {
          callback(...argv);
          runtime.off(name, once);
        }

        return this.on(name, callback);
      },

      off (name, callback) {
        worker.addEventListener(name, callback, false);
        return this;
      }
    }

    return runtime;
  }, []);
}