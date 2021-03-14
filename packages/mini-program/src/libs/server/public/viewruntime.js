const __TICK_CONTEXT = { 
  get gwx () {
    return $gwx(`./${this.path}.wxml`)
  },

  context: {
    get appconfig () {
      return __TICK_CONTEXT_APPCONFIG;
    },
    get device  () {
      return __TICK_CONTEXT_DEVICE;
    },
    get system () {
      return __TICK_CONTEXT_SYSTEM
    },
    get types () {
      return __TICK_CONTEXT_TYPES
    }
  },
  globalThis: this, 
  console: this.console,
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
      __TICK_CONTEXT.console.info(`【${name}】`, ...args);
    }
  },

  WeixinJSCore: {
    dispatchEvent (name, detail) {
      const event = new CustomEvent(`view.${name}`, { 
        detail: { 
          ...detail, 
          source: 'view',
          name
        } 
      });

      __TICK_CONTEXT.globalThis.dispatchEvent(event);
    },

    invokeHandler (name, options, callbackId) {
      __TICK_CONTEXT.debug(`invokeHandler`)(
        `数据:`, data,
        `回调函数:`, callbackId
      );
  
      this.dispatchEvent(name, {options, callbackId});
    },

    publishHandler (name, data, webviewId) {
      __TICK_CONTEXT.debug(`publishHandler`)(
        `数据:`, data,
        `WebViewId:`, webviewId
      );
  
      const options = { nativeTime: Date.now() };
      const data = JSON.parse(data);

      if (name === 'custom_event_webViewCreated') {
        this.dispatchEvent('created', {});
      }

      this.dispatchEvent(name, { 
        args: [
          name, 
          data,
          0,
          options
        ]
      });
    }
  },

  render () {
    const setCSS = __wxAppCode__[`${this.path}.wxss`];

    const __setCssStartTime__ = Date.now();			
    setCSS();
    const __setCssEndTime__ = Date.now(); 

    this.generator = $gwx(`./${this.path}.wxml`);

    if (window.__wxAppCodeReadyCallback__) {
      window.__wxAppCodeReadyCallback__(this.generator);
    } else {
      document.dispatchEvent(new CustomEvent('generateFuncReady', {
        detail: {
          get generateFunc () {
            return this.generator
          }
        }
      }));
    }
  }
};