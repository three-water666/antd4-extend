---
title: Splitter
group:
  title: Components
  order: 2
---

# Splitter

A divider that separates content into multiple resizable areas.

## Examples

### Basic Usage

Horizontal split with two panels.

```tsx
import React from 'react';
import { Splitter } from 'antd4-extend';

const App = () => (
  <Splitter style={{ height: 200, border: '1px solid #d9d9d9' }}>
    <Splitter.Panel defaultSize="30%">
      <div style={{ padding: 16 }}>Left Panel</div>
    </Splitter.Panel>
    <Splitter.Panel>
      <div style={{ padding: 16 }}>Right Panel</div>
    </Splitter.Panel>
  </Splitter>
);

export default App;
```

### Vertical Split

Vertical split with two panels.

```tsx
import React from 'react';
import { Splitter } from 'antd4-extend';

const App = () => (
  <Splitter layout="vertical" style={{ height: 300, border: '1px solid #d9d9d9' }}>
    <Splitter.Panel defaultSize="40%">
      <div style={{ padding: 16 }}>Top Panel</div>
    </Splitter.Panel>
    <Splitter.Panel>
      <div style={{ padding: 16 }}>Bottom Panel</div>
    </Splitter.Panel>
  </Splitter>
);

export default App;
```

### Multiple Panels

Three panels split horizontally.

```tsx
import React from 'react';
import { Splitter } from 'antd4-extend';

const App = () => (
  <Splitter style={{ height: 200, border: '1px solid #d9d9d9' }}>
    <Splitter.Panel defaultSize="20%">
      <div style={{ padding: 16 }}>Panel 1</div>
    </Splitter.Panel>
    <Splitter.Panel defaultSize="60%">
      <div style={{ padding: 16 }}>Panel 2</div>
    </Splitter.Panel>
    <Splitter.Panel>
      <div style={{ padding: 16 }}>Panel 3</div>
    </Splitter.Panel>
  </Splitter>
);

export default App;
```

### Constraints

Panels with `min` and `max` sizes.

```tsx
import React from 'react';
import { Splitter } from 'antd4-extend';

const App = () => (
  <Splitter style={{ height: 200, border: '1px solid #d9d9d9' }}>
    <Splitter.Panel min={100} max={200}>
      <div style={{ padding: 16 }}>Min: 100, Max: 200</div>
    </Splitter.Panel>
    <Splitter.Panel>
      <div style={{ padding: 16 }}>Flexible Panel</div>
    </Splitter.Panel>
  </Splitter>
);

export default App;
```

### Nesting

Splitter inside another Splitter panel.

```tsx
import React from 'react';
import { Splitter } from 'antd4-extend';

const App = () => (
  <Splitter style={{ height: 300, border: '1px solid #d9d9d9' }}>
    <Splitter.Panel defaultSize="30%">
      <div style={{ padding: 16 }}>Outer Left</div>
    </Splitter.Panel>
    <Splitter.Panel>
      <Splitter layout="vertical">
        <Splitter.Panel>
          <div style={{ padding: 16 }}>Inner Top</div>
        </Splitter.Panel>
        <Splitter.Panel>
          <div style={{ padding: 16 }}>Inner Bottom</div>
        </Splitter.Panel>
      </Splitter>
    </Splitter.Panel>
  </Splitter>
);

export default App;
```

## API

### Splitter

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| layout | Layout direction of the panels | `horizontal \| vertical` | `horizontal` |
| onResize | Callback when panel sizes change | `(sizes: number[]) => void` | - |
| onResizeStart | Callback when starting to resize | `(sizes: number[]) => void` | - |
| onResizeEnd | Callback when finishing resizing | `(sizes: number[]) => void` | - |

### Splitter.Panel

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| size | Current size of the panel (controlled) | `number \| string` | - |
| defaultSize | Initial size of the panel | `number \| string` | - |
| min | Minimum size of the panel | `number \| string` | - |
| max | Maximum size of the panel | `number \| string` | - |
| resizable | Whether the panel is resizable | `boolean` | `true` |
| collapsible | Whether the panel is collapsible | `boolean` | `false` |
