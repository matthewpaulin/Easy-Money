import React, {useContext, useEffect, useState} from 'react'
import {Transaction} from './Transaction';
import {GlobalContext} from '../context/GlobalState';
import firebase from '../firebase'

function AccountData(id){
    //.where("author", "==", firebase.auth().currentUser.uid)
    let account;
    firebase.firestore().collection('accounts')
    .where("id", "==", id)
    .onSnapshot((snapshot)=>{
        account = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }))   
    });
    console.log(account.transactions);
    return account;
}



export const Transactions = (props) => {
    //const {transactions} = useContext(GlobalContext);

    const currentAcc = props.account;
    const {account} = AccountData(currentAcc)
    console.log(currentAcc);

    return (
        <div>
            {console.log(currentAcc)}
            <h3>History</h3>
            <ul className="list">
                {/* {transactions.map(transaction => (
                    // <Transaction key={transaction.id} transaction={transaction}/>
                    <Transaction transaction={transaction}/>
                ))} */}
                {account.transactions.map(transaction => (
                    <Transaction transaction/>
                ))}
            </ul>
        </div>
    )
}
