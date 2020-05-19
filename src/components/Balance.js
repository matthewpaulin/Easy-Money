import React, {useState, useEffect, useRef} from 'react';
import firebase from '../firebase';

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
    }, []);

    return accounts;
}

export const Balance = () => {
    const accounts = AcctList();
    const total = accounts.map(acc => acc.value)
        .reduce((i, item) => (i +=item), 0)
        .toFixed(2);

    return (
        <div>
            <h4>Your Balance</h4>
            <h1>${total}</h1>
        </div>
    )
}
