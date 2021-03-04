import { useEffect } from 'react';

export function useMessage (name, callback) {
  useEffect(() => {
    __TICK_MINI_PROGRAM.document.addEventListener(name, callback, false);
    return () => __TICK_MINI_PROGRAM.document.removeEventListener(name, callback, false)
  }, []);
}