import { View } from 'react-native-web'
import { useScript } from '../../hooks/useScript';

export default function AppView (props) {
  const __TICK_MINI_PROGRAM = typeof window === 'object' ? 
    window.__TICK_MINI_PROGRAM : props.__TICK_MINI_PROGRAM;

  const { appconfig, route } = __TICK_MINI_PROGRAM;
  const { subPages } = appconfig;

  const scripts = [`/WAWebview.js`];
  const pkg = subPages[route];

  if (pkg) {
    scripts.push('/subpage?p=' + pkg.root + 'appwxss');
  } else {
    scripts.push('/appwxss');
  }

  useScript(scripts, () => {
    __TICK_MINI_PROGRAM.ready();
  });

  return <View>
    
  </View>
}