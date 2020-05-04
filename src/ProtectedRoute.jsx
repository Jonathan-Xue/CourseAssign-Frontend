import React from "react";
import { Route, Redirect } from "react-router";

const ProtectedRoute = ({
    component: Component,
    isAuthenticated,
    isVerifying,
    ...params
}) => (
    <Route
        {...params}
        render={ props =>
            isVerifying 
                ? <div /> 
                : isAuthenticated 
                    ? <Component {...props} /> 
                    : <Redirect to={{
                        pathname: "/login",
                        state: { from: props.location }
                    }}/>
        }
    />
);
export default ProtectedRoute;