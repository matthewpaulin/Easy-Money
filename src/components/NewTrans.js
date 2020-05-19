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

        const newTrans = {
            tID: uuid(),
            tName: text,
            tVal: +amnt
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

                <div className="form-control">
                    <label htmlFor="text">Description</label>
                    <input type="text" value = {text} onChange={(e) => setText(e.target.value)} placeholder="Enter transaction description..." />
                </div>

                <div className="form-control">
                    <label htmlFor="amount">Amount (Negative or Positive)</label>
                    <input type="number" value = {amnt} onChange={(e) => setAmnt(e.target.value)} placeholder="Enter amount..." />
                </div>

                <button className="btn">Add transaction</button>
            </form>
        </div>
    )
}
