import React from 'react';
import GraphEdge, { EdgeMode } from '../GraphEdge/GraphEdge';
import { getTwoClosestPoints } from '../../utils/getTwoClosestPoints';
import { Edge, Point, Vertex } from '../../graphTypes';

function GraphEdges({
  edges,
  vertices,
  connectingPoints,
  width,
  height,
  mode,
}: {
  edges: Edge[];
  vertices: Vertex[];
  connectingPoints: Point[][];
  width: number;
  height: number;
  mode: EdgeMode;
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
            key={`${startVertexIndex}-${endVertexIndex}`}
            x1={point1.x}
            y1={point1.y}
            x2={point2.x}
            y2={point2.y}
            mode={mode}
          />
        );
      })}
    </svg>
  );
}

export default GraphEdges;
