const nextTick = window.setTimeout;

const WeixinJSCore = {
  invokeHandler (name , options, callbackId, source) {
    console.log(`【消息调用`, (source || 'Service') + '】', `「WeixinJSCore.invokeHandler」调用借口：${name}`, ` 数据：`, options, ` 回调函数：`,callbackId);
    document.dispatchEvent(new CustomEvent(name, {
      detail: {
        name, 
        options,
        callbackId,
        source,
      }
    }))
  },

  publishHandler (name, options, webviewIds, source) {
    console.log(`【消息调用`, (source || 'Service') + '】', `「WeixinJSCore.publishHandler」调用借口：${name}`, ` 数据：`, options, ` WebView：`,webviewIds);

    document.dispatchEvent(new CustomEvent(name, {
      detail: {
        name, 
        options,
        webviewIds,
        source
      }
    }))
  }
}

class MiniProgram extends HTMLElement {
  constructor () {
    super();

    this.webviewId = 1;
  }

  connectedCallback () {
    this.launch();
  }

  scriptLoader (src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.type = 'application/javascript';

      script.onload = () => {
        resolve();
      }

      script.onerror = () => {
        reject();
      }

      this.appendChild(script);
    })
  }

  config () {
    const appid = this.getAttribute('appid');

    return this.scriptLoader(`/${appid}/config`)
  }

  on (name, callback) {
    document.addEventListener(name, callback, false);
  }

  off (name, callback) {
    document.removeEventListener(name, callback, false);
  }

  once (name, callback) {
    const handle = () => {
      callback.apply(null, arguments);
      this.off(name, handle)
    }

    this.on(name, handle);
  }

  getSystemInfo (event) {
    const { detail } = event;

    WeixinJSBridge.invokeCallbackHandler(detail.callbackId, {
      errMsg: 'getSystemInfo:ok',
      ...__system.model
    });
  }

  getStorage (event) {
    const { detail } = event;
    const { options, callbackId } = detail;

    nextTick(() => {
      WeixinJSBridge.invokeCallbackHandler(callbackId, {
        errMsg: 'getStorage:ok',
        data: localStorage.getItem(options.key)
      });
    })
  }

  getStorageSync (event) {
    const { detail } = event;
    const { options, callbackId } = detail;

    WeixinJSBridge.invokeCallbackHandler(callbackId, {
      errMsg: 'getStorage:ok',
      data: localStorage.getItem(options.key)
    });
  }

  setStorage (event) {
    const { detail } = event;
    const { options, callbackId } = detail;

    nextTick(() => {
      localStorage.setItem(options.key, options.data);
      WeixinJSBridge.invokeCallbackHandler(callbackId, {
        errMsg: 'setStorage:ok'
      });
    })
  }

  setStorageSync (event) {
    const { detail } = event;
    const { options, callbackId } = detail;

    localStorage.setItem(options.key, options.data);
    WeixinJSBridge.invokeCallbackHandler(callbackId, {
      errMsg: 'setStorageSync:ok'
    });
  }

  getNetworkType (event) {
    const { detail } = event;
    const { callbackId } = detail;

    nextTick(() => {
      WeixinJSBridge.invokeCallbackHandler(callbackId, {
        errMsg: 'getNetworkType:ok',
        networkType: __system.networkType
      });
    })
  }

  createRequestTask (event) {
    const { detail, options } = event;
    // const data = JSON.parse(options);
  }

  onAppRoute =  (event) => {
    const { detail } = event;
    this.renderer.dispatchEvent(new CustomEvent(event.type, {
      detail
    }));
  }

  launch () {
    this.config().then(() => {
      this.config = window.__wxConfig;

      const appid = this.getAttribute('appid');

      this.on('getSystemInfo', this.getSystemInfo);
      this.on('getStorage', this.getStorage);
      this.on('getStorageSync', this.getStorageSync);
      this.on('setStorage', this.setStorage);
      this.on('setStorageSync', this.setStorageSync);
      this.on('getNetworkType', this.getNetworkType);
  
      this.on('createRequestTask', this.createRequestTask);
      this.on('custom_event_onAppRoute', this.onAppRoute);
  
      (new Promise((resolve) => {
        const service = document.createElement('mini-program-service');
        service.setAttribute('appid', appid)
        service.onload = () => {
          this.service = service;
          resolve();

        }
  
        document.body.appendChild(service);
      })).then(() => {
        return new Promise((resolve) => {
          const renderer = document.createElement('mini-program-renderer');

          renderer.setAttribute('appid', appid)
          renderer.onload = () => {
            this.renderer = renderer;
            resolve();
          }
  
          document.body.appendChild(renderer);
        });
      }).then(() => {
        const webviewId = this.webviewId++;

        this.renderer.launch(webviewId)
          .then(() => {
            console.log(`「mini-program」`, `小程序已经启动`)

            this.service.launch(webviewId, this.config.appLaunchInfo);
          })

        
      });
    })
  }
}

class ServiceElement extends HTMLElement {
  constructor () {
    super();

    this.attachShadow( { mode: 'closed' } );
  }

  invokeCallbackHandler (callbackId, options) {
    WeixinJSBridge.invokeCallbackHandler(callbackId, options)
  }

  subscribeHandler (callbackId, options, webviewId) {
    WeixinJSBridge.subscribeHandler(callbackId, options, webviewId)
  }

  launch (webviewId, appLaunchInfo) {
    this.subscribeHandler('onAppRoute', {
      ...appLaunchInfo,
      openType: 'switchTab'
    }, webviewId)
  }

  navigate () {

  }

