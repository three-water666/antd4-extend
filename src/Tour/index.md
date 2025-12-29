---
title: Tour 漫游式引导
group:
  title: 数据展示
  path: /data-display
---

# Tour 漫游式引导

用于引导用户了解产品功能。

## 代码演示

### 基本用法

最简单的用法。

```tsx
import React, { useRef, useState } from 'react';
import { Button, Divider, Space } from 'antd';
import { Tour } from 'antd4-extend';

export default () => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  const [open, setOpen] = useState(false);

  const steps = [
    {
      title: '创建文件',
      description: '点击这里新建一个文件。',
      target: () => ref1.current,
    },
    {
      title: '保存',
      description: '将你的更改保存到本地。',
      target: () => ref2.current,
    },
    {
      title: '更多选项',
      description: '查看更多操作。',
      target: () => ref3.current,
    },
  ];

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        开始导览
      </Button>

      <Divider />

      <Space>
        <Button ref={ref1}>上传</Button>
        <Button ref={ref2} type="primary">保存</Button>
        <Button ref={ref3}>更多</Button>
      </Space>

      <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
    </>
  );
};
```

### 非受控模式

通过 `current` 和 `onChange` 实现非受控。

```tsx
import React, { useRef, useState } from 'react';
import { Button, Space } from 'antd';
import { Tour } from 'antd4-extend';

export default () => {
  const ref1 = useRef(null);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  const steps = [
    {
      title: '第一步',
      description: '这里是第一步的描述。',
      target: () => ref1.current,
    },
    {
      title: '第二步',
      description: '这里是第二步的描述。',
      target: () => ref1.current,
    },
  ];

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        打开（当前第 {current + 1} 步）
      </Button>
      <Space style={{ marginTop: 16, display: 'block' }}>
        <Button ref={ref1}>目标元素</Button>
      </Space>
      <Tour
        open={open}
        current={current}
        onChange={setCurrent}
        onClose={() => setOpen(false)}
        steps={steps}
      />
    </>
  );
};
```

### 不同的类型

提供了 `default` 和 `primary` 两种类型。

```tsx
import React, { useRef, useState } from 'react';
import { Button, Space } from 'antd';
import { Tour } from 'antd4-extend';

export default () => {
  const ref1 = useRef(null);
  const [open, setOpen] = useState(false);

  const steps = [
    {
      title: '默认类型',
      description: '这是默认样式的引导卡片。',
      target: () => ref1.current,
    },
    {
      title: '主要类型',
      description: '通过设置 type="primary" 切换品牌色背景。',
      type: 'primary',
      target: () => ref1.current,
    },
  ];

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        开始导览
      </Button>
      <div style={{ marginTop: 16 }}>
        <Button ref={ref1}>目标按钮</Button>
      </div>
      <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
    </>
  );
};
```

### 自定义指示器

通过 `indicatorsRender` 自定义指示器。

```tsx
import React, { useRef, useState } from 'react';
import { Button } from 'antd';
import { Tour } from 'antd4-extend';

export default () => {
  const ref1 = useRef(null);
  const [open, setOpen] = useState(false);

  const steps = [{ title: '第一步', target: () => ref1.current }, { title: '第二步', target: () => ref1.current }];

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        自定义指示器
      </Button>
      <Button ref={ref1} style={{ marginLeft: 16 }}>目标</Button>
      <Tour
        open={open}
        onClose={() => setOpen(false)}
        steps={steps}
        indicatorsRender={(current, total) => (
          <span>
            {current + 1} / {total}
          </span>
        )}
      />
    </>
  );
};
```

## API

### Tour

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| arrow | 是否显示箭头，包含是否指向元素中心的配置 | boolean \| { pointAtCenter: boolean } | true |
| current | 当前处于哪一步 | number | - |
| indicatorsRender | 自定义指示器 | (current: number, total: number) => ReactNode | - |
| actionsRender | 自定义操作按钮 | (originNode: ReactNode, info: { current: number, total: number }) => ReactNode | - |
| mask | 是否启用蒙层，也可传入配置改变蒙层样式和填充色 | boolean \| { style?: CSSProperties, color?: string } | true |
| type | 类型，影响底色与文字颜色 | `default` \| `primary` | `default` |
| open | 打开引导 | boolean | - |
| zIndex | Tour 的层级 | number | 1001 |
| gap | 控制高亮区域的圆角边框和显示间距 | { offset?: number \| [number, number], radius?: number } | { offset: 6, radius: 2 } |
| closeIcon | 自定义关闭按钮 | ReactNode | - |
| locale | 国际化配置 | [TourLocale](#tourlocale) | - |
| getPopupContainer | 设置 Tour 浮层的渲染节点 | (node: HTMLElement) => HTMLElement | body |
| onChange | 步骤改变时的回调 | (current: number) => void | - |
| onClose | 关闭引导时的回调函数 | (current: number) => void | - |
| onFinish | 引导完成时的回调 | () => void | - |

### TourStep

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | ReactNode | - |
| description | 描述 | ReactNode | - |
| cover | 图片或视频展示 | ReactNode | - |
| target | 目标元素 | HTMLElement \| (() => HTMLElement) \| React.RefObject | - |
| type | 类型，影响底色与文字颜色 | `default` \| `primary` | - |
| placement | 引导卡片相对于目标元素的位置 | `center` \| `left` \| `leftTop` \| `leftBottom` \| `right` \| `rightTop` \| `rightBottom` \| `top` \| `topLeft` \| `topRight` \| `bottom` \| `bottomLeft` \| `bottomRight` | `bottom` |
| arrow | 是否显示箭头 | boolean \| { pointAtCenter: boolean } | true |
| mask | 是否启用蒙层 | boolean \| { style?: CSSProperties, color?: string } | true |
| nextButtonProps | 下一步按钮的属性 | [ButtonProps](https://ant.design/components/button-cn#api) | - |
| prevButtonProps | 上一步按钮的属性 | [ButtonProps](https://ant.design/components/button-cn#api) | - |
| scrollIntoViewOptions | 是否支持当前元素滚动到视窗内 | boolean \| ScrollIntoViewOptions | true |
| style | 自定义容器样式 | CSSProperties | - |
| className | 自定义容器类名 | string | - |

### TourLocale

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| prevText | 上一步按钮文字 | string | `上一步` |
| nextText | 下一步按钮文字 | string | `下一步` |
| finishText | 完成按钮文字 | string | `完成` |
