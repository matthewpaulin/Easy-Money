import React, {useState, useEffect} from 'react'
import firebase from '../firebase';

function AcctList(){
    const [accounts, setAccounts] = useState([]);

    useEffect(() =>{
        firebase.firestore().collection('accounts').where("author", "==", firebase.auth().currentUser.uid)
            .onSnapshot((snapshot)=>{
                const newAccount = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))
                setAccounts(newAccount)
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
