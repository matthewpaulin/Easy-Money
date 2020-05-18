import React from 'react';
import {Accounts} from './components/Accounts';
import {AddAccount} from './components/AddAccount';
import {Header} from './components/Header';
import {Balance} from './components/Balance';
import {Income} from './components/Income';
import app from './firebase';
import {GlobalProvider} from './context/GlobalState';

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
                </div> 
            </GlobalProvider> 
        </div>
    )
}
