import React from 'react';
import styles from './DataBox.module.css';

function DataBox(
  {
    title,
    onClick,
    style,
    className,
    children,
  }: {
    title: string;
    onClick?: React.MouseEventHandler;
    style?: React.CSSProperties;
    className?: string;
    children?: React.ReactNode;
  },
  ref: React.Ref<HTMLDivElement>
) {
  return (
    <>
      <div
        ref={ref}
        className={`${styles.box} ${className || ''}`}
        style={{ cursor: onClick ? 'pointer' : undefined, ...style }}
        onClick={onClick}
      >
        <div className={styles.boxIcon} />

        <div>
          <div className={styles.boxName}>{title}</div>

          <div>{children}</div>
        </div>
      </div>
    </>
  );
}

export default React.forwardRef(DataBox);
