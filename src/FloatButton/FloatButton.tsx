import React, { useContext, useMemo } from 'react';
import classNames from 'classnames';
import { ConfigContext } from 'antd/lib/config-provider';
import Tooltip from 'antd/lib/tooltip';
import Badge from 'antd/lib/badge';
import type { FloatButtonProps } from './interface';
import FloatButtonContext from './context';
import './style';

const FloatButton = (props: FloatButtonProps) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    style,
    type = 'default',
    shape = 'circle',
    icon,
    description,
    tooltip,
    href,
    target,
    badge = {},
    onClick,
    ...restProps
  } = props;

  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('float-btn', customizePrefixCls);
  const { shape: contextShape, type: contextType } = useContext(FloatButtonContext);

  const mergeShape = contextShape || shape;
  const mergeType = contextType || type;

  const classString = classNames(prefixCls, className, {
    [`${prefixCls}-${mergeType}`]: mergeType,
    [`${prefixCls}-${mergeShape}`]: mergeShape,
    [`${prefixCls}-icon-only`]: !description,
  });

  const content = useMemo(() => {
    return (
      <div className={`${prefixCls}-body`}>
        {icon && <div className={`${prefixCls}-icon`}>{icon}</div>}
        {description && <div className={`${prefixCls}-description`}>{description}</div>}
      </div>
    );
  }, [prefixCls, icon, description]);

  const buttonNode = href ? (
    <a
      ref={null}
      {...restProps}
      href={href}
      target={target}
      className={`${prefixCls}-content`}
      onClick={onClick}
    >
      {content}
    </a>
  ) : (
    <button
      ref={null}
      {...restProps}
      className={`${prefixCls}-content`}
      type="button"
      onClick={onClick}
    >
      {content}
    </button>
  );

  const badgeNode = (
    <Badge {...badge} className={`${prefixCls}-badge`}>
      {buttonNode}
    </Badge>
  );

  if (tooltip) {
    return (
      <Tooltip title={tooltip} placement="left">
        <div className={classString} style={style}>
          {badgeNode}
        </div>
      </Tooltip>
    );
  }

  return (
    <div className={classString} style={style}>
      {badgeNode}
    </div>
  );
};

export default FloatButton;
