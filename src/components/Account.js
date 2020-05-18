import React, {useContext} from 'react'
import {Transactions} from './Transactions';
import {NewTrans} from './NewTrans';
import {GlobalProvider, GlobalContext} from '../context/GlobalState';
import {Link} from "react-router-dom";

export const Account = () => {
    const{currentAcc}=useContext(GlobalContext);
    console.log(currentAcc)
    return (
        <div className="container">
            <Link to="/" id="home-link">Back</Link>
            <GlobalProvider>
                <Transactions/>
                <NewTrans/>
            </GlobalProvider>
        </div>
    )
}
