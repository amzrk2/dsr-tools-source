import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import svgr from '@svgr/rollup';
import path from 'path';
import antd from './src/css/antd';
import { visualizer } from 'rollup-plugin-visualizer';

/**
 * https://vitejs.dev/config/
 */
export default defineConfig({
  plugins: [
    reactRefresh(),
    svgr(),
    visualizer({
      filename: 'dist/bundle.html',
      gzipSize: true,
      brotliSize: true,
    }),
  ],

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
