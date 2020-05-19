import React , { useContext } from "react";
import firebase from './firebase';
import 'firebase/auth';
import { AuthContext } from "./context/Auth.js";
import {Redirect} from 'react-router';

export const Login = () =>
{
    const {user} = useContext(AuthContext);

    if(user){
        console.log(user);
        return <Redirect to="/"/>;
    }

    return (
        <div>
            <h1 id="login-text">Login</h1>
            <div className="login-buttons">
            <button className="glow-on-hover" onClick={() => {
                firebase.app().auth().signInAnonymously();
                console.log("logged in!")}}>Sign in anonymously</button>
            </div>
            <div className="login-buttons">
            <button className="glow-on-hover" onClick={() => {
                const google = new firebase.auth.GoogleAuthProvider();
                firebase.auth().signInWithPopup(google)
                console.log("logged in with google!")}}>Sign in with Google</button>
            </div>
        </div>
    )
}