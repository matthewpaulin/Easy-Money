import React, {useState, useContext} from 'react'
import {GlobalContext} from '../context/GlobalState';

export const NewTrans = () => {
    const [text, setText] = useState('');
    const [amnt, setAmnt] = useState(0);
    const {addTrans} = useContext(GlobalContext);

    const submit = e => {
        e.preventDefault();

        const newTrans = {
            id: Math.floor(Math.random()*1000),//change this to uuid
            text,
            amount: +amnt
        }
        addTrans(newTrans);
    }
    return (
        <div>
            <h3>Add new transaction</h3>
            <form onSubmit={submit}>

                <div className="form-control">
                    <label htmlFor="text">Description</label>
                    <input type="text" value = {text} onChange={(e) => setText(e.target.value)} placeholder="Enter text..." />
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
