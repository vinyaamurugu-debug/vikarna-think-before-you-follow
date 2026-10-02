import React from 'react';
import { X, AlertTriangle, Compass, ShieldAlert } from 'lucide-react';

interface FallacyModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  explanation: string;
}

export const FallacyModal: React.FC<FallacyModalProps> = ({
  isOpen,
  onClose,
  title,
  explanation,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg parchment-card rounded-3xl border-2 border-rose-500/50 p-6 sm:p-8 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
        <div className="ornate-corner-tl" />
        <div className="ornate-corner-tr" />
        <div className="ornate-corner-bl" />
        <div className="ornate-corner-br" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-rose-500/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/20 border border-rose-400/40 flex items-center justify-center text-xl">
              <ShieldAlert className="w-5 h-5 text-rose-400" />
            </div>
            <div>
              <span className="text-[11px] font-mono text-rose-400 uppercase tracking-widest font-bold">
                Reasoning Pitfall Analysis
              </span>
              <h2 className="font-heading font-black text-lg sm:text-xl text-slate-100">
                {title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-rose-300 border border-slate-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Fallacy Explanation */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-rose-500/30 space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-bold text-rose-400 uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>Why This Reasoning Is Weak:</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-slate-900/80 p-3.5 rounded-lg border border-slate-800">
            "{explanation}"
          </p>
        </div>

        {/* Vikarna Lesson */}
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-1.5 text-xs text-amber-100">
          <div className="flex items-center gap-1.5 text-amber-400 font-bold uppercase tracking-wider text-[11px]">
            <Compass className="w-3.5 h-3.5" />
            <span>Vikarna's Correction:</span>
          </div>
          <p className="leading-relaxed">
            "Never confuse popularity, personal dislike, or emotional certainty with empirical proof. An unexamined assumption repeated by a thousand voices remains an assumption."
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-2 border-t border-rose-500/20 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-heading font-bold text-xs sm:text-sm tracking-wider cursor-pointer transition-colors shadow-md"
          >
            I Understand • Continue
          </button>
        </div>
      </div>
    </div>
  );
};
