import React, { useState } from "react";
import Header from "./components/Header";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";

export default function App() {
  const [view, setView] = useState<"landing" | "dashboard">("landing");

  return (
    <div className="min-h-screen bg-[#050508] text-white selection:bg-orange-500/30 selection:text-white">
      {/* Shared cosmic glassmorphic header */}
      <Header currentView={view} onToggleView={(nextView) => setView(nextView)} />

      {/* Main Content View */}
      {view === "landing" ? (
        <LandingPage onStartAgent={() => setView("dashboard")} />
      ) : (
        <Dashboard />
      )}
    </div>
  );
}
