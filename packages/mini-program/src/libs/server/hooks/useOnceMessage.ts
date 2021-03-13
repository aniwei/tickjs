import { useEffect } from 'react';

export function useOnceMessage (name, callback, deps?) {
  useEffect(() => {
    const handle = (...args) => {
      callback(...args);
      __TICK_RUNTIME.document.removeEventListener(name, handle, false)
    }
    __TICK_RUNTIME.document.addEventListener(name, handle, false);
    return () => __TICK_RUNTIME.document.removeEventListener(name, handle, false)
  }, [deps]);
}