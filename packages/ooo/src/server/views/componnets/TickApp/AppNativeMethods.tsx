import { View } from 'react-native-web';
import { useAppNativeMethods } from '../../hooks/useAppNativeMethods';

export function AppNativeMethods (props) {
  const nativeMethods = useAppNativeMethods(props);

  return <View style={{ display: 'none' }}>
    {nativeMethods.keys()}
  </View>
}