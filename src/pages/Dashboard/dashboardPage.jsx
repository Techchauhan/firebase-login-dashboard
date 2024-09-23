import React, { useState } from "react";
import { FaHome, FaUser, FaCog, FaChartBar, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

const DashboardPage = () => {
  const [activePath, setActivePath] = useState("/admin-dashboard");
  const navigate = useNavigate();
  const auth = getAuth();

  // Move handleLogout function definition before sidebarItems
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/"); // Redirect to login after logout
      })
      .catch((error) => {
        console.error("Error logging out: ", error);
      });
  };

  const sidebarItems = [
    { name: "Dashboard", icon: <FaHome />, path: "/admin-dashboard" },
    { name: "Users", icon: <FaUser />, path: "/admin-dashboard/users" }, // Updated paths for better routing
    { name: "Settings", icon: <FaCog />, path: "/admin-dashboard/settings" },
    { name: "Reports", icon: <FaChartBar />, path: "/admin-dashboard/reports" },
    { name: "Logout", icon: <FaSignOutAlt />, action: handleLogout }, // Reference the function after it's defined
  ];

  const handleNavigation = (path) => {
    setActivePath(path);
    navigate(path);
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
   

      {/* Main Content Area */}
      <main className="flex-1 p-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-yellow-500">Dashboard</h1>
          <p className="text-gray-400 mt-2">Welcome to the admin panel. Use the navigation to explore.</p>
        </header>

        {/* Content Cards Section */}
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sidebarItems.map((item, index) => (
            <div
              key={index}
              className={`p-6 bg-gray-800 rounded-lg shadow-lg hover:bg-gray-700 transition duration-200 cursor-pointer ${
                activePath === item.path ? "border-l-4 border-yellow-500" : ""
              }`}
              onClick={() => item.path ? handleNavigation(item.path) : item.action()}
            >
              <div className="flex items-center">
                <span className="text-3xl mr-4">{item.icon}</span>
                <span className="text-xl font-semibold">{item.name}</span>
              </div>
            </div>
          ))}
        </section>
      </main>

    </div>
  );
};

export default DashboardPage;
