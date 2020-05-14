import React, {useContext} from 'react'
import {GlobalContext} from '../context/GlobalState';

export const Income = () => {
    const {transactions} = useContext(GlobalContext);
    const inc = transactions.map(transaction => transaction.amount)
        .filter(item => item > 0)
        .reduce((i, item) => (i +=item), 0)
        .toFixed(2);
    const exp = transactions.map(transaction => transaction.amount)
        .filter(item => item < 0)
        .reduce((i, item) => (i += Math.abs(item)), 0)
        .toFixed(2);
    return (
        <div className="inc-exp-container">
            <div>
                <h4>Income</h4>
                <p className="money plus">${inc}</p>
            </div>
            <div>
                <h4>Expense</h4>
                <p  className="money minus">(${exp})</p>
            </div>
      </div>
    )
}
