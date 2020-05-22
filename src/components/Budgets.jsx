import React, {useContext, useState, useEffect, useRef} from 'react';
import firebase from '../firebase';
import { GlobalContext } from '../context/GlobalState';

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

export const Budgets = () => {
    const budgets = BudgetList();
    const {setDisplay} = useContext(GlobalContext);
    const {setBudget} = useContext(GlobalContext);
    const {currentBudget} = useContext(GlobalContext);/////

    return (
        <div className="budgets-container">
            <h2>Budgets</h2>
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
                        className= "edit-acc-btn">Edit</button>
                    </div>
                </div>
            )}
            <button className="addAccount" onClick={()=>
                setDisplay("addBudget")
            }>+</button> 
        </div>
    )
}

