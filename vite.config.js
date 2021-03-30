import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import svgr from '@svgr/rollup';
import path from 'path';
import antd from './src/css/antd';

/**
 * https://vitejs.dev/config/
 */
export default defineConfig({
  plugins: [reactRefresh(), svgr()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  css: {
    preprocessorOptions: {
      // antd custom theme
      less: {
        javascriptEnabled: true,
        modifyVars: { ...antd },
      },
      // auto variable inject
      scss: {
        additionalData: `@import '@/css/variables.scss';`,
      },
    },
  },
});
