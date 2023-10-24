import "./App.css";
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

function App() {
  const isUserAuthenticated = !!localStorage.getItem("token");

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            isUserAuthenticated ? <HomePage /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/login"
          element={!isUserAuthenticated ? <LoginPage /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
}

export default App;
