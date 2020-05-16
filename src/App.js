import React, { Component, useContext } from 'react';
import {Accounts} from './components/Accounts';
import {AddAccount} from './components/AddAccount';
import {Header} from './components/Header';
import {Balance} from './components/Balance';
import {Income} from './components/Income';
import {Transactions} from './components/Transactions';
import {NewTrans} from './components/NewTrans';

import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';

import {Home} from './Home';
import {Login} from './Login';

import {AuthProvider} from './Auth';

import PrivateRoute from './PrivateRoute';

function App() {

  return (
    <>
      <AuthProvider>
        <Router>
          <>
            <PrivateRoute exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            {/* <Route exact path="/" component={Home} /> */}
          </>
        </Router>
      </AuthProvider>   
    </>
  );
}

export default App;
