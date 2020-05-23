import React, {useState, useContext} from 'react';
import firebase from '../firebase';
import { CirclePicker} from 'react-color';
import {GlobalContext} from '../context/GlobalState';


export const AddBudget = () => {
    const {setDisplay} = useContext(GlobalContext);
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [color, setColor] = useState('#fff');

    const handleChangeComplete = (color) => {
        setColor(color.hex);
      };

    const submit = e => {
        e.preventDefault();
        if(name!==""){
            const amountNum = amount !== "" ? +parseFloat(amount).toFixed(2) : 0.00;
            firebase.firestore().collection('budgets').add({
                name: name,
                amount: amountNum,
                amountUsed: 0,
                author: firebase.auth().currentUser.uid,
                color: color,
                // date: firebase.firestore.Timestamp.now()
            }).then(() => {
                setName('');
                setAmount('');
                setColor("#fff");
                setDisplay("");
            })
        }
    }

    return (
        <div id="account-list">
            <div>
                <h3>Add new budget</h3>
            </div>
            <div>
                <button className="delete-form" onClick={() => setDisplay("")}>X</button>
            </div>
            <form onSubmit={submit}>
                <div className="form-box">
                    <label htmlFor="text" className="form-label">Budget Name</label>
                    <input type="text" className="form-entry" value={name} onChange = {e => setName(e.currentTarget.value)} placeholder="Enter account name..." />
                    <label htmlFor="amount" className="form-label">Budget Amount</label>
                    <input type="number" className="form-entry" value={amount} onChange = {e => setAmount(e.currentTarget.value)} placeholder="Enter account amount..." />
                    <div id="color-picker">
                        <CirclePicker color={color} onChangeComplete={handleChangeComplete}/>
                    </div>
                    <button className="form-submit">Add Budget</button>
                </div>
            </form>
        </div>
    )
}
