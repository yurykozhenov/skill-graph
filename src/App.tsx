import React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import GraphView from './GraphView/GraphView';
import GraphCreate from './GraphCreate/GraphCreate';
import GraphEdit from './GraphEdit/GraphEdit';
import ThemeSwitch from './shared/ThemeSwitch/ThemeSwitch';
import styles from './App.module.css';

function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <nav>
          <ul className={styles.navigationList}>
            <li>
              <Link to="/">View</Link>
            </li>

            <li>
              <Link to="/create">Create</Link>
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

      <Switch>
        <Route path="/" exact component={GraphView} />
        <Route path="/create" exact component={GraphCreate} />
        <Route path="/edit" exact component={GraphEdit} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
