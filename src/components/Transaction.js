import React, {useContext} from 'react'
import {GlobalContext} from '../context/GlobalState';
import firebase from '../firebase';

export const Transaction = (props) => {

    const transaction=props.transaction;
    const currentAcc=props.account;
    const {delTrans} = useContext(GlobalContext);
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
                    //value: firebase.firestore.FieldValue.increment(-transaction.tVal)
                })
                //delTrans("transaction.id")
            }
             className= "delete-btn">x</button>
        </li>
    )
}

