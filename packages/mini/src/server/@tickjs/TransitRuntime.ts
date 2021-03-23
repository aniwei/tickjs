import { TinyEmitter } from 'tiny-emitter';
import { Config } from '../TickMini';
import { DefaultMessage, Runtime } from './Runtime';

import { debug } from './shared';

export enum ClientTypes {
  SERVICE = 'service',
  VIEW = 'view'
}

export class TransitRuntime extends TinyEmitter {
  static runtime: TransitRuntime | null = null;
  static sharedRuntime (config: Config) {
    return new TransitRuntime(config);
  }
  public clients: Map<string | number, any> = new Map();
  public state: number = 0;
  public isLaunched: boolean = false;
  public config: Config | null = null;
  public id: number = 0;

  constructor (config: Config) {
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

  launch (id?: string | number) {
    if (!this.isLaunched) {
      this.isLaunched = true;

      const client = this.clients.get('service');

      if (client) {
        const { runtime } = client;
        const launchOptions = (this.config as any).launchOptions;

        runtime.subscribe({
          name: 'onAppRoute', 
          data: {
            ...launchOptions,
            openType: 'switchTab'
          },
          id
        });
      }

    }
  }
}