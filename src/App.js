import React from 'react';

import {Header} from './components/Header';
import {Balance} from './components/Balance';
import {Income} from './components/Income';
import {Transactions} from './components/Transactions';
import {NewTrans} from './components/NewTrans';

import './App.css';

function App() {
  return (
    <div>
     <Header/>
     <div className="container">  
        <Balance/>
        <Income/>
        <Transactions/>
        <NewTrans/>
     </div>
    </div>
  );
}

export default App;
