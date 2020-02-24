import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { PublicRoute, PrivateRoute, LoginRoute } from "./routes/router";
import { Account } from "./screens/account/account";
import { Login } from "./screens/login/login";
import { SignIn } from "./screens/signin/signin";
import { Provider } from "./screens/provider/provider";
import Home from "./screens/home/home";
import { ToastProvider } from "react-toast-notifications";
import { Institutional } from "./screens/institutional/institutional";
import { AddressStep } from "./screens/provider/addressStep";

export default function App() {
  return (
    <ToastProvider>
      <Router>
        <Switch>
          <PrivateRoute component={Account} path="/account" />
          <PrivateRoute component={Home} path="/home" />
          <PublicRoute component={AddressStep} path="/provider/step1" exact />
          <LoginRoute component={Login} path="/login" exact />
          <PublicRoute exact path="/signin" component={SignIn} />
          <PublicRoute exact path="/provider" component={Provider} />
          <PublicRoute exact path="/" component={Institutional} />
        </Switch>
      </Router>
    </ToastProvider>
  );
}
