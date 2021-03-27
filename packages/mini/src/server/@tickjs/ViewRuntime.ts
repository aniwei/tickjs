import axios from 'axios';
import { Config } from '../TickMini';
import { Runtime } from './Runtime';
import { WeixinJSCore } from './WeixinJSCore';

export class ViewRuntime extends Runtime {
  static runtime: ViewRuntime | null = null;
  static sharedRuntime (id: number) {
    return this.runtime = new ViewRuntime(window.parent, window, id);
  }

  static evalute = eval;

  public WeixinJSCore: WeixinJSCore | null = null;
  public context: Config | null = null;
  public id: number;
  
  constructor (sender: any, receiver: any, id: number) {
    super(sender, receiver);

    this.WeixinJSCore = new WeixinJSCore(`View`);
    this.id = id;
  }

  define (propName: string, value: any) {
    try {
      Object.defineProperty(window, propName, {
        get () {
          return value
        }
      });
    } catch (err) {}

    return this;
  }

  run (callback: Function) {
    axios.get('/@proj/context')
      .then(async res => {
        const context = res.data;
        this.context = context;

        this
          .define('__wxConfig', context)
          .define('__webviewId', this.id)
          .define('WeixinJSCore', this.WeixinJSCore)

        callback(context);
      });
  }
}    

