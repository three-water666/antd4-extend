import * as React from 'react';
import classNames from 'classnames';
import type { SplitBarProps } from './interface';

const SplitBar: React.FC<SplitBarProps> = (props) => {
  const { prefixCls, layout, index, onResizeStart, resizable = true } = props;

  const barPrefixCls = `${prefixCls}-bar`;

  const onMouseDown = (e: React.MouseEvent) => {
    if (resizable) {
      onResizeStart(index, e.nativeEvent);
    }
  };

  const onTouchStart = (e: React.TouchEvent) => {
    if (resizable) {
      onResizeStart(index, e.nativeEvent);
    }
  };

  return (
    <div
      className={classNames(barPrefixCls, {
        [`${barPrefixCls}-horizontal`]: layout === 'horizontal',
        [`${barPrefixCls}-vertical`]: layout === 'vertical',
        [`${barPrefixCls}-resizable`]: resizable,
      })}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
    >
      <div className={`${barPrefixCls}-dragger`} />
    </div>
  );
};

export default SplitBar;
