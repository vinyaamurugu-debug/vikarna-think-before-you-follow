import React, { useState } from 'react';
import { 
  Search, 
  UserCheck, 
  GitCompare, 
  Lightbulb, 
  Target, 
  HelpCircle, 
  AlertTriangle, 
  Compass, 
  ArrowRight
} from 'lucide-react';
import { 
  InvestigationLead, 
  LeadChoice, 
  DiscoveredClue, 
  EvidenceState 
} from '../../types';

interface InvestigationAnglesHubProps {
  leads: InvestigationLead[];
  discoveredClues: DiscoveredClue[];
  activeLeadId: string | null;
  onSelectLead: (leadId: string) => void;
  onAnswerLead: (lead: InvestigationLead, choice: LeadChoice) => void;
  onOpenHintModal: () => void;
  onOpenFallacyModal: (title: string, explanation: string) => void;
  onProceedToDecision: () => void;
}

export const InvestigationAnglesHub: React.FC<InvestigationAnglesHubProps> = ({
  leads,
  discoveredClues,
  activeLeadId,
  onSelectLead,
  onAnswerLead,
  onOpenHintModal,
  onOpenFallacyModal,
  onProceedToDecision,
}) => {
  const [selectedChoiceForActive, setSelectedChoiceForActive] = useState<LeadChoice | null>(null);

  // Find active lead object
  const activeLead = leads.find((l) => l.id === activeLeadId) || leads[0];
  const activeLeadClue = discoveredClues.find((c) => c.leadId === activeLead?.id);

  const getAngleIcon = (angle: string) => {
    switch (angle) {
      case 'examine-evidence':
        return <Search className="w-4 h-4 text-emerald-400" />;
      case 'check-source':
        return <UserCheck className="w-4 h-4 text-sky-400" />;
      case 'look-contradictions':
        return <GitCompare className="w-4 h-4 text-orange-400" />;
      case 'alternative-explanation':
        return <Lightbulb className="w-4 h-4 text-amber-400" />;
      case 'investigate-motive':
        return <Target className="w-4 h-4 text-rose-400" />;
      case 'check-unknown':
      default:
        return <HelpCircle className="w-4 h-4 text-purple-400" />;
    }
  };

  const getEvidenceStateBadge = (state: EvidenceState) => {
    switch (state) {
      case 'SUPPORTS THE CLAIM':
        return {
          label: 'SUPPORTS THE CLAIM',
          color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
        };
      case 'CONTRADICTS THE CLAIM':
        return {
          label: 'CONTRADICTS THE CLAIM',
          color: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
        };
      case 'NEUTRAL':
        return {
          label: 'NEUTRAL CONTEXT',
          color: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
        };
      case 'UNCERTAIN':
      default:
        return {
          label: 'UNCERTAIN PROOF',
          color: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
        };
    }
  };

  const handleChoiceClick = (choice: LeadChoice) => {
    if (activeLeadClue || selectedChoiceForActive) return;
    setSelectedChoiceForActive(choice);
    onAnswerLead(activeLead, choice);
  };

  const allLeadsInvestigated = discoveredClues.length >= leads.length;
  const canDecide = discoveredClues.length >= 2;

  return (
    <div className="space-y-6">
      {/* 1. Investigation Angles Navigation Hub */}
      <div className="relative rounded-2xl parchment-card border border-amber-500/30 p-4 sm:p-5 shadow-xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-amber-500/15">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            <h3 className="text-xs sm:text-sm font-heading font-black text-amber-300 uppercase tracking-wider">
              INVESTIGATION ANGLES ({discoveredClues.length}/{leads.length} Explored)
            </h3>
          </div>
          <span className="text-[11px] text-slate-400 italic">
            Choose any angle in any order. Follow the evidence.
          </span>
        </div>

        {/* Angles Tabs / Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {leads.map((lead) => {
            const isCompleted = discoveredClues.some((c) => c.leadId === lead.id);
            const clueForLead = discoveredClues.find((c) => c.leadId === lead.id);
            const isActive = activeLead?.id === lead.id;

            return (
              <button
                key={lead.id}
                onClick={() => {
                  onSelectLead(lead.id);
                  setSelectedChoiceForActive(null);
                }}
                className={`p-3 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-amber-950/70 border-amber-400 ring-2 ring-amber-400/30 shadow-lg'
                    : isCompleted
                    ? 'bg-slate-900/90 border-emerald-500/30 hover:border-emerald-400/50'
                    : 'bg-slate-900/60 hover:bg-slate-800/80 border-slate-700/60 hover:border-amber-500/30'
                }`}
              >
                <div className="flex items-center justify-between gap-1.5">
                  <div className="p-1 rounded-lg bg-slate-800 border border-slate-700">
                    {getAngleIcon(lead.angle)}
                  </div>
                  {isCompleted ? (
                    <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-0.5 font-mono">
                      ✓ Done
                    </span>
                  ) : (
                    <span className="text-[9px] font-mono text-amber-400/70">
                      Explore
                    </span>
                  )}
                </div>

                <div className="space-y-0.5">
                  <span className="font-heading font-bold text-[11px] sm:text-xs text-slate-200 line-clamp-1">
                    {lead.angleLabel}
                  </span>
                  <p className="text-[10px] text-slate-400 line-clamp-1">
                    {lead.title}
                  </p>
                </div>

                {isCompleted && clueForLead && (
                  <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded truncate ${getEvidenceStateBadge(clueForLead.evidenceState).color}`}>
                    {clueForLead.evidenceState.replace(' THE CLAIM', '')}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Active Lead Investigation Card */}
      {activeLead && (
        <div className="relative rounded-3xl parchment-card border-2 border-amber-500/40 p-5 sm:p-8 shadow-2xl space-y-6 animate-fadeIn">
          <div className="ornate-corner-tl" />
          <div className="ornate-corner-tr" />
          <div className="ornate-corner-bl" />
          <div className="ornate-corner-br" />

          {/* Lead Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-amber-500/20">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/20 border border-amber-400/30">
                {getAngleIcon(activeLead.angle)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-heading font-bold uppercase tracking-wider text-amber-400">
                    {activeLead.angleLabel}
                  </span>
                  {activeLeadClue && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
                      ✓ Clue Discovered
                    </span>
                  )}
                </div>
                <h2 className="font-heading font-black text-lg sm:text-2xl text-slate-100">
                  {activeLead.title}
                </h2>
              </div>
            </div>

            <span className="text-xs text-slate-400 italic sm:text-right max-w-xs">
              {activeLead.contextHint}
            </span>
          </div>

          {/* Motive != Proof Caution Banner (if motive angle) */}
          {activeLead.isMotiveCheck && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3 text-xs text-rose-200 animate-fadeIn">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="font-bold text-rose-300 uppercase tracking-wider text-[10px]">
                  Core Rule: Motive is NOT Proof
                </span>
                <p className="text-xs text-rose-100/90 leading-relaxed">
                  {activeLead.motiveCaution || 'Why someone insists on an assertion explains their attitude, but having a motive does NOT prove they are lying or guilty. Evidence is still required.'}
                </p>
              </div>
            </div>
          )}

          {/* Lead Prompt */}
          <div className="space-y-1.5">
            <h3 className="font-heading font-bold text-base sm:text-lg text-amber-200">
              {activeLead.prompt}
            </h3>
            <p className="text-xs text-slate-400">
              Select an investigation inquiry to uncover verifiable facts:
            </p>
          </div>

          {/* Choices Grid */}
          <div className="grid grid-cols-1 gap-3 sm:gap-4">
            {activeLead.choices.map((choice, idx) => {
              const letter = String.fromCharCode(65 + idx);
              const isSelected = selectedChoiceForActive?.id === choice.id || activeLeadClue?.title === choice.clueTitle;
              const hasCompleted = Boolean(activeLeadClue || selectedChoiceForActive);

              return (
                <button
                  key={choice.id}
                  onClick={() => handleChoiceClick(choice)}
                  disabled={hasCompleted}
                  className={`group relative text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex items-start gap-4 cursor-pointer ${
                    isSelected
                      ? 'bg-amber-950/70 border-amber-400 ring-2 ring-amber-400/30 shadow-xl'
                      : hasCompleted
                      ? 'bg-slate-900/40 border-slate-800/80 opacity-60 cursor-not-allowed'
                      : 'bg-slate-900/70 hover:bg-slate-800/90 border-amber-500/20 hover:border-amber-400/50 hover:shadow-lg'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center font-heading font-bold text-xs shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-amber-400 text-slate-950 shadow-md'
                        : 'bg-slate-800 text-amber-300 group-hover:bg-amber-500/20 border border-slate-700'
                    }`}
                  >
                    {letter}
                  </div>

                  <div className="flex-1 space-y-2">
                    <p className="text-sm sm:text-base font-medium text-slate-200 group-hover:text-amber-100 transition-colors leading-relaxed">
                      {choice.text}
                    </p>

                    {isSelected && (
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <span className={`inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full border ${getEvidenceStateBadge(choice.evidenceState).color}`}>
                          <span>Evidence State: {choice.evidenceState}</span>
                        </span>
                        <span className="text-[11px] text-amber-400 font-mono">
                          +{choice.points} Curiosity Points
                        </span>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Revealed Clue Card (if lead is investigated) */}
          {(activeLeadClue || selectedChoiceForActive) && (
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-amber-950/80 via-slate-900 to-slate-950 border-2 border-amber-400 shadow-2xl space-y-4 animate-fadeIn">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-amber-500/30">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🔎</span>
                  <h4 className="font-heading font-black text-sm sm:text-base text-gold-gradient uppercase">
                    CLUE DISCOVERED: {selectedChoiceForActive ? selectedChoiceForActive.clueTitle : activeLeadClue?.title}
                  </h4>
                </div>

                <span className={`text-xs uppercase font-bold tracking-wider px-3 py-1 rounded-full border ${
                  getEvidenceStateBadge(
                    (selectedChoiceForActive?.evidenceState || activeLeadClue?.evidenceState) || 'NEUTRAL'
                  ).color
                }`}>
                  {selectedChoiceForActive?.evidenceState || activeLeadClue?.evidenceState}
                </span>
              </div>

              <div className="space-y-3">
                <p className="text-sm sm:text-base text-slate-100 leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-amber-500/20">
                  "{selectedChoiceForActive?.clueText || activeLeadClue?.text}"
                </p>

                {/* Vikarna Feedback */}
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
                  <Compass className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                      Vikarna's Take
                    </span>
                    <p className="text-xs sm:text-sm text-amber-100 italic leading-snug">
                      {selectedChoiceForActive?.feedback || 'Clue verified and pinned to your permanent Evidence Board.'}
                    </p>
                  </div>
                </div>

                {/* If selected choice had a logical fallacy/weak reasoning */}
                {selectedChoiceForActive?.fallacyName && (
                  <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Reasoning Weakness Detected: {selectedChoiceForActive.fallacyName}</span>
                      </span>
                      <p className="text-xs text-rose-200/90">
                        {selectedChoiceForActive.fallacyExplanation}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => onOpenFallacyModal(selectedChoiceForActive.fallacyName || '', selectedChoiceForActive.fallacyExplanation || '')}
                      className="px-3 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-xs font-semibold shrink-0 cursor-pointer"
                    >
                      Why is this weak?
                    </button>
                  </div>
                )}
              </div>

              {/* Navigation to other leads */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-amber-500/20">
                <span className="text-xs text-slate-400 italic">
                  Clue added to Evidence Board ({discoveredClues.length}/{leads.length} collected)
                </span>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={onOpenHintModal}
                    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-medium border border-slate-700 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>Get Hint</span>
                  </button>

                  {canDecide && (
                    <button
                      type="button"
                      onClick={onProceedToDecision}
                      className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 text-slate-950 font-heading font-bold text-xs sm:text-sm tracking-wide hover:brightness-110 shadow-lg shadow-amber-500/20 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>{allLeadsInvestigated ? 'All Leads Solved • Weigh Verdict' : 'Weigh Final Verdict'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
