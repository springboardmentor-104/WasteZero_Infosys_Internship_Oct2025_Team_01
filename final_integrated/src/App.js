// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";




import LandingPage from "./pages/LandingPage";
import WasteZeroSignUp from "./pages/WasteZeroSignUp"; // sign up page you created
import Login from "./pages/Login";                     // your login page component
import ForgotPassword from "./pages/ForgotPassword";   // optional

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<WasteZeroSignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        {/* fallback route (optional) */}
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}
