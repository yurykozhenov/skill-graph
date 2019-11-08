import { useEffect, useState } from 'react';
import { Graph, Vertex } from '../graphTypes';
import { getGraph } from '../graphApi';
import { computeConnectingPoints } from '../utils/computeConnectingPoints';

export function useGraph(
  graphName: string,
  edgeContainerRect: ClientRect | undefined
) {
  const [graph, setGraph] = useState<Graph>();
  const [nodes, setNodes] = useState<HTMLDivElement[]>([]);

  function registerVertexNode(node: HTMLDivElement) {
    if (node) {
      setNodes(nodes => [...nodes, node]);
    }
  }

  useEffect(() => {
    setNodes([]);

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

  function getEdgesInfo() {
    const edgesWidth =
      document.body.scrollWidth -
      (edgeContainerRect ? edgeContainerRect.left : 0);

    const edgesHeight =
      document.body.scrollHeight -
      (edgeContainerRect ? edgeContainerRect.top : 0);

    const connectingPoints = Array.from(nodes).map(node =>
      computeConnectingPoints(
        addParentContainerOffset(node.getBoundingClientRect())
      )
    );

    return { edgesWidth, edgesHeight, connectingPoints };
  }

  function getVertexInfo(vertex: Vertex, vertexGraph: Graph) {
    const hasNoEdges = !vertexGraph.edges.some(
      edge => edge.startVertex === vertex.name || edge.endVertex === vertex.name
    );

    const vertexHeight = hasNoEdges
      ? Math.max(...vertexGraph.positions.map(position => position.y)) +
        (edgeContainerRect ? edgeContainerRect.top : 0)
      : undefined;

    const vertexPosition = vertexGraph.positions.find(
      position => position.vertexName === vertex.name
    );

    return { vertexHeight, vertexPosition };
  }

  return { graph, registerVertexNode, getEdgesInfo, getVertexInfo };
}
