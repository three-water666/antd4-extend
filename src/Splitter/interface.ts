import type { CSSProperties, ReactNode } from 'react';

export type SplitterLayout = 'horizontal' | 'vertical';

export interface SplitterProps {
  prefixCls?: string;
  className?: string;
  style?: CSSProperties;
  layout?: SplitterLayout;
  children?: ReactNode;
  onResizeStart?: (sizes: number[]) => void;
  onResizeEnd?: (sizes: number[]) => void;
  onResize?: (sizes: number[]) => void;
}

export interface PanelProps {
  prefixCls?: string;
  className?: string;
  style?: CSSProperties;
  size?: number | string;
  defaultSize?: number | string;
  min?: number | string;
  max?: number | string;
  resizable?: boolean;
  collapsible?: boolean | { before?: ReactNode; after?: ReactNode };
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapse?: () => void;
  onExpand?: () => void;
  children?: ReactNode;
  /** @internal */
  index?: number;
}

export interface SplitBarProps {
  prefixCls?: string;
  layout?: SplitterLayout;
  index: number;
  onResizeStart: (index: number, e: MouseEvent | TouchEvent) => void;
  resizable?: boolean;
  collapsible?: boolean | { before?: ReactNode; after?: ReactNode };
}
