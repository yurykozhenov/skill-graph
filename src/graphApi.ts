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
  return {
    name,
    vertices: [
      {
        name: 'Gameplay Developer',
        rate: 4,
        position: {
          x: 100,
          y: 100,
        },
        level: 'specialized',
        graphList: [],
        courseList: [],
      },
      {
        name: 'Game Engines',
        rate: 3,
        position: {
          x: 100,
          y: 200,
        },
        level: 'specialized',
        graphList: [],
        courseList: [],
      },
      {
        name: 'Game Mechanics',
        rate: 2,
        position: {
          x: 400,
          y: 250,
        },
        level: 'specialized',
        graphList: [],
        courseList: [],
      },
    ],
    edges: [
      {
        startVertex: 'Game Engines',
        endVertex: 'Gameplay Developer',
      },
      {
        startVertex: 'Game Mechanics',
        endVertex: 'Game Engines',
      },
    ],
  };
}
