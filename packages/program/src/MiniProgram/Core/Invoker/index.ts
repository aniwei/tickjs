import { MiniProgram } from '../MiniProgram';
import { Invokers } from './Invoker';

import * as Storage from './Storage';
import * as System from './System';
import * as Network from './Network';
import * as Request from './Request';

export class Invoker {
  public owner: MiniProgram | null = null;
  public invokers: Map<Invokers, any> = new Map();

  get (name: Invokers) {
    const invoker: any = this.invokers.get(name);

    return invoker?.factory(this.owner);
  }

  bind (name) {
    return {
      to: (Invoker) => {
        this.invokers.set(name, {
          instance: null,
          factory: (owner) => {
            return new Invoker(name, owner);
          }
        })
      }
    }
  }

  invoke (name: Invokers, options: any, callbackId: number) {
    const invoker = this.get(name);
    if (invoker) {
      invoker.invoke(JSON.parse(options), callbackId);
    }
  }

  binding (owner) {
    this.owner = owner;

    this.bind(Invokers.GET_STORAGE).to(Storage.AsyncGetter);
    this.bind(Invokers.GET_STORAGE_SYNC).to(Storage.SyncGetter);
    
    this.bind(Invokers.GET_SYSTEM_INFO).to(System.AsyncGetter);
    this.bind(Invokers.GET_SYSTEM_INFO_SYNC).to(System.SyncGetter);

    this.bind(Invokers.GET_NETWORK_TYPE).to(Network.AsyncGetter);

    this.bind(Invokers.CREATE_REQUEST_TASK).to(Request.SyncRequest);
  }
}
