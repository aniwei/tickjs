
import path from 'path';
import reactRefresh from '@vitejs/plugin-react-refresh';
import tickService from './tickService';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  root: path.resolve(__dirname, './views'),
  resolve: {
    alias: {
      'react-native': 'react-native-web'
    }
  },
  plugins: [tickService(), reactRefresh()],
  assetsInclude: /\.png/g,
})
