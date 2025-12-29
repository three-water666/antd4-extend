import { defineConfig } from 'father';

export default defineConfig({
  // 输出 esm (给现代打包工具)
  esm: { output: 'es' },
  // 输出 cjs (给 node/jest)
  cjs: { output: 'lib' },
  // 输出 umd (给浏览器/CDN)
  umd: {
    name: 'Antd4Extend',
    output: 'dist',
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
      antd: 'antd',
    },
  },
});