import { TinyEmitter } from 'tiny-emitter';
import * as shared from './shared';

const JSCoreDebug = shared.debug('WeixinJSCore', 'info');

export class WeixinJSCore extends TinyEmitter {
  invokeHandler (name: string, options: any, callbackId: number) {
    JSCoreDebug(
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
    JSCoreDebug(
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