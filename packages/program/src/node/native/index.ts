import { MiniProgramImpl } from '../MiniProgramImpl';
import { Invoker, Invokers } from './Invoker';

import * as Storage from './Storage';
import * as System from './System';
import * as Network from './Network';
import * as Request from './Request';

export class NativeInvoker {
  public program: MiniProgramImpl | null = null;
  public invokers: Map<Invokers, any> = new Map();

  constructor (program) {    
    this.program = program;
  }

  get (name: Invokers): Invoker {
    const invoker: any = this.invokers.get(name);

    return invoker?.factory(this.program);
  }

  bind (name) {
    return {
      to: (Invoker) => {
        this.invokers.set(name, {
          instance: null,
          factory: (program) => {
            return new Invoker(name, program);
          }
        })
      }
    }
  }

  invoke (name: Invokers, options: any, callbackId: number) {
    const invoker: Invoker = this.get(name);
    if (invoker) {
      invoker.invoke(JSON.parse(options), callbackId);
    }
  }

  binding () {
    this.bind(Invokers.GET_STORAGE).to(Storage.AsyncGetter);
    this.bind(Invokers.GET_STORAGE_SYNC).to(Storage.SyncGetter);
    
    this.bind(Invokers.GET_SYSTEM_INFO).to(System.AsyncGetter);
    this.bind(Invokers.GET_SYSTEM_INFO_SYNC).to(System.SyncGetter);

    this.bind(Invokers.GET_NETWORK_TYPE).to(Network.AsyncGetter);

    this.bind(Invokers.CREATE_REQUEST_TASK).to(Request.SyncRequest);
  }
}
