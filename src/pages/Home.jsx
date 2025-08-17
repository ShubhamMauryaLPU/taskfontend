import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  let [user, setUser] = useState({});
  useEffect(() => {
    let user = JSON.parse(sessionStorage.getItem("user"));
    user && setUser(user);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 to-orange-300 bg-gray-100 ">
      <h1 className=" text-3xl py-3 font-bold font-serif text-center ">
        Hello {user.name}
      </h1>
      <p className="text-gray-700 font-medium text-xl text-center">
        We're glad to see you here. Explore your{" "}
        <Link to={"/dashboard"} className="text-blue-500 underline">dashboard</Link> and manage your tasks
        efficiently!
      </p>
    </div>
  );
};

export default Home;
