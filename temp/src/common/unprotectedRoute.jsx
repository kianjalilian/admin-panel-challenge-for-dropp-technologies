import React from "react";
import auth from "../services/authService";
import { Route, Redirect } from "react-router-dom";

const UnprotectedRoute = ({ path, component: Component, render, ...rest }) => {
   return (
      <Route
         path={path}
         {...rest}
         render={(props) => {
            if (auth.userLoggedIn())
               return (
                  <Redirect
                     to={{
                        pathname: "/home",
                        state: { from: props.location },
                     }}
                  />
               );
            return Component ? <Component {...props} /> : render(props);
         }}
      />
   );
};

export default UnprotectedRoute;
