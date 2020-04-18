import React, { Component } from 'react';
import './App.css';
import history from './route/history';
import SignupPage from './pages/signuppages'
import { Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './route/privateroute';
import LoginPage from './pages/loginpages';
import Dashboard from './pages/dashboard/index.js';
import PenangkapanCreate from './pages/dashboard/Penangkapan/create'
import Lkn from './pages/dashboard/LKN/index.js';
import LknView from './pages/dashboard/LKN/view.js';
import LknEdit from './pages/dashboard/LKN/edit.js';
import LknCreate from './pages/dashboard/LKN/create.js';
import Penyidik from './pages/dashboard/Penyidik/index.js';
import PenyidikCreate from './pages/dashboard/Penyidik/create.js';
import PenyidikView from './pages/dashboard/Penyidik/view.js';
import PenyidikEdit from './pages/dashboard/Penyidik/edit.js';
import Tersangka from './pages/dashboard/Tersangka/index.js';
import TersangkaEdit from './pages/dashboard/Tersangka/edit.js';
import TersangkaView from './pages/dashboard/Tersangka/view.js';
import BarangBukti from './pages/dashboard/BarangBukti/index.js';
import BarangBuktiEdit from './pages/dashboard/BarangBukti/edit.js';
import BarangBuktiView from './pages/dashboard/BarangBukti/view.js';

export default class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path='/' component={LoginPage} />
          <Route
            path='/dashboard'
            render={({ match: { url } }) => (
              <>
                <PrivateRoute path={`${url}/`} component={Lkn} exact />
                <PrivateRoute path={`${url}/LKN`} component={Lkn} exact />
                <PrivateRoute path={`${url}/LKN/buat`} component={LknCreate} exact />
                <PrivateRoute path={`${url}/LKN/:id`} component={LknView} exact />
                <PrivateRoute path={`${url}/LKN/:id/edit`} component={LknEdit} exact />
                <PrivateRoute path={`${url}/Penyidik`} component={Penyidik} exact />
                <PrivateRoute path={`${url}/Penyidik/buat`} component={PenyidikCreate} exact />
                <PrivateRoute path={`${url}/Penyidik/:id`} component={PenyidikView} exact />
                <PrivateRoute path={`${url}/Penyidik/:id/edit`} component={PenyidikEdit} exact />
                <PrivateRoute path={`${url}/Tersangka`} component={Tersangka} exact />
                <PrivateRoute path={`${url}/Tersangka/:id`} component={TersangkaView} exact />
                <PrivateRoute path={`${url}/Tersangka/:id/edit`} component={TersangkaEdit} exact />
                <PrivateRoute path={`${url}/BarangBukti/:id`} component={BarangBuktiView} exact />
                <PrivateRoute path={`${url}/BarangBukti`} component={BarangBukti} exact />
                <PrivateRoute path={`${url}/BarangBukti/:id/edit`} component={BarangBuktiEdit} exact />
                <PrivateRoute path={`${url}/LKN/Penangkapan/buat`} component={PenangkapanCreate} exact />
              </>
            )}
          />
          <Route path='/register' component={SignupPage} />
        </Switch>
      </Router>
    )
  }
}
