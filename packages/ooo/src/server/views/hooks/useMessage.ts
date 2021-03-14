import { useEffect } from 'react';

export function useMessage (name, callback, deps?) {
  useEffect(() => {
    __TICK_CONTEXT.document.addEventListener(name, callback, false);
    return () => {
      __TICK_CONTEXT.document.removeEventListener(name, callback, false)
    }
  }, [deps]);
}