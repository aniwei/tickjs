
import Message from 'amp-message';
import fs from 'fs-extra';
import debug from 'debug';
import net from 'net';
import URL from 'url';
import { EventEmitter } from 'events';
import { Stream } from 'amp';
import { defaultCipherList } from 'constants';


export enum NetSocketError {
  ECONNREFUSED = 'ECONNREFUSED',
  ECONNRESET = 'ECONNRESET',
  ETIMEDOUT = 'ETIMEDOUT',
  EHOSTUNREACH = 'EHOSTUNREACH',
  ENETUNREACH = 'ENETUNREACH',
  ENETDOWN = 'ENETDOWN',
  EPIPE = 'EPIPE',
  ENOENT = 'ENOENT'
}

export let messageId = 0;
export function getMessageId () {
  return `message_` + messageId++;
}

export function pack (message) {
  return new Message(message).toBuffer();
}

export class Server extends EventEmitter {
  public server: net.Server | null = null;
  public socks: net.Socket[] = [];

  public listen (uri: string) {
    this.server = net.createServer(this.onConnect);
    
    this.server.on('error', (error) => this.onError(error, uri));
    this.server.on('close', this.onClose);
    this.server.on('listening', this.onListening);

    const parsed = URL.parse(uri);
    
    this.server.listen(parsed.pathname, () => {
      debug('server')('服务已经启动，监听路径 %s', uri)
    })
  }

  close () {
    debug('server')('正在关闭 socket 连接', this.socks.length);

    for (const sock of this.socks) {
      sock.destroy();
    }

    if (this.server) {
      this.server.close();
      this.server.removeAllListeners();
    }
  }

  remove (sock) {
    const index = this.socks.indexOf(sock);

    if (index > -1) {
      debug(`sock`)('正在删除 socket %d', index);
      this.socks.splice(index, 1);
      sock.removeAllListeners();
    }
  }

  add (sock: net.Socket) {
    const stream = new Stream;
    const index = this.socks.push(sock) - 1;
    
    debug('server')('正在添加 socket %d', index);

    sock.pipe(stream);
    sock.on('close', () => stream.removeAllListeners());
    
    stream.on('data', (data: Buffer) => this.onMessage(data, sock));
  };

  onMessage = (data: Buffer, sock?: net.Socket) => {
    const message = new Message(data).args[0];
    debug('server')('接收消息 %o', message);

    this.emit('message', message, (data) => {
      debug('server')('响应消息 %o', data);
      sock?.write(pack([data]));
    }, sock);
  }

  onConnect = (sock) => {
    const { remoteAddress, remotePort } = sock;
    let address;

    if (remoteAddress && remoteAddress) {
      address = `${remoteAddress}:${remotePort}`
    }

    debug('server')('正在连接 %s', address || '');

    this.add(sock);
    this.emit('connect', sock);

    sock.on('error', (error) => {
      debug('server')('Sock 连接错误 %s', error.code || error.message);
      this.emit('error', error);
    });

    sock.on('close', () => {
      debug('server')('关闭连接 %s', address || '');
      
      this.emit('disconnect', sock);
      this.remove(sock);
    });
  }

  onError = (error, uri) => {
    debug('server')('发生错误，错误信息：%s', error.code || error.message);

    if (error.code === 'EADDRINUSE') {
      const sock = new net.Socket();

      const parsed = URL.parse(uri);      

      sock.on('error', (error: any) => {
        if (error.code == 'ECONNREFUSED') {
          fs.unlink(parsed.pathname as string);
          this.listen(uri);
        }

        sock.removeAllListeners();
      });

      sock.connect({ path: parsed.pathname as string }, () => {
        sock.destroy();
        sock.removeAllListeners();
      });
    } else {
      this.emit('error', error);
    }
  }

  onClose = () => {
    this.emit('close');
  }

  onListening = () => {
    this.emit('listening');
  }
}

export class Client extends EventEmitter {
  public sock: net.Socket | null = null;
  public stream: Stream | null = null;
  public connected: boolean = false;

  connect (uri: string) {
    const parsed = URL.parse(uri);
    this.sock = new net.Socket();

    debug('client')('链接地址：%s', parsed.pathname);
    
    this.sock.on('close', this.onClose);
    this.sock.on('error', this.onError);
    this.sock.on('connect', () => this.onConnect(uri));

    this.sock.setNoDelay();
    this.sock.connect((parsed.pathname as string));

    const stream = new Stream();
    stream.on('data', (data) => this.onMessage(data, this.sock))

    this.sock.pipe(stream);

    this.stream = stream;
  }

  close () {
    this.sock?.destroy();
    this.sock?.removeAllListeners();

    this.stream.removeAllListeners();
    this.stream = null;
  }

  send (message): Client {
    const packed = pack([message]);

    debug('client')('发送消息：%s', packed);

    if (this.sock?.writable) {
      this.sock.write(packed);
    }

    return this;
  }

  onMessage = (data, sock?: net.Socket | null) => {
    const message = new Message(data).args[0];
    
    this.emit('message', message, (data) => {
      debug('client')('响应消息 %s', message);
      this.send(data);
    }, this.sock);

    debug('client')('接收消息 %s', message);

    if (!isCalled) {

    }

  }

  onClose = () => {
    debug('client')('关闭连接');
    this.connected = false;
    this.emit('close');
  }

  onError = (error) => {
    this.emit('error', error)
  }

  onConnect = (uri) => {
    debug('client')('已经连接服务器');
    const parsed = URL.parse(uri);
    
    this.connected = true;

    this.emit('connect');
  }
}

