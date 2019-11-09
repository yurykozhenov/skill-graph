import React, { useState } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import GraphView from './GraphView/GraphView';
import GraphEdit from './GraphEdit/GraphEdit';

function App() {
  const [localGraphName, setLocalGraphName] = useState<string>(
    'Gameplay Developer'
  );
  const [graphName, setGraphName] = useState<string>(localGraphName);

  return (
    <BrowserRouter>
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

      <div style={{ padding: 16 }}>
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
    </BrowserRouter>
  );
}

export default App;
