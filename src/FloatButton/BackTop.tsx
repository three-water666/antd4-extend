import React, { useContext, useEffect, useState, useCallback } from 'react';
import classNames from 'classnames';
import { ConfigContext } from 'antd/lib/config-provider';
import { VerticalAlignTopOutlined } from '@ant-design/icons';
import raf from 'rc-util/lib/raf';
import type { BackTopProps } from './interface';
import FloatButton from './FloatButton';

function throttleByAnimationFrame<T extends any[]>(fn: (...args: T) => void) {
  let requestId: number | null = null;

  const later = (args: T) => () => {
    requestId = null;
    fn(...args);
  };

  const throttled = (...args: T) => {
    if (requestId === null) {
      requestId = raf(later(args));
    }
  };

  throttled.cancel = () => {
    if (requestId !== null) {
      raf.cancel(requestId);
      requestId = null;
    }
  };

  return throttled;
}

function getScroll(target: HTMLElement | Window | Document | null, top: boolean): number {
  if (typeof window === 'undefined') {
    return 0;
  }
  const method = top ? 'scrollTop' : 'scrollLeft';
  let result = 0;
  if (target === window) {
    result = window[top ? 'pageYOffset' : 'pageXOffset'];
  } else if (target instanceof Document) {
    result = target.documentElement[method];
  } else if (target instanceof HTMLElement) {
    result = target[method];
  } else if (target) {
    // @ts-ignore
    result = target[method];
  }
  return result;
}

const BackTop = (props: BackTopProps) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    visibilityHeight = 400,
    target,
    onClick,
    duration = 450, // compatible with antd v4 BackTop
    icon = <VerticalAlignTopOutlined />,
    ...restProps
  } = props;

  const [visible, setVisible] = useState(visibilityHeight === 0);

  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('float-btn-back-top', customizePrefixCls);

  const getTarget = target || (() => window);

  const handleScroll = useCallback(
    throttleByAnimationFrame((e: React.UIEvent<HTMLElement> | { target: any }) => {
      const scrollTop = getScroll(e.target, true);
      setVisible(scrollTop >= visibilityHeight);
    }),
    [visibilityHeight],
  );

  useEffect(() => {
    const container = getTarget();
    setVisible(getScroll(container, true) >= visibilityHeight);

    const eventListener = (e: any) => handleScroll(e);
    container.addEventListener('scroll', eventListener);
    return () => {
      container.removeEventListener('scroll', eventListener);
      handleScroll.cancel();
    };
  }, [target, handleScroll, visibilityHeight]);

  const scrollToTop = (e: React.MouseEvent<HTMLElement>) => {
    const container = getTarget();
    if (typeof container === 'window' || container === window) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      (container as HTMLElement).scrollTo({ top: 0, behavior: 'smooth' });
    }
    onClick?.(e);
  };

  const classString = classNames(prefixCls, className, {
    [`${prefixCls}-show`]: visible,
  });

  if (!visible) {
    return null;
  }

  return (
    <FloatButton
      {...restProps}
      icon={icon}
      onClick={scrollToTop}
      className={classString}
    />
  );
};

export default BackTop;
