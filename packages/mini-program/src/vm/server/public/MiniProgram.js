 class MiniProgram extends HTMLElement {
  constructor () {
    super();

    this.webviewId = 1;
    this.taskId = 1;
  }

  connectedCallback () {
    this.style.display = 'none';
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
    return this.scriptLoader(`/config`)
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
    const { data, callbackId } = detail;

    nextTick(() => {
      WeixinJSBridge.invokeCallbackHandler(callbackId, {
        errMsg: 'getStorage:ok',
        data: localStorage.getItem(data.key)
      });
    })
  }

  getStorageSync (event) {
    const { detail } = event;
    const { data, callbackId } = detail;

    WeixinJSBridge.invokeCallbackHandler(callbackId, {
      errMsg: 'getStorage:ok',
      data: localStorage.getItem(data.key)
    });
  }

  setStorage (event) {
    const { detail } = event;
    const { data, callbackId } = detail;

    nextTick(() => {
      localStorage.setItem(data.key, data.data);
      WeixinJSBridge.invokeCallbackHandler(callbackId, {
        errMsg: 'setStorage:ok'
      });
    })
  }

  setStorageSync (event) {
    const { detail } = event;
    const { data, callbackId } = detail;

    localStorage.setItem(data.key, data.data);
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

  createRequestTask = (event) => {
    const { detail } = event;
    const { callbackId } = detail;
    const data = JSON.parse(detail.data);

    const taskId = this.taskId++;

    fetch('/api/createRequestTask', {
      method: 'POST',
      json: true,
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data),
    }).then(res => res.json()).then(res => {
      WeixinJSBridge.subscribeHandler('onRequestTaskStateChange', {
        requestTaskId: taskId,
        state: 'success',
        data: JSON.stringify(res.data),
        statusCode: res.statuCode,
        header: res.header
      })
    }).catch(error => {
      WeixinJSBridge.subscribeHandler('onRequestTaskStateChange', {
        requestTaskId: taskId,
        state: 'error',
        data: JSON.stringify(error.data),
        statusCode: error.status,
        header: error.headers
      })
    });

    WeixinJSBridge.invokeCallbackHandler(callbackId, {
      requestTaskId: taskId,
    });
  }

  login (event) {
    const { detail } = event;
    const { callbackId } = detail;

    nextTick(() => {
      WeixinJSBridge.invokeCallbackHandler(callbackId, {
        errMsg: 'login:ok',
        code: '123321'
      });
    })
  }

  reportKeyValue = (event) => {
    const { detail } = event;
    const { callbackId } = detail;

    nextTick(() => {
      WeixinJSBridge.invokeCallbackHandler(callbackId, {
        errMsg: 'reportKeyValue:ok'
      });
    })
  }

  launch () {
    this.config().then(() => {
      this.config = window.__wxConfig;

      const appid = this.getAttribute('appid');

      this.on('service.getSystemInfo', this.getSystemInfo);
      this.on('service.getStorage', this.getStorage);
      this.on('service.getStorageSync', this.getStorageSync);
      this.on('service.setStorage', this.setStorage);
      this.on('service.setStorageSync', this.setStorageSync);
      this.on('service.getNetworkType', this.getNetworkType);
      this.on('service.createRequestTask', this.createRequestTask);
      this.on('service.reportKeyValue', this.reportKeyValue);
      this.on('service.login', this.login);

      const appLaunchInfo = this.config.appLaunchInfo;
      const route = appLaunchInfo.path.replace(/\.html$/, '');
  
      (new Promise((resolve) => {
        const renderer = document.createElement('mini-program-renderer');

        renderer.setAttribute('appid', appid)
        renderer.onload = () => {
          resolve();
        }
        
        this.renderer = renderer;

        document.body.appendChild(renderer);
      })).then(() => {
        return new Promise((resolve) => {
          const service = document.createElement('mini-program-service');
          service.setAttribute('appid', appid)
          service.onload = () => {
            this.service = service;
            resolve();
          }
    
          document.body.appendChild(service);
        });
      }).then(() => {
        const webviewId = this.webviewId++;

        this.renderer.launch(webviewId, route)
          .then(() => {
            console.log(`「mini-program」`, `小程序已经启动`)

            this.service.launch(webviewId, this.config.appLaunchInfo);
          });
      });
    })
  }
}

