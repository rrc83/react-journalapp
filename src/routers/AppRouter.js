import React from "react";
import { Redirect } from "react-router-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { JournalScrren } from "../components/journal/JournalScrren";
import { AuthRouter } from "./AuthRouter";

export const AppRouter = () => {
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
