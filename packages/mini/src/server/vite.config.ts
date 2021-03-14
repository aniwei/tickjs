import { resolve } from 'path';
import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';

function supportCommonJSRequire () {
  const fileRegex = /@react\-navigation\/stack\/lib\/module\/index.tsx/g;

  return {
    name: 'support-commonjs-require',

    transform (src: any, id: any) {
      console.log(fileRegex.test(id), id);
      if (fileRegex.test(id)) {
        console.log(id)
        return {
          code: src,
          map: ''
        }
      }
    }
  }
}

export default defineConfig({
  root: resolve(__dirname, 'views'),
  plugins: [
    supportCommonJSRequire(), 
    reactRefresh()
  ],
  resolve: {
    alias: {
      'react-native': 'react-native-web'
    }
  },
  define: {
  }
});