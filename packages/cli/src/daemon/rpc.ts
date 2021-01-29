import net from 'net';
import debug from 'debug';
import events from 'events';

export class Socket extends events.EventEmitter {
  protected server : net.Server | null = null;
  protected socks : net.Socket[] = []

  constructor (sock: string) {
    super();
    this.server = new net.Server(this.onConnect);
    this.server.on('listening', this.onListening);

    debug(`rpc:server`)(`Net server binding on %s`, sock);

    this.server.listen(sock, () => {
      debug(`rpc:server`)(`Net server was started`);
    });
  }

  add (sock) {
    this.socks.push(sock);
  }

  remove (sock) {
    const index = this.socks.indexOf(sock);
    
    if (index > -1) {
      this.socks.splice(index, 1);
    }
  }

  onListening = () => {
    debug(`rpc:server`)(`Net server was started`);

  }

  onConnect = (sock) => {
    debug(`rpc:server`)('server accept %s', sock.remoteAddress + ':' + sock.remotePort);

    sock.on('error', (error) => this.onError(error, sock));
    sock.on('close', () => this.onClose(sock));
  }

  onClose = (sock: net.Socket) => {

  }

  onError = (error, sock: net.Socket) => {
    debug(`rpc:server`)('error %s', error.code || error.message);

    this.emit('error', error); 
  }

  onMessage = (message) => {
    debug(`rpc:message`)('error %s', message);
  }

  close () {
    this.server?.close();
  }
}

export class Client {
  protected client : net.Socket | null = null;

  constructor (sock) {

  }
}