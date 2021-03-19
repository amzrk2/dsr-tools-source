import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';

import antd from './src/css/antd';

/**
 * https://vitejs.dev/config/
 */
export default defineConfig({
  plugins: [reactRefresh()],

  css: {
    preprocessorOptions: {
      // antd custom theme
      less: {
        javascriptEnabled: true,
        modifyVars: { ...antd },
      },
    },
  },
});
