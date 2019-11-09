import React from 'react';
import styles from './DataBox.module.css';

function DataBox({
  title,
  onClick,
  className,
  children,
}: {
  title: string;
  onClick?: React.MouseEventHandler;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`${styles.box} ${className || ''}`}
      style={onClick ? { cursor: 'pointer' } : undefined}
      onClick={onClick}
    >
      <div className={styles.boxIcon} />

      <div>
        <div className={styles.boxName}>{title}</div>

        <div>{children}</div>
      </div>
    </div>
  );
}

export default DataBox;
