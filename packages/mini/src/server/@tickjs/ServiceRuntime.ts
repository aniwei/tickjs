import axios from 'axios';
import { Runtime } from './Runtime';
import { WeixinJSCore } from './WeixinJSCore';

export class ServiceRuntime extends Runtime implements IRuntime {
  static runtime: ServiceRuntime | null = null;
  static sharedRuntime () {
    return this.runtime = new ServiceRuntime(globalThis, globalThis);
  }

  static evalute = eval;

  public WeixinJSCore: WeixinJSCore | null = null;
  public context: TickAppConfig | null = null;
  
  constructor (sender: any, receiver: any) {
    super(sender, receiver);

    this.WeixinJSCore = new WeixinJSCore;
  }

  define (propName: string, value: any) {
    Object.defineProperty(globalThis, propName, {
      get () {
        return value
      }
    });

    return this;
  }

  script (uri: string) {
    importScripts(uri)
  }

  run (callback: Function) {
    axios.get('/@tickjs/context')
      .then(async res => {
        const context = res.data;
        this.context = context;

        this
          .define('__wxConfig', context.config)
          .define('WeixinJSCore', this.WeixinJSCore)
        
        this.script(`/@weixin/wxservice`);
        this.script(`/@tickjs/app/service`);

        callback(context);
      });
  }
}    

