import React, {useState, useContext, useRef, useEffect} from 'react'
import {GlobalContext} from '../context/GlobalState';
import uuid from 'react-uuid';
import firebase from '../firebase';

function useIsMountedRef(){
    const isMountedRef = useRef(null);
    useEffect(() => {
      isMountedRef.current = true;
      return () => isMountedRef.current = false;
    });
    return isMountedRef;
}

const BudgetList = () => {
    const [budgets, setBudgets] = useState([]);
    const isMountedRef = useIsMountedRef();

    useEffect(() =>{
        firebase.firestore().collection('budgets').where("author", "==", firebase.auth().currentUser.uid)
            .onSnapshot((snapshot)=>{
                const newBudget = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))
                if(isMountedRef.current){
                    setBudgets(newBudget);
                }
            })
    }, [isMountedRef]);

    return budgets;
}

export const NewTrans = () => {
    const [text, setText] = useState('');
    const [amnt, setAmnt] = useState('');
    const {currentAcc} = useContext(GlobalContext);
    const budgetList = BudgetList();
    const [budgets, setBudgets] = useState([]);

    const handleChange = e =>{
        setBudgets([]);
        for (let i = 0, l = e.target.options.length; i < l; i++) {
            if (e.target.options[i].selected && budgets.indexOf(e.target.options[i].value)===-1) {
                setBudgets([...budgets, e.target.options[i].value]);
            }
        }
    }

    const submit = e => {
        e.preventDefault();
        if(text===""){
            return;
        }
        const newTrans = {
            tID: uuid(),
            tName: text,
            tVal: parseFloat((+amnt).toFixed(2)),
            categories: budgets,
            time: firebase.firestore.Timestamp.now() 
        }
        firebase.firestore().collection('accounts').doc(currentAcc).update({
            transactions: firebase.firestore.FieldValue.arrayUnion(newTrans),
            value: firebase.firestore.FieldValue.increment(newTrans.tVal),
        });
        if(newTrans.tVal>0){
            firebase.firestore().collection('accounts').doc(currentAcc).update({
                revenue: firebase.firestore.FieldValue.increment(newTrans.tVal)
            })
        }
        else{
            firebase.firestore().collection('accounts').doc(currentAcc).update({
                expenses: firebase.firestore.FieldValue.increment(-newTrans.tVal)
            })
        }
        for (let i = 0; i < budgets.length; i++) {
            firebase.firestore().collection('budgets').doc(budgets[i]).update({
                amountUsed: firebase.firestore.FieldValue.increment(newTrans.tVal)
            });
        }
        setAmnt('');
        setText('');
        setBudgets([]);
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
                    <div>
                    <label htmlFor="text" className="form-label">Categories</label>
                    <select id="selectBudgets" multiple={true} name="selectBudgets" onChange={(e) => handleChange(e)} >
                        {budgetList.map((budget) =>
                            <option value={budget.id} key={budget.id}>{budget.name}</option>
                        )}
                    </select>
                    <button className="form-submit">Add Transaction</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