  connectedCallback () {
    this.style.display = 'none';
    this.injectScripts()
      .then(() => {
        this.dispatchEvent(new CustomEvent('load'));
      })
      .catch(error => {
        this.dispatchEvent(new CustomEvent('error', error));
      })
  }

  scriptLoader (src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.type = 'application/javascript';

      script.onload = () => {
        resolve();
      }

      script.onerror = () => {
        reject();
      }

      this.appendChild(script);
    })
  }

  injectScripts () {
    return new Promise((resolve, reject) => {
      const appid = this.getAttribute('appid');
  
      return this.scriptLoader(`/${appid}/config`)
        .then(() => this.scriptLoader(`/${appid}/system`))
        .then(() => this.scriptLoader('/WAService.js'))
        .then(() => this.scriptLoader(`/${appid}/service`))
        .then(() => {
          resolve();
          console.log(`「service」脚步加载完毕`)
        })
        .catch((error) => {
          reject(error);
          console.error(`「service」脚步加载错误`, error)
        });
    })
  }
}

class PageElement extends HTMLElement {
  static create () {
    const page = document.createElement('mini-program-page');

    return page;
  }

  constructor () {
    super();
  }

  invokeCallbackHandler (callbackId, options) {
    const window = this.iframe.contentWindow;
    window.WeixinJSBridge.invokeCallbackHandler(callbackId, options)
  }

  subscribeHandler (callbackId, options, webviewId) {
    const window = this.iframe.contentWindow;
    window.WeixinJSBridge.subscribeHandler(callbackId, options, webviewId)
  }

  scriptLoader (src) {
    return new Promise((resolve, reject) => {
      const document = this.iframe.contentWindow.document;
      const script = document.createElement('script');
      script.type = 'application/javascript';

      script.onload = () => {
        resolve();
      }

      script.onerror = () => {
        reject();
      }

      document.head.appendChild(script);
      script.src = src;
    })
  }

  injectContext () {
    return new Promise ((resolve, reject) => {
      const document = this.iframe.contentWindow.document;
      const script = document.createElement('script');
      
      script.type = 'application/javascript';
      script.innerText = `
        const WeixinJSCore = window.parent.MiniProgramWeixinJSCore;

        window.WeixinJSCore = {
          invokeHandler (name, options, callbackId) {
            WeixinJSCore.invokeHandler(name, options, callbackId, 'WebView');
          },
          
          publishHandler (name, options, webviewIds) {
            if (name === 'custom_event_webViewCreated') {
              document.dispatchEvent(new CustomEvent('webviewcreated', {
                name, 
                options,
                webviewIds
              }));
            }
              
            WeixinJSCore.publishHandler(name, options, webviewIds, 'WebView');
          }
        };

        //# sourceURL=WeinxinJSCore
      `;
  
      document.head.appendChild(script);

      resolve();
    });
  }

  injectIFrame () {
    return new Promise((resolve, reject) => {
      const appid = this.getAttribute('appid');
      const iframe = document.createElement('iframe');
      
      iframe.style.border = 'none';
  
      const script = document.createElement('script');
      script.type = 'application/javascript';
  
      iframe.src = `/${appid}/pages`;
  
      iframe.onload = () => {
        iframe.contentWindow.document.addEventListener('webviewcreated', (event) => {
          this.dispatchEvent(new CustomEvent('load'));
        }, false);

        this.injectContext()
          .then(() => this.scriptLoader(`/${appid}/config`))
          .then(() => this.scriptLoader('/WAWebview.js'))
          .then(() => this.scriptLoader(`/${appid}/wxss`))
          .then(() => console.log(`「page」脚步加载完毕`))
          .then(() => {            
            resolve();
          })
          .catch((error) => {
            
            reject(error)
            console.error(`「page」脚步加载错误`, error)
          })
      }
  
      this.iframe = iframe;


      this.appendChild(iframe);    
    });
  }

  connectedCallback () {
    this.injectIFrame()
      .then(() => {
        this.dispatchEvent(new CustomEvent('load'));
      })
      .catch(error => {
        this.dispatchEvent(new CustomEvent('error', error));
      })
  }
}

class RendererElement extends HTMLElement {
  constructor () {
    super();

    this.pages = new Map();
    this.current = null;
  }

  on (name, callback) {
    document.addEventListener(name, callback, false);
  }

  off (name, callback) {
    document.removeEventListener(name, callback, false);
  }

  once (name, callback) {
    const handle = () => {
      callback.apply(null, arguments);
      this.off(name, handle)
    }

    this.on(name, handle);
  }

  launch (webviewId) {
    return this.create(webviewId);
  }

  create (id) {
    return new Promise((resolve, reject) => {
      const page = PageElement.create();
  
      page.onload = () => {
        resolve();
      }

      page.setAttribute('id', `webview_${id}`);

      this.appendChild(page);
    })
  }

  navigate () {
    return PageElement.create();
  }

  onAppRoute = (event) => {
    const { detail } = event;
    const { name, options, webviewIds } = detail;
    
    const { data } = JSON.parse(options);

    if (data.webviewId) {
      const element = this.querySelector(`#webview_${data.webviewId}`);


      if (element) {
        element.subscribeHandler(name, options, webviewIds);
      }
    }
  }

  connectedCallback () {
    this.on('custom_event_onAppRoute', this.onAppRoute);

    this.dispatchEvent(new CustomEvent('load'));
  }
}

window.customElements.define('mini-program-service', ServiceElement);
window.customElements.define('mini-program-renderer', RendererElement);
window.customElements.define('mini-program-page', PageElement);
window.customElements.define('mini-program', MiniProgram);

window.WeixinJSCore = WeixinJSCore;
window.MiniProgramWeixinJSCore = WeixinJSCore;
window.MiniProgram = MiniProgram;