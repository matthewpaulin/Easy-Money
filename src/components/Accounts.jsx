import React, {useState, useEffect} from 'react';
import firebase from '../firebase';

function AcctList(){
    const [accounts, setAccounts] = useState([]);

    useEffect(() =>{
        firebase.firestore().collection('accounts')
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

export const Accounts = () => {
    const accounts = AcctList();
    const submit = e => {
        e.preventDefault();
        // setShowForm(true);
    }
    return (
        <div className="accounts-container">
            <div>
                <h2>Accounts</h2>
                {accounts.map((account) =>
                    <div key={account.id} className="accounts">
                        <span>{account.title}</span>
                        <span className={account.value <= 0 ? 'negative-balance' : 'positive-balance'}>${account.value}</span>
                        <button onClick = {() =>{
                            firebase.firestore().collection('accounts')
                                .doc(account.id).delete().then(function() {
                                    console.log("Document successfully deleted!");
                                }).catch(function(error) {
                                    console.error("Error removing document: ", error);
                                })}
                        }
                        className= "">x</button>
                    </div>
                )}
                <button className="addAccount">+</button> 
            </div>
        </div>
    )
}