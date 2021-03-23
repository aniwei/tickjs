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