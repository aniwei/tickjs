declare global {
  interface Window {
    __wxConfig: any,

    WeixinJSCore: {
      invokeHandler: Function,
      publishHandler: Function
    },

    WeixinJSBridge: {
      invokeCallbackHandler: Function,
      publish: Function,
      subscribeHandler: Function,
      subscribe: Function,
    }
  }

  interface globalThis {
    process: any
  }
}