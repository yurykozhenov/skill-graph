import { Graph } from './graphTypes';

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
