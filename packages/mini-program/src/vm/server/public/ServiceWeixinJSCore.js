const $$dispatchEvent = (name, detail) => {
  const event = new CustomEvent(`service.${name}`, { 
    detail: { 
      ...detail, 
      source: 'service',
      name
    } 
  });

  $$document.dispatchEvent(event);
}
  
const $$WeixinJSCore = {
  invokeHandler (name , data, callbackId) {
    $$console.log(
      `【消息调用`, 'Service】', 
      `「WeixinJSCore.invokeHandler」调用借口：${name}`, 
      ` 数据：`, data, 
      ` 回调函数：`, callbackId
    );
    
    $$dispatchEvent(name, { data,  callbackId });
  },

  publishHandler (name, data, webviewId) {
    $$console.log(`
      【消息调用`, 'Service】', 
      `「WeixinJSCore.publishHandler」调用借口：${name}`, 
      `数据：`, data, 
      `WebView：`, webviewId
    );
    
    const nativeTime = Date.now();
    const webviewIds = JSON.parse(webviewId);

    for (const webviewId of webviewIds) {
      $$dispatchEvent(name, {
        webviewId,
        args: [ name, JSON.parse(data), 0, { nativeTime }]
      });
    }
  }
}

$$define('nextTick', $$nextTick);
$$define('WeixinJSCore', $$WeixinJSCore);