import React, {useContext, useEffect} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { AuthContext, FirebaseContextHook } from './store/Context';
import './App.css';

/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Create from './Pages/Create';

function App() {

  const {user,setUser} = useContext(AuthContext);
  const {firebase} = FirebaseContextHook();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    })
  });

  return (
    <div>
      <BrowserRouter>
        <Route exact path="/" >
          <Home />
        </Route>
        <Route path="/signup" >
          <Signup />
        </Route>
        <Route path="/login" >
          <Login />
        </Route>
        <Route path="/create" >
          <Create />
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
