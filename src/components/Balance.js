import React from 'react';
import {AcctList} from './AcctList';

export const Balance = () => {
    const accounts = AcctList();
    const total = accounts.map(acc => acc.value)
        .reduce((i, item) => (i +=item), 0)
        .toFixed(2);

    return (
        <div>
            <h4>Your Balance</h4>
            <h1>${total}</h1>
        </div>
    )
}
