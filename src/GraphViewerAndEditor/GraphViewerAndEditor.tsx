import React, { useCallback, useRef, useState } from 'react';
import styles from './GraphViewerAndEditor.module.css';
import GraphNode from './GraphNode/GraphNode';
import GraphEdges from './GraphEdges/GraphEdges';
import { useGraphViewerAndEditor } from './useGraphViewerAndEditor';
import DropContainer, { DragItem } from '../shared/DragAndDrop/DropContainer';
import { DropTargetMonitor } from 'react-dnd';
import { Edge, Graph } from '../graphTypes';

function GraphViewerAndEditor({
  initialGraph,
  editMode = false,
}: {
  initialGraph: Graph;
  editMode?: boolean;
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
  } = useGraphViewerAndEditor(initialGraph, {
    containerTop: edgeContainerRect.top,
    containerLeft: edgeContainerRect.left,
  });

  const vertexRef = useCallback(registerVertexNode, []);

  const [vertexToConnect, setVertexToConnect] = useState<string>();

  function addVertex() {
    setGraph(oldGraph => ({
      ...oldGraph,
      vertices: [
        ...oldGraph.vertices,
        {
          name: `Vertex ${oldGraph.vertices.length}`,
          rate: 1,
          level: 'All',
          courseList: [],
          branchOfKnowledge: { name: 'math' },
          graphList: [oldGraph.name],
        },
      ],
      positions: [
        ...oldGraph.positions,
        {
          vertexName: `Vertex ${oldGraph.vertices.length}`,
          x: 0,
          y: 0,
        },
      ],
    }));
  }

  function connectVertex(vertexName: string) {
    if (!vertexToConnect) {
      setVertexToConnect(vertexName);
      return;
    }

    setVertexToConnect(undefined);

    // Prevents duplicate edges
    if (
      vertexToConnect === vertexName ||
      graph.edges.some(edge => doesEdgeExist(edge, vertexName, vertexToConnect))
    ) {
      return;
    }

    setGraph(oldGraph => ({
      ...oldGraph,
      edges: [
        ...oldGraph.edges,
        { startVertex: vertexToConnect, endVertex: vertexName },
      ],
    }));
  }

  function disconnectVertex(vertexName: string) {
    setVertexToConnect(undefined);

    setGraph(oldGraph => ({
      ...oldGraph,
      edges: oldGraph.edges.filter(
        edge => !doesEdgeExist(edge, vertexName, vertexToConnect)
      ),
    }));
  }

  return (
    <>
      {editMode && (
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
          editMode={editMode}
          onVertexDrag={onVertexDrag}
          style={{
            width: graphWidth,
            height: graphHeight,
          }}
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
                editMode={editMode}
                onConnect={() => connectVertex(vertex.name)}
                onDelete={() => deleteVertex(vertex.name)}
                onDisconnect={() => disconnectVertex(vertex.name)}
                isConnected={graph.edges.some(edge =>
                  doesEdgeExist(edge, vertex.name, vertexToConnect)
                )}
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
  editMode,
  onVertexDrag,
  style,
}: {
  children: React.ReactNode;
  editMode: boolean;
  onVertexDrag: (item: DragItem, monitor: DropTargetMonitor) => void;
  style: React.CSSProperties;
}) {
  return editMode ? (
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

function doesEdgeExist(
  edge: Edge,
  vertexName1: string | undefined,
  vertexName2: string | undefined
) {
  return (
    (edge.startVertex === vertexName1 && edge.endVertex === vertexName2) ||
    (edge.startVertex === vertexName2 && edge.endVertex === vertexName1)
  );
}

export default GraphViewerAndEditor;
