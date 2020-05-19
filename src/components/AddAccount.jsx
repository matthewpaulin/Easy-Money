import React, {useState} from 'react';
import firebase from '../firebase';
import uuid from 'react-uuid';

export const AddAccount = () => {
    const [name, setName] = useState('');
    const [balance, setBalance] = useState('');
    const submit = e => {
        e.preventDefault();
        if(name!==""){
            const balanceNum = balance !== "" ? parseFloat(balance) : 0;
            firebase.firestore().collection('accounts').add({
                title: name,
                value: balanceNum,
                transactions: [{
                    tName: "Initial Balance", 
                    tVal: balanceNum,
                    tID: uuid()
                }],
                author: firebase.auth().currentUser.uid
            }).then(() => {
                setName('');
                setBalance('');
            })
        }
        document.getElementById("add-account").style.display='none'
    }

    return (
        <div>
            <h3>Add new account</h3>
            <form onSubmit={submit}>

                <div className="form-control">
                    <label>Account Name</label>
                    <input type="text" value={name} onChange = {e => setName(e.currentTarget.value)} placeholder="Enter account name..." />
                </div>

                <div className="form-control">
                    <label>Balance</label>
                    <input type="number" value={balance} onChange = {e => setBalance(e.currentTarget.value)} placeholder="Enter account balance..." />
                </div>

                <button className="btn">Add Account</button>

            </form>
        </div>
    )
}
