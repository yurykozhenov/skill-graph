export interface Graph {
  name: string;
  vertices: Vertex[];
  edges: Edge[];
}

export interface Vertex {
  name: string;
  rate: number;
  position: Point;
  level: string;
  graphList: unknown[];
  courseList: unknown[];
}

export interface Point {
  x: number;
  y: number;
}

export interface Edge {
  startVertex: string;
  endVertex: string;
}

export async function getGraph(name: string): Promise<Graph> {
  const response = await fetch(`/graph/get/${name}`);
  return response.json();
}
