import React, { useCallback, useRef } from 'react';
import styles from './GraphView.module.css';
import GraphNode from './GraphNode/GraphNode';
import GraphEdges from './GraphEdges/GraphEdges';
import { useGraph } from './useGraph';

function GraphView({ graphName }: { graphName: string }) {
  const edgeContainerRef = useRef<HTMLDivElement>(null);
  const edgeContainerRect = edgeContainerRef.current
    ? edgeContainerRef.current.getBoundingClientRect()
    : undefined;

  const {
    graph,
    registerVertexNode,
    getEdgesInfo,
    getVertexInfo,
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

      <div className={styles.container}>
        {graph.vertices.map(vertex => {
          const { vertexHeight, vertexPosition } = getVertexInfo(vertex, graph);

          return (
            <GraphNode
              key={vertex.name}
              ref={vertexRef}
              vertex={vertex}
              position={vertexPosition}
              height={vertexHeight}
            />
          );
        })}
      </div>
    </div>
  );
}

export default GraphView;
