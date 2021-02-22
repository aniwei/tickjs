import { EventEmitter } from 'events';

let MiniProgramViewLayerId = 1;

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

export abstract class MiniProgramViewLayer extends EventEmitter {
  public owner: MiniProgramRenderLayer | null = null;
  public id: number | string | null = null;

  constructor (owner) {
    super();

    this.id = MiniProgramViewLayerId++;
    this.owner = owner;
  }
}

export abstract class MiniProgramRenderLayer extends EventEmitter {
  public html: string | null = null;
  public views: Map<string, MiniProgramViewLayer> = new Map;
  public owner: MiniProgramServiceLayer | null = null;
  public current: MiniProgramViewLayer | null = null;

  public abstract launch ();
  public abstract navigate ();
}


export abstract class MiniProgramServiceLayer extends EventEmitter {
  public context: any | null = {};
  public scripts: any[] = [];

  public renderer: MiniProgramRenderLayer | any = null;  

  public abstract invokeHandler: Function | null;
  public abstract publishHandler: Function | null;

  constructor () {
    super();

    this.injectContext('WeixinJSCore', {
      invokeHandler: this.onInvokeHandler,
      publishHandler: this.onPublishHandler
    });
  }


  public onPublishHandler = (name, options, callbackId) => {
    if (this.publishHandler) {
      return this.publishHandler(name, options, callbackId)
    }
  }

  public onInvokeHandler = (name: string, options: any, callbackId: string | number): any => {
    switch (name) {
      case '': {

        break;
      }

      default: {
        if (this.invokeHandler) {
          return this.invokeHandler(name, options, callbackId)
        }
        break;
      }
    }
  }

  injectContext (name: string, value: any) {
    this.context[name] = value;

    this.runInContext(this.context);
  }

  abstract launch ();

  abstract evaluateScript (code: string, filename?: string);
  abstract runInContext (context: any | null);

  invokeCallbackHandler (callbackId: number | string, data: any) {
    return this.evaluateScript(invokeCallbackHandler(callbackId, data));
  }

  subscribeHandler (name, params, callbackId, options?) {
    return this.evaluateScript(subscribeHandler(name, params, callbackId, options));
  }
}