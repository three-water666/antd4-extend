---
title: 快速开始
nav:
  title: 介绍
  order: 1
sidebar: false
---

# 快速开始

`antd4-extend` 旨在为 Ant Design v4 项目提供 v5+ 的组件扩展。

## 安装

使用 npm 或 yarn 安装：

```bash
npm install antd4-extend --save
```

或者

```bash
yarn add antd4-extend
```

## 依赖说明

由于本项目是针对 Ant Design v4 的扩展，因此你的项目中必须已经安装了 `antd` v4：

```json
{
  "peerDependencies": {
    "antd": ">=4.0.0 <5.0.0"
  }
}
```

## 配置样式按需加载

`antd4-extend` 的设计完全遵循 Ant Design v4 的规范。如果你在项目中使用 `babel-plugin-import`，只需添加一项简单的配置即可实现组件和样式的按需加载。

### 使用 Less (推荐)

如果你希望组件能够跟随 `antd` 的主题变量（如修改 `@primary-color`），请配置 `style: true`：

```javascript
// .umirc.ts 或 babel 配置
export default {
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd4-extend',
        libraryDirectory: 'es',
        style: true,
      },
      'antd4-extend',
    ],
  ],
};
```

### 使用 CSS

如果你不希望使用 Less，可以直接加载编译后的 CSS：

```javascript
// .umirc.ts 或 babel 配置
export default {
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd4-extend',
        libraryDirectory: 'es',
        style: 'css',
      },
      'antd4-extend',
    ],
  ],
};
```

## 简单示例

以 `Tour` 组件为例：

```tsx
import React, { useRef, useState } from 'react';
import { Button, Space } from 'antd';
import { Tour } from 'antd4-extend';

const App: React.FC = () => {
  const ref1 = useRef(null);
  const [open, setOpen] = useState(false);

  const steps = [
    {
      title: '上传文件',
      description: '点击这里上传你的文件。',
      target: () => ref1.current,
    },
  ];

  return (
    <Space>
      <Button ref={ref1} type="primary" onClick={() => setOpen(true)}>
        开始导览
      </Button>
      <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
    </Space>
  );
};

export default App;
```
