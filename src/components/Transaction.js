import React, {useContext} from 'react'
import {GlobalContext} from '../context/GlobalState';
import firebase from '../firebase';

export const Transaction = ({ transaction }) => {
    const {currentAcc} = useContext(GlobalContext);
    const lparen = transaction.tVal < 0 ? '(' : '';
    const rparen = transaction.tVal < 0 ? ')' : '';

    return (
        <li className={transaction.tVal < 0 ? 'minus' : 'plus'}>
            <span id="transaction-name">{transaction.tName}</span> 
            <span className={transaction.tVal < 0 ? 'money minus' : 'money plus'}>
                <span>{lparen}${Math.abs(transaction.tVal)}{rparen}</span></span>
             <button onClick = {() => {
                firebase.firestore().collection('accounts').doc(currentAcc).update({
                    value: firebase.firestore.FieldValue.increment(-transaction.tVal),
                    transactions: firebase.firestore.FieldValue.arrayRemove(transaction)
                })
                if(transaction.tVal>0){
                    firebase.firestore().collection('accounts').doc(currentAcc).update({
                        revenue: firebase.firestore.FieldValue.increment(-transaction.tVal),
                    })
                }
                else{
                    firebase.firestore().collection('accounts').doc(currentAcc).update({
                        expenses: firebase.firestore.FieldValue.increment(transaction.tVal),
                    })
                }
                for (let i = 0; i < transaction.categories.length; i++) {
                    firebase.firestore().collection('budgets').doc(transaction.categories[i]).update({
                        amountUsed: firebase.firestore.FieldValue.increment(-transaction.tVal)
                    });
                }
            }}
             className= "delete-btn">X</button>
            <div class="dropdown">
                <button class="dropbtn">Dropdown
                    <i class="fa fa-caret-down"></i>
                </button>
                <div class="dropdown-content">
                    <a href="#">Link 1</a>
                    <a href="#">Link 2</a>
                    <a href="#">Link 3</a>
                </div>
            </div> 
        </li>
    )
}

