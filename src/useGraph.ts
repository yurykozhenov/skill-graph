import { useEffect, useState } from 'react';
import { Graph } from './graphTypes';
import { getGraph } from './graphApi';

export function useGraph(graphName: string) {
  const [graph, setGraph] = useState<Graph>();

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

  return graph;
}
