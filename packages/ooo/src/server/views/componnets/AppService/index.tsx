import { View, Text } from 'react-native-web'
import { useServiceScripts } from '../../hooks/useServiceScripts';
import { useAppServiceSubscribe } from '../../hooks/useAppServiceSubscribe';

export function AppService (props) {
  // useServiceScripts(props);
  // useAppServiceSubscribe();

  const html = `
    
  `;
  
  return <View style={{ display: 'none' }}>
    <script dangerouslySetInnerHTML={{ __html: html }}></script>
  </View>
}
