import React from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import GraphViewerAndEditor from '../GraphViewerAndEditor/GraphViewerAndEditor';
import GraphConfig from '../GraphConfig/GraphConfig';

function GraphEdit() {
  return (
    <DndProvider backend={HTML5Backend}>
      <GraphConfig>
        {initialGraph => (
          <GraphViewerAndEditor initialGraph={initialGraph} editMode />
        )}
      </GraphConfig>
    </DndProvider>
  );
}

export default GraphEdit;
