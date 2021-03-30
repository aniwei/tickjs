import axios from 'axios';
import { DefaultMessage, RuntimeInvokeResultStatus, Runtime } from './Runtime';
import { WeixinJSCore } from './WeixinJSCore';

const defineProperty = Object.defineProperty;

export class ServiceRuntime extends Runtime {
  static runtime: ServiceRuntime | null = null;
  static sharedRuntime () {
    return this.runtime = new ServiceRuntime(globalThis, globalThis);
  }

  static evalute = eval;

  public WeixinJSCore: WeixinJSCore | null = null;
  public context: any | null = null;
  public id: number = 1;
  
  constructor (sender: any, receiver: any) {
    super(sender, receiver);

    this.WeixinJSCore = new WeixinJSCore(`Service`);
  }

  define (propName: string, value: any) {
    defineProperty(globalThis, propName, {
      get () {
        return value;
      },

      set (v) {
        value = v
      }
    });

    return this;
  }

  script (uri: string) {
    (globalThis as any).importScripts(uri)
  }

  scripts (scripts: string[]) {
    for (const script of scripts) {
      this.script(script);
    }
  }

  request (event: DefaultMessage, callback: Function) {
    const id = this.id++;

    callback({
      status: RuntimeInvokeResultStatus.OK,
      data: {
        requestTaskId: id
      }
    });

    this.invoke(event, (result: any) => {
      this.emit('onRequestTaskStateChange', {
        name: `onRequestTaskStateChange`,
        data: {
          requestTaskId: id,
          state: 'success',
          ...result.data,
        }
      });
    });
  }

  run (callback: Function) {
    axios.get('/@proj/context')
      .then(async res => {
        const context = res.data;
        this.context = context;

        this
          .define('__wxConfig', context)
          .define('WeixinJSCore', this.WeixinJSCore)
          .define('window', globalThis)
          .define('__wxBegin', null)
          .define('__wxRouteBegin', null)
          .define('__wxAppCurrentFile__', null)

        if (context.env.type !== 'develop') {
          this.scripts([
            '/@weixin/wxservice',
            '/@app/service'
          ]);
        } else {
          const scripts = [
            '/@weixin/wxservice',
            '/@app/service',
            '/@app/import?r=app'
          ];

          this.scripts(scripts.concat(context.pages.map((page: string) => {
            return `/@app/import?r=${page}`;
          })))
        }
        

        callback(context);
      });
  }
}    

