import React, { useState } from 'react';
import styles from './GraphNode.module.css';
import { Vertex, VertexPosition } from '../graphApi';
import { GraphNodeModal } from './GraphNodeModal';

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
  const [isModalOpen, setModalOpen] = useState(false);

  const left = position ? position.x : 0;
  const top = height == null && position ? position.y : 0;

  return (
    <>
      <div
        ref={ref}
        className={styles.node}
        style={{ left, top, height }}
        onClick={() => setModalOpen(true)}
      >
        <div className={styles.nodeIcon} />

        <div>
          <div className={styles.nodeName}>{vertex.name}</div>
          <div>{Array.from({ length: vertex.rate }).map(() => '⭐')}</div>
        </div>
      </div>

      <GraphNodeModal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        vertex={vertex}
      />
    </>
  );
}

export default React.forwardRef(GraphNode);
