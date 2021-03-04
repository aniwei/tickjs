import React from 'react';
import { View, Dimensions } from 'react-native-web';
import { UITabBar } from '../UITabBar';

export default function (props) {
  return (
    <View style={{ height: Dimensions.get('window').height }}>
      <UITabBar {...props} />
    </View>
  ); 
}