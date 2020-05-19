import React, {useContext} from 'react'
import {GlobalContext} from '../context/GlobalState';
import firebase from '../firebase';

export const Transaction = ({ transaction }) => {
    const {currentAcc} = useContext(GlobalContext);
    const lparen = transaction.tVal < 0 ? '(' : '';
    const rparen = transaction.tVal < 0 ? ')' : '';

    return (
        <li className={transaction.tVal < 0 ? 'minus' : 'plus'}>
            {transaction.tName} 
            <span className={transaction.tVal < 0 ? 'money minus' : 'money plus'}>
                <span>{lparen}${Math.abs(transaction.tVal)}{rparen}</span></span>
             <button onClick = {() => 
                firebase.firestore().collection('accounts').doc(currentAcc).update({
                    transactions: firebase.firestore.FieldValue.arrayRemove(transaction),
                })
            }
             className= "delete-btn">x</button>
        </li>
    )
}

