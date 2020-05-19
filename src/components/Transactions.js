import React, {useEffect, useState} from 'react';
import {Transaction} from './Transaction';
import firebase from '../firebase';

function AcctData(id){
    const [account, setAccount] = useState([]);

    useEffect(() =>{
        firebase.firestore().collection('accounts').doc(id)
            .onSnapshot((snapshot)=>{
                const newAccount = snapshot.get("transactions")
                    
                setAccount(newAccount);
            })
    }, []);
    
    return account;
}



export const Transactions = (props) => {
    const currentAcc = props.account !== undefined ? props.account : "a";
    const data = AcctData(currentAcc)
    const transactions = data !== undefined ? data : [];
    ///remove

    console.log(transactions.length)


    return (
        <div>
            <h3>History</h3>
            <ul className="list">
                {transactions.map(transaction => (
                    <Transaction account={currentAcc} key={transaction.tID} transaction={transaction}/>
                ))}              
            </ul>
        </div>
    )
}
