import React, { useState } from 'react';
import { View, Dimensions, Platform } from 'react-native-web';
import { AppNavigator } from '../AppNavigator';
import { AppService } from '../AppService';
import { AppNativeMethods } from './AppNativeMethods';
import { AppCapsule } from '../AppCapsule';

import { Provider } from './AppContext';

import { useConfig } from '../../hooks/useConfig';
import { useNavigator } from '../../hooks/useNavigator';
import { AppLaunchScreen } from '../AppLaunchScreen';
import { useRuntime } from '../../hooks/useRuntime';

export default function App (props) {
  const [
    isRuntimeReady,
    setRuntime
  ] = useState(false);


  const runtime = useRuntime(() => {
    setRuntime(true)
  });

  const appconfig = useConfig(props);
  const navigator = useNavigator(runtime, appconfig);

  return (
    <View style={{ height: Dimensions.get('window').height }}>
      <Provider value={{ runtime, navigator, __TICK_CONTEXT: props.__TICK_CONTEXT }}>
        <AppCapsule 
          {...props} 
        />
        {/* <AppService 
          {...props} 
          onLoad={onAppServiceLoad} 
        /> */}
        {/* <AppNativeMethods 
          {...props} 
        /> */}

        { 
          isRuntimeReady ? 
            <AppNavigator 
              {...props} 
            /> : null 
        }
      </Provider>

      <AppLaunchScreen />
    </View>
  )
}
