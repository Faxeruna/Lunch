import React from "react";
import { Route, Redirect } from "react-router-dom";

export const PrivateAdmin = ({ component: Component, auth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem("admin") ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
};
