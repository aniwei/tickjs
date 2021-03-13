import { View } from 'react-native-web'
import { useScript } from '../../hooks/useScript';

export default function AppView (props) {
  const __TICK_RUNTIME = typeof window === 'object' ? 
    window.__TICK_RUNTIME : props.__TICK_RUNTIME;

  const { appconfig, route } = __TICK_RUNTIME;
  const { subPages } = appconfig;

  const scripts = [`/WAWebview.js`, '/appwxss'];
  const pkg = subPages[route];

  if (pkg) {
    scripts.push('/subpage/appwxss?p=' + pkg.root + '&r=' + route);
  }

  useScript(scripts, () => {
    __TICK_RUNTIME.ready();
  });

  return <View>
    
  </View>
}