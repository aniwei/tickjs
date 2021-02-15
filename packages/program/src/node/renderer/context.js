var WeixinJSCore = {
  invokeHandle: function () {
    console.log(arguments);
  },
  publishHandle: function () {
    console.log(arguments);
  }
}

var WeixinJSBridge = {
  invokeCallbackHandler: function () {
    console.log(arguments);
  },

  subscribeHandler: function () {
    console.log(arguments);
  }
};