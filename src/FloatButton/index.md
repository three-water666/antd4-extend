# FloatButton 悬浮按钮

一种悬浮在页面上的按钮。

## 何时使用

- 在页面上提供一些常用的功能。
- 在页面上提供一些快捷的操作。

## 代码演示

### 基本

最简单的用法。

```tsx
import React from 'react';
import { FloatButton } from 'antd4-extend';
import { QuestionCircleOutlined } from '@ant-design/icons';

export default () => <FloatButton icon={<QuestionCircleOutlined />} />;
```

### 类型

支持两种类型：`default` 和 `primary`。

```tsx
import React from 'react';
import { FloatButton } from 'antd4-extend';
import { QuestionCircleOutlined } from '@ant-design/icons';

export default () => (
  <div style={{ height: 100 }}>
    <FloatButton icon={<QuestionCircleOutlined />} type="default" style={{ right: 94 }} />
    <FloatButton icon={<QuestionCircleOutlined />} type="primary" style={{ right: 144 }} />
  </div>
);
```

### 形状

支持两种形状：`circle` 和 `square`。

```tsx
import React from 'react';
import { FloatButton } from 'antd4-extend';
import { QuestionCircleOutlined } from '@ant-design/icons';

export default () => (
  <div style={{ height: 100 }}>
    <FloatButton icon={<QuestionCircleOutlined />} shape="circle" style={{ right: 194 }} />
    <FloatButton icon={<QuestionCircleOutlined />} shape="square" style={{ right: 244 }} />
  </div>
);
```

### 描述文字

只有在 `shape="square"` 时有效。

```tsx
import React from 'react';
import { FloatButton } from 'antd4-extend';
import { FileTextOutlined } from '@ant-design/icons';

export default () => (
  <div style={{ height: 100 }}>
    <FloatButton
      icon={<FileTextOutlined />}
      description="HELP"
      shape="square"
      style={{ right: 294 }}
    />
  </div>
);
```

### 徽标

带徽标的悬浮按钮。

```tsx
import React from 'react';
import { FloatButton } from 'antd4-extend';
import { QuestionCircleOutlined } from '@ant-design/icons';

export default () => (
  <div style={{ height: 100 }}>
    <FloatButton
      icon={<QuestionCircleOutlined />}
      badge={{ count: 5 }}
      style={{ right: 344 }}
    />
    <FloatButton
      icon={<QuestionCircleOutlined />}
      badge={{ dot: true }}
      style={{ right: 394 }}
    />
  </div>
);
```

### 悬浮按钮组

可以组合多个悬浮按钮。

```tsx
import React from 'react';
import { FloatButton } from 'antd4-extend';
import { QuestionCircleOutlined, SyncOutlined, CustomerServiceOutlined } from '@ant-design/icons';

export default () => (
  <div style={{ height: 200 }}>
    <FloatButton.Group
      trigger="hover"
      type="primary"
      style={{ right: 444 }}
      icon={<CustomerServiceOutlined />}
    >
      <FloatButton icon={<QuestionCircleOutlined />} />
      <FloatButton icon={<SyncOutlined />} />
    </FloatButton.Group>

    <FloatButton.Group
      trigger="click"
      type="default"
      style={{ right: 494 }}
      icon={<CustomerServiceOutlined />}
    >
      <FloatButton icon={<QuestionCircleOutlined />} />
      <FloatButton icon={<SyncOutlined />} />
    </FloatButton.Group>
  </div>
);
```

### 回到顶部

点击按钮，页面滚回到顶部。

```tsx
import React from 'react';
import { FloatButton } from 'antd4-extend';

export default () => (
  <div style={{ height: '200vh' }}>
    <p>向下滚动查看回到顶部按钮</p>
    <FloatButton.BackTop visibilityHeight={100} />
  </div>
);
```

## API

### FloatButton

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| icon | 设置按钮图标 | ReactNode | - |
| description | 设置按钮描述 | ReactNode | - |
| tooltip | 气泡卡片内容 | ReactNode | - |
| type | 设置按钮类型 | `default` \| `primary` | `default` |
| shape | 设置按钮形状 | `circle` \| `square` | `circle` |
| href | 点击跳转的地址 | string | - |
| target | 相当于 a 链接的 target 属性，href 存在时生效 | string | - |
| badge | 带徽标的悬浮按钮 | [BadgeProps](https://ant.design/components/badge-cn#API) | - |
| onClick | 点击按钮的回调 | (event) => void | - |

### FloatButton.Group

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| trigger | 触发方式 | `click` \| `hover` | - |
| open | 是否展开 | boolean | - |
| onOpenChange | 展开收起的回调 | (open: boolean) => void | - |

### FloatButton.BackTop

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| visibilityHeight | 滚动高度达到此值才出现 | number | 400 |
| duration | 回到顶部所需时间（ms） | number | 450 |
| target | 设置需要监听其滚动事件的元素，值为一个返回对应 DOM 元素的函数 | () => HTMLElement | () => window |
| onClick | 点击按钮的回调 | (event) => void | - |
