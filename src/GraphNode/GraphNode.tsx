import React from 'react';
import styles from './GraphNode.module.css';
import { Vertex, VertexPosition } from '../graphApi';

function GraphNode(
  {
    vertex,
    position,
    height,
  }: {
    vertex: Vertex;
    position: VertexPosition | undefined;
    height?: number;
  },
  ref: React.Ref<HTMLDivElement>
) {
  const left = position ? position.x : 0;
  const top = height == null && position ? position.y : 0;

  return (
    <div
      className={styles.node}
      style={{ left, top, height }}
      ref={ref}
    >
      <div className={styles.nodeIcon} />

      <div>
        <div className={styles.nodeName}>{vertex.name}</div>
        <div>{Array.from({ length: vertex.rate }).map(() => '⭐')}</div>
      </div>
    </div>
  );
}

export default React.forwardRef(GraphNode);
