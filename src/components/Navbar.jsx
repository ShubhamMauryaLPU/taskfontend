import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [user, setUser] = useState({});

  const handleLogout = () => {
    setShowProfileDropdown(false);
    console.log("logout");
    sessionStorage.clear();
    window.location.href = "/";
  };

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    setUser(user);
  }, []);
  return (
    <>
      <div className="bg-blue-950 sticy w-full text-white min-h-17 px-6 py-3 flex justify-between items-center shadow-md">
        <div className="text-2xl font-bold font-serif"><Link to={"/"}>MyApp</Link></div>
        <ul className="flex gap-6">
          <Link to={"/home"}>
            <li className="hover:text-yellow-200  text-lg font-medium font-serif cursor-pointer">
              Home
            </li>
          </Link>
        </ul>
        <div className="relative">
          {user ? (
            <>
              <div
                className="w-12 h-12 rounded-full border-5 border-red-700 bg-blue-100 flex items-center justify-center cursor-pointer"
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              >
                <span className="text-black text-2xl font-bold font-serif">
                  {user.name?.charAt(0) || "S"}
                </span>
              </div>
              {showProfileDropdown && (
                <div className="absolute right-0 mt-3 w-48 bg-blue-950 rounded-md shadow-lg py-1 z-50">
                  <div className="px-4 py-2 text-sm text-white border-b">
                    <p className="text-lg">Hello, {user.name}</p>
                  </div>
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-sm text-white hover:text-blue-500 hover:font-bold hover:bg-gray-100"
                    onClick={() => setShowProfileDropdown(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/projects"
                    className="block px-4 py-2 text-sm text-white hover:text-blue-500 hover:font-bold hover:bg-gray-100"
                    onClick={() => setShowProfileDropdown(false)}
                  >
                    Projects
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-white bg-red-500 hover:bg-gray-100 hover:text-red-500"
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <Link to="/login">
              <button className="bg-white text-blue-600 px-4 py-1 rounded-lg font-semibold hover:bg-gray-200">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
