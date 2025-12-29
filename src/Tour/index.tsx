import React, { useContext } from 'react';
import RcTour from '@rc-component/tour';
import classNames from 'classnames';
import { Button, ConfigProvider } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import { TourProps } from './interface';
import zhCN from './locale/zh_CN';
import enUS from './locale/en_US';
import './index.less';

const Tour: React.FC<TourProps> = (props) => {
  const {
    prefixCls: customPrefixCls,
    steps = [],
    current,
    type = 'default',
    onClose,
    onFinish,
    onChange,
    mask = true,
    arrow = true,
    className,
    open,
    closeIcon,
    indicatorsRender,
    zIndex,
    getPopupContainer,
    gap,
    disabledInteraction,
    actionsRender,
    locale: customLocale,
    ...restProps
  } = props;

  const { getPrefixCls, locale } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = getPrefixCls('tour', customPrefixCls);

  // 合并国际化配置
  const mergedLocale = {
    ...(locale?.locale?.includes('zh') ? zhCN : enUS),
    ...customLocale,
  };

  const [mergedCurrent, setMergedCurrent] = useMergedState(0, {
    value: current,
  });

  const onInternalChange = (nextCurrent: number) => {
    setMergedCurrent(nextCurrent);
    onChange?.(nextCurrent);
  };

  // 当 open 变为 true 时，如果没有传入 current，重置为 0
  React.useEffect(() => {
    if (open && current === undefined) {
      setMergedCurrent(0);
    }
  }, [open, current]);

  const renderIndicators = (currentStep: number, total: number) => {
    if (indicatorsRender) {
      return (
        <div className={`${prefixCls}-indicators`}>
          {indicatorsRender(currentStep, total)}
        </div>
      );
    }
    return (
      <div className={`${prefixCls}-indicators`}>
        {Array.from({ length: total }).map((_, index) => (
          <span
            key={index}
            className={classNames(`${prefixCls}-indicator`, {
              [`${prefixCls}-indicator-active`]: index === currentStep,
            })}
            onClick={() => onInternalChange(index)}
          />
        ))}
      </div>
    );
  };

  const renderPanel = (stepProps: any, stepCurrent: number) => {
    const {
      title,
      description,
      cover,
      nextButtonProps,
      prevButtonProps,
      type: stepType,
      closeIcon: stepCloseIcon,
    } = stepProps;

    const mainType = stepType || type;
    const isLast = stepCurrent === steps.length - 1;

    const customCloseIcon = stepCloseIcon !== undefined ? stepCloseIcon : closeIcon;

    const buttons = (
      <div className={`${prefixCls}-buttons`}>
        {stepCurrent > 0 && (
          <Button
            size="small"
            className={`${prefixCls}-prev-btn`}
            onClick={() => onInternalChange(stepCurrent - 1)}
            {...prevButtonProps}
          >
            {prevButtonProps?.children || mergedLocale.prevText}
          </Button>
        )}
        <Button
          type={mainType === 'primary' ? 'default' : 'primary'}
          size="small"
          className={`${prefixCls}-next-btn`}
          onClick={() => {
            if (isLast) {
              onFinish ? onFinish() : onClose?.(stepCurrent);
            } else {
              onInternalChange(stepCurrent + 1);
            }
          }}
          {...nextButtonProps}
        >
          {nextButtonProps?.children ||
            (isLast ? mergedLocale.finishText : mergedLocale.nextText)}
        </Button>
      </div>
    );

    return (
      <div className={classNames(`${prefixCls}-content`, `${prefixCls}-content-${mainType}`)}>
        <div className={`${prefixCls}-inner`}>
          <div className={`${prefixCls}-close`} onClick={() => onClose?.(stepCurrent)}>
            {customCloseIcon !== undefined ? customCloseIcon : <CloseOutlined />}
          </div>

          {cover && <div className={`${prefixCls}-cover`}>{cover}</div>}

          <div className={`${prefixCls}-header`}>
            <div className={`${prefixCls}-title`}>{title}</div>
          </div>

          <div className={`${prefixCls}-description`}>{description}</div>

          <div className={`${prefixCls}-footer`}>
            {renderIndicators(stepCurrent, steps.length)}
            {actionsRender
              ? actionsRender(buttons, { current: stepCurrent, total: steps.length })
              : buttons}
          </div>
        </div>
        {arrow && <div className={`${prefixCls}-arrow`} />}
      </div>
    );
  };

  return (
    <RcTour
      {...restProps}
      open={open}
      prefixCls={prefixCls}
      steps={steps.map(step => {
        const { target, ...restStep } = step;
        let finalTarget: any = target;
        if (target && typeof target === 'object' && 'current' in target) {
          finalTarget = () => (target as React.RefObject<HTMLElement>).current;
        } else if (typeof target !== 'function') {
          finalTarget = () => target;
        }

        return {
          ...restStep,
          target: finalTarget,
        };
      }) as any}
      current={mergedCurrent}
      onChange={onInternalChange}
      // 这里对 mask 做了兼容处理，如果 mask={false} 则不传
      mask={mask ? (typeof mask === 'object' ? mask : { color: 'rgba(0, 0, 0, 0.45)' }) : false}
      onClose={onClose}
      renderPanel={renderPanel}
      zIndex={zIndex}
      getPopupContainer={getPopupContainer}
      gap={gap}
      disabledInteraction={disabledInteraction}
      rootClassName={classNames(className, {
        [`${prefixCls}-primary`]: type === 'primary',
      })}
    />
  );
};

export default Tour;