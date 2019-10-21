import React, { useCallback, useEffect, useState } from 'react';
import styles from './GraphView.module.css';
import { getGraph, Graph } from '../graphApi';
import GraphNode from '../GraphNode/GraphNode';
import { computeConnectingPoints } from '../computeConnectingPoints';
import GraphEdges from '../GraphEdges/GraphEdges';

function GraphView({ graphName }: { graphName: string }) {
  const [graph, setGraph] = useState<Graph>();
  const [nodes, setNodes] = useState<HTMLDivElement[]>([]);

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

  return (
    <div>
      <div className={styles.container}>
        {graph &&
          graph.vertices.map(vertex => (
            <GraphNode key={vertex.name} vertex={vertex} ref={vertexRef} />
          ))}
      </div>

      <div className={styles.container}>
        {graph && (
          <GraphEdges
            graph={graph}
            connectingPoints={Array.from(nodes).map(node =>
              computeConnectingPoints(node.getBoundingClientRect())
            )}
          />
        )}
      </div>
    </div>
  );
}

export default GraphView;
