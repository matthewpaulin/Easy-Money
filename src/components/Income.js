import React, {useEffect, useState, useContext, useRef} from 'react';
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

const AcctList = () => {
    const [accounts, setAccounts] = useState([]);
    const isMountedRef = useIsMountedRef();

    useEffect(() =>{
        firebase.firestore().collection('accounts').where("author", "==", firebase.auth().currentUser.uid)
            .onSnapshot((snapshot)=>{
                const newAccount = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))
                if(isMountedRef.current){
                    setAccounts(newAccount)
                }
            })
    }, [isMountedRef]);

    return accounts;
}

export const Income = () => {
    const accounts = AcctList();
    const inc = accounts.map(acc => acc.revenue)
        .reduce((i, item) => (i +=item), 0)
        .toFixed(2);
    const exp = accounts.map(acc => acc.expenses)
        .reduce((i, item) => (i += Math.abs(item)), 0)
        .toFixed(2);
    return (
        <div className="inc-exp-container">
            <div>
                <h4>Revenue</h4>
                <p className="money revenue">${inc}</p>
            </div>
            <div>
                <h4>Expenses</h4>
                <p  className="money expenses">(${exp})</p>
            </div>
        </div>
    )
}
