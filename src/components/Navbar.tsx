import React from 'react';
import { Scroll, Shield, BookOpen, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenLoreModal: () => void;
  onOpenHowItWorks: () => void;
  onResetToHome: () => void;
  currentView: 'landing' | 'investigation';
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenLoreModal,
  onOpenHowItWorks,
  onResetToHome,
  currentView,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-slate-950/80 border-b border-amber-500/20 shadow-lg shadow-black/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <button
          onClick={onResetToHome}
          className="flex items-center gap-3 group text-left transition-all duration-200 focus:outline-none"
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-orange-500 to-amber-700 p-0.5 shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform duration-200">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Shield className="w-5 h-5 text-amber-400 group-hover:text-amber-300 transition-colors" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-xl sm:text-2xl tracking-wider text-gold-gradient group-hover:brightness-110">
                VIKARNA
              </span>
              <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300">
                Prototype v1.0
              </span>
            </div>
            <p className="text-[11px] font-medium tracking-wide text-amber-300/70 hidden sm:block">
              THINK BEFORE YOU FOLLOW
            </p>
          </div>
        </button>

        {/* Navigation Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={onOpenHowItWorks}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-amber-300 hover:bg-amber-500/10 transition-colors duration-150 border border-transparent hover:border-amber-500/20"
          >
            <Scroll className="w-4 h-4 text-amber-400" />
            <span className="hidden md:inline">The 4-Step</span> Journey
          </button>

          <button
            onClick={onOpenLoreModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-amber-300 hover:bg-amber-500/10 transition-colors duration-150 border border-transparent hover:border-amber-500/20"
          >
            <BookOpen className="w-4 h-4 text-orange-400" />
            <span>Story of Vikarna</span>
          </button>

          {currentView === 'investigation' && (
            <button
              onClick={onResetToHome}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-amber-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 transition-all duration-150 shadow-md shadow-amber-500/20"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>New Case</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
