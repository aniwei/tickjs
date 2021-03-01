if (!h.__dev__) {
  const origin = h;
  

  h = Object.assign({}, origin, {
    
    invokeHandler: function () {
      // console.log('invokeHandler', arguments);
      origin.invokeHandler.apply(h, arguments)
    }, 

    publishHandler: function (name) {
      if (name === 'custom_event_log') {
        
      } else {
        console.log('publishHandler     ', arguments);
      }

      origin.publishHandler.apply(h, arguments)
    }
  })

  

  globalThis.WeixinJSCore.__dev__ = true;
}
//# sourceURL=./core/WeixinJSCore.js