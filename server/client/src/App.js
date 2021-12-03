import './App.css';
import React, { useReducer } from 'react';
import { Home } from './components/Home';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { Logout } from './components/Logout';
import { Navbar } from './components/Navbar';
import { Route, Switch } from 'react-router-dom'
import { ErrorPage } from './components/ErrorPage';
import { createContext } from 'react';

import { initialState, reducer } from './reducer/UseReducer';

export const UserContext = createContext()

function App() {


  const [state, dispatch] = useReducer(reducer, initialState)


  return (

    <div className="App">

      <UserContext.Provider value={{ state, dispatch }}>

        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/logout">
            <Logout />
          </Route>
          <Route >
            <ErrorPage />
          </Route>
        </Switch>

      </UserContext.Provider>
    </div>
  );
}

export default App;
