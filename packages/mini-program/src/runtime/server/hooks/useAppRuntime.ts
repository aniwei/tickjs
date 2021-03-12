import { useMemo, useEffect } from 'react';

class AppRuntime extends Worker {
  public callbackId = 0;

  constructor (uri) {
    super(uri);

    this.on('message', this.onMessage);
    this.on('error', this.onError);
  }

  onMessage = (event) => {
    const { data } = event;
    const { type, name, options, callbackId } = data;

    switch (type) {
      case 'invokeCallbackHandler': {
        this.invokeCallbackHandler(callbackId, options);
        break;
      }

      case 'subscribeHandler': {
        this.subscribeHandler(name, options);
        break;
      }
    }
  }

  onError = () => {

  }

  send = (options) => {
    this.postMessage(options);
  }

  invokeHandler = (name, options, callback) => {
    const callbackId = `callback_${this.callbackId++}`;
    this.once(callbackId, callback);

    this.send({
      type: 'invokeHandler',
      name,
      options,
      callbackId
    });
  }

  invokeCallbackHandler = (callbackId, options) => {
    this.emit(callbackId, options);
  }

  subscribeHandler = (callbackId, options) => {
    this.emit(callbackId, options);
  }

  publishHandler = (name, options) => {
    this.emit(name, options);
    this.send({
      type: 'publishHandler',
      name,
      options
    });
  }

  emit (name, ...argv) {
    this.dispatchEvent(new CustomEvent(name, ...argv));
  }

  on (name, callback) {
    this.addEventListener(name, callback, false);
    return this;
  }

  once (name, callback) {
    const once = (...argv) => {
      callback(...argv);
      this.off(name, once);
    }
    return this.on(name, callback);
  }

  off (name, callback) {
    this.addEventListener(name, callback, false);
    return this;
  }

  ready (callback) {
    this.on('appserviceready', callback);
  }
}

export function useAppRuntime (onReady) {
  const appruntime = useMemo(() => {
    const appruntime = new AppRuntime('/appruntime');
    return appruntime;
  }, []);

  useEffect(() => {
    appruntime.ready(onReady);
  }, [appruntime]);

  return appruntime;
}