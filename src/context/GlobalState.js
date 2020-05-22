import React, {createContext, useReducer} from 'react';
import AppReducer from './AppReducer';
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