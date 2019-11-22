import React, { useCallback, useRef, useState } from 'react';
import styles from './GraphView.module.css';
import GraphNode from './GraphNode/GraphNode';
import GraphEdges from './GraphEdges/GraphEdges';
import { useGraph } from './useGraph';
import DropContainer, { DragItem } from '../shared/DragAndDrop/DropContainer';
import { DropTargetMonitor } from 'react-dnd';
import { EdgeMode } from './GraphEdge/GraphEdge';

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
    : { top: 0, left: 0, bottom: 0, right: 0 };

  const {
    graph,
    graphWidth,
    graphHeight,
    connectingPoints,
    registerVertexNode,
    getVertexInfo,
    onVertexDrag,
    saveGraph,
  } = useGraph(graphName, {
    containerTop: edgeContainerRect.top,
    containerLeft: edgeContainerRect.left,
  });

  const vertexRef = useCallback(registerVertexNode, []);

  const [edgeMode, setEdgeMode] = useState<EdgeMode>('line');

  if (!graph) return null;

  return (
    <>
      <div style={{ padding: '8px 16px' }}>
        <label>
          <div>Edge Drawing Mode</div>
          <select
            value={edgeMode}
            onChange={e => setEdgeMode(e.target.value as EdgeMode)}
          >
            <option value="line">Line</option>
            <option value="curve1">Curve 1</option>
            <option value="curve2">Curve 2</option>
            <option value="bezier1">Bezier curve 1</option>
            <option value="bezier2">Bezier curve 2</option>
            <option value="bezier3">Bezier curve 3</option>
          </select>
        </label>
      </div>

      {dragAndDrop && (
        <div style={{ padding: '8px 16px' }}>
          <button onClick={() => saveGraph()}>Save Graph</button>
        </div>
      )}

      <div>
        <div className={styles.container} ref={edgeContainerRef}>
          <GraphEdges
            edges={graph.edges}
            vertices={graph.vertices}
            width={graphWidth}
            height={graphHeight}
            connectingPoints={connectingPoints}
            mode={edgeMode}
          />
        </div>

        <VertexContainer
          dragAndDrop={dragAndDrop}
          onVertexDrag={onVertexDrag}
          style={{ width: graphWidth, height: graphHeight }}
        >
          {graph.vertices.map(vertex => {
            const { vertexHeight, vertexPosition } = getVertexInfo(
              vertex,
              graph
            );

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
    </>
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
