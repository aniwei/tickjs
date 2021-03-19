import { Runtime } from './Runtime';

export class ClientRuntime extends Runtime {
  static runtime: ClientRuntime | null = null;
  static sharedRuntime (uri: string): ClientRuntime {
    if (this.runtime) {
      return this.runtime;
    }

    const worker: Worker = new Worker(uri);

    return this.runtime = new ClientRuntime(worker, worker);
  }

  constructor (sender: Worker, receiver: Worker) {
    super(sender, receiver);
  }

  run (callback: Function) {
    this.on('appserviceready', callback);
    return this;
  }
}