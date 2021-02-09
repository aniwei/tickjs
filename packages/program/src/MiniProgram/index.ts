import { debug } from 'console';
import { EventEmitter } from 'events';

export const subscribeHandler = (name, params, callbackId, options?) => (`
WeixinJSBridge.subscribeHandler(
  "${name}",
  ${JSON.stringify(params)},
  ${callbackId},
  ${JSON.stringify({ nativeTime: Date.now(), ...options })}
)`);

export const invokeCallbackHandler = (callbackId: number | string, data: any) => (`
WeixinJSBridge.invokeCallbackHandler(
  ${callbackId},
  ${JSON.stringify(data)}
)`);

export abstract class MiniProgram extends EventEmitter {
  public context: any | null = {};
  public scripts: any[] = [];
  public abstract invokeHandler: Function | null;
  public abstract publishHandler: Function | null;

  constructor () {
    super();

    this.injectContext('WeixinJSCore', {
      invokeHandler: (name, options, callbackId) => {
        if (this.invokeHandler) {
          return this.invokeHandler(name, options, callbackId)
        }
      },
      publishHandler: (name, options, callbackId) => {
        if (this.publishHandler) {
          return this.publishHandler(name, options, callbackId)
        }
      }
    })
  }

  injectContext (name: string, value: any) {
    this.context[name] = value;

    this.runInContext(this.context);
  }

  launch ({ path , query }) {
    this.subscribeHandler('onAppRoute', {
      path,
      query,
      openType: 'appLaunch'
    }, 2, {
      nativeTime: Date.now()
    })
  }

  abstract evaluateScript (code: string, filename?: string);
  abstract runInContext (context: any | null);

  invokeCallbackHandler (callbackId: number | string, data: any) {
    return this.evaluateScript(invokeCallbackHandler(callbackId, data));
  }

  subscribeHandler (name, params, callbackId, options?) {
    return this.evaluateScript(subscribeHandler(name, params, callbackId, options));
  }
}