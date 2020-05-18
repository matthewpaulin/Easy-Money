// import React, { Component, useContext } from 'react';
// import {Accounts} from './components/Accounts';
// import {AddAccount} from './components/AddAccount';
// import {Header} from './components/Header';
// import {Balance} from './components/Balance';
// import {Income} from './components/Income';
// import {Transactions} from './components/Transactions';
// import {NewTrans} from './components/NewTrans';//////////////////////////////////DELETE UNUSED IMPORTS

import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import {Home} from './Home';
import {Login} from './Login';
import {Account} from './components/Account';
// import {Budget} from './components/Budget';
import {AuthProvider} from './Auth';
import PrivateRoute from './PrivateRoute';

import {GlobalProvider} from './context/GlobalState';

function App() {
  return (
    <>
      {/* <GlobalProvider> */}
      <AuthProvider>
        <Router>
          <>
            <PrivateRoute exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/account" component={Account} />
            {/* <Route exact path="/budget" component={Budget} /> */}
          </>
        </Router>
      </AuthProvider>   
      {/* </GlobalProvider> */}
    </>
  );
}

export default App;
