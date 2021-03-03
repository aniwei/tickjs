import { useEffect } from 'react';
import { useSubscribe } from '../../hooks/useSubscribe';


export function UIService (props) {
  

  useEffect(() => {
    const { onLoad } = props;
    onLoad({
      invokeCallbackHandler (...args) {
        window.WeixinJSBridge.invokeCallbackHandler(...args);
      },
      subscribeHandler (...args) {
        window.WeixinJSBridge.subscribeHandler(...args);
      },
    });
  }, []);

  useSubscribe(`webview.custom_event_GenerateFuncReady`);
  useSubscribe(`webview.custom_event_PAGE_EVENT`);
  useSubscribe(`webview.custom_event_initReady_getPerformance`);
  useSubscribe(`webview.custom_event_vdSync`);
  useSubscribe(`webview.custom_event_tapAnyWhere`);
  
  return null;
}
