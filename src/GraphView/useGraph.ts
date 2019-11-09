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

  function getEdgesInfo() {
    const maxX = Math.max(
      ...nodes.map(node => node.getBoundingClientRect().right)
    );
    const edgesWidth = maxX - (edgeContainerRect ? edgeContainerRect.left : 0);

    const edgesHeight = getHeight();

    const connectingPoints = nodes.map(node =>
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

    const vertexHeight = hasNoEdges ? getHeight() : undefined;

    const vertexPosition = vertexGraph.positions.find(
      position => position.vertexName === vertex.name
    );

    return { vertexHeight, vertexPosition };
  }

  function getHeight() {
    const maxY = Math.max(
      ...nodes.map(node => node.getBoundingClientRect().bottom)
    );
    return maxY - (edgeContainerRect ? edgeContainerRect.top : 0);
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
    registerVertexNode,
    getEdgesInfo,
    getVertexInfo,
    onVertexDrag,
    saveGraph,
  };
}
