import debug from 'debug';
import { MiniProgramImpl } from '../MiniProgramImpl';
import { nextTick } from './shared';


export enum Invokers {
  GET_STORAGE = 'getStorage',
  GET_STORAGE_SYNC = 'getStorageSync',

  SET_STORAGE = 'setStorage',
  SET_STORAGE_SYNC = 'setStorageSync',

  GET_SYSTEM_INFO = 'getSystemInfo',
  GET_SYSTEM_INFO_SYNC = 'getSystemInfo',

  GET_NETWORK_TYPE = 'getNetworkType',

  CREATE_REQUEST_TASK = 'createRequestTask',
}

export type InvokeResponse = {
  errMsg: string,
  data: any,
  dataType: string,
}

export class Invoker {
  public name: Invokers | null = null;
  public message: string | null = null;
  public program: MiniProgramImpl | null = null;
  public data: any | null = null;
  public callbackId: number | null = null;

  constructor (
    name: Invokers,
    program: MiniProgramImpl
  ) {
    this.name = name;
    this.program = program;
  }

  invoke (options, callbackId) {
    this.callbackId = callbackId;
  }
  
  sync (): void {
    debug('Invoker')('同步调用：%s, %d, %s', this.name, this.data, this.message);

    this.program?.invokeCallbackHandler(this.callbackId as number, {
      errMsg: this.message,
      ...this.data
    });
  }
  
  async (): void {
    debug('Invoker')('异步调用：%s, %d, %s', this.name, this.data, this.message);

    nextTick(() => {
      this.program?.invokeCallbackHandler(this.callbackId as number, {
        errMsg: this.message,
        ...this.data
      });
    })
  }
  
  success (): Invoker {
    this.message = `${this.name}:ok`;

    return this;
  }
  fail (): Invoker {
    this.message = `${this.name}:fail`;

    return this;
  }
}

export interface InvokerInterface {
 
  invoke (options: any, callbackId?: number): void;
  sync (): void;
  async (): void;
  success (): Invoker;
  fail (): Invoker;
}