import React, {createContext, useReducer} from 'react';
import AppReducer from './AppReducer';
const initialState = {
    currentAcc: "",
    display: ""
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    function setAcc(account){
      console.log(account);
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

    return (<GlobalContext.Provider value={{
        currentAcc: state.currentAcc,
        display: state.display,
        setAcc,
        setDisplay
      }}>
        {children}
      </GlobalContext.Provider>
    );
}