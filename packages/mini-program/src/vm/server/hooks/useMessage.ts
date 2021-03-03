import { useEffect } from 'react';

export function useMessage (name, callback) {
  useEffect(() => {
    $$document.addEventListener(name, callback, false);
    return () => $$document.removeEventListener(name, callback, false)
  }, []);
}