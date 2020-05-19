import React, {useContext} from 'react'
import {Transactions} from './Transactions';
import {NewTrans} from './NewTrans';
import {GlobalContext} from '../context/GlobalState';

export const Account = () => {
    const {currentAcc, setDisplay, setAcc} = useContext(GlobalContext);
    return (
        <div className="container">
            <button id="home-link" onClick = {() => {
                setAcc("");
                setDisplay("");
                }}>
                Back
            </button>
            <Transactions account = {currentAcc} />
            <NewTrans account = {currentAcc}/>
        </div>
    )
}
