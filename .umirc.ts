import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'Antd4 Extend',
  favicon: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  outputPath: 'docs-dist',
  mode: 'site',
  navs: [
    null,
    {
      title: 'GitHub',
      path: 'https://github.com/three-water666/antd4-extend',
    },
  ],

  // 关键：为了支持 Less 引入 Antd v4 变量
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true, // 加载 less
      },
    ],
  ],
  lessLoader: {
    javascriptEnabled: true,
  },
});