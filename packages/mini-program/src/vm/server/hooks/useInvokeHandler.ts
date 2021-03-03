import { useMemo } from 'react';
import { useMessage } from './useMessage';

export function useInvokeHandler (name, callback) {
  const invokeHandler = useMemo(() => (event) => {
    const detail = event.detail;

    if (name.indexOf(detail.name) > -1) {
      callback && callback(event.detail)
    }
  }, []);

  useMessage(name, invokeHandler);
}