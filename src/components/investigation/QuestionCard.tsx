import React from 'react';
import { CheckCircle2, AlertTriangle, ShieldCheck, Users } from 'lucide-react';
import { InvestigationLead, LeadChoice } from '../../types';

interface QuestionCardProps {
  question: InvestigationLead;
  selectedChoice: LeadChoice | null;
  onSelectChoice: (choice: LeadChoice) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedChoice,
  onSelectChoice,
}) => {
  const getReasoningBadge = (type: string) => {
    switch (type) {
      case 'evidence-seeking':
        return {
          label: 'Evidence-Seeking',
          icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />,
          color: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/30',
        };
      case 'alternative-perspective':
        return {
          label: 'Alternative Theory',
          icon: <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />,
          color: 'text-sky-300 bg-sky-500/10 border-sky-500/30',
        };
      case 'bandwagon':
        return {
          label: 'Popular Consensus',
          icon: <Users className="w-3.5 h-3.5 text-amber-400" />,
          color: 'text-amber-300 bg-amber-500/10 border-amber-500/30',
        };
      case 'direct-accusation':
      case 'assumption-based':
      default:
        return {
          label: 'Assumption / Blame',
          icon: <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />,
          color: 'text-rose-300 bg-rose-500/10 border-rose-500/30',
        };
    }
  };

  return (
    <div className="relative rounded-3xl parchment-card border-2 border-amber-500/40 p-5 sm:p-8 shadow-2xl space-y-6">
      <div className="ornate-corner-tl" />
      <div className="ornate-corner-tr" />
      <div className="ornate-corner-bl" />
      <div className="ornate-corner-br" />

      {/* Header with Title & Context Hint */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-amber-500/20">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 font-mono text-xs font-bold">
            LEAD ANGLE
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
            {question.angleLabel || 'INVESTIGATION LEAD'}
          </span>
        </div>
        <span className="text-xs text-slate-400 italic">
          {question.contextHint}
        </span>
      </div>

      {/* Question Prompt */}
      <div className="space-y-2">
        <h2 className="font-heading font-bold text-lg sm:text-2xl text-slate-100 leading-snug">
          {question.prompt || question.title}
        </h2>
        <p className="text-xs text-slate-400">
          Choose an investigation action that explores evidence and tests the core claim:
        </p>
      </div>

      {/* Clickable Answer Choices */}
      <div className="grid grid-cols-1 gap-3 sm:gap-4">
        {question.choices.map((choice, idx) => {
          const isSelected = selectedChoice?.id === choice.id;
          const letter = String.fromCharCode(65 + idx);
          const badge = getReasoningBadge(choice.reasoningType);

          return (
            <button
              key={choice.id}
              onClick={() => onSelectChoice(choice)}
              disabled={selectedChoice !== null}
              className={`group relative text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex items-start gap-4 cursor-pointer ${
                isSelected
                  ? 'bg-amber-950/70 border-amber-400 ring-2 ring-amber-400/30 shadow-xl'
                  : selectedChoice !== null
                  ? 'bg-slate-900/40 border-slate-800/80 opacity-60 cursor-not-allowed'
                  : 'bg-slate-900/70 hover:bg-slate-800/90 border-amber-500/20 hover:border-amber-400/50 hover:shadow-lg'
              }`}
            >
              {/* Option Letter Indicator */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center font-heading font-bold text-xs shrink-0 transition-colors ${
                  isSelected
                    ? 'bg-amber-400 text-slate-950 shadow-md'
                    : 'bg-slate-800 text-amber-300 group-hover:bg-amber-500/20 border border-slate-700'
                }`}
              >
                {letter}
              </div>

              {/* Choice Content */}
              <div className="flex-1 space-y-2">
                <p className="text-sm sm:text-base font-medium text-slate-200 group-hover:text-amber-100 transition-colors leading-relaxed">
                  {choice.text}
                </p>

                {/* Show reasoning tag when selected */}
                {isSelected && (
                  <div className="flex items-center gap-2 pt-1">
                    <span className={`inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full border ${badge.color}`}>
                      {badge.icon}
                      <span>Approach: {badge.label}</span>
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
    </div>
  );
};
