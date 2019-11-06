export interface Graph {
  name: string;
  vertices: Vertex[];
  edges: Edge[];
  positions: VertexPosition[];
}

export interface Vertex {
  name: string;
  rate: number;
  level: string;
  graphList: string[];
  courseList: string[];
  branchOfKnowledge: BranchOfKnowledge;
}

export interface Point {
  x: number;
  y: number;
}

export interface Edge {
  startVertex: string;
  endVertex: string;
}

export interface VertexPosition extends Point {
  graphName: string;
  vertexName: string;
}

export interface BranchOfKnowledge {
  name: string
}

const BASE_URL =
  process.env.NODE_ENV === 'production' ? 'https://ges.samaranin.dev' : '';

export async function getGraph(name: string): Promise<Graph> {
  const response = await fetch(`${BASE_URL}/graph/get/${name}`);
  const json = await response.json();

  if (typeof json === 'string') {
    throw new Error(json);
  }

  return json;
}
