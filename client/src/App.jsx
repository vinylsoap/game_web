import { useState } from "react";
import HomePage from "./pages/home/HomePage";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import GameInfo from "./pages/home/GameInfo";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/games/:id" element={<GameInfo />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;
