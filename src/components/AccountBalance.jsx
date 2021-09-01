import React, { useState, useEffect, useRef, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import firebase from "../firebase";

function useIsMountedRef() {
  const isMountedRef = useRef(null);
  useEffect(() => {
    isMountedRef.current = true;
    return () => (isMountedRef.current = false);
  });
  return isMountedRef;
}

function AcctData(id) {
  const [account, setAccount] = useState([]);
  const isMountedRef = useIsMountedRef();

  useEffect(() => {
    firebase
      .firestore()
      .collection("accounts")
      .doc(id)
      .onSnapshot((snapshot) => {
        const newAccount = snapshot.get("transactions");
        if (isMountedRef.current) {
          setAccount(newAccount);
        }
      });
  }, [id, isMountedRef]);

  return account;
}

export const AccountBalance = () => {
  const { currentAcc } = useContext(GlobalContext);
  const transactions = AcctData(currentAcc);
  const total = transactions
    .map((t) => t.tVal)
    .reduce((i, item) => (i += item), 0)
    .toFixed(2);

  return (
    <div className="account-balance">
      <h4>Account Balance</h4>
      <h1>${total}</h1>
    </div>
  );
};
