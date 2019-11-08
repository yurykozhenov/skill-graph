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
  name: string;
}

export interface Course {
  name: string;
  description: string;
  difficulty: string;
  link: string;
  verticesList: string[];
}
