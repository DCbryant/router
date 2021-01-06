import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

import { HashRouter as Router, Route, Link, Switch } from './react-router-dom';
import Home from './components/Home';
import User from './components/User';
import Profile from './components/Profile';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/user" component={User} exact />
        <Route path="/profile" component={Profile} exact />
      </Switch>
      <div>
        <button>
          <Link to="/">home</Link>
        </button>
        <button>
          <Link to="/user">user</Link>
        </button>
        <button>
          <Link to="/profile">profile</Link>
        </button>
      </div>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
