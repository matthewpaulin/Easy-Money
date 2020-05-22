import React, {useContext, useState} from 'react';
import firebase from '../firebase';
import { GlobalContext } from '../context/GlobalState';
import { CirclePicker} from 'react-color';

export const EditBudget = () => {
    const {setDisplay} = useContext(GlobalContext);
    const {currentBudget} = useContext(GlobalContext);
    const [name, setName] = useState(currentBudget.name);
    const [amount, setAmount] = useState(currentBudget.amount);
    const [color, setColor] = useState(currentBudget.color);

    const handleChangeComplete = (color) => {
        setColor(color.hex);
      };

    const submit = e => {
        e.preventDefault();
        if(name!==""){
            const amountNum = amount !== "" ? +parseFloat(amount).toFixed(2) : 0.00;
            firebase.firestore().collection('budgets').doc(currentBudget.id).update({
                name: name,
                amount: amountNum,
                color: color
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
                <h3>Edit Budget</h3>
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
                    <button className="form-submit">Confirm Changes</button>
                </div>
            </form>
        </div>
    )
}
