import React from 'react';
import { Point } from '../graphApi';
import styles from './GraphEdge.module.css';

function GraphEdge({ points }: { points: [Point, Point] }) {
  return (
    <line
      x1={points[0].x}
      y1={points[0].y}
      x2={points[1].x}
      y2={points[1].y}
      className={styles.line}
      markerEnd="url(#arrowhead)"
    />
  );
}

export default GraphEdge;
