import React, { useState } from 'react';
import { Scale, Lightbulb, ArrowRight, CheckCircle2, XCircle, HelpCircle, MinusCircle } from 'lucide-react';
import { 
  FinalVerdictOption, 
  FinalVerdictType, 
  PossibleExplanation, 
  DiscoveredClue 
} from '../../types';

interface DecisionCardProps {
  verdictOptions: FinalVerdictOption[];
  explanations: PossibleExplanation[];
  clues: DiscoveredClue[];
  extractedClaim: string;
  onSelectVerdict: (verdict: FinalVerdictType, explanation: PossibleExplanation) => void;
  onReturnToInvestigation: () => void;
}

export const DecisionCard: React.FC<DecisionCardProps> = ({
  verdictOptions,
  explanations,
  clues,
  extractedClaim,
  onSelectVerdict,
  onReturnToInvestigation,
}) => {
  const [selectedVerdictId, setSelectedVerdictId] = useState<FinalVerdictType | null>(null);

  const supportsCount = clues.filter((c) => c.evidenceState === 'SUPPORTS THE CLAIM').length;
  const contradictsCount = clues.filter((c) => c.evidenceState === 'CONTRADICTS THE CLAIM').length;
  const neutralCount = clues.filter((c) => c.evidenceState === 'NEUTRAL').length;
  const uncertainCount = clues.filter((c) => c.evidenceState === 'UNCERTAIN').length;

  const getVerdictIcon = (id: FinalVerdictType) => {
    switch (id) {
      case 'supported':
        return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
      case 'contradicted':
        return <XCircle className="w-5 h-5 text-rose-400" />;
      case 'unsupported':
        return <MinusCircle className="w-5 h-5 text-amber-400" />;
      case 'uncertain':
      default:
        return <HelpCircle className="w-5 h-5 text-sky-400" />;
    }
  };

  const handleConfirmDecision = (explanation: PossibleExplanation) => {
    if (!selectedVerdictId) return;
    onSelectVerdict(selectedVerdictId, explanation);
  };

  return (
    <div className="relative rounded-3xl parchment-card border-2 border-amber-500/40 p-5 sm:p-10 shadow-2xl space-y-8 animate-fadeIn">
      <div className="ornate-corner-tl" />
      <div className="ornate-corner-tr" />
      <div className="ornate-corner-bl" />
      <div className="ornate-corner-br" />

      {/* Main Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
          <Scale className="w-3.5 h-3.5 text-amber-400" />
          <span>Final Evidence Evaluation</span>
        </div>

        <h2 className="font-heading font-black text-2xl sm:text-4xl text-gold-gradient">
          WEIGH THE EVIDENCE & DECIDE
        </h2>

        <p className="text-sm text-slate-300 leading-relaxed">
          You examined the claim: <span className="text-amber-200 font-medium italic">"{extractedClaim}"</span>.
          Based on the <span className="text-amber-300 font-bold">{clues.length} clues</span> collected, what is the most reasoned conclusion?
        </p>
      </div>

      {/* Evidence Balance Summary Meter */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/90 border border-amber-500/20 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span>Evidence Ledger Summary:</span>
          </div>
          <div className="flex items-center gap-2 font-mono">
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              🟢 {supportsCount} Supports
            </span>
            <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20">
              🔴 {contradictsCount} Contradicts
            </span>
            <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-500/20">
              ⚪ {neutralCount} Neutral
            </span>
            <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
              🟡 {uncertainCount} Uncertain
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {clues.map((c, i) => (
            <div key={i} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1 text-xs">
              <div className="flex items-center justify-between text-[10px] font-mono text-amber-400">
                <span>CLUE #{i + 1}</span>
                <span className="truncate max-w-[100px]">{c.evidenceState.replace(' THE CLAIM', '')}</span>
              </div>
              <h5 className="font-semibold text-slate-200 line-clamp-1">{c.title}</h5>
              <p className="text-[11px] text-slate-400 line-clamp-2">{c.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* STEP 1: Select One of the 4 Standard Conclusions */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-heading font-bold text-sm sm:text-base text-amber-200 uppercase tracking-wide">
            Step 1: Choose Your Evidence-Based Conclusion
          </h3>
          <span className="text-xs text-slate-400 italic">
            Select the verdict best supported by facts
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {verdictOptions.map((opt) => {
            const isSelected = selectedVerdictId === opt.id;

            return (
              <button
                key={opt.id}
                onClick={() => setSelectedVerdictId(opt.id)}
                className={`p-4 sm:p-5 rounded-2xl border text-left transition-all duration-200 flex items-start gap-3.5 cursor-pointer ${
                  isSelected
                    ? 'bg-amber-950/80 border-amber-400 ring-2 ring-amber-400/40 shadow-xl'
                    : 'bg-slate-900/80 hover:bg-slate-800/90 border-slate-700/80 hover:border-amber-500/40'
                }`}
              >
                <div className="p-2 rounded-xl bg-slate-800 border border-slate-700 shrink-0 mt-0.5">
                  {getVerdictIcon(opt.id)}
                </div>

                <div className="space-y-1 flex-1">
                  <h4 className="font-heading font-bold text-sm sm:text-base text-slate-100">
                    {opt.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {opt.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP 2: Choose Detailed Scenario Explanation */}
      {selectedVerdictId && (
        <div className="space-y-4 pt-4 border-t border-amber-500/20 animate-fadeIn">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-sm sm:text-base text-amber-200 uppercase tracking-wide">
              Step 2: Select the Specific Explanation of Events
            </h3>
            <span className="text-xs text-emerald-400 font-mono">
              ✓ Step 1 Verdict Selected
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3.5">
            {explanations.map((exp, idx) => {
              const letter = String.fromCharCode(65 + idx);

              return (
                <button
                  key={exp.id}
                  onClick={() => handleConfirmDecision(exp)}
                  className="group text-left p-5 rounded-2xl bg-slate-900/90 hover:bg-slate-800/95 border border-amber-500/25 hover:border-amber-400 hover:shadow-xl transition-all duration-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-xl bg-slate-800 text-amber-300 group-hover:bg-amber-400 group-hover:text-slate-950 flex items-center justify-center font-heading font-bold text-xs shrink-0 transition-colors border border-slate-700">
                      {letter}
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-heading font-bold text-sm sm:text-base text-slate-100 group-hover:text-amber-300 transition-colors">
                        {exp.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {exp.explanation}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 text-slate-950 text-xs font-heading font-bold transition-all flex items-center justify-center gap-1.5 shadow-md">
                    <span>Confirm Final Verdict</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Return to explore more leads */}
      <div className="pt-2 flex justify-start">
        <button
          type="button"
          onClick={onReturnToInvestigation}
          className="text-xs text-slate-400 hover:text-amber-300 transition-colors cursor-pointer flex items-center gap-1"
        >
          <span>← Return to investigate more angles</span>
        </button>
      </div>
    </div>
  );
};
