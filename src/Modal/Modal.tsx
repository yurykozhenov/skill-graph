import React, { useLayoutEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

export function Modal({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: (e: React.MouseEvent | React.KeyboardEvent) => void;
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseDownTarget = useRef<unknown>(null);

  useLayoutEffect(() => {
    if (!document.body.parentElement) return;

    if (open) {
      document.body.parentElement.style.overflow = 'hidden';

      if (containerRef.current) {
        containerRef.current.focus();
      }
    } else {
      document.body.parentElement.style.overflow = '';
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
    if (e.key === 'Escape') {
      onClose(e);
    }
  }

  return ReactDOM.createPortal(
    <>
      {open && (
        <div
          className={styles.modalRoot}
          role="presentation"
          onKeyDown={handleKeyDown}
        >
          <div
            className={styles.modalBackdrop}
            aria-hidden
            onClick={handleBackdropClick}
          />

          <div tabIndex={0} />
          <div
            ref={containerRef}
            className={styles.container}
            tabIndex={-1}
            onClick={handleBackdropClick}
            onMouseDown={handleContainerMouseDown}
          >
            <div className={styles.content}>{children}</div>
          </div>
          <div tabIndex={0} />
        </div>
      )}
    </>,
    document.body
  );
}
