import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center gap-6">
        <h1 className="text-3xl font-bold text-gray-800">Task Completed</h1>
        <p className="text-gray-600 text-center max-w-sm">
          The assigned task has been completed successfully.
        </p>
      </div>
    </div>
  );
};

export default Home;
