import Login from "./component/Login";
import AddItem from "./component/AddItem";
import Signup from "./component/SignUp";
import './App.css';
import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ProtectedRoute from "./Utils/ProtecedRoute";


function App() {
  return (
    <Router>
      <div className = "App">
        <header>
          <h1>African Market</h1>
          {/* <a data-testid="logoutButton" href="#">logout</a> */}
        </header>
        {/* <PrivateRoute path='/list' component={List} /> */}
        <Route exact path = "/" component = {Login} />
        <Route exact path = "/signup" component = {Signup} />
        <ProtectedRoute path = "/owner" component = {AddItem}/>
        {/* <ProtectedRoute path = "/buyer" component={List}/> */}
      </div>
    </Router>
  );
}

export default App;