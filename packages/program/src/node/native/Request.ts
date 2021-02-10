import axios from 'axios';
import { EventEmitter } from 'events';
import { Invoker, InvokerInterface } from './Invoker';

class Request extends EventEmitter{
  static cursor = 1;

  public id: number = Request.cursor++;
  
  constructor (params) {
    super();

    debugger;

    setTimeout(() => {
      this.emit('change', {
        requestTaskId: String(this.id),
        state: 'headersReceived',
        data: `{}`,
        statusCode: 200,
        header: {}
      });
    }, 500)

    setTimeout(() => {
      this.emit('change', {
        requestTaskId: String(this.id),
        state: 'success',
        data: `{}`,
        statusCode: 200,
        header: {}
      });
    }, 1000)
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
    this.program?.subscribeHandler('onRequestTaskStateChange', data, 0)
  }
}
