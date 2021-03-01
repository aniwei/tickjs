if (!globalThis.WeixinJSBridge.__dev__) {
  const originWeixinJSBridge = globalThis.WeixinJSBridge;
  

  globalThis.WeixinJSBridge = Object.assign({}, originWeixinJSBridge, {
    
    invokeCallbackHandler: function () {
      console.log('「invokeCallbackHandler」', arguments);
      originWeixinJSBridge.invokeCallbackHandler.apply(globalThis.WeixinJSBridge, arguments)
    }, 

    subscribeHandler: function () {
      console.log('「subscribeHandler」     ', arguments);
      originWeixinJSBridge.subscribeHandler.apply(globalThis.WeixinJSBridge, arguments)
    },

    on: function () {
      console.log('「on」                   ', arguments);
      originWeixinJSBridge.on.apply(globalThis.WeixinJSBridge, arguments)
    },
  })

  

  globalThis.WeixinJSBridge.__dev__ = true;
}

//# sourceURL=WeixinJSBridge.js