class ServiceElement extends HTMLElement {
  constructor () {
    super();
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

  invokeCallbackHandler (callbackId, options) {
    WeixinJSBridge.invokeCallbackHandler(callbackId, options)
  }

  subscribeHandler (...args) {
    WeixinJSBridge.subscribeHandler(...args)
  }

  launch (webviewId, appLaunchInfo) {
    this.subscribeHandler('onAppRoute', {
      ...appLaunchInfo,
      openType: 'switchTab'
    }, webviewId)
  }

  navigate () {

  }

  invokeMethod = (event) => {
    const { args } = event.detail;

    this.subscribeHandler(...args);
  }

  connectedCallback () {
    this.style.display = 'none';

    this.on('webview.custom_event_GenerateFuncReady', this.invokeMethod);
    this.on('webview.custom_event_PAGE_EVENT',  this.invokeMethod);
    this.on('webview.custom_event_initReady_getPerformance', this.invokeMethod)
    this.on('webview.custom_event_vdSync', this.invokeMethod);
    this.on('webview.custom_event_tapAnyWhere', this.invokeMethod);

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
  
      return this.scriptLoader(`/config`)
        .then(() => this.scriptLoader(`/device`))
        .then(() => this.scriptLoader(`/system`))
        .then(() => this.scriptLoader('/WAService.js'))
        .then(() => this.scriptLoader(`/service`))
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
  static create (id, appid, route) {
    const page = document.createElement('mini-program-page');

    page.setAttribute('appid', appid);
    page.setAttribute('id', `webview_${id}`);
    page.setAttribute('webview-id', id);
    page.setAttribute('route', route);

    return page;
  }

  invokeCallbackHandler (callbackId, options) {
    const window = this.iframe.contentWindow;
    window.WeixinJSBridge.invokeCallbackHandler(callbackId, options)
  }

  subscribeHandler (...args) {
    const window = this.iframe.contentWindow;
    window.WeixinJSBridge.subscribeHandler(...args)
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
    const appid = this.getAttribute('appid');
    const webviewId = this.getAttribute('webview-id');
    return this.scriptLoader(`/WeixinJSCore?webviewId=${webviewId}`);
  }

  generate () {
    const appid = this.getAttribute('appid');
    const route = this.getAttribute('route');

    return this.scriptLoader(`/generate?route=${route}`)
  }

  injectIFrame () {
    return new Promise((resolve, reject) => {
      const appid = this.getAttribute('appid');
      const iframe = document.createElement('iframe');
      
      iframe.style.border = 'none';
      iframe.src = `/pages`;
  
      iframe.onload = () => {
        iframe.contentWindow.document.addEventListener('webview.created', (event) => {
          this.dispatchEvent(new CustomEvent('load'));
        }, false);

        this.injectContext()
          .then(() => this.scriptLoader(`/config`))
          .then(() => this.scriptLoader(`/device`))
          .then(() => this.scriptLoader(`/system`))
          .then(() => this.scriptLoader('/WAWebview.js'))
          .then(() => this.scriptLoader(`/wxss`))
          .then(() => this.generate())
          .then(() => {
            const { screenHeight, screenWidth } = __system.model;

            this.iframe.style.width = screenWidth + 'px';
            this.iframe.style.height = screenHeight + 'px';

            this.style.width = screenWidth + 'px';
            this.style.height = screenHeight + 'px';

            console.log(`「page」脚步加载完毕`)
            resolve();
          })
          .catch((error) => {
            console.error(`「page」脚步加载错误`, error)
            reject(error)
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

  launch (webviewId, route) {
    return this.create(webviewId, route);
  }

  create (id, route) {
    return new Promise((resolve, reject) => {
      const appid = this.getAttribute('appid');
      const page = PageElement.create(id, appid, route);
  
      page.onload = () => {
        resolve();
      }

      this.appendChild(page);
    })
  }

  navigate () {
    return PageElement.create();
  }

  onAppRoute = (event) => {
    const { args } = event.detail;    
    const pages = this.querySelectorAll(`mini-program-page`);

    for (const page of pages) {
      if (page) {
        page.subscribeHandler(...args);
      }
    }
  }

  invokeMethod = (event) => {
    const { args, webviewId } = event.detail;
    const element = this.querySelector(`#webview_${webviewId}`);
      
    if (element) {
      element.subscribeHandler(...args);
    }
  }

  connectedCallback () {
    this.on('service.custom_event_onAppRoute', this.onAppRoute);
    this.on('service.custom_event_invokeWebviewMethod', this.invokeMethod);
    this.on('service.custom_event_checkWebviewAlive', this.invokeMethod);
    this.on('service.custom_event_vdSync', this.invokeMethod);
    this.on('service.custom_event_vdSyncBatch', this.invokeMethod);

    this.dispatchEvent(new CustomEvent('load'))
    
    // this.on('webview.generate', this.dispatchEvent(new CustomEvent('load')));
  }
}

window.customElements.define('mini-program-service', ServiceElement);
window.customElements.define('mini-program-renderer', RendererElement);
window.customElements.define('mini-program-page', PageElement);
window.customElements.define('mini-program', MiniProgram);

window.MiniProgram = MiniProgram;