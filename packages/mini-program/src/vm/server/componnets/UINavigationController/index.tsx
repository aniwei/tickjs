import { useMemo } from 'react';
import { useEffect, useRef } from 'react';
import { View } from 'react-native-web';
import { useOnceMessage } from '../../hooks/useOnceMessage';

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
  const { navigation, route, controllerId, onCreated, onFocus } = props;
  const ref = useRef();

  const navigator = useMemo(() => {
    return {
      navigation,
      ...getJSBridgeHandler(ref)
    }
  }, [navigation])

  useOnceMessage('webview.created', () => {
    
    const { __TRIGGER_FROM, __TYPE } = route.params || {};

    onCreated(controllerId, navigator, {
      path: route.name,
      query: {
        ...route.params
      },
      openType: __TYPE || 'switchTab',
    });

    if (__TRIGGER_FROM) {
      __TICK_MINI_PROGRAM.dispatch('onTabItemTap', {
        ...route.params.__TRIGGER_FROM,
        query: {
          ...route.params
        },
        pagePath: __TRIGGER_FROM.route
      });
    }
  }, navigation);

  useEffect(() => navigation.addListener('blur', () => {
    onFocus(controllerId, navigator);
  }), [navigation]);

  useEffect(() => {
    return () => {
      props;
      debugger;
    }
  })

  return (
    <View style={{ flex: 1, display: 'flex' }}>
      <iframe 
        ref={ref} 
        style={{ flex: 1, border: 'none' }}
        src={`view?r=${route.name}&i=${controllerId}`} 
      />
    </View>
  )
}

