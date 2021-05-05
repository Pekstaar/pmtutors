import React from "react";
import {  useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {

  const {firebase} = useSelector(state => ({...state}))

  const auth = firebase.auth
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        auth && auth.uid ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={"/Login"} />
        )
      }
    />
  );
};

export default PrivateRoute;