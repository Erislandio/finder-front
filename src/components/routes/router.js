import React from "react";
import { Redirect, Route } from "react-router-dom";
import cookieJs from "js-cookie";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const email = cookieJs.get("user");

  return (
    <Route
      {...rest}
      render={props =>
        email ? (
          <Component {...rest} {...props} />
        ) : (
          <Redirect to="/login" exact />
        )
      }
    />
  );
};

const LoginRoute = ({ component: Component, path, ...rest }) => {
  const user = cookieJs.get("user");

  return (
    <Route
      {...rest}
      render={props =>
        user && path === "/login" ? (
          <Redirect to="/home" exact {...props} />
        ) : (
          <Component to="/login" exact {...props} />
        )
      }
    />
  );
};

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        restricted ? (
          <Redirect to="/home" exact />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export { PublicRoute, PrivateRoute, LoginRoute };
