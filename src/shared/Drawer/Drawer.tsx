import React from 'react';
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
  return (
    <Overlay
      open={open}
      onClose={onClose}
      hasBackdrop={hasBackdrop}
      className={styles.container}
    >
      <div className={styles.content}>{children}</div>
    </Overlay>
  );
}
