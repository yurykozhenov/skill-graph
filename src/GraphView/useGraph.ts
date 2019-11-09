import { useCallback, useEffect, useState } from 'react';
import { DropTargetMonitor, XYCoord } from 'react-dnd';
import throttle from 'lodash/throttle';
import { Graph, Vertex } from '../graphTypes';
import { getGraph, updateGraph } from '../graphApi';
import { computeConnectingPoints } from '../utils/computeConnectingPoints';
import { DragItem } from '../shared/DragAndDrop/DropContainer';

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

  const nodeRects = nodes.map(node => node.getBoundingClientRect());

  const maxX = Math.max(...nodeRects.map(rect => rect.right));
  const graphWidth =
    nodeRects.length > 0
      ? maxX - (edgeContainerRect ? edgeContainerRect.left : 0)
      : 0;

  const maxY = Math.max(...nodeRects.map(rect => rect.bottom));
  const graphHeight =
    nodeRects.length > 0
      ? maxY - (edgeContainerRect ? edgeContainerRect.top : 0)
      : 0;

  const connectingPoints = nodeRects.map(rect =>
    computeConnectingPoints(addParentContainerOffset(rect))
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

  const updateGraphPositions = useCallback(
    throttle((item: DragItem) => {
      setGraph(oldGraph =>
        oldGraph
          ? {
              ...oldGraph,
              positions: oldGraph.positions.map(position =>
                position.vertexName === item.id
                  ? {
                      ...position,
                      x: item.left,
                      y: item.top,
                    }
                  : position
              ),
            }
          : oldGraph
      );
    }, 10),
    []
  );

  const onVertexDrag = (item: DragItem, monitor: DropTargetMonitor) => {
    if (!graph) return;

    const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;

    if (!delta || (Math.abs(delta.x) < 1 || Math.abs(delta.y) < 1)) return;

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