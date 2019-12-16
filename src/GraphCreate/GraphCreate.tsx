import React from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import GraphViewerAndEditor from '../GraphViewerAndEditor/GraphViewerAndEditor';
import { Graph } from '../graphTypes';
import GraphConfig from '../GraphConfig/GraphConfig';

const emptyGraph: Graph = {
  name: '',
  vertices: [],
  edges: [],
  positions: [],
};

function GraphCreate() {
  return (
    <DndProvider backend={HTML5Backend}>
      <GraphConfig useFetcher={false}>
        <GraphViewerAndEditor initialGraph={emptyGraph} editMode />
      </GraphConfig>
    </DndProvider>
  );
}

export default GraphCreate;
