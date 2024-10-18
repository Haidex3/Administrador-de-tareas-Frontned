import React from 'react';
import './styles/App.css';
import TaskList from './components/TaskList';
import Insights from './components/Insights';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
      <Router>
        <Switch>
          <Route path="/" exact component={TaskList} />
          <Route path="/insights" component={Insights} />
        </Switch>
      </Router>
  );
}

export default App;