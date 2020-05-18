import React, {createContext, useReducer} from 'react';
import AppReducer from './AppReducer';
const initialState = {
    transactions: [],
    currentAcc: ""
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    function delTrans(id){
      dispatch({
        type: 'DELETE_TRANSACTION',
        payload: id
      })
    }

    function addTrans(transaction){
      dispatch({
        type: 'ADD_TRANSACTION',
        payload: transaction
      })
    }
    
    function setAcc(account){
      console.log(account);
      dispatch({
        type: 'SET_ACCOUNT',
        payload: account
      })
    }
    return (<GlobalContext.Provider value={{
        transactions: state.transactions,
        currentAcc: state.currentAcc,
        delTrans,
        addTrans,
        setAcc
      }}>
        {children}
      </GlobalContext.Provider>);
}