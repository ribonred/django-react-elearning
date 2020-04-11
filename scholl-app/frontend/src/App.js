import React, { Component } from 'react';
import './App.css';
import LoginPage from './pages/loginpages'
import SignupPage from './pages/signuppages'
import LkmFormPage from './pages/lkmformpages'
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
          <PrivateRoute path='/dashboard' component={Dashboard} />
          <Route path='/register' component={SignupPage} />
          <Route path='/lkmform' component={LkmFormPage} />
        </Switch>
      </Router>
    )
  }
}
