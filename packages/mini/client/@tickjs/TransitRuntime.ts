import { TinyEmitter } from 'tiny-emitter';
import { DefaultMessage, Runtime } from './Runtime';

import { debug } from './shared';

export enum ClientTypes {
  SERVICE = 'service',
  VIEW = 'view'
}

export class TransitRuntime extends TinyEmitter {
  static runtime: TransitRuntime | null = null;
  static sharedRuntime (config: any) {
    return new TransitRuntime(config);
  }
  public clients: Map<string | number, any> = new Map();
  public state: number = 0;
  public isLaunched: boolean = false;
  public config: any | null = null;
  public id: number = 0;

  constructor (config: any) {
    super();

    this.config = config;
  }

  connect (id: number | string, sender: any, receiver: any, type: ClientTypes) {
    const runtime = new Runtime(sender, receiver);

    runtime.on('message', this.onMessage);

    this.clients.set(id, {
      id,
      type,
      runtime,
    });
  }

  onMessage = (event: DefaultMessage) => {
    this.emit(event.name, event);
  }

  navigate (id: string | number, route: string, type: string, query: any) {
    const client = this.clients.get('service');

    if (client) {
      const { runtime } = client;
      const launchOptions = (this.config as any).launchOptions;
      const data = this.isLaunched ? {
        path: route,
        openType: type,
        query
      } : {
        ...launchOptions,
        openType: type
      };

      this.isLaunched = true;

      runtime.subscribe({
        name: 'onAppRoute', 
        data,
        id
      });
    }
  }
}