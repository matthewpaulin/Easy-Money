import React, {createContext, useReducer, useEffect, useState} from 'react';
import AppReducer from './AppReducer';
import firebase from '../firebase';
const initialState = {
    currentAcc: "",
    display: ""
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

    const AcctList = () => {
        const [accounts, setAccounts] = useState([]);
    
        useEffect(() =>{
            firebase.firestore().collection('accounts').where("author", "==", firebase.auth().currentUser.uid)
                .onSnapshot((snapshot)=>{
                    const newAccount = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data()
                    }))
                    setAccounts(newAccount)
                })
        }, []);
    
        return accounts;
    }
    




    return (<GlobalContext.Provider value={{
        currentAcc: state.currentAcc,
        display: state.display,
        setAcc,
        setDisplay,
        AcctList
      }}>
        {children}
      </GlobalContext.Provider>
    );
}