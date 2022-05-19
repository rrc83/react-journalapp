import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { JournalScrren } from "../components/journal/JournalScrren";
import { AuthRouter } from "./AuthRouter";
import { firebase } from "../firebase/firebase-config";
import { useDispatch } from "react-redux";
import { login } from '../actions/auth';

export const AppRouter = () => {
  const dispatch = useDispatch();
  const [checking, setChecking] = useState(true);
  const [isLoggedIn,setIsLoggedIn] = useState(false);

  useEffect(() => {
    
    firebase.auth().onAuthStateChanged((user) =>{
      if(user?.uid){
        dispatch(login(user.uid,user.displayName));
        setIsLoggedIn(true);
      }else{
        setIsLoggedIn(false);
      }
      setChecking(false);
    })
    
  }, [dispatch,setChecking,setIsLoggedIn])
  
  if (checking){
      return (<h1>Cargando...</h1>)
  }

  return (
    <Router>
        <div>
            <Switch>
                <Route path="/auth"
                       component={AuthRouter}
                />

                <Route path="/"
                       exact
                       component={JournalScrren}
                />
                <Redirect to="/auth/login" />
            </Switch>
        </div>
    </Router>
  )
}
