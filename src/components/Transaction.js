import React, { useContext, useEffect, useState, useRef } from "react";
import { GlobalContext } from "../context/GlobalState";
import firebase from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import uuid from "react-uuid";

function useIsMountedRef() {
  const isMountedRef = useRef(null);
  useEffect(() => {
    isMountedRef.current = true;
    return () => (isMountedRef.current = false);
  });
  return isMountedRef;
}

function BudgetData(id) {
  const [budget, setBudget] = useState([]);
  const isMountedRef = useIsMountedRef();

  useEffect(() => {
    firebase
      .firestore()
      .collection("budgets")
      .doc(id)
      .onSnapshot((snapshot) => {
        const newName = snapshot.get("name");
        const newColor = snapshot.get("color");
        if (isMountedRef.current) {
          setBudget([newName, newColor]);
        }
      });
  }, [id, isMountedRef]);

  return budget;
}

export const Transaction = ({ transaction }) => {
  const { currentAcc } = useContext(GlobalContext);
  const lparen = transaction.tVal < 0 ? "(" : "";
  const rparen = transaction.tVal < 0 ? ")" : "";

  return (
    <li className={transaction.tVal < 0 ? "minus" : "plus"}>
      {transaction.categories.length ? (
        <div className="dropdown">
          <button className="dropbtn">
            <FontAwesomeIcon icon={faCaretDown} />
            <i className="fa fa-caret-down"></i>
          </button>
          <div className="dropdown-content">
            {transaction.categories.map((c) => (
              <span style={{ background: BudgetData(c)[1] }} key={uuid()}>
                {BudgetData(c)[0]}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
      <span id="transaction-name">{transaction.tName}</span>
      <span className={transaction.tVal < 0 ? "money minus" : "money plus"}>
        <span>
          {lparen}${Math.abs(transaction.tVal)}
          {rparen}
        </span>
      </span>
      <button
        onClick={() => {
          firebase
            .firestore()
            .collection("accounts")
            .doc(currentAcc)
            .update({
              value: firebase.firestore.FieldValue.increment(-transaction.tVal),
              transactions:
                firebase.firestore.FieldValue.arrayRemove(transaction),
            });
          if (transaction.tVal > 0) {
            firebase
              .firestore()
              .collection("accounts")
              .doc(currentAcc)
              .update({
                revenue: firebase.firestore.FieldValue.increment(
                  -transaction.tVal
                ),
              });
          } else {
            firebase
              .firestore()
              .collection("accounts")
              .doc(currentAcc)
              .update({
                expenses: firebase.firestore.FieldValue.increment(
                  transaction.tVal
                ),
              });
          }
          for (let i = 0; i < transaction.categories.length; i++) {
            firebase
              .firestore()
              .collection("budgets")
              .doc(transaction.categories[i])
              .update({
                amountUsed: firebase.firestore.FieldValue.increment(
                  transaction.tVal
                ),
              })
              .catch((e) => {});
          }
        }}
        className="delete-btn"
      >
        X
      </button>
    </li>
  );
};
