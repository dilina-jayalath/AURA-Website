import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DocsSidebar from "./DocsSidebar";
import DocsContent from "./DocsContent";

export default function DocsLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-1 overflow-hidden relative w-full">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-16 z-40 lg:z-auto
          h-[calc(100vh-4rem)] w-72 lg:w-64 xl:w-72
          bg-base-100 border-r border-base-300
          transform transition-transform duration-300 ease-in-out lg:transform-none
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          overflow-y-auto flex-shrink-0
        `}
      >
        <DocsSidebar onNavigate={() => setSidebarOpen(false)} />
      </aside>

      {/* Main content area */}
      <main className="flex-1 min-w-0 overflow-y-auto h-[calc(100vh-4rem)]">
        {/* Mobile sidebar toggle */}
        <div className="lg:hidden sticky top-0 z-20 bg-base-100 border-b border-base-300 px-4 py-2.5 flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="btn btn-ghost btn-sm btn-square"
            aria-label="Open sidebar"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="text-sm text-base-content/50">Documentation</span>
        </div>

        <div className="max-w-3xl mx-auto px-6 py-10 lg:px-10 xl:px-12">
          <Routes>
            <Route path="" element={<Navigate to="getting-started" replace />} />
            <Route path="*" element={<DocsContent />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
