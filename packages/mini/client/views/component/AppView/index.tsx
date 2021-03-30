import React, { useEffect, useState } from 'react';
import qs from 'qs';

import { getApplicationViewRuntime } from '/@tickjs/view';
import { View } from 'react-native-web';
import AppView from './View';

export default function AppContext (props: any) {
  const { location } = props;
  const query = qs.parse(location.search.slice(1));
  const [{ isContextLoaded, context, runtime }, setContext] = useState({
    isContextLoaded: false,
    context: null,
    runtime: null
  });
  
  useEffect(() => {
    const runtime = getApplicationViewRuntime(Number(query.i));
    runtime.run((context: any) => {
      setContext({
        isContextLoaded: true,
        context,
        runtime
      })
    });

  }, []);

  const route = query.r.replace(/\.html$/g, '');

  const onReady = () => {    
    runtime.generate(route);

    const { i, r ,t ,...rest } = query;
    
    (runtime as any).publish({
      name: 'clientready',
      id: i,
      route: r,
      openType: t,
      query: rest
    })
  }
  
  return <View>
    { 
      isContextLoaded ? <AppView 
        route={route}
        config={context} 
        onReady={onReady} 
      /> : null
    }
  </View>
}