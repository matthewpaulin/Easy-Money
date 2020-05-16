import React, { Component, useContext } from 'react';
import {Accounts} from './components/Accounts';
import {AddAccount} from './components/AddAccount';
import {Header} from './components/Header';
import {Balance} from './components/Balance';
import {Income} from './components/Income';
import {Transactions} from './components/Transactions';
import {NewTrans} from './components/NewTrans';
import app from './firebase';
import {GlobalProvider, GlobalContext} from './context/GlobalState';

export const Home = () => {
    return (
        <div>
            <Header/>
            <>
            <div id="home-text"> 
                <h1>Home</h1>
            </div>
            <div id="home-button">
            <button id="logout-button" onClick={() => app.auth().signOut()}>Sign Out</button> 
            </div>
            </>
            <GlobalProvider>
                <div className="container">  
                    <Balance/>
                    <Accounts/>
                    <span id="add-account">
                        <AddAccount/>
                    </span>
                    <Income/>
          {/* <Transactions/>
          <NewTrans/> */}
                </div> 
            </GlobalProvider> 
        </div>
    )
}
