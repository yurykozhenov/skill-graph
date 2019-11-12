import React from 'react';
import styles from './GraphEdge.module.css';

export type EdgeMode =
  | 'curve1'
  | 'curve2'
  | 'bezier1'
  | 'bezier2'
  | 'bezier3'
  | 'line';

interface Props {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  mode: EdgeMode;
}

function GraphEdge({ x1, y1, x2, y2, mode }: Props) {
  const d = getD({ x1, y1, x2, y2, mode });

  return (
    <>
      <path
        d={d}
        className={styles.line}
        markerEnd="url(#arrowhead)"
        fill="transparent"
      />
    </>
  );
}

function getD({ x1, y1, x2, y2, mode }: Props) {
  switch (mode) {
    case 'curve1':
      return `M ${x1} ${y1} C ${x2},${y1} ${x1},${y2} ${x2},${y2}`;
    case 'curve2':
      return `M ${x1} ${y1} C ${x1},${y2} ${x1},${y2} ${x2},${y2}`;
    case 'bezier1':
      return `M ${x1} ${y1} Q ${x1} ${y2} ${x2} ${y2}`;
    case 'bezier2':
      return `M ${x1} ${y1} Q ${x2} ${y1} ${(x2 + x1) / 2} ${(y2 + y1) /
        2} Q ${x1} ${y2} ${x2} ${y2}`;
    case 'bezier3':
      return `M ${x1} ${y1} Q ${x1} ${y2} ${(x2 + x1) / 2} ${(y2 + y1) /
        2} Q ${x2} ${y1} ${x2} ${y2}`;
    default:
      return `M ${x1} ${y1} L ${x2} ${y2}`;
  }
}

export default GraphEdge;
