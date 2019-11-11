import React from 'react';
import styles from './GraphEdge.module.css';

export type EdgeMode = 'curve1' | 'curve2' | 'line';

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
    default:
      return `M ${x1} ${y1} l ${x2 - x1} ${y2 - y1}`;
  }
}

export default GraphEdge;
