import debug from 'debug';
import { ChildProcess, fork } from 'child_process';
import { Client } from 'rpc-websockets';

import {
  TICK_DAEMON_PORT,
  TICK_DAEMON_HOST
} from './shared/env'

export enum Commands {
  INIT = 'init',
  START = 'start',
  LS = 'ls'
}

export enum CLIStatus {
  CONNECTED = 'connected',
  CONNECTING = 'connecting',
  DISCONNECTED = 'disconnected'
}

const CLIDebug = debug('cli');

export class CLI {
  public client : Client | null = null;
  public status : CLIStatus = CLIStatus.DISCONNECTED;
  public uri: string = `ws:/${TICK_DAEMON_HOST}:${TICK_DAEMON_PORT}`;

  constructor () {
    this.status = CLIStatus.CONNECTING;
    this.client = new Client(`ws://${TICK_DAEMON_HOST}:${TICK_DAEMON_PORT}`);
  }

  async connect (command) {
    if (!await this.ping()) {
      await this.fork();
    }
  }


  async fork (): Promise<boolean> {
    return new Promise((resolve) => {
      const ps : ChildProcess = fork('./daemon/index.js', { 
        cwd: __dirname 
      });

      ps.on('error', (error) => {
        console.log(error);
      })

      ps.on('message', () => {
        resolve(true)
      });
    })
  }

  async ping () : Promise<boolean> {

    if (this.status === CLIStatus.CONNECTED) {
      return true;
    }
    
    return new Promise((resolve, reject) => {
      const client: Client = new Client(this.uri);

      client.on('open', () => {
        client.call('ping').then(res => resolve(res as boolean));
      });

      client.on('error', ({ error }) => {
        resolve(false)
      })
    });
  }

  init = async () => {
    await this.connect(Commands.INIT)
  }


}

