import React from 'react';
import GraphViewerAndEditor from '../GraphViewerAndEditor/GraphViewerAndEditor';
import GraphConfig from '../GraphConfig/GraphConfig';

function GraphView() {
  return (
    <GraphConfig>
      {initialGraph => <GraphViewerAndEditor initialGraph={initialGraph} />}
    </GraphConfig>
  );
}

export default GraphView;
