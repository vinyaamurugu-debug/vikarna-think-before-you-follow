import React from 'react';
import { Shield, Sparkles } from 'lucide-react';

interface FooterProps {
  onOpenLoreModal: () => void;
  onOpenHowItWorks: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenLoreModal,
  onOpenHowItWorks,
}) => {
  return (
    <footer className="mt-16 border-t border-amber-500/20 bg-slate-950/90 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        {/* Brand & Mission */}
        <div className="space-y-2">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <div className="w-6 h-6 rounded-lg bg-amber-500/20 border border-amber-400/40 flex items-center justify-center">
              <Shield className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <span className="font-heading font-bold text-base text-gold-gradient">
              VIKARNA
            </span>
          </div>
          <p className="text-xs text-slate-400 max-w-sm">
            "Question assumptions. Discover evidence. Make informed decisions."
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <button
            onClick={onOpenHowItWorks}
            className="hover:text-amber-300 transition-colors"
          >
            The 4-Step Journey
          </button>
          <button
            onClick={onOpenLoreModal}
            className="hover:text-amber-300 transition-colors"
          >
            Story of Vikarna
          </button>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">Mahabharata-Inspired Critical Thinking Prototype</span>
        </div>

        {/* Copyright / Status */}
        <div className="text-xs text-slate-400 space-y-1">
          <p className="flex items-center justify-center md:justify-end gap-1.5">
            <span>Built for truth-seekers</span>
            <Sparkles className="w-3 h-3 text-amber-400" />
          </p>
          <p className="text-[11px] text-slate-400">
            Stage 1: Frontend Foundation & Landing
          </p>
        </div>
      </div>
    </footer>
  );
};
