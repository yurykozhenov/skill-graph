import React, { useState } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import GraphView from './GraphView/GraphView';
import GraphEdit from './GraphEdit/GraphEdit';
import ThemeSwitch from './shared/ThemeSwitch/ThemeSwitch';
import EdgeModeContext, { EdgeMode } from './EdgeModeContext';

function App() {
  const [localGraphName, setLocalGraphName] = useState<string>(
    'Gameplay Developer'
  );
  const [graphName, setGraphName] = useState<string>(localGraphName);
  const [edgeMode, setEdgeMode] = useState<EdgeMode>('line');

  return (
    <BrowserRouter>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <nav>
          <ul>
            <li>
              <Link to="/">View</Link>
            </li>
            <li>
              <Link to="/edit">Edit</Link>
            </li>
          </ul>
        </nav>

        <div style={{ padding: '8px 16px 0 0' }}>
          <ThemeSwitch />
        </div>
      </div>

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

            <button
              onClick={() => setGraphName(localGraphName)}
              style={{ marginLeft: 8 }}
            >
              Fetch Graph
            </button>
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
        <Switch>
          <Route
            path="/"
            exact
            render={() => <GraphView graphName={graphName} />}
          />
          <Route
            path="/edit"
            exact
            render={() => <GraphEdit graphName={graphName} />}
          />
        </Switch>
      </EdgeModeContext.Provider>
    </BrowserRouter>
  );
}

export default App;
