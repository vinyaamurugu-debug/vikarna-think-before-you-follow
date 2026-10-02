import React from 'react';
import { X, BookOpen, Compass, CheckCircle2 } from 'lucide-react';
import { VikarnaAvatar } from './VikarnaAvatar';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  tab: 'lore' | 'how-it-works';
  setTab: (t: 'lore' | 'how-it-works') => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({
  isOpen,
  onClose,
  tab,
  setTab,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-3xl parchment-card border-2 border-amber-500/40 p-6 sm:p-8 shadow-2xl">
        {/* Ornate corners */}
        <div className="ornate-corner-tl" />
        <div className="ornate-corner-tr" />
        <div className="ornate-corner-bl" />
        <div className="ornate-corner-br" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-amber-200 transition-colors border border-slate-700"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-amber-500/20">
          <button
            onClick={() => setTab('lore')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-heading font-bold transition-all ${
              tab === 'lore'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md'
                : 'bg-slate-900/60 text-slate-400 hover:text-amber-300'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Story of Vikarna</span>
          </button>

          <button
            onClick={() => setTab('how-it-works')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-heading font-bold transition-all ${
              tab === 'how-it-works'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md'
                : 'bg-slate-900/60 text-slate-400 hover:text-amber-300'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Philosophy & Rules</span>
          </button>
        </div>

        {/* Tab 1: Story of Vikarna */}
        {tab === 'lore' && (
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <VikarnaAvatar size="sm" showQuote={false} />
              <div>
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-gold-gradient">
                  Prince Vikarna
                </h3>
                <p className="text-xs text-amber-300/80 font-semibold">
                  The Prince Who Dared to Ask
                </p>
              </div>
            </div>

            <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
              <p>
                In the royal court of Hastinapura during the epic <strong className="text-amber-300">Mahabharata</strong>, an immense moral crisis took place. Renowned elders, kings, and warriors stayed silent out of fear, tradition, or peer pressure.
              </p>
              <p>
                Only one young prince—<strong>Vikarna</strong>—rose from his seat to question the legality and morality of what was happening. He didn't speak with violence or arrogance; he spoke with logic, law, and moral courage.
              </p>
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200/90 text-xs italic">
                "Dharma is not defined by how many people agree with a wrong action. Truth remains truth, even if only one person speaks it."
              </div>
              <p className="text-slate-400 text-xs">
                This game honors Vikarna's memory by training everyday thinkers to question rumors, test claims, and verify proof before following the herd.
              </p>
            </div>
          </div>
        )}

        {/* Tab 2: How it works & Philosophy */}
        {tab === 'how-it-works' && (
          <div className="space-y-5">
            <div className="space-y-1">
              <h3 className="font-heading font-bold text-xl text-gold-gradient">
                The Golden Rule of Vikarna
              </h3>
              <p className="text-xs text-amber-300/80">
                Critical Thinking vs. Blind Disagreement
              </p>
            </div>

            <div className="space-y-3 text-sm text-slate-300 leading-relaxed">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700 space-y-2">
                <div className="flex items-start gap-2.5 text-xs text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
                  <span><strong>What this game IS:</strong> A structured framework to check assumptions, evaluate evidence, and make fair, informed choices.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-rose-300 pt-2 border-t border-slate-800">
                  <span className="font-bold shrink-0 mt-0.5 text-rose-400">✕</span>
                  <span><strong>What this game is NOT:</strong> An encouragement to rebel or disagree with everyone just for the sake of arguing.</span>
                </div>
              </div>

              <h4 className="font-heading font-semibold text-sm text-amber-200 pt-2">
                The 4 Core Disciplines:
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span><strong>Question:</strong> Pause initial emotions and identify the specific assertion.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span><strong>Investigate:</strong> Frame objective questions to uncover missing information.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span><strong>Find Evidence:</strong> Seek verifiable facts, primary sources, and cross-checks.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span><strong>Decide:</strong> Form a balanced, dharmic conclusion with confidence.</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Footer Button */}
        <div className="mt-6 pt-4 border-t border-amber-500/20 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/30 text-xs font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
