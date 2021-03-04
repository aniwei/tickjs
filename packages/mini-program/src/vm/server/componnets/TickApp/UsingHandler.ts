import { useInvoke } from '../../hooks/useInvoke';


function invokeCallback (state, { name, callbackId }, data) {
  WeixinJSBridge.invokeCallbackHandler(callbackId, {
    errMsg: `${name}:${state}`,
    ...data
  })
}

export function UsingHandler ({ service }) {
  useInvoke(
    'service.getSystemInfo', 
    (options) => invokeCallback('ok', options, $$miniProgram.system)
  );

  useInvoke(
    'service.getNetworkType', 
    (options) => invokeCallback( 'ok', options, $$miniProgram.system)
  );

  useInvoke(
    'service.getNetworkType', 
    (options) => invokeCallback( 'ok', options, $$miniProgram.system)
  );

  return null;
}

