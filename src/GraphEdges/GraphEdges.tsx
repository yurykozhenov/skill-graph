import React from 'react';
import GraphEdge from '../GraphEdge/GraphEdge';
import { getTwoClosestPoints } from '../getTwoClosestPoints';
import { Graph, Point } from '../graphApi';

function GraphEdges({
  graph,
  connectingPoints,
  width,
  height,
}: {
  graph: Graph;
  connectingPoints: Point[][];
  width: number;
  height: number;
}) {
  return (
    <svg width={width} height={height} style={{ position: 'absolute' }}>
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="4.5"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 5 3.5, 0 7" fill="#9830a1" />
        </marker>
      </defs>

      {graph.edges.map((edge, index) => {
        const startVertexIndex = graph.vertices.findIndex(
          vertex => vertex.name === edge.startVertex
        );
        const endVertexIndex = graph.vertices.findIndex(
          vertex => vertex.name === edge.endVertex
        );

        if (startVertexIndex === -1 || endVertexIndex === -1) return null;

        const startConnectingPoints = connectingPoints[startVertexIndex];
        const endConnectingPoints = connectingPoints[endVertexIndex];

        if (!startConnectingPoints || !endConnectingPoints) return null;

        return (
          <GraphEdge
            key={index}
            points={getTwoClosestPoints(
              startConnectingPoints,
              endConnectingPoints
            )}
          />
        );
      })}
    </svg>
  );
}

export default GraphEdges;
