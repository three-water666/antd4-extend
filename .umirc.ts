import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'Antd4 Extend',
  favicon: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicSB.svg',
  logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicSB.svg',
  outputPath: 'docs-dist',
  mode: 'site', // 开启像 Antd 官网那样的侧边栏模式
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