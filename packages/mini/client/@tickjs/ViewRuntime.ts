import axios from 'axios';
import { Runtime } from './Runtime';
import { WeixinJSCore } from './WeixinJSCore';



export class ViewRuntime extends Runtime {
  static runtime: ViewRuntime | null = null;
  static sharedRuntime (id: number) {
    return this.runtime = new ViewRuntime(window.parent, window, id);
  }

  static evalute = eval;

  public WeixinJSCore: WeixinJSCore | null = null;
  public context: any | null = null;
  public id: number;
  public responser: Function | null = null;
  
  constructor (sender: any, receiver: any, id: number) {
    super(sender, receiver);

    this.id = id;
    this.WeixinJSCore = new WeixinJSCore(`View`);
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

  request = (data, unknown, global) => {
    return this.responser(data, null, {})
  }

  refresh (responser) {
    this.responser = responser;
  }

  generate (route: string) {
    const __setCssStartTime__ = Date.now();
		__wxAppCode__[`${route}.wxss`]();
		const __setCssEndTime__ = Date.now();

    this.responser = $gwx(`./${route}.wxml`)

    document.dispatchEvent(new CustomEvent('generateFuncReady', {
      detail: {
        generateFunc: this.request
      }
    }));
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

