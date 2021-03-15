import reactRefresh from '@vitejs/plugin-react-refresh';

import { resolve } from 'path';
import { defineConfig } from 'vite';


export default defineConfig({
  root: resolve(__dirname, 'views'),
  plugins: [
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