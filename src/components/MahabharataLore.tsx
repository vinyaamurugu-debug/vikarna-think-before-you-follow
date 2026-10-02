import React from 'react';
import { BookOpen, Compass } from 'lucide-react';

export const MahabharataLore: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t border-amber-500/15">
      <div className="relative rounded-3xl parchment-card border border-amber-500/30 overflow-hidden shadow-2xl p-6 sm:p-10">
        {/* Background Aura */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Ornate corner accents */}
        <div className="ornate-corner-tl" />
        <div className="ornate-corner-tr" />
        <div className="ornate-corner-bl" />
        <div className="ornate-corner-br" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column / Lore Narrative */}
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/25 text-orange-300 text-xs font-semibold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5 text-orange-400" />
              Mahabharata Inspiration
            </div>

            <h3 className="font-heading font-bold text-2xl sm:text-3xl text-gold-gradient">
              Who Was Vikarna?
            </h3>

            <div className="space-y-3 text-slate-300 text-sm sm:text-base leading-relaxed">
              <p>
                In the epic <strong className="text-amber-200 font-semibold">Mahabharata</strong>, when the royal assembly sat in silence during an unjust moment, one young Kaurava prince chose reason over loyalty to the crowd.
              </p>
              <p className="border-l-2 border-amber-500/50 pl-4 italic text-amber-200/90 bg-amber-500/5 py-1 rounded-r">
                "Vikarna stood up not out of hatred, but out of a commitment to Dharma and truth. He asked the difficult questions that no one else was willing to voice."
              </p>
              <p className="text-slate-400 text-xs sm:text-sm">
                This game embodies that timeless spirit: teaching students, thinkers, and everyday decision-makers to pause, evaluate evidence, and think critically instead of blindly echoing the majority.
              </p>
            </div>
          </div>

          {/* Right Column / Core Philosophy Card */}
          <div className="lg:col-span-4 rounded-2xl bg-gradient-to-b from-amber-950/40 via-slate-900/80 to-slate-950 p-5 border border-amber-500/30 text-center space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center">
              <Compass className="w-6 h-6 text-amber-300" />
            </div>

            <div className="space-y-1">
              <h4 className="font-heading font-bold text-base text-amber-200">
                The Vikarna Principle
              </h4>
              <p className="text-xs text-slate-400">
                Independent inquiry rooted in verifiable truth.
              </p>
            </div>

            <div className="pt-2 border-t border-amber-500/20 text-left space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                <span>Pause emotional reaction</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                <span>Examine opposing viewpoints</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                <span>Base conclusions on proof</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
