import React, {useContext} from 'react';
import firebase from '../firebase';
import {Link} from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';
import {AcctList} from './AcctList';

export const Accounts = () => {
    const accounts = AcctList();
    const {setAcc, setDisplay} = useContext(GlobalContext);

    return (
        <div className="accounts-container">
            <h2>Accounts</h2>
            {accounts.map((account) =>
                <div key={account.id} className="accounts" >  
                    <div id="account">
                        <div id="account-name" onClick = {() => {
                                setAcc(account.id);
                                setDisplay("Account");
                            }}>
                            {account.title}
                            {/* <Link to={{
                                pathname:"/account",
                                currentAcc: account.id === undefined ? currentAcc : account.id
                            }} id="transaction-link" onClick={() => {
                                setAcc(account.title)
                            }}>   {account.title}   </Link> */}

                        </div>
                        <div id="account-value">
                            <span className={account.value <= 0 ? 'negative-balance' : 'positive-balance'}>${account.value}</span>
                        </div>
                    </div>
                    <div id="delete-account">
                        <button onClick = {() =>{
                            firebase.firestore().collection('accounts').doc(account.id).delete()}
                        }
                        className= "del-acc-btn">x</button>
                    </div>
                </div>
            )}
            <button className="addAccount" onClick={()=>
                document.getElementById("add-account").style.display='block'
            }>+</button> 
        </div>
    )
}