import React from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import GraphView from '../GraphView/GraphView';

function GraphEdit({ graphName }: { graphName: string }) {
  return (
    <DndProvider backend={HTML5Backend}>
      <GraphView graphName={graphName} editMode />
    </DndProvider>
  );
}

export default GraphEdit;
