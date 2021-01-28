import child_process from 'child_process';
import { Client } from 'rpc-websockets';

import {
  TICK_DAEMON_PORT
} from './shared/env'

export enum Commands {
  INIT = 'init',
  START = 'start',
  LS = 'ls'
}

export enum TickCLIRPCClientStatus {
  CONNECTED = 'connected',
  CONNECTING = 'connecting',
  DISCONNECTED = 'disconnected'
}

export class TickCLI {
  public client : Client | null = null;
  public status : TickCLIRPCClientStatus = TickCLIRPCClientStatus.DISCONNECTED;

  constructor () {
    this.status = TickCLIRPCClientStatus.CONNECTING;
    this.client = new Client(`ws://127.0.0.1:${TICK_DAEMON_PORT}`);
  }

  async connect (command) {
    if (!await this.ping()) {
      child_process.spawn('node ./daemon/index.js', {
        cwd: __dirname
      });
    }
  }



  async ping () : Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (this.status === TickCLIRPCClientStatus.CONNECTED) {
        return resolve(true);
      }

      const client: Client = new Client(`ws://127.0.0.1:${TICK_DAEMON_PORT}`);

      client.on('open', (ws) => {
        resolve(ws.call('ping'))
      });

      client.on('error', () => {
        resolve(false)
      })
    });
  }

  init = async () => {
    await this.connect(Commands.INIT)
  }


}

