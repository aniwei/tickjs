import { Runtime } from './Runtime';

export default class AppRuntime extends Runtime {
  static runtime: AppRuntime | null = null;
  static shareAppRuntime (uri: string): AppRuntime {
    if (this.runtime) {
      return this.runtime;
    }

    const worker: Worker = new Worker(uri);

    return this.runtime = new AppRuntime(worker, worker);
  }

  constructor (sender: Worker, receiver: Worker) {
    super(sender, receiver);
  }

  run (callback: Function) {
    this.on('appserviceready', callback);
    return this;
  }
}