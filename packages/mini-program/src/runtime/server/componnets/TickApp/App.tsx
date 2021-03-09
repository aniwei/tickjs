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

export default function App (props) {
  const [
    isAppServiceReady,
    setAppService
  ] = useState(false);

  const appconfig = useAppConfig(props);
  const appservice = useAppService(props);
  const appnavigator = useAppNavigator(appservice, appconfig);
  const context = {
    appservice, 
    appnavigator, 
    appconfig, 
    get __TICK_MINI_PROGRAM () {
      return props.__TICK_MINI_PROGRAM;
    } 
  }

  const onAppServiceLoad = () => {
    setAppService(true);
  }

  return (
    <View style={{ height: Dimensions.get('window').height }}>
      <Provider value={context}>
        <AppCapsule 
          {...props} 
        />
        <AppService 
          {...props} 
          onLoad={onAppServiceLoad} 
        />
        <AppNativeMethods 
          {...props} 
        />

        { 
          isAppServiceReady ? 
            <AppNavigator 
              {...props} 
            /> : null 
        }
      </Provider>

      <AppLaunchScreen />
    </View>
  )
}
