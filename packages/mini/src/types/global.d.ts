declare module global {
  interface Window {
    __wxConfig: any,
    __deviceInfo: any,
    WeixinJSCore: any,
    WeixinJSBridge: any,
  }

  interface globalThis {
    process: any,
    __wxConfig: any,
    __deviceInfo: any,
    WeixinJSCore: any,
    WeixinJSBridge: any,
  }
}

declare module 'http' {
  interface IncomingMessage {
    rawBody: any;
    body: any;
  }
}