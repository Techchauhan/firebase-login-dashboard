import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth"; // Import useAuth hook
import Loader from '../components/Loader/loader';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    // Show a loading screen while checking auth state (optional)
    return <Loader/>;
  }

  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  // Render the protected page if the user is authenticated
  return children;
};

export default ProtectedRoute;
