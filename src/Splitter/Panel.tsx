import * as React from 'react';
import classNames from 'classnames';
import type { PanelProps } from './interface';
import SplitterContext from './context';

const Panel: React.FC<PanelProps> = (props) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    style,
    children,
    size,
    min,
    max,
  } = props;

  const context = React.useContext(SplitterContext);
  const prefixCls = customizePrefixCls || `${context?.prefixCls}-panel`;

  const panelClassName = classNames(prefixCls, className);

  const mergedStyle: React.CSSProperties = {
    ...style,
  };

  if (size !== undefined) {
    const sizeProp = context?.layout === 'vertical' ? 'height' : 'width';
    mergedStyle[sizeProp] = size;
    mergedStyle.flex = `0 0 ${typeof size === 'number' ? `${size}px` : size}`;
  } else {
    mergedStyle.flex = 1;
  }

  if (min !== undefined) {
    const minProp = context?.layout === 'vertical' ? 'minHeight' : 'minWidth';
    mergedStyle[minProp] = min;
  }

  if (max !== undefined) {
    const maxProp = context?.layout === 'vertical' ? 'maxHeight' : 'maxWidth';
    mergedStyle[maxProp] = max;
  }

  return (
    <div className={panelClassName} style={mergedStyle}>
      {children}
    </div>
  );
};

export default Panel;
