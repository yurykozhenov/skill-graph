import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './GraphView.module.css';
import { getGraph} from '../graphApi';
import GraphNode from '../GraphNode/GraphNode';
import { computeConnectingPoints } from '../computeConnectingPoints';
import GraphEdges from '../GraphEdges/GraphEdges';
import { Graph } from '../graphTypes';

function GraphView({ graphName }: { graphName: string }) {
  const [graph, setGraph] = useState<Graph>();
  const [nodes, setNodes] = useState<HTMLDivElement[]>([]);

  const edgeContainerRef = useRef<HTMLDivElement>(null);

  const vertexRef = useCallback((node: HTMLDivElement) => {
    setNodes(nodes => [...nodes, node]);
  }, []);

  useEffect(() => {
    const fetchGraph = async () => {
      try {
        const fetchedGraph = await getGraph(graphName);
        setGraph(fetchedGraph);
      } catch (err) {
        console.log('Error while trying to fetch graph');
        console.error(err);
        alert(err.message);
      }
    };

    fetchGraph();
  }, [graphName]);

  const edgeContainerRect = edgeContainerRef.current
    ? edgeContainerRef.current.getBoundingClientRect()
    : undefined;

  // Shifts computation of connecting points relatively to parent container
  function addParentContainerOffset(rect: ClientRect): ClientRect {
    if (!edgeContainerRect) {
      return rect;
    }

    return {
      ...rect,
      top: rect.top - edgeContainerRect.top,
      right: rect.right - edgeContainerRect.left,
      bottom: rect.bottom - edgeContainerRect.top,
      left: rect.left - edgeContainerRect.left,
    };
  }

  return (
    <div>
      <div className={styles.container} ref={edgeContainerRef}>
        {graph && (
          <GraphEdges
            width={
              document.body.scrollWidth -
              (edgeContainerRect ? edgeContainerRect.left : 0)
            }
            height={
              document.body.scrollHeight -
              (edgeContainerRect ? edgeContainerRect.top : 0)
            }
            graph={graph}
            connectingPoints={Array.from(nodes).map(node =>
              computeConnectingPoints(
                addParentContainerOffset(node.getBoundingClientRect())
              )
            )}
          />
        )}
      </div>

      <div className={styles.container}>
        {graph &&
        graph.vertices.map(vertex => {
          const hasNoEdges = !graph.edges.some(
            edge =>
              edge.startVertex === vertex.name ||
              edge.endVertex === vertex.name
          );

          return (
            <GraphNode
              key={vertex.name}
              ref={vertexRef}
              vertex={vertex}
              position={graph.positions.find(
                position => position.vertexName === vertex.name
              )}
              height={
                hasNoEdges
                  ? Math.max(...graph.positions.map(position => position.y)) +
                  (edgeContainerRect ? edgeContainerRect.top : 0)
                  : undefined
              }
            />
          );
        })}
      </div>
    </div>
  );
}

export default GraphView;
