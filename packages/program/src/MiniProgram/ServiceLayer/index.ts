import { EventEmitter } from 'events';
export * from './ServiceLayerNodeImpl';

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

export abstract class MiniProgramServiceLayer extends EventEmitter {
  public context: any | null = {};

  injectContext (name: string, value: any) {
    this.context[name] = value;

    this.runInContext(this.context);
  }

  abstract launch (options);
  abstract navigate (options);

  abstract evaluateScript (code: string, filename?: string);
  abstract runInContext (context: any | null);

  invokeCallbackHandler (callbackId: number | string, data: any) {
    return this.evaluateScript(invokeCallbackHandler(callbackId, data));
  }

  subscribeHandler (name, params, callbackId, options?) {
    return this.evaluateScript(subscribeHandler(name, params, callbackId, options));
  }
}