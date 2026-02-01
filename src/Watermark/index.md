---
title: Watermark
group:
  title: Components
  order: 1
---

# Watermark

Add specific text or patterns to the page, which can be used to identify the copyright.

## When To Use

- When you need to annotate heavy-sensitive information.
- When you need to declare the copyright of the content.

## Examples

### Basic Usage

Basic usage.

```tsx
import React from 'react';
import { Watermark } from 'antd4-extend';

const App = () => (
  <Watermark content="Ant Design">
    <div style={{ height: 500 }} />
  </Watermark>
);

export default App;
```

### Custom Configuration

Support custom configuration for `zIndex`, `width`, `height`, `rotate`, `font`, `gap` and `offset`.

```tsx
import React, { useState } from 'react';
import { Watermark, Slider, ColorPicker, Space, Form, Input, InputNumber } from 'antd4-extend';
import { Button } from 'antd'; // Use native antd for simple controls if needed

const App = () => {
  const [config, setConfig] = useState({
    content: 'Ant Design',
    color: 'rgba(0,0,0,0.15)',
    fontSize: 16,
    zIndex: 11,
    rotate: -22,
    gap: [100, 100],
    offset: [50, 50],
  });

  return (
    <div style={{ display: 'flex' }}>
      <Watermark
        content={config.content}
        font={{ color: config.color, fontSize: config.fontSize }}
        zIndex={config.zIndex}
        rotate={config.rotate}
        gap={config.gap}
        offset={config.offset}
      >
        <div style={{ height: 500, width: 500, background: '#f5f5f5' }}>
           <p style={{ padding: 24 }}>
             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
             probare, quae sunt a te dicta? Refert tamen, quo modo.
           </p>
        </div>
      </Watermark>
    </div>
  );
};

export default App;
```

### Image Watermark

Watermark with image.

```tsx
import React from 'react';
import { Watermark } from 'antd4-extend';

const App = () => (
  <Watermark
    height={30}
    width={130}
    image="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
  >
    <div style={{ height: 500 }} />
  </Watermark>
);

export default App;
```

## API

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| width | The width of the watermark | `number` | `120` |
| height | The height of the watermark | `number` | `64` |
| rotate | The rotation angle of the watermark | `number` | `-22` |
| zIndex | The z-index of the watermark | `number` | `9` |
| image | The image url of the watermark | `string` | - |
| content | The text content of the watermark | `string \| string[]` | - |
| font | The font style of the watermark | `WatermarkFontType` | - |
| gap | The gap of the watermark | `[number, number]` | `[100, 100]` |
| offset | The offset of the watermark | `[number, number]` | `[gap[0]/2, gap[1]/2]` |
| monitor | Whether to monitor the watermark being deleted or modified | `boolean` | `true` |

### WatermarkFontType

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| color | Font color | `string` | `rgba(0,0,0,.15)` |
| fontSize | Font size | `number` | `16` |
| fontWeight | Font weight | `number` | `normal` |
| fontFamily | Font family | `string` | `sans-serif` |
| fontStyle | Font style | `none \| normal \| italic \| oblique` | `normal` |

