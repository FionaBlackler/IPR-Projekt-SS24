import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./authContext";

const PrivateRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  console.log("PrivateRoute useAuth:", { isAuthenticated, loading });

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while checking authentication
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
