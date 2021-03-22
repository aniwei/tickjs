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

  const config = useConfig(props.config);
  const runtime = useRuntime(() => setRuntime(true), config);
  const manager = useNavigator(runtime, config);

  const context = {
    config: config as any, 
    manager: manager as any, 
    runtime: runtime  as any
  }

  return (
    <View style={{ height: Dimensions.get('window').height }}>
      <Provider value={context}>
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
