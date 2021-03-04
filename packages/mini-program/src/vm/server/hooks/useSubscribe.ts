import { useMemo } from 'react';
import { useMessage } from './useMessage';

export function useSubscribe (name) {
  const subscribeMethod = useMemo(() => (event) => {
    const { args } = event.detail;

    if (typeof WeixinJSBridge === 'object') {
      WeixinJSBridge.subscribeHandler(...args);
    }
  }, []);

  useMessage(name, subscribeMethod);
}