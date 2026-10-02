import React from 'react';
import { X, Lightbulb, Compass, Sparkles } from 'lucide-react';
import { GeneratedCase, DiscoveredClue } from '../../types';

interface HintModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseData: GeneratedCase;
  clues?: DiscoveredClue[];
}

export const HintModal: React.FC<HintModalProps> = ({
  isOpen,
  onClose,
  caseData,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl parchment-card rounded-3xl border-2 border-amber-400 p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        <div className="ornate-corner-tl" />
        <div className="ornate-corner-tr" />
        <div className="ornate-corner-bl" />
        <div className="ornate-corner-br" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-amber-500/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-xl">
              💡
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Critical Thinking Guide</span>
              </div>
              <h2 className="font-heading font-black text-xl sm:text-2xl text-gold-gradient">
                Investigation Hints
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-amber-300 border border-slate-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Context Note */}
        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-100 flex items-start gap-2.5">
          <Compass className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            These questions coach your thinking without spoiling the answer. Ask yourself these critical inquiries:
          </p>
        </div>

        {/* Hints List */}
        <div className="space-y-3">
          {caseData.hints.map((hint, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-950/80 border border-amber-500/25 space-y-1.5 hover:border-amber-400/40 transition-colors"
            >
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold font-mono">
                <Lightbulb className="w-3.5 h-3.5" />
                <span>HINT #{idx + 1}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
                "{hint}"
              </p>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="pt-3 border-t border-amber-500/20 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-heading font-bold text-xs sm:text-sm tracking-wider cursor-pointer transition-colors shadow-md"
          >
            Resume Investigation
          </button>
        </div>
      </div>
    </div>
  );
};
