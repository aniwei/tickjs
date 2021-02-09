import debug from 'debug'
import vm from 'vm';
import { MiniProgram } from '../MiniProgram';

import {
  NativeInvoker
} from './native';

export class MiniProgramImpl extends MiniProgram {
  public invoker: NativeInvoker | null = null;

  constructor () {
    super();

    this.invoker = new NativeInvoker(this);
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


  invokeHandler = (name, options, callbackId) => {
    debug('MiniProgramImpl')('调用原生能力：%s, %d', name, callbackId);
    console.log('调用原生能力：%s, %d', name, callbackId);

    this.invoker?.invoke(name, options, callbackId);
  }

  publishHandler = () => {
    
  }
}
