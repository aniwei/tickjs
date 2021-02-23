import debug from 'debug';
import puppeteer from 'puppeteer';
import { EventEmitter } from 'events';

import { MiniProgramServiceLayer } from '../ServiceLayer/ServiceLayer';

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

let MiniProgramViewLayerId = 1;

export abstract class MiniProgramViewLayer extends EventEmitter {
  public owner: MiniProgramRenderLayer | null = null;
  public id: number | string | null = null;
  public instance: puppeteer.Page | null = null;
  public context: Map<string, any> = new Map;

  constructor (owner) {
    super();

    this.id = MiniProgramViewLayerId++;
    this.owner = owner;
  }

  abstract runInContext (context);
  public abstract evaluateScript (code, filename?);

  invokeCallbackHandler (callbackId: number | string, data: any) {
    return this.evaluateScript(invokeCallbackHandler(callbackId, data));
  }

  subscribeHandler (name, params, callbackId, options?) {
    return this.evaluateScript(subscribeHandler(name, params, callbackId, options));
  }
}

export abstract class MiniProgramRenderLayer extends EventEmitter {
  public html: string | null = null;
  public views: any[] = [];
  public owner: MiniProgramServiceLayer | null = null;
  public current: MiniProgramViewLayer | null = null;

  public context: Map<string, any> = new Map;

  public abstract evaluateScript (code, filename);
  public abstract navigate (options): any;
  public abstract launch ();
  public abstract newView (): any;
  public abstract invokeCallbackHandler (id, callbackId, data);
  public abstract subscribeHandler (id, name, data, callbackId, options);
  
  public injectContext (name: string, value: any) {
    this.context.set(name, value);
  }
}

