declare enum MessageTypes {
  PUBLISH = 'publishHandler',
  SUBSCRIBE = 'subscribeHandler',
  INVOKE = 'invokeHandler',
  CALLBACK = 'invokeCallbackHandler'
}

declare type MessageOptions = {
  [key: string]: any
}

declare type DefaultMessage = {
  type?: MessageTypes
  name?: string
  callbackId?: number | string
  errMsg?: string
  data?: any,
  options?: MessageOptions
}

declare interface ITinyEmitter {
  on (event: string, callback: Function, ctx?: any): this;
  once (event: string, callback: Function, ctx?: any): this;
  emit (event: string, ...args: any[]): this;
  off (event: string, callback?: Function): this;
}

declare interface IRuntime extends ITinyEmitter {
  sender: any;
  receiver: any;
  onMessage (message: DefaultMessage): void;

  subscribe (message: DefaultMessage): void;
  publish (message: DefaultMessage): void;
  invoke (message: DefaultMessage): void;
  callback (message: DefaultMessage): void;
}

declare interface IAppRuntime extends IRuntime {
  runtime: IAppRuntime | null;
  run (callback: Function): void;
}

declare interface ServiceRuntime extends IRuntime {
  runtime: IAppRuntime | null;
  context: TickAppConfig
  run (callback: Function): void;
}

declare interface IWeixinJSCore extends ITinyEmitter {

}

declare interface WeixinJSBridge {
  invokeCallbackHandler (callbackId: number, options: any): void
  subscribeHandler (name: string, data: any, options: any): void
}

declare interface IWeixinJSBridgeHolder extends WeixinJSBridge {

}
