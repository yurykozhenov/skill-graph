import { useEffect, useRef, useState } from 'react';
import { DropTargetMonitor, XYCoord } from 'react-dnd';
import clamp from 'lodash/clamp';
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

  function deleteNode(nodeIndex: number) {
    setNodes(oldNodes => oldNodes.filter((node, index) => index !== nodeIndex));
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

    const left = clamp(Math.round(item.left + delta.x), 0, graphWidth);
    const top = clamp(Math.round(item.top + delta.y), 0, graphHeight);

    if (item.left === left && item.top === top) return;

    updateGraphPositions({ ...item, left, top });
  };

  async function saveGraph() {
    if (!graph) return;

    await updateGraph(graphName, graph);
  }

  function deleteVertex(vertexName: string) {
    if (!graph) return;

    setGraph({
      ...graph,
      vertices: graph.vertices.filter(vertex => vertex.name !== vertexName),
      positions: graph.positions.filter(
        position => position.vertexName !== vertexName
      ),
      edges: graph.edges.filter(
        edge => edge.startVertex !== vertexName && edge.endVertex !== vertexName
      ),
    });

    deleteNode(graph.vertices.findIndex(vertex => vertex.name === vertexName));
  }

  return {
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
  };
}
