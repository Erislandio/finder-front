import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { PublicRoute, PrivateRoute, LoginRoute } from "./routes/router";
import { Account } from "./screens/account/account";
import { Login } from "./screens/login/login";
import { SignIn } from "./screens/signin/signin";
import { Home } from "./screens/home/home";

export default function App() {
  return (
    <Router>
      <Switch>
        <PrivateRoute component={Account} path="/account" />
        <PrivateRoute component={Home} path="/home" />
        <LoginRoute component={Login} path="/login" exact />
        <PublicRoute path="/signin" component={SignIn} />
      </Switch>
    </Router>
  );
}
