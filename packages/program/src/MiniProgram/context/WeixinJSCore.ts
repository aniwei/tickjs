import vm from 'vm';

export const WeixinJSCore = {
  invokeHandler: function(name, callbackId) {
    if (name === 'getSystemInfo') {
      const script = new vm.Script(`WeixinJSBridge.invokeCallbackHandler(${callbackId}, {})`, {
        filename: 'WeixinJSBridge.invockCallbackHandler.js'
      });
  
      script.runInThisContext();
    } else if (name === 'getSystemInfoSync') {
      debugger;
      return {};
    }
  },
  publishHandler: function() {
    console.log('publishHandler', arguments)
  },
  setTimerHandler: function() {
    console.log(arguments)
  },
  clearTimerHandler: function() {
    console.log(arguments)
  }
}