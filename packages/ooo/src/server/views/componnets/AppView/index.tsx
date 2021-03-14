import { View } from 'react-native-web'
import { useScript } from '../../hooks/useScript';

export default function AppView (props) {
  const __TICK_CONTEXT = typeof window === 'object' ? 
    window.__TICK_CONTEXT : props.__TICK_CONTEXT;

  const { appconfig, route } = __TICK_CONTEXT;
  const { subPages } = appconfig;

  const scripts = [`/WAWebview.js`, '/appwxss'];
  const pkg = subPages[route];

  if (pkg) {
    scripts.push('/subpage/appwxss?p=' + pkg.root + '&r=' + route);
  }

  useScript(scripts, () => {
    __TICK_CONTEXT.ready();
  });

  return <View>
    
  </View>
}