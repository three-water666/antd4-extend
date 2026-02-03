import React, { useEffect, useRef, useState, useContext, useMemo } from 'react';
import classNames from 'classnames';
import { ConfigProvider } from 'antd';
import { getPixelRatio } from './utils';
import { WatermarkProps } from './interface';

/**
 * Base size of the canvas, 1 for parallel layout and 2 for alternate layout
 * Only alternate layout is currently supported
 */
const BaseSize = 2;
const FontGap = 3;

const Watermark: React.FC<WatermarkProps> = (props) => {
  const {
    zIndex = 9,
    rotate = -22,
    width = 120,
    height = 64,
    image,
    content,
    font = {},
    style,
    className,
    rootClassName,
    gap = [100, 100],
    offset,
    children,
    monitor = true,
  } = props;

  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = getPrefixCls('watermark');
  const wrapperCls = classNames(`${prefixCls}-wrapper`, rootClassName);
  const watermarkCls = classNames(prefixCls, className);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const stopObservation = useRef(false);

  const [base64Url, setBase64Url] = useState('');

  const {
    color = 'rgba(0,0,0,.15)',
    fontSize = 16,
    fontWeight = 'normal',
    fontStyle = 'normal',
    fontFamily = 'sans-serif',
    textAlign = 'center',
  } = font;

  const gapX = gap[0];
  const gapY = gap[1];
  const gapXCenter = gapX / 2;
  const gapYCenter = gapY / 2;
  const offsetLeft = offset?.[0] ?? gapXCenter;
  const offsetTop = offset?.[1] ?? gapYCenter;

  const markStyle = useMemo<React.CSSProperties>(() => {
    const mergedStyle: React.CSSProperties = {
      zIndex,
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      backgroundRepeat: 'repeat',
    };

    /** Calculate the style of the offset */
    let positionLeft = offsetLeft - gapXCenter;
    let positionTop = offsetTop - gapYCenter;
    if (positionLeft > 0) {
      mergedStyle.left = `${positionLeft}px`;
      mergedStyle.width = `calc(100% - ${positionLeft}px)`;
      positionLeft = 0;
    }
    if (positionTop > 0) {
      mergedStyle.top = `${positionTop}px`;
      mergedStyle.height = `calc(100% - ${positionTop}px)`;
      positionTop = 0;
    }
    mergedStyle.backgroundPosition = `${positionLeft}px ${positionTop}px`;

    return mergedStyle;
  }, [zIndex, offsetLeft, gapXCenter, offsetTop, gapYCenter]);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const ratio = getPixelRatio(ctx);

    const canvasWidth = `${(gapX + width) * BaseSize}px`;
    const canvasHeight = `${(gapY + height) * BaseSize}px`;
    const canvasOffsetLeft = offsetLeft || gapX / 2;
    const canvasOffsetTop = offsetTop || gapY / 2;

    canvas.setAttribute('width', `${(gapX + width) * BaseSize * ratio}px`);
    canvas.setAttribute('height', `${(gapY + height) * BaseSize * ratio}px`);

    if (ctx) {
      const draw = (img?: HTMLImageElement) => {
        const drawItem = (left: number, top: number) => {
          ctx.save();
          ctx.translate(left * ratio, top * ratio);
          ctx.scale(ratio, ratio);

          const RotateAngle = (rotate * Math.PI) / 180;
          ctx.rotate(RotateAngle);

          // Draw the text
          if (content) {
            ctx.font = `${fontStyle} normal ${fontWeight} ${Number(
              fontSize,
            )}px/${height}px ${fontFamily}`;
            ctx.fillStyle = color;
            ctx.textAlign = textAlign;
            ctx.textBaseline = 'top';

            const contents = Array.isArray(content) ? content : [content];

            contents?.forEach((item, index) => {
              ctx.fillText(item ?? '', 0, index * (Number(fontSize) + FontGap));
            });
          } else if (img) {
            ctx.drawImage(img, -width / 2, -height / 2, width, height);
          }

          ctx.restore();
        };

        drawItem(canvasOffsetLeft, canvasOffsetTop);
        if (BaseSize === 2) {
          drawItem(
            canvasOffsetLeft + gapX + width,
            canvasOffsetTop + gapY + height,
          );
        }
        setBase64Url(canvas.toDataURL());
      };

      if (image) {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.referrerPolicy = 'no-referrer';
        img.onload = () => {
          draw(img);
        };
        img.src = image;
      } else {
        draw();
      }
    }
  }, [
    gapX,
    gapY,
    offsetLeft,
    offsetTop,
    rotate,
    fontStyle,
    fontWeight,
    width,
    height,
    fontFamily,
    color,
    image,
    content,
    textAlign,
    fontSize,
  ]);

  useEffect(() => {
    if (monitor) {
      let mutationObserver: MutationObserver | null = null;
      
      const destroyWatermark = () => {
        if (mutationObserver) {
          mutationObserver.disconnect();
          mutationObserver = null;
        }
      };

      const { MutationObserver } = window;
      if (MutationObserver) {
        mutationObserver = new MutationObserver((mutations) => {
          if (stopObservation.current) {
            return;
          }
          mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
              const removeNodes = mutation.removedNodes;
              removeNodes.forEach((node) => {
                if (node === watermarkRef.current) {
                  destroyWatermark();
                  // Re-render handled by parent/React usually, but here we might need to force update or warn
                  // For now, we rely on React to keep the structure. 
                  // If the DOM node is removed by external script, this observer fires.
                  // Real implementation re-inserts the node. 
                  // React 16/17 reconciler makes this tricky to do manually without confusing React.
                  // A simple approach is just to log or check if we need to force update.
                  // Antd v5 uses a specialized hook that re-renders or forces the element back.
                  // Here, simpler approach: if removed, we rely on React state updates or parent re-renders to fix it eventually,
                  // or we can try to re-append (risky with React).
                  // Let's stick to attribute protection mostly.
                }
              });
            }
            if (mutation.type === 'attributes' && mutation.target === watermarkRef.current) {
              destroyWatermark();
              // If attributes changed (style hidden etc), we force reset.
              // We can trigger a re-render or manually reset style.
              if (watermarkRef.current) {
                watermarkRef.current.setAttribute('style', (watermarkRef.current as any)._prevStyle);
              }
              reObserve();
            }
          });
        });
        
        const reObserve = () => {
          if (watermarkRef.current && mutationObserver) {
             mutationObserver.observe(containerRef.current!, {
               attributes: false, // container attributes
               childList: true,
               subtree: false,
             });
             mutationObserver.observe(watermarkRef.current, {
               attributes: true, // watermark attributes
               childList: false,
               characterData: false,
             });
             // Save style for restoration
             (watermarkRef.current as any)._prevStyle = watermarkRef.current.getAttribute('style');
          }
        }
        reObserve();
      }

      return () => {
        destroyWatermark();
      };
    }
  }, [monitor, base64Url, markStyle]); // Dependency on base64Url ensures we re-observe when style changes

  return (
    <div ref={containerRef} className={wrapperCls} style={{ position: 'relative', ...style }}>
      {children}
      <div
        ref={watermarkRef}
        className={watermarkCls}
        style={{
          ...markStyle,
          backgroundImage: `url('${base64Url}')`,
          backgroundSize: `${(gapX + width) * BaseSize}px ${(gapY + height) * BaseSize}px`,
        }}
      />
    </div>
  );
};

export default Watermark;
