import { useMessage } from './useMessage';

const invokeHandlers = new Map();

function onMessage (event) {
  const detail = event.detail;
  const { name, source } = detail;

  const invokeHandler = invokeHandlers.get(`${source}.${name}`);
  
  if (invokeHandler) {
    invokeHandler(detail);
  }
}

export function useInvokeHandlerRegistry (name, callback) {
  invokeHandlers.set(name, callback);

  useMessage(name, onMessage);
}