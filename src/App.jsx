import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import LoginPage from "./components/LoginPage";
import UserProfile from "./components/UserProfile";
import Register from "./pages/Register";
import Projects from "./components/Projects";
import Index from "./pages/Index";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Index/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/user-wrok/:id" element={<UserProfile/>} />
        <Route path="/new" element={<Register/>} />
        <Route path="/projects" element={<Projects/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
