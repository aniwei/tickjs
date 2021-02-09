import axios from 'axios';
import { EventEmitter } from 'events';
import { Invoker, InvokerInterface } from './Invoker';

class Request extends EventEmitter{
  static cursor = 0;

  public id: number = Request.cursor++;
  
  constructor (params) {
    super();

    setTimeout(() => {
      this.emit('change', {
        requestTaskId: this.id,
        state: 'success',
        data: `{}`,
        statusCode: 200,
        header: {}
      });
    }, 1000)
  }

}

export class AsyncRequest extends Invoker implements InvokerInterface {
  invoke (options, callbackId): void {
    super.invoke(options, callbackId);

    const request = new Request(options);
    
    request.on('change', this.onChange);

    this.data = {
      requestTaskId: request.id
    }

    this.success().async();
  }

  onChange = (data) => {
    this.program?.subscribeHandler('onRequestTaskStateChange', data, 0)
  }
}
