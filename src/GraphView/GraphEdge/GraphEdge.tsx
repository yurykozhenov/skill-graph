import React, { useContext } from 'react';
import styles from './GraphEdge.module.css';
import EdgeModeContext, { EdgeMode } from '../../EdgeModeContext';

interface Props {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

function GraphEdge({ x1, y1, x2, y2 }: Props) {
  const edgeMode = useContext(EdgeModeContext);

  const d = getD({ x1, y1, x2, y2, mode: edgeMode });

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

function getD({ x1, y1, x2, y2, mode }: Props & { mode: EdgeMode }) {
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

export default React.memo(GraphEdge);
