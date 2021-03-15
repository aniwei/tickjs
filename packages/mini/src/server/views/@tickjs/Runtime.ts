import { TinyEmitter } from 'tiny-emitter';

export enum MessageType {
  PUBLISH = 'publishHandler',
  SUBSCRIBE = 'subscribeHandler',
  INVOKE = 'invokeHandler',
  CALLBACK = 'invokeCallbackHandler'
}

export type DefaultMessage = {
  type?: MessageType,
  options: object
}

export type PublishMessage = DefaultMessage & {
  name: string
}

export type InvokeMessage = DefaultMessage & {
  name: string
  callbackId: string | number
}

export type SubscribeMessage = DefaultMessage & {
  data: any,
  name: string
}

export type InvokeCallbackMessage = DefaultMessage & {
  callbackId: string | number,
  errMsg: string
}

export class Runtime extends TinyEmitter {
  public sender: any = null;
  public receiver: any = null;

  constructor (sender: any, receiver: any) {
    super();

    this.sender = sender;
    this.receiver = receiver;

    this.receiver.addEventListener('message', this.onMessage);
  }

  onMessage = (
    message: SubscribeMessage | 
      InvokeCallbackMessage | 
      InvokeMessage | 
      PublishMessage
  ) => {
    switch (message.type) {
      case MessageType.CALLBACK: {
        break;
      }

      case MessageType.INVOKE: {
        break;
      }

      case MessageType.PUBLISH: {
        break;
      }

      case MessageType.SUBSCRIBE: {
        break;
      }
    }
  }

  subscribe (message: SubscribeMessage) {
    this.sender({ 
      ...message,
      type: MessageType.SUBSCRIBE,
    });
  }

  callback (message: InvokeCallbackMessage) {
    this.sender({ 
      ...message, 
      type: MessageType.CALLBACK 
    });
  }

  invoke (message: InvokeMessage) {
    this.sender.postMessage({
      ...message,
      type: MessageType.INVOKE,
    });
  }

  publish (message: PublishMessage) {
    this.sender.postMessage({
      ...message,
      type: MessageType.PUBLISH
    });
  }
}