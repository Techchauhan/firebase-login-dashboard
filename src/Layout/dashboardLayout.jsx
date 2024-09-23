import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { FaHome, FaUser, FaCog, FaChartBar, FaSignOutAlt } from "react-icons/fa";
import { getAuth, signOut } from "firebase/auth";

const DashboardLayout = () => {
  const [activePath, setActivePath] = React.useState("/admin-dashboard");
  const navigate = useNavigate();
  const auth = getAuth();

  // Log to see if the layout is rendering
  console.log("Rendering DashboardLayout with active path:", activePath);

  const sidebarItems = [
    { name: "Dashboard", icon: <FaHome />, path: "/admin-dashboard" },
    { name: "Users", icon: <FaUser />, path: "/admin-dashboard/users" },
    { name: "Settings", icon: <FaCog />, path: "/admin-dashboard/settings" },
    { name: "Reports", icon: <FaChartBar />, path: "/admin-dashboard/reports" },
    { name: "Logout", icon: <FaSignOutAlt />, action: () => handleLogout() },
  ];

  const handleNavigation = (path) => {
    console.log("Navigating to:", path); // Debug logging
    setActivePath(path);
    navigate(path);
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("Logged out successfully");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-gray-800 p-5 shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-yellow-500">Admin Panel</h2>
        <nav>
          {sidebarItems.map((item, index) => (
            <div
              key={index}
              className={`flex items-center p-3 mb-2 rounded-lg hover:bg-yellow-500 transition duration-200 cursor-pointer ${
                activePath === item.path ? "bg-yellow-500" : ""
              }`}
              onClick={() => item.path ? handleNavigation(item.path) : item.action()}
            >
              <span className="text-2xl text-white">{item.icon}</span>
              <span className="ml-3 text-lg text-white">{item.name}</span>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100"> {/* Removed padding here */}
        <Outlet /> {/* Render dynamic content here */}
      </main>

      {/* Bottom Navbar for Mobile */}
      <nav className="fixed bottom-0 inset-x-0 bg-gray-800 text-white p-4 md:hidden shadow-lg">
        <div className="flex justify-around">
          {sidebarItems.map((item, index) => (
            <button
              key={index}
              onClick={() => item.path ? handleNavigation(item.path) : item.action()}
              className={`flex flex-col items-center ${
                activePath === item.path ? "text-yellow-500" : "text-gray-400"
              }`}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-sm text-white">{item.name}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default DashboardLayout;
