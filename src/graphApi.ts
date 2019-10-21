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

const BASE_URL =
  process.env.NODE_ENV === 'production' ? 'http://text-to-sp.tk:3333' : '';

export async function getGraph(name: string): Promise<Graph> {
  const response = await fetch(`${BASE_URL}/graph/get/${name}`);
  const json = await response.json();

  if (typeof json === 'string') {
    throw new Error(json);
  }

  return json;
}
