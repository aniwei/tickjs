const $$dispatchEvent = (name, detail) => {
  const event = new CustomEvent(`webview.${name}`, { 
    detail: { 
      ...detail, 
      source: 'webview',
      name
    } 
  });

  $$document.dispatchEvent(event);
}

const $$WeixinJSCore = {
  invokeHandler (name , data, callbackId) {
    $$console.log(
      `【消息调用`, 'Webview】', 
      `「WeixinJSCore.invokeHandler」调用借口：${name}`, 
      ` 数据：`, data, 
      ` 回调函数：`,
      callbackId
    );
    
    $$dispatchEvent(name, { data, callbackId });
  },

  publishHandler (name, data) {
    $$console.log(
      `【消息调用`, 'Webview】', 
      `「WeixinJSCore.publishHandler」调用借口：${name}`, 
      ` 数据：`, data, 
      ` WebView：`,
      $$miniProgram.webviewId
    );
    
    const nativeTime = Date.now();

    if (name === 'custom_event_webviewCreated') {
      $$dispatchEvent('created', { 
        args: [
          name, 
          JSON.parse(data), 
          $$miniProgram.webviewId, 
          { nativeTime }
        ] 
      });
    }

    $$dispatchEvent(name, { 
      args: [
        name, 
        JSON.parse(data), 
        $$miniProgram.webviewId, 
        { nativeTime }
      ] 
    });
  }
}

$$define('nextTick', $$nextTick);
$$define('WeixinJSCore', $$WeixinJSCore);