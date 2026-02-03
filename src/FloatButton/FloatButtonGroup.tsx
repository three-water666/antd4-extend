import React, { useContext, useEffect } from 'react';
import classNames from 'classnames';
import { ConfigContext } from 'antd/lib/config-provider';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import type { FloatButtonGroupProps } from './interface';
import FloatButtonContext from './context';
import FloatButton from './FloatButton';

const FloatButtonGroup = (props: FloatButtonGroupProps) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    style,
    shape = 'circle',
    type = 'default',
    icon,
    description,
    trigger,
    open,
    onOpenChange,
    children,
    ...restProps
  } = props;

  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('float-btn-group', customizePrefixCls);
  const floatBtnPrefixCls = getPrefixCls('float-btn');

  const [mergedOpen, setMergedOpen] = useMergedState(false, {
    value: open,
  });

  const onInternalOpenChange = (nextOpen: boolean) => {
    setMergedOpen(nextOpen);
    onOpenChange?.(nextOpen);
  };

  const classString = classNames(prefixCls, className, {
    [`${prefixCls}-rtl`]: false, // Not handling RTL for now
    [`${prefixCls}-${shape}`]: shape,
    [`${prefixCls}-${trigger}`]: trigger,
    [`${prefixCls}-${trigger}-active`]: mergedOpen,
  });

  const triggerNode = trigger ? (
    <FloatButton
      {...restProps}
      type={type}
      shape={shape}
      icon={mergedOpen ? <CloseOutlined /> : icon || <PlusOutlined />}
      description={description}
      onClick={() => {
        if (trigger === 'click') {
          onInternalOpenChange(!mergedOpen);
        }
      }}
      className={`${prefixCls}-trigger`}
    />
  ) : null;

  const groupContext = React.useMemo(() => ({ shape, type }), [shape, type]);

  const wrapperProps = trigger === 'hover' ? {
    onMouseEnter: () => onInternalOpenChange(true),
    onMouseLeave: () => onInternalOpenChange(false),
  } : {};

  return (
    <FloatButtonContext.Provider value={groupContext}>
      <div className={classString} style={style} {...wrapperProps}>
        {triggerNode}
        <div className={`${prefixCls}-wrap`}>
          {children}
        </div>
      </div>
    </FloatButtonContext.Provider>
  );
};

export default FloatButtonGroup;
