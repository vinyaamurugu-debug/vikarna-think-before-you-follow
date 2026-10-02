import React, { useState } from 'react';
import { X, MessageSquare, Send, Compass, Sparkles } from 'lucide-react';
import { GeneratedCase, DiscoveredClue } from '../../types';
import { askVikarnaMock } from '../../utils/investigationEngine';
import { VikarnaAvatar } from '../VikarnaAvatar';

interface AskVikarnaModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseData: GeneratedCase;
  clues: DiscoveredClue[];
}

export const AskVikarnaModal: React.FC<AskVikarnaModalProps> = ({
  isOpen,
  onClose,
  caseData,
  clues,
}) => {
  const [customQuery, setCustomQuery] = useState('');
  const [activeDialogue, setActiveDialogue] = useState<{
    question: string;
    answer: string;
    principle: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleSelectPreset = (question: string) => {
    const result = askVikarnaMock(question, caseData, clues);
    setActiveDialogue({
      question,
      answer: result.answer,
      principle: result.principle,
    });
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuery.trim()) return;
    const result = askVikarnaMock(customQuery.trim(), caseData, clues);
    setActiveDialogue({
      question: customQuery.trim(),
      answer: result.answer,
      principle: result.principle,
    });
    setCustomQuery('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl parchment-card rounded-3xl border-2 border-amber-400 p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        <div className="ornate-corner-tl" />
        <div className="ornate-corner-tr" />
        <div className="ornate-corner-bl" />
        <div className="ornate-corner-br" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-amber-500/20">
          <div className="flex items-center gap-3">
            <VikarnaAvatar size="sm" showQuote={false} />
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Sage Council</span>
              </div>
              <h2 className="font-heading font-black text-xl sm:text-2xl text-gold-gradient">
                Ask Vikarna
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

        {/* Active Response Display */}
        {activeDialogue ? (
          <div className="space-y-4 p-5 rounded-2xl bg-slate-950/80 border border-amber-500/30 animate-fadeIn">
            <div className="text-xs text-amber-300/80 font-mono">
              Your Question:
            </div>
            <p className="text-sm font-semibold text-slate-100 italic bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              "{activeDialogue.question}"
            </p>

            <div className="space-y-2 pt-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
                <Compass className="w-4 h-4 text-amber-400" />
                <span>Vikarna's Counsel:</span>
              </div>
              <p className="text-sm text-slate-200 leading-relaxed bg-amber-500/10 p-4 rounded-xl border border-amber-500/20">
                "{activeDialogue.answer}"
              </p>
            </div>

            <div className="pt-2 border-t border-amber-500/20 text-xs text-amber-300/90 font-medium">
              <span className="font-bold text-amber-400">Core Principle: </span>
              {activeDialogue.principle}
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-100 flex items-start gap-2.5">
            <Compass className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              "Ask me anything about this case, the nature of evidence, or why we must never rush to accept popular claims. Select a common inquiry below or type your own."
            </p>
          </div>
        )}

        {/* Quick Question Presets */}
        <div className="space-y-2.5">
          <div className="text-xs font-semibold text-amber-300 uppercase tracking-wider">
            Common Inquiries for This Case:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Why would someone make a claim if it isn't true?",
              "What am I missing in this investigation?",
              "Could there be an innocent alternative explanation?",
              "Why isn't someone's motive proof of guilt?",
              "I think this person is innocent / guilty.",
            ].map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectPreset(preset)}
                className="p-3 rounded-xl bg-slate-900/90 hover:bg-amber-500/20 text-slate-300 hover:text-amber-100 border border-amber-500/20 hover:border-amber-400/40 text-xs text-left font-medium transition-all cursor-pointer flex items-center justify-between gap-2"
              >
                <span>{preset}</span>
                <MessageSquare className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              </button>
            ))}
          </div>
        </div>

        {/* Custom Question Input */}
        <form onSubmit={handleCustomSubmit} className="flex gap-2 pt-2 border-t border-amber-500/20">
          <input
            type="text"
            value={customQuery}
            onChange={(e) => setCustomQuery(e.target.value)}
            placeholder="Ask Vikarna a specific question about truth or evidence..."
            className="flex-1 bg-slate-900 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-100 placeholder-slate-500 border border-slate-700 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
          />
          <button
            type="submit"
            disabled={!customQuery.trim()}
            className={`px-5 py-3 rounded-xl font-heading font-bold text-xs sm:text-sm tracking-wider transition-all flex items-center gap-1.5 ${
              customQuery.trim()
                ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 cursor-pointer shadow-md'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            <span>Ask</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
