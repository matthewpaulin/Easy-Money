import React, {useContext} from 'react'
import {Transaction} from './Transaction';
import {GlobalContext} from '../context/GlobalState';

export const Transactions = () => {
    const {transactions} = useContext(GlobalContext);
    const {currentAcc} = useContext(GlobalContext);
    console.log(currentAcc);
    return (
        <div>
            {console.log(currentAcc)}
            <h3>History</h3>
            <ul className="list">
                {transactions.map(transaction => (
                    <Transaction key={transaction.id} transaction={transaction}/>
                ))}
            </ul>
        </div>
    )
}
