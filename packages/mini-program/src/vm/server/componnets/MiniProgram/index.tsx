import { useMemo, useState } from 'react';
import { UIService } from '../UIService';
import { useInvokeHandler } from '../../hooks/useInvokeHandler';
import { UIMobile } from '../UIMobile';


function UsingInvokeHandler ({ service }) {
  const invokeCallbackHandler = useMemo(() => {
    return {
      success ({ name, callbackId }, data) {
        WeixinJSBridge.invokeCallbackHandler(callbackId, {
          errMsg: `${name}:ok`,
          ...data
        })
      },
      fail ({ name, callbackId }) {
        WeixinJSBridge.invokeCallbackHandler(callbackId, {
          errMsg: `${name}:fail`,
        })
      }
    }
  }, [service]);
  
  useInvokeHandler(
    'service.getSystemInfo', 
    (options) => invokeCallbackHandler.success( 
      options,
      $$miniProgram.system
    )
  );

  useInvokeHandler(
    'service.getNetworkType', 
    (options) => invokeCallbackHandler.success( 
      options,
      $$miniProgram.system.networkType
    )
  );

  return null;
}

function UsingPublishHandler (props) {
  return null;
}


export function MiniProgram () {
  const [context, setContext] = useState({});
 
  const onUIServiceLoad = (service) => {
    setContext({ service });
  }

  const onUIMobileLoad = (mobile) => {
    setContext({ mobile });
  }

  return <>
    <UsingInvokeHandler {...context} />
    <UsingPublishHandler {...context} />
    <UIService onLoad={onUIServiceLoad} />
    <UIMobile onLoad={onUIMobileLoad} />
    <style jsx>{`

    `}</style>
  </>
}

