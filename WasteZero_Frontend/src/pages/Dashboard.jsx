import React from "react";

export default function Dashboard({ onLogout }) {
  return (
    <div className="flex flex-col items-center text-center px-6">
      <h1 className="text-4xl font-bold mb-4">Dashboard 🧭</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        You’re signed in! Explore your dashboard.
      </p>
      <button
        onClick={onLogout}
        className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
      >
        Log Out
      </button>
    </div>
  );
}
