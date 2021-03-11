const __TICK_RUNTIME = { 
  context: {},
  globalThis: this, 
  console: this.console.assert,
  nextTick = (callback) => {
    return new Promise((resolve, reject) => {
      if (typeof callback === 'function') {
        callback();
        resolve();
      } else {
        reject(new TypeError('Callback must be function.'));
      }
    });
  },
  debug: (name) => {
    return (...args) => {
      __TICK_RUNTIME.console.info(`【${name}】`, ...args);
    }
  },
  request: (name, body) => {
    return fetch(`/api/${name}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body
    })
  },

  WeixinJSCore: {
    dispatchEvent (name, detail) {
      __TICK_RUNTIME.globalThis.dispatchEvent(`service.${name}`, { detail });
    },

    invokeHandler (name, options, callbackId) {
      __TICK_RUNTIME.debug(`invokeHandler`)(
        `数据:`, data,
        `回调函数:`, callbackId
      );
  
      this.dispatchEvent(name, {options, callbackId});
    },

    publishHandler (name, data, webviewId) {
      __TICK_RUNTIME.debug(`publishHandler`)(
        `数据:`, data,
        `WebViewId:`, webviewId
      );
  
      const options = { nativeTime: Date.now() };
      const data = JSON.parse(data);

      const webviewIds = name === 'custom_event_onAppRoute' ? 
        JSON.parse(webviewId) : [json.data.webviewid];

      for (const webviewId of webviewIds) {
        this.dispatchEvent(name, { 
          args: [
            name, 
            data,
            0,
            options
          ],
          webviewId
        });
      }
    }
  }
};

__TICK_RUNTIME.WeixinJSCore = {
  dispatchEvent (name, detail) {
    __TICK_RUNTIME.globalThis.dispatchEvent(name, { detail });
  },


  publishHandler (name, data, webviewId) {
    __TICK_RUNTIME.debug(\`publishHandler\`)(
      \`数据:\`, data,
      \`WebViewId:\`, webviewId
    );

    const options = { nativeTime: Date.now() };

    ${
      r !== undefined ? `if (name === 'custom_event_webViewCreated') {
        this.dispatchEvent('created', {}, options);
      }` : `
        const json = JSON.parse(data);

        const webviewIds = name === 'custom_event_onAppRoute' ? 
          JSON.parse(webviewId) : [json.data.webviewid];

        for (const webviewId of webviewIds) {
          this.dispatchEvent(name, [
            name, 
            json,
            0,
            options,
            webviewId
          ]);
        }
      `
    }
  }
}
}

__TICK_RUNTIME.init = () => {
__TICK_RUNTIME.globalThis.addEventListener('message', () => {

});
}

__TICK_RUNTIME.init = ()