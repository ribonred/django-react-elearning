import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LoginPage from './pages/loginpages'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { PrivateRoute } from './route/privateroute';
import Dashboard from './pages/dashboard';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' }

  }
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={LoginPage} />
          <Route path='/dashboard' component={Dashboard} />
        </Switch>
      </Router>
    )
  }
}
