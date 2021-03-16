import axios from 'axios';
import { Runtime } from './Runtime';
import { WeixinJSCore } from './WeixinJSCore';

export class ServiceRuntime extends Runtime {
  static runtime: ServiceRuntime | null = null;
  static sharedServiceRuntime () {
    return this.runtime = new ServiceRuntime(globalThis, globalThis);
  }

  static Function = Function;
  static eval = eval;
  
  constructor (sender: any, receiver: any) {
    super(sender, receiver);
  }

  define (propName: string, value: any) {
    Object.defineProperty(globalThis, propName, {
      get () {
        return value
      }
    });

    return this;
  }

  async script (uri: string) {
    return axios.get(uri)
      .then(res => {
        const script = new ServiceRuntime.Function('global', 'globalThis', `${res.data}\n //# sourceURL=${uri}`);
        script.call(globalThis, globalThis, globalThis);
      })
  }

  run (callback: Function) {
    axios.get('/@tickjs/context')
      .then(async res => {
        const context = res.data;
        this
          .define('__wxConfig', context.config)
          .define('WeixinJSCore', new WeixinJSCore())
        
        await this.script('/@tickjs/wxservice');
        await this.script('/@tickjs/service');

        callback(context);
      });
  }
}    

ServiceRuntime.sharedServiceRuntime().run(() => {

});