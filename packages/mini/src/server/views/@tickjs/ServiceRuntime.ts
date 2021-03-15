import { Runtime } from './Runtime';
import { WeixinJSCore } from './WeixinJSCore';
import TickAppContext from '/@tickjs/context.ts';

console.log(TickAppContext)

import axios from 'axios';


type TickContext = {
  config: any,
  device: any,
  system: any,
  types: any
}

export class ServiceRuntime extends Runtime {
  static runtime: ServiceRuntime | null = null;
  static sharedServiceRuntime () {
    return this.runtime = new ServiceRuntime(globalThis, globalThis);
  }

  public context: TickContext | null = null;
  
  constructor (sender: any, receiver: any) {
    super(sender, receiver);
  }

  imports (uri: string, callback?: Function) {
    return axios.get(uri)
      .then(res => {
        this.context = res.data;
        if (callback) {
          callback(this.context);
        }
        return Promise.resolve(res.data as TickContext);
      });
  }

  define (propName: string, value: any) {
    Object.defineProperty(globalThis, propName, {
      get () {
        return value
      }
    })
  }
}

ServiceRuntime
  .sharedServiceRuntime()
  .imports('/@tickjs/context')
  .then((context: TickContext) => {
    const service = ServiceRuntime.sharedServiceRuntime()
    
    service.define('__wxConfig', context.config);
    service.define('WeixinJSCore', new WeixinJSCore());

    return service.imports(`/@tickjs/service`)
      
  });