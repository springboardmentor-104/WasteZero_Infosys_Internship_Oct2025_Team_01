import "./App.css";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import ForgetPassword from "./pages/ForgetPassword";
import Login from "./pages/Login";
import SignupPage from "./pages/SignupPage";

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  // ✅ Handlers
  const toggleDarkMode = () => setDarkMode(!darkMode);
  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => {
    setIsAuthenticated(false);
    setSidebarOpen(false);
  };
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // ✅ Sync dark mode class to <html> (Tailwind dark mode works via this)
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // ✅ Pages without header/footer
  const authPages = ["/login", "/signup", "/forgot-password"];
  const isAuthPage = authPages.includes(location.pathname);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      {/* Header — only on LandingPage & Dashboard */}
      {!isAuthPage && (
        <Header
          isAuthenticated={isAuthenticated}
          onLogin={handleLogin}
          onLogout={handleLogout}
          toggleSidebar={toggleSidebar}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />
      )}

      {/* Sidebar — only when signed in */}
      {isAuthenticated && !isAuthPage && (
        <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
      )}

      {/* Main Routes */}
      <main className="flex flex-col items-center justify-center flex-grow w-full">
        <Routes>
          {/* Landing Page */}
          <Route
            path="/"
            element={<LandingPage onLogin={handleLogin} />}
          />

          {/* Auth Pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />

          {/* Dashboard (Protected Route) */}
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <Dashboard onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Fallback Redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
      <AppContent />
  );
}
