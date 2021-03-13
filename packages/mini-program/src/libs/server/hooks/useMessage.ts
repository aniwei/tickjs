import { useEffect } from 'react';

export function useMessage (name, callback, deps?) {
  useEffect(() => {
    __TICK_RUNTIME.document.addEventListener(name, callback, false);
    return () => {
      __TICK_RUNTIME.document.removeEventListener(name, callback, false)
    }
  }, [deps]);
}