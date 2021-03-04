import { useState, useMemo } from 'react';
import { View, Dimensions } from 'react-native-web';
import { servicesVersion } from 'typescript';
import { AppNavigator } from '../AppNavigator';
import { AppService } from '../AppService';

export default function (props) {
  const [
    {
      isAppServiceLoaded,
      appservice,
    },
    setAppContext
  ] = useState({ 
    isAppServiceLoaded: false, 
    appservice: null,
  });

  const {
    stack,
    controllers,
  } = useMemo(() => {
    return {
      stack: [],
      controllers: new Map(),
    }
  }, [])

  const onAppServiceLoad = (appservice) => {
    setAppContext({
      isAppServiceLoaded: true,
      appservice
    })
  }

  const onAppNavigatorCreated = (id, navigator) => {
    stack.push({ id, navigator });
    controllers.set(id, navigator);

    if (stack.length === 0) {
      debugger;

      appservice.subscribeHandler('onAppRoute', JSON.stringify({}), id);
    }
  }

  return (
    <View style={{ height: Dimensions.get('window').height }}>
      <AppService onLoad={onAppServiceLoad} />
      { 
        isAppServiceLoaded ? 
          <AppNavigator 
            {...props} 
            onCreated={onAppNavigatorCreated} 
          /> : null
      }
    </View>
  ); 
}