import React from 'react';

// import firebase from './firebase';

import {Accounts} from './components/Accounts';
import {AddAccount} from './components/AddAccount';

import {Header} from './components/Header';
import {Balance} from './components/Balance';
import {Income} from './components/Income';
import {Transactions} from './components/Transactions';
import {NewTrans} from './components/NewTrans';

import {GlobalProvider} from './context/GlobalState';

import './App.css';

function App() {
  return (
    <GlobalProvider>
     <div className="container">  
        <Accounts/>
        <span id="add-account">
          <AddAccount/>
        </span>
        <Header/>
        <Balance/>
        <Income/>
        <Transactions/>
        <NewTrans/>
     </div>
    </GlobalProvider>
  );
}

export default App;
