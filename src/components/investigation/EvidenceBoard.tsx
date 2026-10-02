import React from 'react';
import { Scroll, CheckCircle2, XCircle, MinusCircle, HelpCircle } from 'lucide-react';
import { DiscoveredClue, EvidenceState } from '../../types';

interface EvidenceBoardProps {
  clues: DiscoveredClue[];
  totalLeads: number;
}

export const EvidenceBoard: React.FC<EvidenceBoardProps> = ({
  clues,
  totalLeads,
}) => {
  const supportsCount = clues.filter((c) => c.evidenceState === 'SUPPORTS THE CLAIM').length;
  const contradictsCount = clues.filter((c) => c.evidenceState === 'CONTRADICTS THE CLAIM').length;
  const neutralCount = clues.filter((c) => c.evidenceState === 'NEUTRAL').length;
  const uncertainCount = clues.filter((c) => c.evidenceState === 'UNCERTAIN').length;

  const getEvidenceStateBadge = (state: EvidenceState) => {
    switch (state) {
      case 'SUPPORTS THE CLAIM':
        return {
          label: 'SUPPORTS',
          icon: <CheckCircle2 className="w-3 h-3 text-emerald-400" />,
          color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
        };
      case 'CONTRADICTS THE CLAIM':
        return {
          label: 'CONTRADICTS',
          icon: <XCircle className="w-3 h-3 text-rose-400" />,
          color: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
        };
      case 'NEUTRAL':
        return {
          label: 'NEUTRAL',
          icon: <MinusCircle className="w-3 h-3 text-sky-400" />,
          color: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
        };
      case 'UNCERTAIN':
      default:
        return {
          label: 'UNCERTAIN',
          icon: <HelpCircle className="w-3 h-3 text-amber-400" />,
          color: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
        };
    }
  };

  if (clues.length === 0) {
    return (
      <div className="rounded-2xl parchment-card border border-amber-500/20 p-5 text-center space-y-2">
        <div className="flex items-center justify-center gap-2 text-xs font-heading font-bold text-amber-400 uppercase tracking-wider">
          <Scroll className="w-4 h-4" />
          <span>Evidence Board (0/{totalLeads} Discovered)</span>
        </div>
        <p className="text-xs text-slate-400 italic">
          Investigate the angles above to uncover physical clues and pin them to your permanent Evidence Board.
        </p>
      </div>
    );
  }

  return (
    <div className="relative rounded-2xl parchment-card border border-amber-500/30 p-5 space-y-4 shadow-xl">
      <div className="ornate-corner-tl" />
      <div className="ornate-corner-tr" />
      
      {/* Evidence Board Header & Live Balance Meter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-amber-500/15">
        <div className="flex items-center gap-2">
          <Scroll className="w-4 h-4 text-amber-400" />
          <h3 className="text-xs sm:text-sm font-heading font-bold text-amber-300 uppercase tracking-wider">
            Evidence Board • Collected Clues ({clues.length}/{totalLeads})
          </h3>
        </div>

        {/* Live Balance Meter */}
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
          <span className="text-slate-400 font-sans text-xs mr-1">Evidence Balance:</span>
          {supportsCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
              <span>🟢 {supportsCount} Supports</span>
            </span>
          )}
          {contradictsCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/30 flex items-center gap-1">
              <span>🔴 {contradictsCount} Contradicts</span>
            </span>
          )}
          {neutralCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-sky-500/15 text-sky-300 border border-sky-500/30 flex items-center gap-1">
              <span>⚪ {neutralCount} Neutral</span>
            </span>
          )}
          {uncertainCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-1">
              <span>🟡 {uncertainCount} Uncertain</span>
            </span>
          )}
        </div>
      </div>

      {/* Grid of Collected Clues */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {clues.map((clue, idx) => {
          const badge = getEvidenceStateBadge(clue.evidenceState);

          return (
            <div
              key={clue.id || idx}
              className="p-3.5 bg-slate-950/80 rounded-xl border border-amber-500/25 space-y-2.5 hover:border-amber-400/50 transition-colors flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-amber-400 font-bold">CLUE #{idx + 1}</span>
                  <span className={`px-2 py-0.5 rounded-full border flex items-center gap-1 ${badge.color}`}>
                    {badge.icon}
                    <span>{badge.label}</span>
                  </span>
                </div>

                <div>
                  <h4 className="font-heading font-bold text-xs text-slate-100 line-clamp-1">
                    {clue.title}
                  </h4>
                  <span className="text-[10px] text-amber-300/80 font-mono">
                    Category: {clue.category}
                  </span>
                </div>

                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                  "{clue.text}"
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800 text-[10px] text-amber-400/80 font-mono flex items-center justify-between">
                <span>Angle: {clue.angleLabel || 'Inquiry'}</span>
                <span>✓ Verified</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
