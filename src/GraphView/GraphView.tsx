import React, { useCallback, useRef, useState } from 'react';
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
    : { top: 0, left: 0, bottom: 0, right: 0 };

  const {
    graph,
    setGraph,
    graphWidth,
    graphHeight,
    connectingPoints,
    registerVertexNode,
    getVertexInfo,
    onVertexDrag,
    saveGraph,
    deleteVertex,
  } = useGraph(graphName, {
    containerTop: edgeContainerRect.top,
    containerLeft: edgeContainerRect.left,
  });

  const vertexRef = useCallback(registerVertexNode, []);

  const [vertexToConnect, setVertexToConnect] = useState<string>();

  if (!graph) return null;

  const addVertex = () => {
    setGraph({
      ...graph,
      vertices: [
        ...graph.vertices,
        {
          name: `Vertex ${graph.vertices.length}`,
          rate: 1,
          level: 'All',
          courseList: [],
          branchOfKnowledge: { name: 'math' },
          graphList: [graph.name],
        },
      ],
      positions: [
        ...graph.positions,
        {
          vertexName: `Vertex ${graph.vertices.length}`,
          x: 0,
          y: 0,
        },
      ],
    });
  };

  const connectVertex = (vertexName: string) => {
    if (vertexToConnect && vertexToConnect !== vertexName) {
      setVertexToConnect(undefined);

      // Prevents duplicate edges
      if (
        graph.edges.some(
          edge =>
            (edge.startVertex === vertexName &&
              edge.endVertex === vertexToConnect) ||
            (edge.startVertex === vertexToConnect &&
              edge.endVertex === vertexName)
        )
      ) {
        return;
      }

      setGraph({
        ...graph,
        edges: [
          ...graph.edges,
          { startVertex: vertexToConnect, endVertex: vertexName },
        ],
      });
    } else {
      setVertexToConnect(vertexName);
    }
  };

  return (
    <>
      {dragAndDrop && (
        <>
          <div style={{ padding: '8px 16px' }}>
            <button onClick={() => saveGraph()} style={{ marginRight: 8 }}>
              Save Graph
            </button>
            <button onClick={addVertex}>Add Vertex</button>
          </div>
        </>
      )}

      <div style={{ overflow: 'auto', paddingTop: 8 }}>
        <div className={styles.container} ref={edgeContainerRef}>
          <GraphEdges
            edges={graph.edges}
            vertices={graph.vertices}
            width={graphWidth}
            height={graphHeight}
            connectingPoints={connectingPoints}
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
                onConnect={() => connectVertex(vertex.name)}
                onDelete={() => deleteVertex(vertex.name)}
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
