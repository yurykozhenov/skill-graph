import EdgeModeContext, { EdgeMode } from '../EdgeModeContext';
import React, { useState } from 'react';
import { useGraph } from '../useGraph';
import { Graph } from '../graphTypes';

function GraphConfig({
  useFetcher = true,
  children,
}: {
  useFetcher?: boolean;
  children: React.ReactNode | ((initialGraph: Graph) => React.ReactNode);
}) {
  const [localGraphName, setLocalGraphName] = useState<string>(
    'Gameplay Developer'
  );
  const [graphName, setGraphName] = useState<string>(localGraphName);
  const [edgeMode, setEdgeMode] = useState<EdgeMode>('line');
  const initialGraph = useGraph(graphName);

  return (
    <>
      <div style={{ padding: '8px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <label>
              <div>Graph Name:</div>
              <input
                value={localGraphName}
                onChange={e => setLocalGraphName(e.target.value)}
              />
            </label>

            {useFetcher && (
              <button
                onClick={() => setGraphName(localGraphName)}
                style={{ marginLeft: 8 }}
              >
                Fetch Graph
              </button>
            )}
          </div>

          <label>
            <div>Edge Rendering Mode</div>
            <select
              value={edgeMode}
              onChange={e => setEdgeMode(e.target.value as EdgeMode)}
              style={{ width: '100%' }}
            >
              <option value="line">Line</option>
              <option value="curve1">Curve 1</option>
              <option value="curve2">Curve 2</option>
              <option value="bezier1">Bezier curve 1</option>
              <option value="bezier2">Bezier curve 2</option>
              <option value="bezier3">Bezier curve 3</option>
            </select>
          </label>
        </div>
      </div>
      <EdgeModeContext.Provider value={edgeMode}>
        {typeof children === 'function'
          ? initialGraph && children(initialGraph)
          : children}
      </EdgeModeContext.Provider>
    </>
  );
}

export default GraphConfig;
