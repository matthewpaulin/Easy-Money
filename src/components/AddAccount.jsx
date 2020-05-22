import React, {useState, useContext} from 'react';
import firebase from '../firebase';
import uuid from 'react-uuid';
import {GlobalContext} from '../context/GlobalState';

export const AddAccount = () => {
    const {setDisplay} = useContext(GlobalContext);
    const [name, setName] = useState('');
    const [balance, setBalance] = useState('');
    const submit = e => {
        e.preventDefault();
        if(name!==""){
            const balanceNum = balance !== "" ? +parseFloat(balance).toFixed(2) : 0.00;
            firebase.firestore().collection('accounts').add({
                title: name,
                value: balanceNum,
                transactions: [{
                    tName: "Initial Balance", 
                    tVal: balanceNum,
                    tID: uuid(),
                    categories: [],
                    time: firebase.firestore.Timestamp.now() 
                }],
                author: firebase.auth().currentUser.uid,
                revenue: balanceNum>0 ? balanceNum : 0,
                expenses: balanceNum<0 ? balanceNum : 0
            }).then(() => {
                setName('');
                setBalance('');
                setDisplay("");
            })
        }
    }

    return (
        <div id="account-list">
            <div>
                <h3>Add new account</h3>
            </div>
            <div>
                <button className="delete-form" onClick={() => setDisplay("")}>X</button>
            </div>
            <form onSubmit={submit}>
                <div className="form-box">
                    <label htmlFor="text" className="form-label">Account Name</label>
                    <input type="text" className="form-entry" value={name} onChange = {e => setName(e.currentTarget.value)} placeholder="Enter account name..." />
                    <label htmlFor="amount" className="form-label">Balance</label>
                    <input type="number" className="form-entry" value={balance} onChange = {e => setBalance(e.currentTarget.value)} placeholder="Enter account balance..." />
                    <button className="form-submit">Add Account</button>
                </div>
            </form>
        </div>
    )
}
