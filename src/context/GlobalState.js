import React, {createContext, useReducer, useEffect, useState} from 'react';
import AppReducer from './AppReducer';
import firebase from '../firebase';
const initialState = {
    currentAcc: "",
    display: "",
    currentBudget: {
      name: "",
      id: "",
      color: "",
      amount: 0
    }
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    function setAcc(account){
      dispatch({
        type: 'SET_ACCOUNT',
        payload: account
      })
    }

    function setDisplay(name){
      dispatch({
        type: 'SET_DISPLAY',
        payload: name
      })
    }

    function setBudget(b){
      dispatch({
        type: 'SET_BUDGET',
        payload: b
      })
    }

    // const AcctList = () => {
    //     const [accounts, setAccounts] = useState([]);
    
    //     useEffect(() =>{
    //         firebase.firestore().collection('accounts').where("author", "==", firebase.auth().currentUser.uid)
    //             .onSnapshot((snapshot)=>{
    //                 const newAccount = snapshot.docs.map((doc) => ({
    //                     id: doc.id,
    //                     ...doc.data()
    //                 }))
    //                 setAccounts(newAccount)
    //             })
    //     }, []);
    
    //     return accounts;
    // }
    




    return (<GlobalContext.Provider value={{
        currentAcc: state.currentAcc,
        display: state.display,
        currentBudget: state.currentBudget,
        setAcc,
        setDisplay,
        setBudget,
      }}>
        {children}
      </GlobalContext.Provider>
    );
}