import React, {useState, useContext} from 'react'
import {GlobalContext} from '../context/GlobalState';
import uuid from 'react-uuid';
import firebase from '../firebase';


export const NewTrans = () => {
    const [text, setText] = useState('');
    const [amnt, setAmnt] = useState('');
    const {currentAcc} = useContext(GlobalContext);

    const submit = e => {
        e.preventDefault();
        if(text===""){
            return;
        }
        const newTrans = {
            tID: uuid(),
            tName: text,
            tVal: parseFloat((+amnt).toFixed(2))
        }
        firebase.firestore().collection('accounts').doc(currentAcc).update({
            transactions: firebase.firestore.FieldValue.arrayUnion(newTrans),
            value: firebase.firestore.FieldValue.increment(newTrans.tVal)
        });
        setAmnt('');
        setText('');
    }
    return (
        <div>
            <h3>Add new transaction</h3>
            <form onSubmit={submit}>
                <div className="form-box">
                    <label htmlFor="text" className="form-label">Description</label>
                    <input type="text" value = {text} className="form-entry" onChange={(e) => setText(e.target.value)} placeholder="Enter transaction description..." />
                    <label htmlFor="amount" className="form-label">Amount (Negative or Positive)</label>
                    <input type="number" value = {amnt} className="form-entry"  onChange={(e) => setAmnt(e.target.value)} placeholder="Enter amount..." />
                    <button className="form-submit">Add Transaction</button>
                </div>
            </form>
        </div>
    )
}
