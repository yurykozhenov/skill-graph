import React from 'react';
import styles from './GraphEdge.module.css';

function GraphEdge({
  x1,
  y1,
  x2,
  y2,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      className={styles.line}
      markerEnd="url(#arrowhead)"
    />
  );
}

export default GraphEdge;
