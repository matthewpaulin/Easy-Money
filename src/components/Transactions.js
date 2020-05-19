import React, {useEffect, useState, useContext} from 'react';
import {Transaction} from './Transaction';
import firebase from '../firebase';
import {GlobalContext} from '../context/GlobalState';

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



export const Transactions = () => {
    const {currentAcc} = useContext(GlobalContext);
    const transactions = AcctData(currentAcc)

    return (
        <div>
            <h3>History</h3>
            <ul className="list">
                {transactions.map(transaction => (
                    <Transaction key={transaction.tID} transaction={transaction}/>
                ))}              
            </ul>
        </div>
    )
}
