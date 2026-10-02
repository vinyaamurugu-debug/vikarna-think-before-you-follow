import React from 'react';
import { ChevronRight, Compass, Shield } from 'lucide-react';
import { AnswerChoice } from '../../types';

interface ClueCardProps {
  choice: AnswerChoice;
  isLastQuestion: boolean;
  onNextStep: () => void;
}

export const ClueCard: React.FC<ClueCardProps> = ({
  choice,
  isLastQuestion,
  onNextStep,
}) => {
  return (
    <div className="relative rounded-2xl bg-gradient-to-br from-amber-950/80 via-slate-900 to-slate-950 border-2 border-amber-400 shadow-2xl p-5 sm:p-7 space-y-5 animate-fadeIn">
      {/* Decorative Corners */}
      <div className="ornate-corner-tl" />
      <div className="ornate-corner-tr" />
      <div className="ornate-corner-bl" />
      <div className="ornate-corner-br" />

      {/* Clue Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-amber-500/30">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-base">
            🔎
          </div>
          <span className="font-heading font-black text-sm sm:text-base tracking-wider text-gold-gradient uppercase">
            CLUE DISCOVERED
          </span>
        </div>

        <span className="text-xs uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-amber-400" />
          <span>{choice.evidenceCategory}</span>
        </span>
      </div>

      {/* Clue Content */}
      <div className="space-y-3">
        <div>
          <h4 className="font-heading font-bold text-base sm:text-lg text-amber-200">
            {choice.clueTitle}
          </h4>
          <p className="mt-1 text-sm sm:text-base text-slate-100 leading-relaxed font-normal bg-slate-950/60 p-3.5 rounded-xl border border-amber-500/20">
            "{choice.clueText}"
          </p>
        </div>

        {/* Vikarna Feedback note */}
        <div className="flex items-start gap-3 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
          <Compass className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
              Vikarna's Take
            </span>
            <p className="text-xs sm:text-sm text-amber-100 italic leading-snug">
              {choice.feedback}
            </p>
          </div>
        </div>
      </div>

      {/* Action to proceed */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-amber-500/20">
        <span className="text-xs text-slate-400 italic">
          {isLastQuestion
            ? 'All investigation clues collected. Ready to review explanations.'
            : 'Clue added to your Evidence Board.'}
        </span>

        <button
          onClick={onNextStep}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 text-slate-950 font-heading font-bold text-sm sm:text-base tracking-wide hover:brightness-110 shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-[1.02]"
        >
          <span>
            {isLastQuestion ? 'Consider Possible Explanations' : 'Next Investigation Step'}
          </span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
