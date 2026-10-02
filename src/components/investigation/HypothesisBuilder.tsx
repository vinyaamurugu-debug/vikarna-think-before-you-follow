import React, { useState } from 'react';
import { Lightbulb, Send, CheckCircle2, AlertTriangle, HelpCircle, ArrowRight, Compass, Sparkles, BookOpen } from 'lucide-react';
import { PlayerHypothesis, HypothesisStatus } from '../../types';

interface HypothesisBuilderProps {
  currentHypothesis: PlayerHypothesis | null;
  alternativeTheories: string[];
  cluesCount: number;
  onSubmitHypothesis: (theory: string) => void;
  onOpenHintModal: () => void;
  onOpenFallacyModal?: (title: string, explanation: string) => void;
  onSelectAngle?: () => void;
}

export const HypothesisBuilder: React.FC<HypothesisBuilderProps> = ({
  currentHypothesis,
  alternativeTheories,
  cluesCount,
  onSubmitHypothesis,
  onOpenHintModal,
  onOpenFallacyModal,
  onSelectAngle,
}) => {
  const [inputText, setInputText] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSubmitHypothesis(inputText.trim());
    setInputText('');
  };

  const handleSelectPreset = (theory: string) => {
    onSubmitHypothesis(theory);
  };

  const getStatusBadge = (status: HypothesisStatus) => {
    switch (status) {
      case 'SUPPORTED BY CURRENT EVIDENCE':
        return {
          label: 'SUPPORTED BY CURRENT EVIDENCE',
          icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />,
          color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
        };
      case 'PARTIALLY SUPPORTED':
        return {
          label: 'PARTIALLY SUPPORTED',
          icon: <Sparkles className="w-4 h-4 text-sky-400" />,
          color: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
        };
      case 'CONTRADICTED BY THE EVIDENCE':
        return {
          label: 'CONTRADICTED BY THE EVIDENCE',
          icon: <AlertTriangle className="w-4 h-4 text-rose-400" />,
          color: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
        };
      case 'NOT ENOUGH EVIDENCE':
      default:
        return {
          label: 'NOT ENOUGH EVIDENCE',
          icon: <HelpCircle className="w-4 h-4 text-amber-400" />,
          color: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
        };
    }
  };

  return (
    <div className="relative rounded-2xl parchment-card border border-amber-500/30 p-4 sm:p-6 shadow-xl space-y-4">
      <div className="ornate-corner-tl" />
      <div className="ornate-corner-tr" />
      <div className="ornate-corner-bl" />
      <div className="ornate-corner-br" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-amber-500/20">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 font-bold">
            💡
          </div>
          <div>
            <h3 className="font-heading font-black text-sm sm:text-base tracking-wider text-gold-gradient uppercase">
              WHAT DO YOU THINK IS HAPPENING?
            </h3>
            <p className="text-[11px] text-slate-400">
              Formulate your working theory. Compare your hypothesis against collected evidence.
            </p>
          </div>
        </div>

        <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-900 border border-amber-500/20 text-amber-400/90 self-start sm:self-auto">
          {cluesCount} Clues Collected
        </span>
      </div>

      {/* Current Hypothesis Assessment (if formulated) */}
      {currentHypothesis && (
        <div className="p-4 rounded-xl bg-slate-950/80 border border-amber-500/30 space-y-3 animate-fadeIn">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs text-slate-400 font-medium">
              Your Current Working Theory:
            </span>
            <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border ${getStatusBadge(currentHypothesis.status).color}`}>
              {getStatusBadge(currentHypothesis.status).icon}
              <span>{getStatusBadge(currentHypothesis.status).label}</span>
            </span>
          </div>

          <p className="text-sm sm:text-base text-amber-100 italic bg-slate-900/90 p-3 rounded-lg border border-amber-500/15">
            "{currentHypothesis.theoryText}"
          </p>

          {/* Vikarna Feedback */}
          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-slate-200">
            <Compass className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-amber-300 uppercase tracking-wider text-[10px]">
                Vikarna's Assessment:
              </span>
              <p className="text-xs text-amber-100 leading-relaxed">
                {currentHypothesis.feedback}
              </p>
            </div>
          </div>

          {/* Helper Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {currentHypothesis.reasoningWeakness && onOpenFallacyModal && (
              <button
                type="button"
                onClick={() => onOpenFallacyModal('Weak Reasoning Analysis', currentHypothesis.reasoningWeakness || '')}
                className="px-3 py-1.5 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Why is this reasoning weak?</span>
              </button>
            )}

            <button
              type="button"
              onClick={onOpenHintModal}
              className="px-3 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Give me a hint</span>
            </button>

            {onSelectAngle && (
              <button
                type="button"
                onClick={onSelectAngle}
                className="px-3 py-1.5 rounded-lg bg-sky-500/15 hover:bg-sky-500/25 text-sky-300 border border-sky-500/30 text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowRight className="w-3.5 h-3.5" />
                <span>Investigate further</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setIsExpanded(true)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors cursor-pointer"
            >
              <span>Change my thinking</span>
            </button>
          </div>
        </div>
      )}

      {/* Theory Selector & Custom Input Box */}
      {(!currentHypothesis || isExpanded) && (
        <div className="space-y-3">
          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Choose or Type a Hypothesis:</span>
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {alternativeTheories.map((theory, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    handleSelectPreset(theory);
                    setIsExpanded(false);
                  }}
                  className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-amber-500/20 text-slate-300 hover:text-amber-100 border border-amber-500/20 hover:border-amber-400/40 text-xs font-medium text-left transition-all cursor-pointer flex items-start gap-2"
                >
                  <span className="text-amber-400 font-bold shrink-0">{idx + 1}.</span>
                  <span className="leading-snug">{theory}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Theory Input */}
          <form onSubmit={handleFormSubmit} className="flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Or type your own custom theory..."
              className="flex-1 bg-slate-900/90 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 border border-slate-700 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className={`px-4 py-2.5 rounded-xl font-heading font-bold text-xs tracking-wider transition-all flex items-center gap-1.5 ${
                inputText.trim()
                  ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 cursor-pointer shadow-md'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <span>Test Theory</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
