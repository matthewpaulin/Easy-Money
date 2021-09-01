import React, { useContext } from "react";
import { Transactions } from "./Transactions";
import { NewTrans } from "./NewTrans";
import { AccountBalance } from "./AccountBalance";
import { GlobalContext } from "../context/GlobalState";

export const Account = () => {
  const { setDisplay, setAcc } = useContext(GlobalContext);
  return (
    <div className="container">
      <button
        className="pill-btn"
        onClick={() => {
          setAcc("");
          setDisplay("");
        }}
      >
        Back
      </button>
      <AccountBalance />
      <Transactions />
      <NewTrans />
    </div>
  );
};
