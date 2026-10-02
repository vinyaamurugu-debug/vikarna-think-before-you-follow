import React from 'react';
import { Search, Scroll, ArrowLeft, Home, MessageSquare, Lightbulb } from 'lucide-react';
import { InvestigationPhase, DiscoveredClue } from '../../types';

interface InvestigationHeaderProps {
  caseTitle: string;
  caseCategory: string;
  totalLeads: number;
  clues: DiscoveredClue[];
  phase: InvestigationPhase;
  onEditSituation: () => void;
  onReset: () => void;
  onOpenAskVikarna: () => void;
  onOpenHintModal: () => void;
}

export const InvestigationHeader: React.FC<InvestigationHeaderProps> = ({
  caseTitle,
  caseCategory,
  totalLeads,
  clues,
  phase,
  onEditSituation,
  onReset,
  onOpenAskVikarna,
  onOpenHintModal,
}) => {
  const supportsCount = clues.filter((c) => c.evidenceState === 'SUPPORTS THE CLAIM').length;
  const contradictsCount = clues.filter((c) => c.evidenceState === 'CONTRADICTS THE CLAIM').length;
  const neutralCount = clues.filter((c) => c.evidenceState === 'NEUTRAL').length;
  const uncertainCount = clues.filter((c) => c.evidenceState === 'UNCERTAIN').length;

  return (
    <div className="flex flex-col gap-4 pb-4 border-b border-amber-500/20">
      {/* Top Bar: Nav actions, Brand & Interactive Sages */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* VIKARNA Branding & Heading */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 p-0.5 shadow-lg flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Search className="w-5 h-5 text-amber-400 stroke-[2.5]" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-heading font-black text-xl sm:text-2xl tracking-wider text-gold-gradient">
                VIKARNA
              </h1>
              <span className="text-xs text-amber-500 font-bold">•</span>
              <span className="font-heading font-bold text-sm sm:text-lg tracking-widest text-amber-300 uppercase">
                INVESTIGATION
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5">
              <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300 text-[10px] border border-amber-500/20">
                {caseCategory}
              </span>
              <span>•</span>
              <span className="truncate max-w-[180px] sm:max-w-md">{caseTitle}</span>
            </p>
          </div>
        </div>

        {/* Quick Assistant Actions & Nav */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Ask Vikarna */}
          <button
            type="button"
            onClick={onOpenAskVikarna}
            className="px-3 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 hover:text-amber-200 text-xs font-semibold border border-amber-500/30 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm hover:scale-105"
            title="Ask Vikarna for guidance"
          >
            <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
            <span>Ask Vikarna</span>
          </button>

          {/* Give me a Hint */}
          <button
            type="button"
            onClick={onOpenHintModal}
            className="px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-amber-300 text-xs border border-slate-700/60 transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Get a critical thinking hint"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Hint</span>
          </button>

          {/* Edit Situation */}
          <button
            onClick={onEditSituation}
            className="px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-amber-200 text-xs border border-slate-700/60 transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Edit the entered situation"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Edit</span>
          </button>

          {/* Home */}
          <button
            onClick={onReset}
            className="p-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-amber-300 border border-slate-700/60 transition-colors cursor-pointer"
            title="Return to Home"
          >
            <Home className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Status Badges Row: Progress + Live Evidence Balance */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        {/* Phase / Progress indicator */}
        <div className="flex items-center gap-2 bg-slate-900/80 px-3.5 py-1.5 rounded-xl border border-amber-500/20 text-xs">
          <Scroll className="w-4 h-4 text-amber-400" />
          <span className="text-slate-400">Phase:</span>
          <span className="text-amber-300 font-bold font-mono">
            {phase === 'investigation' && `Active Investigation (${clues.length}/${totalLeads} Angles)`}
            {phase === 'decision' && `Evaluating Evidence & Final Verdict`}
            {phase === 'result' && `Investigation Complete`}
          </span>
        </div>

        {/* Live Evidence Breakdown Badges */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 hidden sm:inline text-[11px]">Evidence Balance:</span>
          <div className="flex items-center gap-1.5 font-mono text-[11px]">
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              🟢 {supportsCount}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/20">
              🔴 {contradictsCount}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-300 border border-sky-500/20">
              ⚪ {neutralCount}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
              🟡 {uncertainCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
