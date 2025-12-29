import { ReactNode } from 'react';
import { TourProps as RcTourProps } from '@rc-component/tour';
import { ButtonProps } from 'antd/lib/button';

import { TourLocale } from './locale/en_US';

export interface TourStepProps {
  title?: ReactNode;
  description?: ReactNode;
  cover?: ReactNode;
  target?: HTMLElement | (() => HTMLElement | null) | React.RefObject<HTMLElement> | null;
  prevButtonProps?: ButtonProps;
  nextButtonProps?: ButtonProps;
  type?: 'default' | 'primary';
  style?: React.CSSProperties;
  className?: string;
  placement?:
    | 'center'
    | 'left'
    | 'leftTop'
    | 'leftBottom'
    | 'right'
    | 'rightTop'
    | 'rightBottom'
    | 'top'
    | 'topLeft'
    | 'topRight'
    | 'bottom'
    | 'bottomLeft'
    | 'bottomRight';
  arrow?: boolean | { pointAtCenter: boolean };
  mask?: boolean | { style?: React.CSSProperties; color?: string };
  scrollIntoViewOptions?: boolean | ScrollIntoViewOptions;
  closeIcon?: ReactNode;
}

export interface TourProps extends Omit<RcTourProps, 'steps' | 'arrow' | 'mask'> {
  steps?: TourStepProps[];
  type?: 'default' | 'primary';
  className?: string;
  arrow?: boolean | { pointAtCenter: boolean };
  mask?: boolean | { style?: React.CSSProperties; color?: string };
  onFinish?: () => void;
  closeIcon?: ReactNode;
  indicatorsRender?: (current: number, total: number) => ReactNode;
  zIndex?: number;
  getPopupContainer?: (node: HTMLElement) => HTMLElement;
  gap?: { offset?: number | [number, number]; radius?: number };
  disabledInteraction?: boolean;
  actionsRender?: (
    originNode: ReactNode,
    info: { current: number; total: number },
  ) => ReactNode;
  locale?: TourLocale;
}