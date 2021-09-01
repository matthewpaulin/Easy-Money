import React, { useContext } from "react";
import { Accounts } from "./components/Accounts";
import { AddAccount } from "./components/AddAccount";
import { Header } from "./components/Header";
import { Balance } from "./components/Balance";
import { Account } from "./components/Account";
import { Income } from "./components/Income";
import app from "./firebase";
import { GlobalContext } from "./context/GlobalState";
import { AddBudget } from "./components/AddBudget";
import { Budgets } from "./components/Budgets";
import { EditBudget } from "./components/EditBudget";

export const Home = () => {
  const { display } = useContext(GlobalContext);

  switch (display) {
    case "Account":
      return <Account />;

    case "Budget":
      return <></>;

    default:
      return (
        <div>
          <Header />

          <>
            <div id="home-text">
              <h1>Home</h1>
            </div>
            <div id="home-button">
              <button className="pill-btn" onClick={() => app.auth().signOut()}>
                Sign Out
              </button>
            </div>
          </>

          <div className="container">
            <Balance />
            {display === "addAccount" ? <AddAccount /> : <Accounts />}
            <Income />
            {display === "addBudget" ? (
              <AddBudget />
            ) : display === "editBudget" ? (
              <EditBudget />
            ) : (
              <Budgets />
            )}
          </div>
        </div>
      );
  }
};
