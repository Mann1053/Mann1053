"use client";

import { useState } from "react";

const MainLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 bg-white border-r border-gray-200`}
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          <div className="flex items-center mb-5 ps-2">
            <h1 className="text-xl font-semibold">E Police Dashboard</h1>
          </div>
          <nav className="space-y-2">
            <a
              href="/my-admin/cdr-analysis-new"
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
            >
              <span className="ml-3">CDR Analysis</span>
            </a>
            {/* Add more navigation items here */}
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <div className={`${isSidebarOpen ? "ml-64" : ""} p-4`}>
        {/* Header */}
        <header className="bg-white shadow-sm mb-4 p-4 flex justify-between items-center">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-500 hover:text-gray-900"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <div className="flex items-center space-x-4">
            {/* Add header content here (user profile, notifications, etc.) */}
          </div>
        </header>

        {/* Page content */}
        <main className="bg-white rounded-lg shadow">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
