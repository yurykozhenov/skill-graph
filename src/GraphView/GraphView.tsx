import React, { useEffect, useState } from 'react';
import styles from './GraphView.module.css';
import { getGraph, Graph } from '../graphApi';
import GraphNode from '../GraphNode/GraphNode';

function GraphView() {
  const [graph, setGraph] = useState<Graph>();

  useEffect(() => {
    const fetchGraph = async () => {
      try {
        const fetchedGraph = await getGraph('Gameplay Developer');
        setGraph(fetchedGraph);
      } catch (err) {
        console.log('Error while trying to fetch graph');
        throw err;
      }
    };

    fetchGraph();
  }, []);

  return (
    <>
      <div className={styles.container}>
        {graph &&
          graph.vertices.map(vertex => (
            <GraphNode key={vertex.name} vertex={vertex} />
          ))}
      </div>
    </>
  );
}

export default GraphView;
