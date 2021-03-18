import { TinyEmitter } from 'tiny-emitter';

export enum MessageTypes {
  PUBLISH = 'publishHandler',
  SUBSCRIBE = 'subscribeHandler',
  INVOKE = 'invokeHandler',
  CALLBACK = 'invokeCallbackHandler'
}

export class Runtime extends TinyEmitter implements IRuntime {
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

  onMessage = (
    message: DefaultMessage): void => {
    switch (message.type) {
      case MessageTypes.CALLBACK: {
        const { callbackId } = message;

        this.emit(callbackId as string, message);
        break;
      }

      case MessageTypes.INVOKE: {
        this.emit(message.name, message);
        break;
      }

      case MessageTypes.PUBLISH: {
        this.emit(message.name, message);
        break;
      }

      case MessageTypes.SUBSCRIBE: {
        this.emit(message.name, message);
        break;
      }
    }
  }

  subscribe (message: DefaultMessage) {
    this.sender({ 
      ...message,
      type: MessageTypes.SUBSCRIBE,
    });
  }

  callback (message: DefaultMessage) {
    this.sender({ 
      ...message, 
      type: MessageTypes.CALLBACK 
    });
  }

  invoke (message: DefaultMessage) {
    this.sender.postMessage({
      ...message,
      type: MessageTypes.INVOKE,
    });
  }

  publish (message: DefaultMessage) {
    this.sender.postMessage({
      ...message,
      type: MessageTypes.PUBLISH
    });
  }
}