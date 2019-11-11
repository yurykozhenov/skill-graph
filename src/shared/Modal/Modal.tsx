import React, { useEffect, useState } from 'react';
import { Overlay } from '../Overlay/Overlay';
import styles from './Modal.module.css';

export function Modal({
  open,
  onClose,
  children,
  hasBackdrop = true,
}: {
  open: boolean;
  onClose: (e: React.MouseEvent | React.KeyboardEvent) => void;
  children: React.ReactNode;
  hasBackdrop?: boolean;
}) {
  const [style, setStyle] = useState<React.CSSProperties>();
  const [destroyed, setDestroyed] = useState(true);

  useEffect(() => {
    if (open) {
      setDestroyed(false);
      setStyle({
        opacity: 1,
        transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      });
    } else {
      setStyle({
        opacity: 0,
        transition: 'opacity 195ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      });

      setTimeout(() => setDestroyed(true), 195);
    }
  }, [open]);

  return (
    <Overlay
      open={open || !destroyed}
      onClose={onClose}
      hasBackdrop={hasBackdrop}
      className={styles.container}
      style={style}
    >
      <div className={styles.content}>{children}</div>
    </Overlay>
  );
}
