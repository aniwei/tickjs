var WeixinJSCore = {
  invokeHandler: function (name, params) {
    console.log('[invokeHandler]', name);
    window.__invokeHandler__(name, params);
  },
  publishHandler: function (name, params, callbackId, options) {
    console.log('[publishHandler]', name);
    window.__publishHandler__(name, params, callbackId, options);
  }
}