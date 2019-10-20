import React from 'react';
import styles from './GraphNode.module.css';
import { Vertex } from '../graphApi';

function GraphNode(
  {
    vertex,
  }: {
    vertex: Vertex;
  },
  ref: React.Ref<HTMLDivElement>
) {
  return (
    <div
      className={styles.node}
      style={{ left: vertex.position.x, top: vertex.position.y }}
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
