import React, { useState } from 'react';
import { GraphNodeModal } from './GraphNodeModal';
import DataBox from '../DataBox/DataBox';
import { Vertex, VertexPosition } from '../graphTypes';

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
      <DataBox
        ref={ref}
        title={vertex.name}
        onClick={() => setModalOpen(true)}
        style={{ position: 'absolute', left, top, height }}
      >
        {Array.from({ length: vertex.rate }).map(() => '⭐')}
      </DataBox>

      <GraphNodeModal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        vertex={vertex}
      />
    </>
  );
}

export default React.forwardRef(GraphNode);
