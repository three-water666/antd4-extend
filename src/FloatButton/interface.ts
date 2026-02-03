import type { ReactNode, CSSProperties, MouseEventHandler } from 'react';
import type { BadgeProps } from 'antd/lib/badge';
import type { TooltipProps } from 'antd/lib/tooltip';

export type FloatButtonType = 'default' | 'primary';
export type FloatButtonShape = 'circle' | 'square';
export type FloatButtonTrigger = 'click' | 'hover';

export interface FloatButtonProps {
  prefixCls?: string;
  className?: string;
  style?: CSSProperties;
  icon?: ReactNode;
  description?: ReactNode;
  tooltip?: TooltipProps['title'];
  type?: FloatButtonType;
  shape?: FloatButtonShape;
  href?: string;
  target?: string;
  badge?: BadgeProps;
  onClick?: MouseEventHandler<HTMLElement>;
}

export interface FloatButtonGroupProps extends FloatButtonProps {
  trigger?: FloatButtonTrigger;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: ReactNode;
}

export interface BackTopProps extends FloatButtonProps {
  visibilityHeight?: number;
  onClick?: MouseEventHandler<HTMLElement>;
  target?: () => HTMLElement | Window | Document;
  duration?: number;
}
