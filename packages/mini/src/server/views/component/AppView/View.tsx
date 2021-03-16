import React from 'react';
import { View } from 'react-native-web'
import { useScript } from '../../hooks/useScript';
import { useConfig } from '../../hooks/useConfig';

export default function AppView (props) {
  const { context, route } = props;
  const config = useConfig(context.config);

  const scripts = [`/@weixin/wxview`, '/@tickjs/app/wxss'];
  const subPackage = config.subPages[route];

  if (subPackage) {
    scripts.push('/@tickjs/app/wxss?p=' + subPackage.root + '&r=' + route);
  }

  useScript(scripts, () => {
    
  });

  return <View>
    
  </View>
}