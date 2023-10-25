import "./App.css";
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/profilePage";
import BlogPage from "./pages/BlogPage";

function App() {
  const isUserAuthenticated = !!localStorage.getItem("token");
  console.log(isUserAuthenticated, "relangi");

  return (
    <div className="App">
      <Routes>
        <Route
          path="/login"
          element={!isUserAuthenticated ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/"
          element={
            isUserAuthenticated ? <HomePage /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/profile"
          element={isUserAuthenticated ? <ProfilePage /> : <Navigate to="/" />}
        />
        <Route
          path="/create-blog"
          element={isUserAuthenticated ? <BlogPage /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
}

export default App;
