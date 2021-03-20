import React, { useState } from 'react';
import { View, Dimensions } from 'react-native-web';
import { AppNavigator } from '../AppNavigator';
import { AppCapsule } from '../AppCapsule';

import { Provider } from './AppContext';
import { useConfig } from '../../hooks/useConfig';
import { useNavigator } from '../../hooks/useNavigator';
import { useRuntime } from '../../hooks/useRuntime';

export default function App (props: any) {
  const [
    isRuntimeLoaded,
    setRuntime
  ] = useState(false);

  const context = props.config;

  const runtime = useRuntime(() => setRuntime(true));
  const config = useConfig(context.config);
  const navigator = useNavigator(runtime, config);

  return (
    <View style={{ height: Dimensions.get('window').height }}>
      <Provider value={{ config, manager, runtime }}>
        <AppCapsule />
        { 
          isRuntimeLoaded ? 
            <AppNavigator 
              {...props} 
            /> : null 
        }
      </Provider>
    </View>
  )
}
