import { View } from 'react-native-web'
import { useScript } from '../../hooks/useScript';

export default function AppView (props) {
  const __TICK_MINI_PROGRAM = typeof window === 'object' ? 
    window.__TICK_MINI_PROGRAM : props.__TICK_MINI_PROGRAM;

  useScript([`/WAWebview.js`, `/appwxss`], () => {
    __TICK_MINI_PROGRAM.ready();
  });

  return <View>
    
  </View>
}