import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/home/HomePage";
import GameInfo from "./pages/home/GameInfo";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import Favorites from "./pages/home/Favorites";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signup" />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/homepage" element={<HomePage />} />
      <Route path="/games/:id" element={<GameInfo />} />
      <Route path="/favourites" element={<Favorites />} />
    </Routes>
  );
}

export default App;
