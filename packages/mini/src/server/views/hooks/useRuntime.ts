import { useMemo, useEffect } from 'react';

class AppRuntimeEventEmitter extends Worker {
  constructor (uri) {
    super(uri);
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
}

class AppRuntime extends AppRuntimeEventEmitter {
  public callbackId = 0;

  constructor (uri) {
    super(uri);

    this.on('message', this.onMessage);
    this.on('error', this.onError);
  }

  onMessage = (event) => {
    const { type, name, data, options, callbackId } = event.data;

    switch (type) {
      case 'invokeCallbackHandler': {
        this.emit(callbackId, options);
        break;
      }

      case 'subscribeHandler': {
        this.emit(name, data, options);
        break;
      }

      case 'invokeHandler': {
        this.emit(name, options, callbackId);
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
    this.send({
      type: 'invokeCallbackHandler',
      options,
      callbackId
    });
  }

  subscribeHandler = (name, data, options) => {
    this.send({
      type: 'subscribeHandler',
      name,
      data,
      options
    });
  }

  publishHandler = (name, options) => {
    this.send({
      type: 'publishHandler',
      name,
      options
    });
  }

  ready (callback) {
    this.on('appserviceready', callback);
  }
}

export function useRuntime (onReady) {
  const appruntime = useMemo(() => {
    const appruntime = new AppRuntime('/appruntime');
    return appruntime;
  }, []);

  useEffect(() => {
    appruntime.ready(onReady);
  }, [appruntime]);

  return appruntime;
}