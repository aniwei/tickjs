declare global {
  interface Window {
    __wxConfig: any,
    __deviceInfo: any,
    __TICK_CONTEXT: any,
    WeixinJSCore: any,
    WeixinJSBridge: any,
  }

  interface globalThis {
    process: any
    __TICK_CONTEXT: any,
  }
}