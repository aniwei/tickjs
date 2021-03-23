import URL from 'url-parse';
import { TinyEmitter } from 'tiny-emitter';
import { Config } from '../TickMini';
import { DefaultMessage, Runtime } from './Runtime';

import { debug } from './shared';

export enum ClientTypes {
  SERVICE = 'service',
  VIEW = 'view'
}

const nativeDebug = debug(`Native`, `#690`);

export class NativeRuntime extends TinyEmitter {
  static runtime: NativeRuntime | null = null;
  static sharedRuntime (config: Config) {
    return new NativeRuntime(config);
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

  request (event: DefaultMessage) {
    const client = this.clients.get('service');

    if (client) {
      const { runtime } = client;
      const id = this.id++;

      const { options } = event;
      const url = new URL(options.url);

      const pathname = url.pathname;
      const query = url.query ? `${url.query}` : ``;

      nativeDebug(`网络请求`, options.url)

      fetch(`/@tickjs/api${pathname}${query}`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-api': 'createRequestTask'
        },
        body: JSON.stringify(options)
      }).then(res => {
        debugger;
      }).catch(error => {
        debugger;
      })

      runtime.callback({
        callbackId: event.callbackId,
        requestTaskId: id
      })
    }
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