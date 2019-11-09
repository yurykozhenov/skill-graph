import { Course, Graph } from './graphTypes';

const BASE_URL =
  process.env.NODE_ENV === 'production' ? 'https://ges.samaranin.dev' : '';

export async function getGraph(name: string): Promise<Graph> {
  const response = await fetch(`${BASE_URL}/graph/get/${name}`);
  return parseResponse(response);
}

export async function updateGraph(name: string, graph: Graph): Promise<Graph> {
  const response = await fetch(`${BASE_URL}/graph/update`, {
    method: 'PUT',
    body: JSON.stringify(graph),
  });
  return parseResponse(response);
}

export async function getCourse(name: string): Promise<Course> {
  const response = await fetch(`${BASE_URL}/course/get/${name}`);
  return parseResponse(response);
}

async function parseResponse(response: Response) {
  if (!response.body) return;

  const responseText = await response.text();

  try {
    const json = JSON.parse(responseText);

    if (typeof json === 'string') {
      alert(responseText);
    } else {
      return json;
    }
  } catch (e) {
    if (e instanceof SyntaxError) {
      alert(
        `Request failed with status ${response.status}
        \n"${responseText.replace('\n', '')}"`
      );
    } else {
      alert(e.message);
    }

    throw e;
  }
}
