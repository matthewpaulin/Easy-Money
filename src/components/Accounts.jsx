import React, {useContext, useState, useEffect, useRef} from 'react';
import firebase from '../firebase';
import { GlobalContext } from '../context/GlobalState';

// function useIsMountedRef(){
//     const isMountedRef = useRef(null);
//     useEffect(() => {
//       isMountedRef.current = true;
//       return () => isMountedRef.current = false;
//     });
//     return isMountedRef;
// }

const SORT_OPS = {
    "NAME_ASC": {column: 'title', direction: 'asc'},
    "NAME_DESC": {column: 'title', direction: 'desc'},
    "BALANCE_ASC": {column: 'value', direction: 'asc'},
    "BALANCE_DESC": {column: 'value', direction: 'desc'}
}

const AcctList = (sort = "NAME_ASC") => {
    const [accounts, setAccounts] = useState([]);
    // const isMountedRef = useIsMountedRef();

    useEffect(() =>{
        const unsub = 
        firebase.firestore().collection('accounts')
            .where("author", "==", firebase.auth().currentUser.uid)
            .orderBy(SORT_OPS[sort].column, SORT_OPS[sort].direction)
            .onSnapshot((snapshot)=>{
                const newAccount = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))
                // if(isMountedRef.current){
                    setAccounts(newAccount)
                // }
            })
            return () => unsub();
    }, [sort]);

    return accounts;
}

export const Accounts = () => {
    const {setAcc, setDisplay} = useContext(GlobalContext);
    const [sortBy, setSortBy] = useState('NAME_ASC');
    const accounts = AcctList(sortBy);

    return (
        <div className="accounts-container">
            <div className="sort">
                <h2>Accounts</h2>
                <div>
                    <label>Sort By:</label>{" "}
                    <select value={sortBy} onChange={e => setSortBy(e.currentTarget.value)}> 
                        <option value='NAME_ASC'> Name (A - Z)</option>
                        <option value='NAME_DESC'> Name (Z - A)</option>
                        <option disabled>--------</option>
                        <option value='BALANCE_DESC'> Balance ($$$-$)</option>
                        <option value='BALANCE_ASC'> Balance ($-$$$)</option>
                    </select>
                </div>
            </div>
            {accounts.map((account) =>
                <div key={account.id} className="accounts" >  
                    <div id="account">
                        <div id="account-name" onClick = {() => {
                                setAcc(account.id);
                                setDisplay("Account");
                            }}>
                            {account.title}
                        </div>
                        <div id="account-value">
                            <span className={account.value <= 0 ? 'negative-balance' : 'positive-balance'}>${account.value}</span>
                        </div>
                    </div>
                    <div id="delete-account">
                        <button onClick = {() =>{
                            firebase.firestore().collection('accounts').doc(account.id).delete()}
                        }
                        className= "del-acc-btn">X</button>
                    </div>
                </div>
            )}
            <button className="addAccount" onClick={()=>
                setDisplay("addAccount")
            }>+</button> 
        </div>
    )
}