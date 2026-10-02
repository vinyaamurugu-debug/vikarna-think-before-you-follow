import React from 'react';
import { Compass, Sparkles } from 'lucide-react';

interface VikarnaGuideProps {
  customMessage?: string;
  principle?: string;
}

export const VikarnaGuide: React.FC<VikarnaGuideProps> = ({
  customMessage = "Before we decide what happened, let's find out what we actually know.",
  principle,
}) => {
  return (
    <div className="relative rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-950 border border-amber-500/30 p-4 sm:p-5 shadow-xl flex flex-col sm:flex-row items-start sm:items-center gap-4">
      {/* Avatar Icon */}
      <div className="shrink-0 flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 p-0.5 shadow-md flex items-center justify-center">
          <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
            <Compass className="w-6 h-6 text-amber-400" />
          </div>
        </div>
        <div className="sm:hidden">
          <span className="text-xs font-heading font-bold text-gold-gradient uppercase tracking-wider">
            Vikarna Guide
          </span>
        </div>
      </div>

      {/* Guide Dialogue Speech Bubble */}
      <div className="space-y-1 flex-1">
        <div className="hidden sm:flex items-center gap-2 text-[11px] font-bold text-amber-400 uppercase tracking-wider">
          <Sparkles className="w-3 h-3" />
          <span>Vikarna's Guidance</span>
        </div>
        <p className="text-xs sm:text-sm text-amber-100 font-medium italic leading-relaxed">
          "{customMessage}"
        </p>
        {principle && (
          <p className="text-[11px] text-amber-400/80 font-mono pt-0.5">
            Key Rule: {principle}
          </p>
        )}
      </div>
    </div>
  );
};
