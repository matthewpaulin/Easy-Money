import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import {Home} from './Home';
import {Login} from './Login';
import {AuthProvider} from './context/Auth';
import PrivateRoute from './PrivateRoute';
import {GlobalProvider} from './context/GlobalState';

function App() {
  return (
    <>
      <GlobalProvider>
        <AuthProvider>
          <Router>
              <PrivateRoute exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
          </Router>
        </AuthProvider>   
      </GlobalProvider>
    </>
  );
}

export default App;
