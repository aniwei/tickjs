declare global {
  interface Window {
    __wxConfig: any,
    __deviceInfo: any,
    __TICK_RUNTIME: any,
    WeixinJSCore: any,
    WeixinJSBridge: any,
  }

  interface globalThis {
    process: any
    __dirname: any,
    __TICK_RUNTIME: any,
  }
}