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
import { IAppContext } from './AppContext';

export type IAppProps = {
  __TICK_CONTEXT: any
}

export default function App (props: IAppProps) {
  const [
    isRuntimeLoaded,
    setRuntime
  ] = useState(false);

  const runtime = useRuntime(() => setRuntime(true));

  const config = useConfig(props);
  const navigator = useNavigator(runtime, config);

  const context = {
    config,
    runtime,
    navigator,
    __TICK_CONTEXT: props.__TICK_CONTEXT,
  }

  return (
    <View style={{ height: Dimensions.get('window').height }}>
      <Provider value={context}>
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
          isRuntimeLoaded ? 
            <AppNavigator 
              {...props} 
            /> : null 
        }
      </Provider>

      <AppLaunchScreen />
    </View>
  )
}
