import axios from 'axios';
import { Runtime } from './Runtime';
import { WeixinJSCore } from './WeixinJSCore';
import { TickAppConfig } from '../../types';

export class ServiceRuntime extends Runtime {
  static runtime: ServiceRuntime | null = null;
  static sharedServiceRuntime () {
    return this.runtime = new ServiceRuntime(globalThis, globalThis);
  }

  static Function = Function;
  static eval = eval;
  
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



const service = ServiceRuntime.sharedServiceRuntime()

service.WeixinJSCore.on('getSystemInfo', (data: any) => {
  WeixinJSBridge.invokeCallbackHandler(data.callbackId, {
    errMsg: 'getSystemInfo:ok',
    ...service.context.config.system
  })
});

service.run(() => {
  service.publish({
    name: 'appserviceready'
  })
});