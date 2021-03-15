import { TinyEmitter } from 'tiny-emitter';

export enum MessageType {
  PUBLISH = 'publishHandler',
  SUBSCRIBE = 'subscribeHandler',
  INVOKE = 'invokeHandler',
  CALLBACK = 'invokeCallbackHandler'
}

export type DefaultMessage = {
  type: MessageType,
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
  callbackId: string | number
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
    this.sender(message);
  }

  callback (message: InvokeCallbackMessage) {
    this.sender(message);
  }

  invoke (message: InvokeMessage) {
    this.sender.postMessage(message);
  }

  publish (message: PublishMessage) {
    this.sender.postMessage(message);
  }
}