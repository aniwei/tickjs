import { useMemo } from 'react';

enum ExecutorState {
  ASYNC = 0b1,
  SYNC = 0b10,
  SUCCESS = 0b100,
  FAIL = 0b1000
}


const nextTick = (callback) => {
  new Promise((resolve) => {
    callback();
    resolve(null);
  });
}

class NativeMethodExecutor {
  private state = 0;
  public callbackId;
  public name;
  public appservice;
  public data;

  constructor (appservice, callbackId, name) {
    this.appservice = appservice;
    this.callbackId = callbackId;
    this.name = name;
  }

  get isFinished () {
    return (
      (this.state === (ExecutorState.ASYNC + ExecutorState.FAIL)) ||
      (this.state === (ExecutorState.ASYNC + ExecutorState.SUCCESS)) ||
      (this.state === (ExecutorState.SYNC + ExecutorState.FAIL)) ||
      (this.state === (ExecutorState.SYNC + ExecutorState.SUCCESS)) 
    )
  }

  finished () {
    if (this.isFinished) {
      const handle = () => {
        const msg = (this.state & ExecutorState.SUCCESS) ? 
          'ok' : 'fail';

        this.appservice.invokeCallbackHandler(this.callbackId, {
          errMsg: `${this.name}:${msg}`,
          ...this.data
        });
      }
      
      if (this.state & ExecutorState.ASYNC) {
        nextTick(handle);
      } else {
        handle();
      }

    }
  }

  success (data) {
    this.data = data;
    this.state |= ExecutorState.SUCCESS;

    this.finished();

    return this;
  }

  fail () {
    this.state |= ExecutorState.FAIL;
    this.finished();

    return this;
  }

  sync () {
    this.state |= ExecutorState.SYNC;
    this.finished();
    return this;
  }

  async () {
    this.state |= ExecutorState.ASYNC;
    this.finished();
    return this;
  }
}

function getJSBridgeHandler (__TICK_CONTEXT) {
  

  return {
    invoke (callbackId, name) {  
      return new NativeMethodExecutor(this, callbackId, name);
    },
    invokeCallbackHandler (...args) {
      const { WeixinJSBridge } = __TICK_CONTEXT;
      WeixinJSBridge.invokeCallbackHandler(...args);
    },
    subscribeHandler (...args) {
      const { WeixinJSBridge } = __TICK_CONTEXT;
      WeixinJSBridge.subscribeHandler(...args);
    },
  }
}

export function useAppService ({ __TICK_CONTEXT }) {  
  return useMemo(() => (
    getJSBridgeHandler(__TICK_CONTEXT)
  ), [__TICK_CONTEXT]);
}