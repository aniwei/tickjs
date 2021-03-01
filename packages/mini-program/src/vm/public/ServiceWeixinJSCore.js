(function () {
  const nextTick = window.setTimeout;
  const console = window.console
  
  const WeixinJSCore = {
    invokeHandler (name , data, callbackId) {
      console.log(`【消息调用`, 'Service】', `「WeixinJSCore.invokeHandler」调用借口：${name}`, ` 数据：`, data, ` 回调函数：`,callbackId);
      
      document.dispatchEvent(new CustomEvent(`service.${name}`, {
        detail: {
          name, 
          data, 
          callbackId,
          source: 'service',
        }
      }))
    },
  
    publishHandler (name, data, webviewId) {
      console.log(`【消息调用`, 'Service】', `「WeixinJSCore.publishHandler」调用借口：${name}`, ` 数据：`, data, ` WebView：`,webviewId);
      
      const nativeTime = Date.now();
      const webviewIds = JSON.parse(webviewId);
  
      for (const webviewId of webviewIds) {
        document.dispatchEvent(new CustomEvent(`service.${name}`, {
          detail: {
            source: 'service',
            webviewId,
            args: [ name, JSON.parse(data), 0, { nativeTime }]
          }
        }));
      }
    }
  }
  
  window.WeixinJSCore = WeixinJSCore;
  window.nextTick = nextTick;
})()
