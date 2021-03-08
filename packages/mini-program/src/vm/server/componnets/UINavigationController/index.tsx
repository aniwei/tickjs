import { useEffect, useRef, useMemo, useContext } from 'react';
import { View } from 'react-native-web';
import { useOnceMessage } from '../../hooks/useOnceMessage';
import { AppContext } from '../TickApp/AppContext';

function getJSBridgeHandler (ref) {
  return {
    subscribeHandler (...args) {
      const WeixinJSBridge = ref.current ? 
        ref.current.contentWindow.WeixinJSBridge : null;
      
        if (WeixinJSBridge) {
        WeixinJSBridge.subscribeHandler(...args);
      }
    },
    invokeCallbackHandler (...args) {
      const WeixinJSBridge = ref.current ? 
        ref.current.contentWindow.WeixinJSBridge : null;
      if (WeixinJSBridge) {
        WeixinJSBridge.subscribeHandler(...args);
      }
    },
  }
}

export function UINavigationController (props) {
  const { appnavigator } = useContext(AppContext);
  const { navigation, route } = props;
  const { __TYPE } = route.params || {};
  const ref = useRef();

  const navigator = useMemo(() => {
    return {
      navigation,
      route: route,
      type: __TYPE || 'switchTab',
      id: appnavigator.create(),
      ...getJSBridgeHandler(ref)
    }
  }, [navigation])

  useOnceMessage('webview.created', () => 
    appnavigator.onCreated(navigator, {
      path: route.name,
      query: { ...route.params },
      openType: __TYPE || 'switchTab',
    }), 
    navigation
  );

  useEffect(() => (
    navigation.addListener('blur', () => 
      appnavigator.onFocus(navigator))
  ), [navigation]);

  useEffect(() => () => {
     appnavigator.onDistroy(navigator);
  }, [])

  return (
    <View style={{ flex: 1, display: 'flex' }}>
      <iframe 
        ref={ref} 
        style={{ flex: 1, border: 'none' }}
        src={`view?r=${navigator.route.name}&i=${navigator.id}`} 
      />
    </View>
  )
}

