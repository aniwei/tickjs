export const subscribeHandler = (name, params, callbackId, options?) => (`
WeixinJSBridge.subscribeHandler(
  "${name}",
  ${JSON.stringify(params)},
  ${callbackId},
  ${JSON.stringify({ nativeTime: Date.now(), ...options })}
)`);

export const invokeCallbackHandler = (callbackId: number | string, data: any) => (`
WeixinJSBridge.invokeCallbackHandler(
  ${callbackId},
  ${JSON.stringify(data)}
)`);
