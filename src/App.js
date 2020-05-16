import React, { Component, useContext } from 'react';
import {Accounts} from './components/Accounts';
import {AddAccount} from './components/AddAccount';
import {Header} from './components/Header';
import {Balance} from './components/Balance';
import {Income} from './components/Income';
import {Transactions} from './components/Transactions';
import {NewTrans} from './components/NewTrans';
import {GlobalProvider, GlobalContext} from './context/GlobalState';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';

import {Home} from './Home';
import {Login} from './Login';

function App() {
  const {user} = useContext(GlobalContext);
  {console.log('hehehe')}
  return (
    <>
      <Router>
        <>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          {/* <Route exact path="/" component={Home} /> */}
        </>

      </Router>
      {console.log(user)}
      <GlobalProvider>
        {user==="null" ? (<Login/>) : (<Home/>)}
        {/* <div className="container">  
          <Accounts/>
          <span id="add-account">
            <AddAccount/>
          </span>
          <Header/>
          <Balance/>
          <Income/>
          <Transactions/>
          <NewTrans/>
        </div> */}
      </GlobalProvider>
    </>
  );
}

export default App;
