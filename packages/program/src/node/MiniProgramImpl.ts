import debug from 'debug'
import vm from 'vm';
import { MiniProgram } from '../MiniProgram';
import { MiniProgramRenderer } from './renderer';

import {
  NativeInvoker
} from './native';

export class MiniProgramImpl extends MiniProgram {
  public invoker: NativeInvoker | null = null;
  public renderer: MiniProgramRenderer | null = null;
  public config: any | null = null;
  public appid: string | null = null;

  constructor (appid, config) {
    super();

    this.appid = appid;
    this.config = config;
    this.invoker = new NativeInvoker(this);
    this.renderer = new MiniProgramRenderer();
    this.invoker.binding();
  }

  evaluateScript (code: string, filename?: string) {
    vm.runInNewContext(code, this.context, {
      filename
    });
  }

  runInContext (context: any | null) {
    this.context = context;
  }

  async launch (options) {
    await this.renderer?.launch();
    super.launch(options);

    this.renderer?.open(options.path, this.config);
  }

  invokeHandler = (name, options, callbackId) => {
    debug('MiniProgramImpl')('调用原生能力：%s, %d', name, callbackId);
    console.log('调用原生能力：%s, %d', name, callbackId);

    this.invoker?.invoke(name, options, callbackId);
  }

  publishHandler = () => {
    
  }
}
