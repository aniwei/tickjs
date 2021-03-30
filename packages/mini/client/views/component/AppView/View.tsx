import React, { useMemo } from 'react';
import qs from 'qs';
import { View } from 'react-native-web'
import { useScript } from '../../hooks/useScript';
import { useConfig } from '../../hooks/useConfig';

export default function AppView (props: any) {
  const config = useConfig(props.config);

  const scripts = [
    `/@weixin/wxview`, 
    // `/@app/view`, 
    { src: `/@app/wxml?r=${props.route}.wxml`, type: 'module' },
    { src: `/@app/wxss?r=${props.route}.wxss`, type: 'module' }
  ];

  const subPackage = config.subPages.get(props.route)

  if (subPackage) {
    const query = qs.stringify({
      p: subPackage.root,
      r: props.route
    })
    scripts.push(`/@app/view?${query}`);
  }

  useScript(scripts, () => {
    props.onReady();
  });

  return <View>
    
  </View>
}