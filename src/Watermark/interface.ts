import type { CSSProperties, ReactNode } from 'react';

export interface WatermarkFontType {
  color?: string;
  fontSize?: number | string;
  fontWeight?: 'normal' | 'light' | 'weight' | number;
  fontStyle?: 'none' | 'normal' | 'italic' | 'oblique';
  fontFamily?: string;
  textAlign?: 'left' | 'center' | 'right';
}

export interface WatermarkProps {
  /**
   * The z-index of the watermark
   * @default 9
   */
  zIndex?: number;
  /**
   * The width of the watermark
   * @default 120
   */
  width?: number;
  /**
   * The height of the watermark
   * @default 64
   */
  height?: number;
  /**
   * The rotation angle of the watermark
   * @default -22
   */
  rotate?: number;
  /**
   * The image url of the watermark
   */
  image?: string;
  /**
   * The text content of the watermark
   */
  content?: string | string[];
  /**
   * The font style of the watermark
   */
  font?: WatermarkFontType;
  /**
   * The style of the watermark wrapper
   */
  style?: CSSProperties;
  /**
   * The className of the watermark wrapper
   */
  className?: string;
  /**
   * The style of the root element
   */
  rootClassName?: string;
  /**
   * The gap of the watermark
   * @default [100, 100]
   */
  gap?: [number, number];
  /**
   * The offset of the watermark
   */
  offset?: [number, number];
  children?: ReactNode;
  /**
   * Whether to monitor the watermark being deleted or modified
   * @default true
   */
  monitor?: boolean;
}
