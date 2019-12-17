import React, { useEffect, useState } from 'react';
import { Overlay } from '../Overlay/Overlay';
import styles from './Drawer.module.css';

export function Drawer({
  open,
  onClose,
  children,
  hasBackdrop = false,
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
        transform: 'none',
        transition: 'transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
      });
    } else {
      setStyle({
        transform: 'translateX(500px)',
        transition: 'transform 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
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
    >
      <div className={styles.content} style={style}>
        {children}
      </div>
    </Overlay>
  );
}
