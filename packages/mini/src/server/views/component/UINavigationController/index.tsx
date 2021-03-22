import React, { useRef } from 'react';
import { View } from 'react-native-web';

import { 
  useFocus, 
  useDistroy, 
  useInit, 
  useReady 
} from '../../hooks/useNavigator';


export function UINavigationController (props: any) {
  const { navigation, route } = props;
  const { __TYPE } = route.params || {};
  const ref = useRef();

  const nav = useInit({
    ref,
    route,
    navigation,
    type: __TYPE
  });

  useReady(nav);
  useFocus(nav);
  useDistroy(nav);

  return (
    <View style={{ flex: 1, display: 'flex' }}>
      <iframe 
        ref={ref} 
        style={{ flex: 1, border: 'none' }}
        src={`/view?r=${nav.route.name}&i=${nav.id}`} 
      />
    </View>
  )
}

