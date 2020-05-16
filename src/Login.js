import React , { useContext } from "react";
import firebase from './firebase';
import 'firebase/auth';
import {GlobalContext} from './context/GlobalState';

export const Login = () =>
{
    const {login} = useContext(GlobalContext);
    
    return (
        <div>
            <h1>Login</h1>
            <button onClick={() => {
                firebase.app().auth().signInAnonymously().then((result) => {
                    login(result.user.uid);
                });
                console.log("logged in!")}}>Sign in anonymously</button>
            
            <button onClick={() => {
                const google = new firebase.auth.GoogleAuthProvider();
                firebase.auth().signInWithPopup(google).then((result) => {
                    login(result.user.uid);
                });
                console.log("logged in with google!")}}>Google Sign in</button>
        </div>
    )
}

// class Login extends Component{
// constructor(props)
// {
//     super(props);
//     this.login = this.login.bind(this);
//     this.handleChange = this.handleChange.bind(this);
//     this.signup = this.signup.bind(this);
//     this.state={
//         email : "",
//         password : ""
//     }
// }
// login(e){
//     e.preventDefault();
//     fire.auth().signInWithEmailAndPassword(this.state.email,this.state.password).then((u)=>{
//         console.log(u)
//     }).catch((err)=>{
//         console.log(err);
//     })
// }
// signup(e){
//     e.preventDefault();
//     fire.auth().createUserWithEmailAndPassword(this.state.email,this.state.password).then((u)=>{
//         console.log(u)
//     }).catch((err)=>{
//         console.log(err);
//     })
// }
// handleChange(e){
//     this.setState({
//         [e.target.name] : e.target.value
//     })
// }
// render()
// {
//     return(
//         <div>
           
//                 <button onClick={this.login}>Login</button>
//                 <button onClick={this.signup}>Signup</button>


//         </div>
//     )
// }
// }
// export default Login;