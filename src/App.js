import { useState } from "react";
import { Formik } from "formik";
import Register from "./components/Register";
import Login from "./components/Login";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Profile from "./components/Profile";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
      {/* <Register /> */}
      {/* <Login /> */}
    </>
  );
}

export default App;
