import { View, Text } from 'react-native-web'
import { useServiceScripts } from '../../hooks/useServiceScripts';
import { useAppServiceSubscribe } from '../../hooks/useAppServiceSubscribe';

export function AppService (props) {
  useServiceScripts(props);
  useAppServiceSubscribe();
  
  return <View style={{ display: 'none' }}>
    <Text>AppService</Text>
  </View>
}
