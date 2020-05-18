import React, {useState, useEffect, useContext} from 'react';
import {GlobalContext} from '../context/GlobalState';
import firebase from '../firebase';
import {Link} from 'react-router-dom';
function AcctList(){
    const [accounts, setAccounts] = useState([]);

    // db.collection("stories").where("author", "==", user.uid).get();

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

export const Accounts = () => {
    const accounts = AcctList();
    const {setAcc} = useContext(GlobalContext);
    return (
        <div className="accounts-container">
            <h2>Accounts</h2>
            {accounts.map((account) =>
                <div key={account.id} className="accounts" onClick ={() => {setAcc(account.id)}}>
                    <div id="account">
                        <div id="account-name">
                            <Link to="/account" id="transaction-link" >   {account.title}   </Link>
                            
                        </div>
                        <div id="account-value">
                            <span className={account.value <= 0 ? 'negative-balance' : 'positive-balance'}>${account.value}</span>
                        </div>
                    </div>
                    <div id="delete-account">
                        <button onClick = {() =>{
                            firebase.firestore().collection('accounts')
                                .doc(account.id).delete().then(function() {
                                    console.log("Document successfully deleted!");
                                }).catch(function(error) {
                                    console.error("Error removing document: ", error);
                                })}
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