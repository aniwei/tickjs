import { useMessage } from './useMessage';

export function useSubscribe (name, callback) {
  const subscribeMethod = (event) => {
    const { args, webviewId } = event.detail;
    callback(...args, webviewId);
  }

  if (!Array.isArray(name)) {
    name = [name];
  }

  for (const n of name) {
    useMessage(n, subscribeMethod);
  }

}