import { View, Text } from 'react-native-web'
import { useScript } from 'vm/server/hooks/useScript';
import { useSubscribe } from '../../hooks/useSubscribe';

export function AppService (props) {
  useScript([`/WAService.js`, `/appservice`], () => {
    const { onLoad } = props;
    
    onLoad({
      invokeCallbackHandler (...args) {
        WeixinJSBridge.invokeCallbackHandler(...args);
      },
      subscribeHandler (...args) {
        WeixinJSBridge.subscribeHandler(...args);
      },
    });
  });

  useSubscribe(`webview.custom_event_GenerateFuncReady`);
  useSubscribe(`webview.custom_event_PAGE_EVENT`);
  useSubscribe(`webview.custom_event_initReady_getPerformance`);
  useSubscribe(`webview.custom_event_vdSync`);
  useSubscribe(`webview.custom_event_tapAnyWhere`);
  
  return <View style={{ display: 'none' }}>
    <Text>AppService</Text>
  </View>
}
