import React, {useEffect, useState, useContext, useRef} from 'react';
import {Transaction} from './Transaction';
import firebase from '../firebase';
import {GlobalContext} from '../context/GlobalState';

function useIsMountedRef(){
    const isMountedRef = useRef(null);
    useEffect(() => {
      isMountedRef.current = true;
      return () => isMountedRef.current = false;
    });
    return isMountedRef;
}

function AcctData(id){
    const [account, setAccount] = useState([]);
    const isMountedRef = useIsMountedRef();

    useEffect(() =>{
        firebase.firestore().collection('accounts').doc(id)
            .onSnapshot((snapshot)=>{
                const newAccount = snapshot.get("transactions")
                if(isMountedRef.current){
                    setAccount(newAccount);
                }
            })
    }, [id, isMountedRef]);
    
    return account;
}



export const Transactions = () => {
    const {currentAcc} = useContext(GlobalContext);
    console.log(currentAcc)
    const transactions = AcctData(currentAcc)

    return (
        <div id="transaction-container">
            <h3>History</h3>
            <ul className="list">
                {transactions.map(transaction => (
                    <Transaction key={transaction.tID} transaction={transaction}/>
                ))}              
            </ul>
        </div>
    )
}
