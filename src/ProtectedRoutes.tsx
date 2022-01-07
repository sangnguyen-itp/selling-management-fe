import { Navigate, Route, RouteProps } from "react-router-dom";
import React from "react";
import { getUserAuth } from "./storage/auth/auth";


interface RequireAuthProps {
    children: JSX.Element
    isLoggedIn: boolean
}

function RequireAuth({ isLoggedIn, children }: RequireAuthProps) {
    console.log(isLoggedIn)
    if (!getUserAuth()) {
        return <Navigate to="/login" />;
    }

    return children
}

export default RequireAuth;