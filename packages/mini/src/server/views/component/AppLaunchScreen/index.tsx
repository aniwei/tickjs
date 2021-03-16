import React from 'react';
import { View, Text } from 'react-native-web';

export function AppLaunchScreen (props: any) {
  return (
    <View>
      {props.children}
    </View>
  );
}