import React from 'react';
import { FileText, AlertCircle, CheckCircle2, HelpCircle, Edit3, Compass, Lightbulb } from 'lucide-react';

interface CaseCardProps {
  situation: string;
  claim: string;
  claimContextNote?: string;
  knownFacts: string[];
  unknownFacts: string[];
  alternativeTheories?: string[];
  onEditSituation: () => void;
  onSelectTheory?: (theory: string) => void;
}

export const CaseCard: React.FC<CaseCardProps> = ({
  situation,
  claim,
  claimContextNote = 'A claim is an unverified assertion. It is NOT automatically a fact until tested against evidence.',
  knownFacts,
  unknownFacts,
  alternativeTheories = [],
  onEditSituation,
  onSelectTheory,
}) => {
  return (
    <div className="space-y-4">
      {/* 1. Active Situation Dossier */}
      <div className="relative rounded-2xl parchment-card border border-amber-500/30 p-4 sm:p-5 shadow-xl">
        <div className="ornate-corner-tl" />
        <div className="ornate-corner-tr" />
        <div className="ornate-corner-bl" />
        <div className="ornate-corner-br" />

        <div className="flex items-center justify-between gap-2 pb-2 border-b border-amber-500/15">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5" />
            Active Situation Dossier
          </span>
          <button
            onClick={onEditSituation}
            className="text-[11px] text-slate-400 hover:text-amber-300 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <Edit3 className="w-3 h-3" />
            <span>Edit</span>
          </button>
        </div>

        <p className="mt-2.5 text-sm sm:text-base text-slate-100 font-medium italic leading-relaxed">
          "{situation}"
        </p>
      </div>

      {/* 2. Three-Column Case Analysis: THE CLAIM + WHAT WE KNOW + WHAT WE DON'T KNOW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* THE CLAIM */}
        <div className="relative rounded-2xl parchment-card border border-amber-500/30 p-4 sm:p-5 flex flex-col justify-between shadow-lg bg-gradient-to-b from-amber-950/40 via-slate-900 to-slate-950">
          <div className="ornate-corner-tl" />
          <div className="ornate-corner-tr" />
          
          <div className="space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orange-400">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>THE CLAIM</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-300 border border-orange-500/20 font-mono">
                Unverified Assertion
              </span>
            </div>

            <p className="text-xs sm:text-sm text-amber-100 font-medium leading-relaxed bg-slate-950/40 p-2.5 rounded-xl border border-amber-500/15">
              "{claim}"
            </p>

            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-200/90 leading-snug flex items-start gap-1.5">
              <Compass className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <span>{claimContextNote}</span>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-amber-500/15 text-[10px] text-amber-400/80 font-mono flex items-center justify-between">
            <span>Status: Needs Investigation</span>
            <span>0% Proven</span>
          </div>
        </div>

        {/* WHAT DO WE KNOW? */}
        <div className="relative rounded-2xl parchment-card border border-emerald-500/30 p-4 sm:p-5 shadow-lg bg-gradient-to-b from-emerald-950/20 via-slate-900 to-slate-950 space-y-2.5">
          <div className="ornate-corner-tl" />
          <div className="ornate-corner-tr" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>WHAT DO WE KNOW?</span>
            </div>
            <span className="text-[10px] text-emerald-400/80 font-mono">
              Verified Starting Facts
            </span>
          </div>

          <ul className="space-y-2 text-xs text-slate-300">
            {knownFacts.map((fact, idx) => (
              <li key={idx} className="flex items-start gap-2 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                <span className="text-emerald-400 font-bold shrink-0">✓</span>
                <span className="leading-snug">{fact}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* WHAT DON'T WE KNOW? */}
        <div className="relative rounded-2xl parchment-card border border-amber-500/30 p-4 sm:p-5 shadow-lg bg-gradient-to-b from-sky-950/20 via-slate-900 to-slate-950 space-y-2.5">
          <div className="ornate-corner-tl" />
          <div className="ornate-corner-tr" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-400">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>WHAT DON'T WE KNOW?</span>
            </div>
            <span className="text-[10px] text-sky-400/80 font-mono">
              Critical Information Gaps
            </span>
          </div>

          <ul className="space-y-2 text-xs text-slate-300">
            {unknownFacts.map((missing, idx) => (
              <li key={idx} className="flex items-start gap-2 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                <span className="text-sky-400 font-bold shrink-0">?</span>
                <span className="leading-snug">{missing}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 3. Alternative Explanations to Consider Preview */}
      {alternativeTheories && alternativeTheories.length > 0 && (
        <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900/60 border border-amber-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-amber-300 font-semibold shrink-0">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span>Alternative Hypotheses to Test:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {alternativeTheories.map((theory, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onSelectTheory && onSelectTheory(theory)}
                className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-amber-500/20 text-slate-300 hover:text-amber-200 border border-slate-700/80 hover:border-amber-500/30 transition-colors text-[11px] cursor-pointer text-left"
                title="Test this hypothesis"
              >
                💡 {theory}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
