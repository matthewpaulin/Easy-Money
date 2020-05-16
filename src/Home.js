import React , { Component } from "react";
import firebase from "firebase";

export const Home = () => {
    return (
        <div>
            <h1>Home</h1>
            <button onClick={() => firebase.app.auth.signOut()}>Sign Out</button> 
        </div>
    )
}


// class Home extends Component{
// constructor(props)
// {
//     super(props)
//     this.state={
        
//     }
// }
// logout(){
//     firebase.auth().signOut();
// }
// render()
// {
//     return(
//         <div>
//            <h1>You are logged in !!!</h1>
//             <button onClick={this.logout}>Logout</button>
//             {/* <GlobalProvider>
//             <div className="container">  
//                 <Accounts/>
//                 <span id="add-account">
//                     <AddAccount/>
//                 </span>
//                 <Header/>
//                 <Balance/>
//                 <Income/>
//                 <Transactions/>
//                 <NewTrans/>
//             </div>
//             </GlobalProvider> */}
//         </div>
        
//     )
// }
// }
// export default Home;