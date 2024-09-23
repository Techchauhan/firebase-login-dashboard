import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/Login/login';  
import DashboardLayout from './Layout/dashboardLayout'; 
import Dashboard from './pages/Dashboard/dashboardPage'; 
import Users from './pages/users/index'; 
import Settings from './pages/settings/index'; 
import Reports from './pages/Reports/index'; 
import { useAuth } from "./hooks/useAuth"; // Import the useAuth hook

function App() {
  const { user, loading } = useAuth(); // Get user and loading state

  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner or message while loading
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={user ? <Navigate to="/admin-dashboard/" replace /> : <Login />} />
        
        {/* Protected routes with DashboardLayout */}
        {user && (
          <Route path="/admin-dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
            <Route path="reports" element={<Reports />} />
          </Route>
        )}
      </Routes>
    </Router>
  );
}

export default App;
