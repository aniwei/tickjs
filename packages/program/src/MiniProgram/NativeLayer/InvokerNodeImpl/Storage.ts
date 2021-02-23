import { Invoker, InvokerInterface } from './Invoker';

export class AsyncGetter extends Invoker implements InvokerInterface {
  invoke (options, callbackId): void {
    super.invoke(options, callbackId);

    this.success().async();
  }
}

export class SyncGetter extends Invoker implements InvokerInterface {
  invoke (options, callbackId): void {
    super.invoke(options, callbackId);

    this.success().sync();
  }
}