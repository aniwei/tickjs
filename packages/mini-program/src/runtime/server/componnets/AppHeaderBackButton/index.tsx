import { View, Image } from 'react-native-web';

import iconBackWhitePNG from './icon_back_white.png';

export function AppHeaderBackButton () {
  return <View>
    <Image 
      source={iconBackWhitePNG}
    />
  </View>
}