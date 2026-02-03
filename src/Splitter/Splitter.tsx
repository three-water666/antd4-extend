import * as React from 'react';
import classNames from 'classnames';
import { ConfigProvider } from 'antd';
import type { SplitterProps, SplitterLayout } from './interface';
import Panel from './Panel';
import SplitBar from './SplitBar';
import SplitterContext from './context';
import './style';

const Splitter: React.FC<SplitterProps> & { Panel: typeof Panel } = (props) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    style,
    layout = 'horizontal',
    children,
    onResizeStart,
    onResizeEnd,
    onResize,
  } = props;

  const { getPrefixCls } = React.useContext(ConfigProvider.ConfigContext);
  const prefixCls = getPrefixCls('splitter', customizePrefixCls);

  const containerRef = React.useRef<HTMLDivElement>(null);

  // Filter and get panels
  const panels = React.useMemo(() => {
    return React.Children.toArray(children).filter((child) => {
      return React.isValidElement(child) && (child.type === Panel || (child.type as any).displayName === 'Panel');
    }) as React.ReactElement[];
  }, [children]);

  const [sizes, setSizes] = React.useState<(number | string)[]>(() =>
    panels.map(p => p.props.size ?? p.props.defaultSize ?? '1fr')
  );

  const [isResizing, setIsResizing] = React.useState(false);
  const resizingInfo = React.useRef<{
    index: number;
    startPos: number;
    startSizes: number[];
  } | null>(null);

  const handleResizeStart = (index: number, e: MouseEvent | TouchEvent) => {
    setIsResizing(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const startPos = layout === 'horizontal' ? clientX : clientY;

    // Get actual pixel sizes of all panels
    const panelElements = containerRef.current?.querySelectorAll(`.${prefixCls}-panel`);
    const startSizes: number[] = [];
    panelElements?.forEach((el) => {
      const rect = el.getBoundingClientRect();
      startSizes.push(layout === 'horizontal' ? rect.width : rect.height);
    });

    resizingInfo.current = {
      index,
      startPos,
      startSizes,
    };

    if (onResizeStart) {
      onResizeStart(startSizes);
    }

    document.addEventListener('mousemove', handleResizeMove);
    document.addEventListener('mouseup', handleResizeEnd);
    document.addEventListener('touchmove', handleResizeMove);
    document.addEventListener('touchend', handleResizeEnd);
  };

  const handleResizeMove = (e: MouseEvent | TouchEvent) => {
    if (!resizingInfo.current) return;

    const { index, startPos, startSizes } = resizingInfo.current;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const currentPos = layout === 'horizontal' ? clientX : clientY;
    const delta = currentPos - startPos;

    const newSizes = [...startSizes];
    const prevIndex = index;
    const nextIndex = index + 1;

    let requestedDelta = delta;

    // Constrain prev panel
    const prevPanel = panels[prevIndex].props;
    const prevMin = typeof prevPanel.min === 'number' ? prevPanel.min : (parseFloat(prevPanel.min || '0') || 0);
    const prevMax = typeof prevPanel.max === 'number' ? prevPanel.max : (parseFloat(prevPanel.max || 'Infinity') || Infinity);

    if (startSizes[prevIndex] + requestedDelta < prevMin) {
      requestedDelta = prevMin - startSizes[prevIndex];
    } else if (startSizes[prevIndex] + requestedDelta > prevMax) {
      requestedDelta = prevMax - startSizes[prevIndex];
    }

    // Constrain next panel
    const nextPanel = panels[nextIndex].props;
    const nextMin = typeof nextPanel.min === 'number' ? nextPanel.min : (parseFloat(nextPanel.min || '0') || 0);
    const nextMax = typeof nextPanel.max === 'number' ? nextPanel.max : (parseFloat(nextPanel.max || 'Infinity') || Infinity);

    if (startSizes[nextIndex] - requestedDelta < nextMin) {
      requestedDelta = startSizes[nextIndex] - nextMin;
    } else if (startSizes[nextIndex] - requestedDelta > nextMax) {
      requestedDelta = startSizes[nextIndex] - nextMax;
    }

    newSizes[prevIndex] = startSizes[prevIndex] + requestedDelta;
    newSizes[nextIndex] = startSizes[nextIndex] - requestedDelta;

    setSizes(newSizes.map(s => `${s}px`));

    if (onResize) {
      onResize(newSizes);
    }
  };

  const handleResizeEnd = () => {
    setIsResizing(false);
    if (onResizeEnd && resizingInfo.current) {
      // Get current sizes
      const panelElements = containerRef.current?.querySelectorAll(`.${prefixCls}-panel`);
      const currentSizes: number[] = [];
      panelElements?.forEach((el) => {
        const rect = el.getBoundingClientRect();
        currentSizes.push(layout === 'horizontal' ? rect.width : rect.height);
      });
      onResizeEnd(currentSizes);
    }
    resizingInfo.current = null;
    document.removeEventListener('mousemove', handleResizeMove);
    document.removeEventListener('mouseup', handleResizeEnd);
    document.removeEventListener('touchmove', handleResizeMove);
    document.removeEventListener('touchend', handleResizeEnd);
  };

  React.useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleResizeMove);
      document.removeEventListener('mouseup', handleResizeEnd);
      document.removeEventListener('touchmove', handleResizeMove);
      document.removeEventListener('touchend', handleResizeEnd);
    };
  }, []);

  const splitterClassName = classNames(prefixCls, className, {
    [`${prefixCls}-vertical`]: layout === 'vertical',
    [`${prefixCls}-horizontal`]: layout === 'horizontal',
    [`${prefixCls}-resizing`]: isResizing,
  });

  const contextValue = React.useMemo(() => ({ prefixCls, layout }), [prefixCls, layout]);

  const items: React.ReactNode[] = [];
  panels.forEach((panel, index) => {
    items.push(
      React.cloneElement(panel, {
        key: `panel-${index}`,
        prefixCls: `${prefixCls}-panel`,
        size: sizes[index],
        index,
      })
    );

    if (index < panels.length - 1) {
      items.push(
        <SplitBar
          key={`bar-${index}`}
          prefixCls={prefixCls}
          layout={layout}
          index={index}
          onResizeStart={handleResizeStart}
          resizable={panel.props.resizable !== false && panels[index + 1].props.resizable !== false}
        />
      );
    }
  });

  return (
    <SplitterContext.Provider value={contextValue}>
      <div ref={containerRef} className={splitterClassName} style={style}>
        {items}
      </div>
    </SplitterContext.Provider>
  );
};

Splitter.Panel = Panel;
Panel.displayName = 'Panel';

export default Splitter;
