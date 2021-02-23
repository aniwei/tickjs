import axios from 'axios';
import { EventEmitter } from 'events';
import { Invoker, InvokerInterface } from './Invoker';

class Request extends EventEmitter {
  static cursor = 1;

  public id: number = Request.cursor++;
  
  constructor (options) {
    super();

    axios({
      ...options,
      headers: {
        ...options.header
      },
    }).then(res => {
      this.emit('change', {
        requestTaskId: String(this.id),
        state: 'success',
        data: JSON.stringify(res.data),
        statusCode: res.status,
        header: res.headers
      });
    }).catch(error => {
      this.emit('change', {
        requestTaskId: String(this.id),
        state: 'error',
        data: JSON.stringify(error.data),
        statusCode: error.status,
        header: error.headers
      });
    })
  }
}

export class SyncRequest extends Invoker implements InvokerInterface {
  invoke (options, callbackId): void {
    super.invoke(options, callbackId);

    const request = new Request(options);
    
    request.on('change', this.onChange);

    this.data = {
      requestTaskId: String(request.id)
    }

    this.success().sync();
  }

  onChange = (data) => {
    this.owner?.subscribeServiceHandler('onRequestTaskStateChange', data, 0, {})
  }
}
