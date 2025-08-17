import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    setUser(storedUser || null);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-yellow-100 to-orange-300 px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full text-center">
        <h1 className="text-3xl font-bold font-serif text-orange-600 mb-4">
          Hello {user?.name || ""}
        </h1>

        <p className="text-gray-700 text-lg mb-6">
          {user?.name ? (
            <>
              We're glad to see you here. Explore your
              <Link
                to="/dashboard"
                className="text-blue-500 underline px-1 hover:text-blue-700 transition"
              >
                dashboard
              </Link>
              and manage your tasks efficiently!
            </>
          ) : (
            <>
              We're glad to see you here. Please
              <Link
                to="/login"
                className="inline-block mt-4 px-2  text-blue-700 underline rounded hover:text-blue-900  hover:font-medium"
              >
                Login
              </Link>
              to continue.
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Home;
