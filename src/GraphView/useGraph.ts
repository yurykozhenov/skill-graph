import { useEffect, useRef, useState } from 'react';
import { DropTargetMonitor, XYCoord } from 'react-dnd';
import { Graph, Vertex, VertexPosition } from '../graphTypes';
import { getGraph, updateGraph } from '../graphApi';
import { computeConnectingPoints } from '../utils/computeConnectingPoints';
import { DragItem } from '../shared/DragAndDrop/DropContainer';

export function useGraph(
  graphName: string,
  {
    containerTop,
    containerLeft,
  }: { containerTop: number; containerLeft: number }
) {
  const [graph, setGraph] = useState<Graph>();
  const [nodes, setNodes] = useState<HTMLDivElement[]>([]);
  const nodeRects = nodes.map(node => node.getBoundingClientRect());

  const updatedPositionsRef = useRef<VertexPosition[] | null>(null);

  function registerVertexNode(node: HTMLDivElement) {
    if (node) {
      setNodes(oldNodes => [...oldNodes, node]);
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

  // Batches re-renders caused by drag-and-drop to improve performance
  useEffect(() => {
    if (!graph) return;

    let request: number;

    const performAnimation = () => {
      request = requestAnimationFrame(performAnimation);

      if (updatedPositionsRef.current) {
        setGraph({
          ...graph,
          positions: updatedPositionsRef.current,
        });

        updatedPositionsRef.current = null;
      }
    };

    requestAnimationFrame(performAnimation);

    return () => cancelAnimationFrame(request);
  }, [graph]);

  const maxX = Math.max(...nodeRects.map(rect => rect.right));
  const graphWidth = nodeRects.length > 0 ? maxX - containerLeft : 0;

  const maxY = Math.max(...nodeRects.map(rect => rect.bottom));
  const graphHeight = nodeRects.length > 0 ? maxY - containerTop : 0;

  const connectingPoints = nodeRects.map(rect =>
    computeConnectingPoints(rect, { containerTop, containerLeft })
  );

  function getVertexInfo(vertex: Vertex, vertexGraph: Graph) {
    const hasNoEdges = !vertexGraph.edges.some(
      edge => edge.startVertex === vertex.name || edge.endVertex === vertex.name
    );

    const vertexHeight = hasNoEdges ? graphHeight : undefined;

    const vertexPosition = vertexGraph.positions.find(
      position => position.vertexName === vertex.name
    );

    return { vertexHeight, vertexPosition };
  }

  function updateGraphPositions(item: DragItem) {
    updatedPositionsRef.current = graph
      ? graph.positions.map(position =>
          position.vertexName === item.id
            ? {
                ...position,
                x: item.left,
                y: item.top,
              }
            : position
        )
      : null;
  }

  const onVertexDrag = (item: DragItem, monitor: DropTargetMonitor) => {
    if (!graph) return;

    const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;

    const left = Math.round(item.left + delta.x);
    const top = Math.round(item.top + delta.y);

    updateGraphPositions({ ...item, left, top });
  };

  async function saveGraph() {
    if (!graph) return;

    await updateGraph(graphName, graph);
  }

  return {
    graph,
    graphWidth,
    graphHeight,
    connectingPoints,
    registerVertexNode,
    getVertexInfo,
    onVertexDrag,
    saveGraph,
  };
}
