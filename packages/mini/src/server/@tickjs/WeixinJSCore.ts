import { TinyEmitter } from 'tiny-emitter';
import * as shared from './shared';

const debug = shared.debug('WeixinJSCore', 'info');

export class WeixinJSCore extends TinyEmitter {
  public type: string;

  constructor (type: string) {
    super();
    this.type = type;
  }

  invokeHandler (name: string, options: any, callbackId: number) {
    debug(
      this.type,
      `invokeHandler`,
      `接口:`, name,
      `数据:`, options,
      `回调函数:`, callbackId
    );

    this.emit(name, {
      name, 
      options,
      callbackId
    });
  }

  publishHandler (name: string, data: any, webviewId: string) {
    debug(
      this.type,
      `publishHandler`,
      `事件:`, name,
      `数据:`, data,
      `WebViewId:`, webviewId
    );

    this.emit(name, {
      name, 
      data,
      webviewId
    });
  }  
}