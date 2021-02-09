if (!globalThis.WeixinJSBridge.__dev__) {
  const originWeixinJSBridge = globalThis.WeixinJSBridge;
  

  globalThis.WeixinJSBridge = Object.assign({}, originWeixinJSBridge, {
    
    invokeCallbackHandler: function () {
      console.log('「invokeCallbackHandler」', arguments);
      originWeixinJSBridge.invokeCallbackHandler.apply(globalThis.WeixinJSBridge, arguments)
    }
  })

  globalThis.WeixinJSBridge.__dev__ = true;
}
