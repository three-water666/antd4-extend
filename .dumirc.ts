import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'Antd4 Extend',
    nav: [
      { title: '介绍', link: '/getting-started' },
      { title: '组件', link: '/components/tour' },
    ],
    socialLinks: {
      github: 'https://github.com/three-water666/antd4-extend',
    },
    footer: 'MIT Licensed | Copyright © 2023-present',
  },
  // 关键：为了支持 Less 引入 Antd v4 变量
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
    ],
  ],
  alias: {
    'antd4-extend': process.cwd() + '/src',
  },
  resolve: {
    docDirs: ['docs'],
    atomDirs: [{ type: 'component', dir: 'src' }],
  },
  // 开启 less javascriptEnabled
  lessLoader: {
    javascriptEnabled: true,
  },
});
