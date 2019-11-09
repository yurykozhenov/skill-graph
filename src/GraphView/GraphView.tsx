import React, { useCallback, useRef } from 'react';
import styles from './GraphView.module.css';
import GraphNode from './GraphNode/GraphNode';
import GraphEdges from './GraphEdges/GraphEdges';
import { useGraph } from './useGraph';
import DropContainer, { DragItem } from '../shared/DragAndDrop/DropContainer';
import { DropTargetMonitor } from 'react-dnd';

function GraphView({
  graphName,
  dragAndDrop = false,
}: {
  graphName: string;
  dragAndDrop?: boolean;
}) {
  const edgeContainerRef = useRef<HTMLDivElement>(null);
  const edgeContainerRect = edgeContainerRef.current
    ? edgeContainerRef.current.getBoundingClientRect()
    : undefined;

  const {
    graph,
    registerVertexNode,
    getEdgesInfo,
    getVertexInfo,
    onVertexDrag,
  } = useGraph(graphName, edgeContainerRect);

  const vertexRef = useCallback(registerVertexNode, []);

  if (!graph) return null;

  const { edgesWidth, edgesHeight, connectingPoints } = getEdgesInfo();

  return (
    <div>
      <div className={styles.container} ref={edgeContainerRef}>
        <GraphEdges
          graph={graph}
          width={edgesWidth}
          height={edgesHeight}
          connectingPoints={connectingPoints}
        />
      </div>

      <VertexContainer
        dragAndDrop={dragAndDrop}
        onVertexDrag={onVertexDrag}
        style={{ width: edgesWidth, height: edgesHeight }}
      >
        {graph.vertices.map(vertex => {
          const { vertexHeight, vertexPosition } = getVertexInfo(vertex, graph);

          return (
            <GraphNode
              key={vertex.name}
              ref={vertexRef}
              vertex={vertex}
              position={vertexPosition}
              height={vertexHeight}
              dragAndDrop={dragAndDrop}
            />
          );
        })}
      </VertexContainer>
    </div>
  );
}

function VertexContainer({
  children,
  dragAndDrop,
  onVertexDrag,
  style,
}: {
  children: React.ReactNode;
  dragAndDrop: boolean;
  onVertexDrag: (item: DragItem, monitor: DropTargetMonitor) => void;
  style: React.CSSProperties;
}) {
  return dragAndDrop ? (
    <DropContainer
      onDrag={onVertexDrag}
      className={styles.container}
      style={style}
    >
      {children}
    </DropContainer>
  ) : (
    <div className={styles.container} style={style}>
      {children}
    </div>
  );
}

export default GraphView;
