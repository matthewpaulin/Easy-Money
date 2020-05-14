import React, {useContext} from 'react'
import {GlobalContext} from '../context/GlobalState';
export const Transaction = ({transaction}) => {
    const {delTrans} = useContext(GlobalContext);

    const lparen = transaction.amount < 0 ? '(' : '';
    const rparen = transaction.amount < 0 ? ')' : '';
    return (
        <li className={transaction.amount < 0 ? 'minus' : 'plus'}>
            {transaction.text} 
            <span className={transaction.amount < 0 ? 'money minus' : 'money plus'}>
                <span>{lparen}${Math.abs(transaction.amount)}{rparen}</span></span>
             <button onClick = {() => delTrans(transaction.id)}
             className= "delete-btn">x</button>
        </li>
    )
}
