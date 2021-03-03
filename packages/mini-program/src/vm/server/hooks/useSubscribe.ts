import { useMemo } from 'react';
import { useMessage } from './useMessage';

export function useSubscribe (name) {
  const subscribeMethod = useMemo(() => (...args) => {
    window.WeixinJSBridge && window.WeixinJSBridge.subscribeHandler(...args)
  }, []);

  useMessage(name, subscribeMethod);
}