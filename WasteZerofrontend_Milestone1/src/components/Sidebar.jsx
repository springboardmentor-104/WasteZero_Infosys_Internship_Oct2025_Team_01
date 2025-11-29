import React from "react";
import { X } from "lucide-react";

export default function Sidebar({ open, toggleSidebar }) {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center px-4 py-4 border-b dark:border-gray-700">
        <h2 className="text-lg font-semibold">Menu</h2>
        <button onClick={toggleSidebar}>
          <X />
        </button>
      </div>
      <ul className="p-4 space-y-3">
        <li className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
          Dashboard
        </li>
        <li className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
          Settings
        </li>
        <li className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
          Help
        </li>
      </ul>
    </div>
  );
}
