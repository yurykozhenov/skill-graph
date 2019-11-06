import React, { useState } from 'react';
import GraphView from './GraphView/GraphView';

function App() {
  const [localGraphName, setLocalGraphName] = useState<string>(
    'Gameplay Developer'
  );
  const [graphName, setGraphName] = useState<string>(localGraphName);

  return (
    <>
      <div style={{ padding: '16px' }}>
        <label>
          <div>Graph Name:</div>
          <input
            value={localGraphName}
            onChange={e => setLocalGraphName(e.target.value)}
          />
        </label>

        <button
          onClick={() => setGraphName(localGraphName)}
          style={{ marginLeft: 8 }}
        >
          Fetch Graph
        </button>
      </div>

      <GraphView graphName={graphName} />
    </>
  );
}

export default App;
