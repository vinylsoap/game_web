import { useState } from "react";
import HomePage from "./pages/home/HomePage";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import GameInfo from "./pages/home/GameInfo";
import Favorites from "./pages/home/Favorites";
import Login from "./pages/login/Login";

// Here are ALLL pages that u have, home, favorites, profile page maybe etc

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/games/:id" element={<GameInfo />} />
      <Route path="/favourites" element={<Favorites />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
