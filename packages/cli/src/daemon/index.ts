import fs from 'fs-extra';
import path from 'path';
import debug from 'debug';
import { Server } from './rpc';

import {
  TICK_DAEMON_SOCK,
  TICK_CACHE,
  HOME
} from '../shared/env';

function isNotExistSockFile (sock) {
  return !fs.existsSync(sock)
}

export const daemon = new class {
  public server : Server | null = null;
  public sock = path.join(HOME, TICK_CACHE, TICK_DAEMON_SOCK);
  
  async launch () {
    debug('daemon is launching on %s', this.sock);

    console.log(this)

    if (isNotExistSockFile(this.sock)) {
      debug('creating sock file on %s', this.sock);
      fs.writeFileSync(this.sock, Buffer.from(''));
    }

    this.server = new Server(this.sock);
  }

  async command () {

  }
}

daemon.launch();
