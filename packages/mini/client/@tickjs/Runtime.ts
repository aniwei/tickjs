import mime from 'mime'
import { TinyEmitter } from 'tiny-emitter';

export enum MessageTypes {
  PUBLISH = 'publishHandler',
  SUBSCRIBE = 'subscribeHandler',
  INVOKE = 'invokeHandler',
  CALLBACK = 'invokeCallbackHandler'
}

export type DefaultMessage = {
  options: any,
  name: string,
  data?: any,
  type?: MessageTypes,
  callbackId?: number | string,
  [key: string]: any
}

export enum RuntimeInvokeResultStatus {
  OK = 'ok',
  FAIL = 'fail'
}

export type RuntimeInvokeResult = {
  status: RuntimeInvokeResultStatus,
  data?: any,
  error?: any
}

export class Runtime extends TinyEmitter {
  public sender: any = null;
  public receiver: any = null;

  constructor (sender: any, receiver: any) {
    super();

    this.sender = sender;
    this.receiver = receiver;

    this.receiver.addEventListener('message', (event: any) => {
      this.onMessage(event.data as DefaultMessage);
    });
  }

  invoke (message: DefaultMessage, callback: Function, async?: boolean) {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('load', (res: any) => {
      const contentType = res.target.getResponseHeader('content-type');
      const ext = mime.getExtension(contentType);
      
      if (ext === 'json' && res.target.responseText) {
        try {
          const data = JSON.parse(res.target.responseText);
          callback({
            status: RuntimeInvokeResultStatus.OK,
            data,
          });
        } catch (error) {
          callback({
            status: RuntimeInvokeResultStatus.FAIL,
            error,
          });
      }

      }
    });

    xhr.addEventListener('error', () => {});

    xhr.open(`POST`, `/@weixin/api/${message.name}`, !async);
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.setRequestHeader('x-api', message.name);

    xhr.send(JSON.stringify(message));
  }

  onMessage = (message: DefaultMessage): void => {
    switch (message.type) {
      case MessageTypes.CALLBACK: {
        const { callbackId } = message;

        this.emit(callbackId as string, message);
        break;
      }

      case MessageTypes.SUBSCRIBE:
      case MessageTypes.PUBLISH:
      case MessageTypes.INVOKE: {
        this.emit(message.name, message);
        break;
      }
    }

    this.emit('message', message);
  }

  subscribe (message: DefaultMessage) {
    this.sender.postMessage({ 
      ...message,
      type: MessageTypes.SUBSCRIBE,
    });
  }

  callback (message: DefaultMessage) {
    this.sender.postMessage({ 
      ...message, 
      type: MessageTypes.CALLBACK 
    });
  }

  publish (message: DefaultMessage) {
    this.sender.postMessage({
      ...message,
      type: MessageTypes.PUBLISH
    });
  }
}