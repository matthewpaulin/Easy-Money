import React , { useContext } from "react";
import firebase from './firebase';
import 'firebase/auth';
import { AuthContext } from "./Auth.js";
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
            <h1>Login</h1>
            <button onClick={() => {
                firebase.app().auth().signInAnonymously();
                console.log("logged in!")}}>Sign in anonymously</button>
            
            <button onClick={() => {
                const google = new firebase.auth.GoogleAuthProvider();
                firebase.auth().signInWithPopup(google)
                console.log("logged in with google!")}}>Google Sign in</button>
        </div>
    )
}