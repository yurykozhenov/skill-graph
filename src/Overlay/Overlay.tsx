import React, { useEffect, useLayoutEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import styles from './Overlay.module.css';

let openedOverlays = 0;

export function Overlay({
  open,
  onClose,
  children,
  hasBackdrop,
  className,
}: {
  open: boolean;
  onClose: (e: React.MouseEvent | React.KeyboardEvent) => void;
  children: React.ReactNode;
  hasBackdrop: boolean;
  className: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseDownTarget = useRef<unknown>(null);

  useLayoutEffect(() => {
    if (!document.body.parentElement || openedOverlays > 0) return;

    if (open) {
      document.body.parentElement.style.overflow = 'hidden';

      if (containerRef.current) {
        containerRef.current.focus();
      }
    } else {
      document.body.parentElement.style.overflow = '';
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      openedOverlays++;
    }

    return () => {
      if (openedOverlays > 0) {
        openedOverlays--;
      }
    }
  }, [open]);

  function handleBackdropClick(e: React.MouseEvent) {
    if (e.target !== e.currentTarget || e.target !== mouseDownTarget.current) {
      return;
    }

    mouseDownTarget.current = null;

    onClose(e);
  }

  function handleContainerMouseDown(e: React.MouseEvent) {
    mouseDownTarget.current = e.target;
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape' && isTopOverlay()) {
      onClose(e);
    }
  }

  function isTopOverlay() {
    return (
      containerRef.current &&
      document.body.lastChild === containerRef.current.parentElement
    );
  }

  return ReactDOM.createPortal(
    <>
      {open && (
        <div
          className={styles.overlayRoot}
          role="presentation"
          onKeyDown={handleKeyDown}
        >
          {hasBackdrop && (
            <div
              className={styles.overlayBackdrop}
              aria-hidden
              onClick={handleBackdropClick}
            />
          )}

          <div tabIndex={0} />
          <div
            ref={containerRef}
            className={className}
            tabIndex={-1}
            onClick={handleBackdropClick}
            onMouseDown={handleContainerMouseDown}
          >
            {children}
          </div>
          <div tabIndex={0} />
        </div>
      )}
    </>,
    document.body
  );
}
