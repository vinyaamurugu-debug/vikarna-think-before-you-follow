import React, { useState } from 'react';
import { Search, Sparkles, MessageSquare, ArrowRight } from 'lucide-react';
import { VikarnaAvatar } from './VikarnaAvatar';

interface SituationInputProps {
  situation: string;
  setSituation: (val: string) => void;
  onInvestigate: () => void;
}

const PRESET_EXAMPLES = [
  {
    id: 'cheating-claim',
    title: 'Cheating Allegation',
    badge: 'Academic Integrity',
    text: "Everyone says my teammate cheated in our project.",
  },
  {
    id: 'exam-cancellation',
    title: 'Exam Cancellation Rumor',
    badge: 'Campus Announcement',
    text: "Someone says the exam is cancelled tomorrow.",
  },
  {
    id: 'stolen-phone',
    title: 'Stolen Property Claim',
    badge: 'Theft vs. Misplacement',
    text: "My friend says another student stole a phone.",
  },
  {
    id: 'online-post',
    title: 'Viral Online Claim',
    badge: 'Digital Media',
    text: "I saw a post online saying something happened.",
  },
  {
    id: 'team-contribution',
    title: 'Group Contribution Dispute',
    badge: 'Teamwork',
    text: "Everyone thinks my teammate didn't contribute.",
  },
  {
    id: 'missing-pen-typo',
    title: 'Missing Item (Typo Test)',
    badge: 'Typo Resilience',
    text: "missng of pen",
  },
];

export const SituationInput: React.FC<SituationInputProps> = ({
  situation,
  setSituation,
  onInvestigate,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [errorShake, setErrorShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!situation.trim()) {
      setErrorShake(true);
      setTimeout(() => setErrorShake(false), 600);
      return;
    }
    onInvestigate();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const selectPreset = (text: string) => {
    setSituation(text);
  };

  return (
    <section className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Subtle Ancient Decorative Mandala Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Hero Header */}
      <div className="text-center space-y-4 sm:space-y-5">
        {/* Graphic Representation of Vikarna */}
        <div className="mb-2">
          <VikarnaAvatar size="md" showQuote={true} />
        </div>

        {/* 1. Large Title */}
        <div className="space-y-1">
          <h1 className="font-heading font-black text-4xl sm:text-6xl md:text-7xl tracking-wider text-gold-gradient drop-shadow-md">
            VIKARNA
          </h1>

          {/* 2. Subtitle */}
          <p className="font-heading font-bold text-sm sm:text-lg md:text-xl tracking-[0.25em] text-saffron-gradient uppercase">
            THINK BEFORE YOU FOLLOW
          </p>
        </div>

        {/* 3. Short Description */}
        <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
          "Question assumptions. Discover evidence. Make informed decisions."
        </p>
      </div>

      {/* Main Interactive Form Card */}
      <div className="mt-8 sm:mt-10">
        <form onSubmit={handleSubmit} className="relative">
          {/* Royal Frame Card */}
          <div
            className={`relative rounded-2xl parchment-card transition-all duration-300 ${
              isFocused ? 'royal-border-active ring-2 ring-amber-400/20' : 'royal-border'
            } ${errorShake ? 'animate-bounce' : ''} p-4 sm:p-7 shadow-2xl`}
          >
            {/* Ornate corner ornaments */}
            <div className="ornate-corner-tl" />
            <div className="ornate-corner-tr" />
            <div className="ornate-corner-bl" />
            <div className="ornate-corner-br" />

            <div className="space-y-3">
              {/* Header inside the box */}
              <div className="flex items-center justify-between text-xs text-amber-300/80 font-medium pb-1 border-b border-amber-500/10">
                <span className="flex items-center gap-1.5 font-heading tracking-wide uppercase">
                  <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                  Your Investigation Case
                </span>
                <span className="text-[11px] text-slate-400">
                  {situation.length} characters
                </span>
              </div>

              {/* 4. Large Input Box */}
              <div className="relative">
                <textarea
                  id="situation-input"
                  rows={4}
                  value={situation}
                  onChange={(e) => setSituation(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  onKeyDown={handleKeyDown}
                  placeholder="Describe a situation you're unsure about..."
                  className="w-full bg-slate-900/80 rounded-xl p-4 text-slate-100 placeholder-slate-500 border border-slate-700/60 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 text-base sm:text-lg resize-none leading-relaxed transition-all shadow-inner"
                />
              </div>

              {/* 5. Supporting Example Text */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 text-xs">
                <p className="text-slate-400 italic flex items-center gap-1.5">
                  <span className="text-amber-400/90 font-semibold not-italic">Example:</span>
                  "Everyone says my teammate didn't contribute to our project."
                </p>
                <span className="text-slate-500 hidden sm:flex items-center gap-1 text-[11px]">
                  <span>Press</span>
                  <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-[10px] text-slate-300">
                    Ctrl + Enter
                  </kbd>
                  <span>to start</span>
                </span>
              </div>

              {/* 6. Prominent Button */}
              <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Ready to analyze truth and evidence</span>
                </div>

                <button
                  type="submit"
                  id="investigate-btn"
                  disabled={!situation.trim()}
                  className={`w-full sm:w-auto min-w-[220px] px-8 py-3.5 rounded-xl font-heading font-bold text-base sm:text-lg tracking-wider transition-all duration-200 shadow-xl flex items-center justify-center gap-2.5 ${
                    situation.trim()
                      ? 'bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 text-slate-950 hover:brightness-110 hover:shadow-amber-500/30 hover:scale-[1.02] active:scale-[0.98] cursor-pointer'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
                  }`}
                >
                  <Search className="w-5 h-5 text-current stroke-[2.5]" />
                  <span>INVESTIGATE</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* Quick Example Presets / Case Starters */}
        <div className="mt-6 space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400/80">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Or test with a sample case:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {PRESET_EXAMPLES.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => selectPreset(preset.text)}
                className="group text-left p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-amber-500/15 hover:border-amber-400/40 transition-all duration-200 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-semibold text-xs text-amber-200 group-hover:text-amber-300">
                    {preset.title}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300">
                    {preset.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-400 group-hover:text-slate-200 line-clamp-2 transition-colors">
                  "{preset.text}"
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
