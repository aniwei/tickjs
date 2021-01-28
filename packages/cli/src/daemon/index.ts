import { Server } from 'rpc-websockets';

import {
  TICK_DAEMON_PORT
} from '../shared/env'

export const daemon = new class {
  public server: Server | null = null;
  
  async launch () {
    this.server = new Server({
      port: TICK_DAEMON_PORT,
      host: '127.0.0.1'
    });

    this.server.register('ping', () => {
      return true;
    });

    this.server.register('command', () => {

    });

    this.server.event('heartbeat');
  }

  async command () {

  }
}

