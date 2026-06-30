import React, { useState } from "react";
import { Sparkles, Menu, X, ArrowLeft, Terminal } from "lucide-react";

interface HeaderProps {
  currentView: "landing" | "dashboard";
  onToggleView: (view: "landing" | "dashboard") => void;
}

export default function Header({ currentView, onToggleView }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-[#050508]/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        
        {/* Left: Brand logo */}
        <button 
          id="header-brand-logo"
          onClick={() => {
            onToggleView("landing");
            setMobileMenuOpen(false);
          }}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-orange-500 to-rose-500 flex items-center justify-center shadow-lg shadow-orange-500/10">
            <Sparkles className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" />
          </div>
          <span className="font-sans font-bold text-lg sm:text-xl tracking-wider text-white">
            COSMOQ
          </span>
        </button>

        {/* Center: Rounded Glass Navigation Pill (Matching reference images) */}
        {currentView === "landing" ? (
          <nav className="hidden md:flex items-center gap-1.5 px-2 py-1.5 rounded-full bg-white/[0.02] border border-white/10 backdrop-blur-xl">
            <a 
              href="#landing-features" 
              className="px-4 py-1.5 rounded-full text-xs text-gray-300 hover:text-white hover:bg-white/[0.03] transition-all font-sans font-medium"
            >
              AI Solutions
            </a>
            <a 
              href="#landing-features" 
              className="px-4 py-1.5 rounded-full text-xs text-gray-300 hover:text-white hover:bg-white/[0.03] transition-all font-sans font-medium"
            >
              About
            </a>
            <button 
              onClick={() => onToggleView("dashboard")}
              className="px-4 py-1.5 rounded-full text-xs text-gray-300 hover:text-white hover:bg-white/[0.03] transition-all font-sans font-medium cursor-pointer"
            >
              Pricing
            </button>
            <button 
              onClick={() => onToggleView("dashboard")}
              className="px-4 py-1.5 rounded-full text-xs text-gray-300 hover:text-white hover:bg-white/[0.03] transition-all font-sans font-medium cursor-pointer"
            >
              Contact
            </button>
          </nav>
        ) : (
          <div className="hidden md:flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/5 text-[10px] font-mono text-gray-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Agent Console Active
            </span>
          </div>
        )}

        {/* Right: Get Started Call-to-action button with glow boundary */}
        <div className="hidden md:block">
          {currentView === "landing" ? (
            <button
              id="header-cta-try"
              onClick={() => onToggleView("dashboard")}
              className="relative group px-5 py-2.5 rounded-full bg-white text-black text-xs font-semibold hover:bg-gray-100 transition-all cursor-pointer shadow-lg shadow-white/5"
            >
              Get Started
            </button>
          ) : (
            <button
              id="header-cta-back"
              onClick={() => onToggleView("landing")}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 hover:bg-white/10 text-xs font-medium text-gray-300 hover:text-white transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Home
            </button>
          )}
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden">
          <button
            id="header-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg border border-white/10 bg-white/[0.02] text-gray-400 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/[0.06] bg-[#050508]/95 px-4 py-6 space-y-4 font-sans relative z-50">
          {currentView === "landing" ? (
            <div className="space-y-3 flex flex-col">
              <a
                href="#landing-features"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-gray-300 hover:text-white py-1"
              >
                AI Solutions
              </a>
              <a
                href="#landing-features"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-gray-300 hover:text-white py-1"
              >
                About
              </a>
              <button
                onClick={() => {
                  onToggleView("dashboard");
                  setMobileMenuOpen(false);
                }}
                className="text-sm font-medium text-left text-gray-300 hover:text-white py-1 cursor-pointer"
              >
                Pricing
              </button>
              <button
                onClick={() => {
                  onToggleView("dashboard");
                  setMobileMenuOpen(false);
                }}
                className="text-sm font-medium text-left text-gray-300 hover:text-white py-1 cursor-pointer"
              >
                Contact
              </button>
              <div className="pt-4 border-t border-white/5">
                <button
                  id="mobile-header-cta-dashboard"
                  onClick={() => {
                    onToggleView("dashboard");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center py-2.5 rounded-xl bg-orange-500 text-white text-xs font-semibold hover:bg-orange-600 transition"
                >
                  Launch Agent Curation
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3 flex flex-col">
              <div className="px-3 py-2 rounded-xl bg-white/[0.02] border border-white/5 text-[10px] font-mono text-gray-400 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Curation Portal Connected
              </div>
              <button
                onClick={() => {
                  onToggleView("landing");
                  setMobileMenuOpen(false);
                }}
                className="w-full text-center py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-semibold text-white hover:bg-white/10 transition"
              >
                Go to Landing Page
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
