if (!h.__dev__) {
  const origin = h;
  

  h = Object.assign({}, origin, {
    
    invokeHandler: function () {
      // console.log('invokeHandler', arguments);
      origin.invokeHandler.apply(h, arguments)
    }, 

    publishHandler: function () {
      // console.log('publishHandler     ', arguments);
      debugger;
      origin.publishHandler.apply(h, arguments)
    }
  })

  

  globalThis.WeixinJSCore.__dev__ = true;
}
