import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import {Home} from './Home';
import {Login} from './Login';
// import {Account} from './components/Account';
// import {Budget} from './components/Budget';
import {AuthProvider} from './context/Auth';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
            <PrivateRoute exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
        </Router>
      </AuthProvider>   
    </>
  );
}

export default App;
