import React, {useContext} from 'react'
import {Transactions} from './Transactions';
import {NewTrans} from './NewTrans';
import {GlobalProvider, GlobalContext} from '../context/GlobalState';
import {Link} from "react-router-dom";
import firebase from '../firebase';

export const Account = (props) => {
    console.log(props.location.currentAcc)
    const currentAcc = props.location.currentAcc;

    return (
        <div className="container">
            <Link to="/" id="home-link">Back</Link>
                <Transactions account = {currentAcc} />
                <NewTrans account = {currentAcc}/>
        </div>
    )
}
