import { useEffect } from 'react';

export function useMessage (name, callback, deps?) {
  useEffect(() => {
    __TICK_MINI_PROGRAM.document.addEventListener(name, callback, false);
    return () => __TICK_MINI_PROGRAM.document.removeEventListener(name, callback, false)
  }, [deps]);
}