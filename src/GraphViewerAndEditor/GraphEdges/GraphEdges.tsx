import React from 'react';
import GraphEdge from '../GraphEdge/GraphEdge';
import { getTwoClosestPoints } from '../../utils/getTwoClosestPoints';
import { Edge, Point, Vertex } from '../../graphTypes';

function GraphEdges({
  edges,
  vertices,
  connectingPoints,
  width,
  height,
}: {
  edges: Edge[];
  vertices: Vertex[];
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
          <polygon
            points="0 0, 5 3.5, 0 7"
            style={{ fill: 'var(--primary-color)' }}
          />
        </marker>
      </defs>

      {edges.map(edge => {
        const startVertexIndex = vertices.findIndex(
          vertex => vertex.name === edge.startVertex
        );
        const endVertexIndex = vertices.findIndex(
          vertex => vertex.name === edge.endVertex
        );

        if (startVertexIndex === -1 || endVertexIndex === -1) return null;

        const startConnectingPoints = connectingPoints[startVertexIndex];
        const endConnectingPoints = connectingPoints[endVertexIndex];

        if (!startConnectingPoints || !endConnectingPoints) return null;

        const [point1, point2] = getTwoClosestPoints(
          startConnectingPoints,
          endConnectingPoints
        );

        return (
          <GraphEdge
            key={`${edge.startVertex}-${edge.endVertex}`}
            x1={point1.x}
            y1={point1.y}
            x2={point2.x}
            y2={point2.y}
          />
        );
      })}
    </svg>
  );
}

export default GraphEdges;
