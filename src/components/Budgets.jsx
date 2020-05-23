import React, {useContext, useState, useEffect} from 'react';
import firebase from '../firebase';
import { GlobalContext } from '../context/GlobalState';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit} from '@fortawesome/free-solid-svg-icons';

const SORT_OPS = {
    "DATE_ASC": {column: 'date', direction: 'asc'},
    "DATE_DESC": {column: 'date', direction: 'desc'},
    "NAME_ASC": {column: 'name', direction: 'asc'},
    "NAME_DESC": {column: 'name', direction: 'desc'},
    "AMOUNT_ASC": {column: 'amount', direction: 'asc'},
    "AMOUNT_DESC": {column: 'amount', direction: 'desc'}
}

const BudgetList = (sort="NAME_ASC") => {
    const [budgets, setBudgets] = useState([]);

    useEffect(() =>{
        const unsub = 
        firebase.firestore().collection('budgets').where("author", "==", firebase.auth().currentUser.uid)
            .orderBy(SORT_OPS[sort].column, SORT_OPS[sort].direction)
            .onSnapshot((snapshot)=>{
                const newBudget = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))
                    setBudgets(newBudget);
            })
        return () => unsub();
    }, [sort]);

    return budgets;
}



export const Budgets = () => {
    const {setDisplay} = useContext(GlobalContext);
    const {setBudget} = useContext(GlobalContext);
    const [sortBy, setSortBy] = useState('DATE_DESC');
    const budgets = BudgetList(sortBy);
    
    return (
        <div className="budgets-container">
            
            <div className="sort">
                <h2>Budgets</h2>
                <div>
                    <label>Sort By:</label>{" "}
                    <select value={sortBy} onChange={e => setSortBy(e.currentTarget.value)}> 
                        <option value='DATE_DESC'> Date (newest first)</option>
                        <option value='DATE_ASC'> Date (oldest first)</option>
                        <option disabled>--------</option>
                        <option value='NAME_ASC'> Name (A - Z)</option>
                        <option value='NAME_DESC'> Name (Z - A)</option>
                        <option disabled>--------</option>
                        <option value='AMOUNT_DESC'> Amount ($$$-$)</option>
                        <option value='AMOUNT_ASC'> Amount ($-$$$)</option>
                    </select>
                </div>
            </div>
            {budgets.map((budget) =>
                <div key={budget.id} className="budgets"  style={{"borderLeft": "3px solid "+budget.color}}>  
                    <div id="budget">
                        <div id="budget-name">
                            {budget.name}
                        </div>
                        <div id="budget-amount">
                            <span>${budget.amount>budget.amountUsed ? budget.amount-budget.amountUsed : 0} left</span>
                        </div>
                        <div id="progress-bar">
                            <div id="budget-progress" style={{
                                "width":  budget.amountUsed>budget.amount ? "100%" : (budget.amountUsed/budget.amount*100).toString()+"%",
                                "background": 
                                    budget.amountUsed/budget.amount > .5 ? (budget.amountUsed>=budget.amount ? "red" : "yellow") : "green"
                                }}>
                                <div id="budget-percentage"><span>${budget.amountUsed}/${budget.amount}</span></div>
                            </div>
                        </div>

                    </div>
                    <div id="delete-account">
                        <button onClick = {() =>{
                            firebase.firestore().collection('budgets').doc(budget.id).delete()}

                        }
                        className= "del-acc-btn">X</button>
                        <button onClick = {() =>{
                            setBudget({
                                name: budget.name,
                                id: budget.id,
                                color: budget.color,
                                amount: budget.amount                  
                            });
                            setDisplay("editBudget");
                        }
                        }
                        className= "edit-acc-btn">
                            <FontAwesomeIcon icon={faEdit}/>
                            </button>
                    </div>
                </div>
            )}
            <button className="addAccount" onClick={()=>
                setDisplay("addBudget")
            }>+</button> 
        </div>
    )
}

