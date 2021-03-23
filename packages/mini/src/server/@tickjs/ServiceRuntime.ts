import axios from 'axios';
import { Config } from '../TickMini';
import { DefaultMessage, Runtime } from './Runtime';
import { WeixinJSCore } from './WeixinJSCore';

export class ServiceRuntime extends Runtime {
  static runtime: ServiceRuntime | null = null;
  static sharedRuntime () {
    return this.runtime = new ServiceRuntime(globalThis, globalThis);
  }

  static evalute = eval;

  public WeixinJSCore: WeixinJSCore | null = null;
  public context: Config | null = null;
  public id: number = 0;
  
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

  request (event: DefaultMessage, callback: Function) {
    this.invoke(event, (error: any, result: any) => {
      this.emit('onRequestTaskStateChange', {
        name: `onRequestTaskStateChange`,
        data: result.data
      });
    });

    callback(this.id++);
  }

  invoke (message: DefaultMessage, callback: Function, async?: boolean) {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('load', (res: any) => {
      try {
        const data = JSON.parse(res.target.responseText);
        callback(data);
      } catch (error) {
        callback(error);
      }
    });

    xhr.addEventListener('error', () => {});

    xhr.open(`POST`, `/@tickjs/api/${message.name}`, !!async);
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.setRequestHeader('x-api', message.name);

    xhr.send(JSON.stringify(message));
  }

  run (callback: Function) {
    axios.get('/@tickjs/context')
      .then(async res => {
        const context = res.data;
        this.context = context;

        this
          .define('__wxConfig', context)
          .define('WeixinJSCore', this.WeixinJSCore)
        
        this.script(`/@weixin/wxservice`);
        this.script(`/@app/service`);

        callback(context);
      });
  }
}    

