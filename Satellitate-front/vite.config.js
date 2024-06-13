import Vue from '@vitejs/plugin-vue';
import vitePluginString from 'vite-plugin-string'

export default {
  plugins: [
    Vue(),
    vitePluginString()
  ],
  optimizeDeps: {
    exclude: ['node:test/reporters']
  },
  test: {
    environment: 'jsdom',
  },
}