if (!window.WeixinJSBridge.__dev__) {
  const originWeixinJSBridge = window.WeixinJSBridge;
  

  window.WeixinJSBridge = Object.assign({}, originWeixinJSBridge, {
    
    invokeCallbackHandler: function () {
      console.log('WebView「invokeCallbackHandler」', arguments);
      originWeixinJSBridge.invokeCallbackHandler.apply(window.WeixinJSBridge, arguments)
    }, 

    subscribeHandler: function () {
      debugger;
      console.log('WebView「subscribeHandler」     ', arguments);
      originWeixinJSBridge.subscribeHandler.apply(window.WeixinJSBridge, arguments)
    },

    on: function () {
      console.log('WebView「on」                   ', arguments);
      originWeixinJSBridge.on.apply(window.WeixinJSBridge, arguments)
    },
  })

  

  window.WeixinJSBridge.__dev__ = true;
}
