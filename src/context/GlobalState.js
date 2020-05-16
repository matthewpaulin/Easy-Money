import React, {createContext, useReducer} from 'react';
import AppReducer from './AppReducer';
const initialState = {
    transactions: [],
    user: "null"
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

    function login(user){
      dispatch({
        type: 'LOGIN',
        payload: user
      })
      console.log(user);
    }

    function logout(user){
      dispatch({
        type: 'LOGOUT',
        payload: user
      })
    }

    return (<GlobalContext.Provider value={{
        transactions: state.transactions,
        delTrans,
        addTrans,
        login,
        logout
      }}>
        {children}
      </GlobalContext.Provider>);
}