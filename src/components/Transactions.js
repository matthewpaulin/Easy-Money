import React, {useEffect, useState, useContext} from 'react';
import {Transaction} from './Transaction';
import firebase from '../firebase';
import {GlobalContext} from '../context/GlobalState';

function AcctData(id){
    const [account, setAccount] = useState([]);

    useEffect(() =>{
        const unsub = 
        firebase.firestore().collection('accounts').doc(id)
            .onSnapshot((snapshot)=>{
                const newAccount = snapshot.get("transactions")
                    setAccount(newAccount);
            })
            return () => unsub();
    }, [id]);
    
    return account;
}

export const Transactions = () => {
    const {currentAcc} = useContext(GlobalContext);
    const [sortBy, setSortBy] = useState('DATE_DESC');
    const unsortedTransactions = AcctData(currentAcc)
    const transactions = unsortedTransactions.sort(function(a,b){
        switch(sortBy){
            case "DATE_DESC":
                return b.time - a.time;
            case "DATE_ASC":
                return a.time - b.time;
            case "NAME_ASC":
                return a.tName>b.tName ? 1 : -1;
            case "NAME_DESC":
                return a.tName>b.tName ? -1 : 1;
            case "AMOUNT_DESC":
                return b.tVal - a.tVal;
            case "AMOUNT_ASC":
                return a.tVal - b.tVal;
            default:
                return b.time - a.time;
        }
    })
    return (
        <div id="transaction-container">
            <div className="sort">
                <h3>History</h3>
                <div>
                    <label>Sort By:</label>{" "}
                    <select value={sortBy} onChange={e => setSortBy(e.currentTarget.value)}> 
                        <option value='DATE_DESC'> Date (newest first)</option>
                        <option value='DATE_ASC'> Date (oldest first)</option>
                        <option disabled>--------</option>
                        <option value='NAME_ASC'> Name (A - Z)</option>
                        <option value='NAME_DESC'> Name (Z - A)</option>
                        <option disabled>--------</option>
                        <option value='AMOUNT_DESC'> Amount ($$$-$)</option>
                        <option value='AMOUNT_ASC'> Amount ($-$$$)</option>
                    </select>
                </div>
            </div>
            <ul className="list">
                {transactions.map(transaction => (
                    <Transaction key={transaction.tID} transaction={transaction}/>
                ))}              
            </ul> 
        </div>
    )
}
