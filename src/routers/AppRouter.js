import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import {
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import { JournalScrren } from "../components/journal/JournalScrren";
import { AuthRouter } from "./AuthRouter";
import { firebase } from "../firebase/firebase-config";
import { useDispatch } from "react-redux";
import { login } from '../actions/auth';
import { PublicRoutes } from "./PublicRoutes";
import { PrivateRoutes } from "./PrivateRoutes";

import { startLoadingNotes } from "../actions/notes";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const [checking, setChecking] = useState(true);
  const [isLoggedIn,setIsLoggedIn] = useState(false);

  useEffect(() => {
    
    firebase.auth().onAuthStateChanged((user) =>{
      if(user?.uid){
        dispatch(login(user.uid,user.displayName));
        setIsLoggedIn(true);
        dispatch(startLoadingNotes(user.uid));       
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
               <PublicRoutes 
                       path="/auth"
                       component={AuthRouter}
                       isAuthenticated={isLoggedIn}
                />

                <PrivateRoutes path="/"
                       exact
                       isAuthenticated={isLoggedIn}
                       component={JournalScrren}
                />
                <Redirect to="/auth/login" />
            </Switch>
        </div>
    </Router>
  )
}
