import React from "react";
import { Moon, Sun, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Header({
  isAuthenticated,
  onLogin,
  darkMode,
  toggleDarkMode,
  toggleSidebar,
}) {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/70 dark:bg-zinc-900 backdrop-blur-md border-b border-gray-200 dark:border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* 🧩 Logo */}
        {!isAuthenticated && (
          <div
            onClick={() => navigate("/")}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <img src="/Logo.svg" alt="Logo" className="h-8 w-8" />
            <span className="text-xl font-semibold text-green-700 dark:text-green-400">
              <span className="text-gray-900 dark:text-white">Waste</span>
              Zero
            </span>
          </div>
        )}

        {/* 🌙 Right Section */}
        <div className="flex items-center gap-4">
          {/* Dark/Light Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* 🚀 Conditional Buttons */}
          {!isAuthenticated ? (
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition"
            >
              Get Started →
            </button>
          ) : (
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              <Menu size={22} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
