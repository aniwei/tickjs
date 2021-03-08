import { useMessage } from './useMessage';

const AppNativeMethods = new Map();

function onMessage (event) {
  const detail = event.detail;
  const { name, source } = detail;

  const methods = AppNativeMethods.get(`${source}.${name}`);
  
  if (typeof methods === 'function') {
    methods(detail);
  } else if (typeof methods === 'object') {
    methods.invoke(detail);
  }
}

export function useAppNativeMethod (name, callback) {
  AppNativeMethods.set(name, callback);

  useMessage(name, onMessage);

  return AppNativeMethods;
}