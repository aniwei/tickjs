import React, { useMemo } from 'react';
import { View } from 'react-native-web'
import { useScript } from '../../hooks/useScript';
import { useConfig } from '../../hooks/useConfig';

export default function AppView (props: any) {
  const config = useConfig(props.config);

  const scripts = [`/@weixin/wxview`, '/@app/view'];
  const subPackage = config.subPages.get(props.route)

  if (subPackage) {
    scripts.push('/@app/view?p=' +encodeURIComponent( subPackage.root) + '&r=' + encodeURIComponent(props.route));
  }

  useScript(scripts, () => {
    props.onReady();
  });

  return <View>
    
  </View>
}