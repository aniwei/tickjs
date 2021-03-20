export class TickJSBridgeOwner {
  public owner: any | null = null;
  public WeixinJSBridge: any | null = null

  constructor (ref: any) {
    this.owner = ref;
    this.WeixinJSBridge = this.owner.current ? 
      this.owner.current.contentWindow.WeixinJSBridge : null;
  }

  subscribeHandler (name: string, data: any, options: any): void {
    if (this.WeixinJSBridge) {
     this. WeixinJSBridge.subscribeHandler(name, data, options);
    }
  }

  invokeCallbackHandler (callbackId: number, options: any): void {
    if (this.WeixinJSBridge) {
      this.WeixinJSBridge.subscribeHandler(callbackId, options);
    }
  }
}