import React, { useEffect, useState } from 'react';
import qs from 'qs';

import { getApplicationViewRuntime } from '/@tickjs/view';
import { useScript } from '../../hooks/useScript';
import { useConfig } from '../../hooks/useConfig';
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
    })
  }, []);

  const onReady = () => {    
    const route = query.r.replace(/\.html$/g, '');

    const __setCssStartTime__ = Date.now();
		__wxAppCode__[`${route}.wxss`]();
		const __setCssEndTime__ = Date.now();

    document.dispatchEvent(new CustomEvent("generateFuncReady", {
      detail: {
        generateFunc: $gwx(`./${route}.wxml`)
      }
    }));

    
    (runtime as any).publish({
      name: 'clientready',
      id: query.i
    })
  }
  
  return <View>
    { 
      isContextLoaded ? <AppView config={context} onReady={onReady} /> : null
    }
  </View>
}