import { useState } from 'react';
import { View, Dimensions, Platform } from 'react-native-web';
import { AppNavigator } from '../AppNavigator';
import { AppService } from '../AppService';
import { AppNativeMethods } from './AppNativeMethods';
import { AppCapsule } from '../AppCapsule';

import { Provider } from './AppContext';

import { useAppNavigator } from '../../hooks/useAppNavigator';
import { useAppService } from '../../hooks/useAppService';
import { useAppConfig } from '../../hooks/useAppConfig';
import { AppLaunchScreen } from '../AppLaunchScreen';
import { useAppRuntime } from 'runtime/server/hooks/useAppRuntime';

export default function App (props) {
  const [
    isRuntimeReady,
    setRuntime
  ] = useState(false);


  const runtime = useAppRuntime(() => {
    setRuntime(true)
  });

  // const appconfig = useAppConfig(props);
  // const appservice = useAppService(props);
  const appnavigator = useAppNavigator(runtime);
  // const context = {
  //   appservice, 
  //   appnavigator, 
  //   appconfig, 
  //   get __TICK_RUNTIME () {
  //     return props.__TICK_RUNTIME;
  //   } 
  // }
  const context = {};

  return (
    <View style={{ height: Dimensions.get('window').height }}>
      <Provider value={{ runtime }}>
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
