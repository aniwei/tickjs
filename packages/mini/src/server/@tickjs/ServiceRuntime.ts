import axios from 'axios';
import mime from 'mime';
import { Config } from '../TickMini';
import { DefaultMessage, Runtime } from './Runtime';
import { WeixinJSCore } from './WeixinJSCore';

const defineProperty = Object.defineProperty;

export enum ServiceInvokeResultStatus {
  OK = 'ok',
  FAIL = 'fail'
}

export type ServiceInvokeResult = {
  status: ServiceInvokeResultStatus,
  data?: any,
  error?: any
}

export class ServiceRuntime extends Runtime {
  static runtime: ServiceRuntime | null = null;
  static sharedRuntime () {
    return this.runtime = new ServiceRuntime(globalThis, globalThis);
  }

  static evalute = eval;

  public WeixinJSCore: WeixinJSCore | null = null;
  public context: Config | null = null;
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

  scripts (scripts) {
    for (const script of scripts) {
      this.script(script);
    }
  }

  request (event: DefaultMessage, callback: Function) {
    const id = this.id++;

    callback({
      status: ServiceInvokeResultStatus.OK,
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

  invoke (message: DefaultMessage, callback: Function, async?: boolean) {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('load', (res: any) => {
      const contentType = res.target.getResponseHeader('content-type');
      const ext = mime.getExtension(contentType);
      
      if (ext === 'json' && res.target.responseText) {
        try {
          const data = JSON.parse(res.target.responseText);
          callback({
            status: ServiceInvokeResultStatus.OK,
            data,
          });
        } catch (error) {
          callback({
            status: ServiceInvokeResultStatus.FAIL,
            error,
          });
      }

      }
    });

    xhr.addEventListener('error', () => {});

    xhr.open(`POST`, `/@weixin/api/${message.name}`, !async);
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.setRequestHeader('x-api', message.name);

    xhr.send(JSON.stringify(message));
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

          this.scripts(scripts.concat(context.pages.map(page => {
            return `/@app/import?r=${page}`;
          })))
        }
        

        callback(context);
      });
  }
}    

