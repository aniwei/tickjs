import React, { useEffect, useRef, useMemo, useContext } from 'react';
import { View } from 'react-native-web';
import { useOnceMessage } from '../../hooks/useOnceMessage';
import { AppContext } from '../TickApp/AppContext';

import { useFocus, useDistory, useInit, useCreate } from '../../hooks/useNavigator';


export function UINavigationController (props) {
  const { navigator } = useContext(AppContext);
  const { navigation, route } = props;
  const { __TYPE } = route.params || {};
  const ref = useRef();

  const nav = useInit({
    ref,
    route,
    navigation,
    __TYPE
  });

  useCreate(nav);
  useFocus(nav);
  useDistory(nav);

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

