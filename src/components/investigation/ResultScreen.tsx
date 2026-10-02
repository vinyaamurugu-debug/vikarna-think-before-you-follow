import React from 'react';
import { 
  GeneratedCase, 
  DiscoveredClue, 
  PossibleExplanation, 
  PlayerScoreBreakdown,
  FinalVerdictType 
} from '../../types';
import { 
  Award as AwardIcon, 
  Sparkles as SparklesIcon, 
  CheckCircle2 as CheckIcon, 
  XCircle as XIcon, 
  Scroll as ScrollIcon, 
  RefreshCw as RefreshIcon, 
  ArrowLeft as ArrowLeftIcon, 
  Star as StarIcon, 
  Compass as CompassIcon, 
  Lightbulb as LightbulbIcon,
  Scale as ScaleIcon
} from 'lucide-react';
import { VikarnaAvatar } from '../VikarnaAvatar';

interface ResultScreenProps {
  caseData: GeneratedCase;
  clues: DiscoveredClue[];
  chosenVerdict: FinalVerdictType | null;
  chosenExplanation: PossibleExplanation;
  scoreBreakdown: PlayerScoreBreakdown;
  onEditSituation: () => void;
  onReset: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  caseData,
  clues,
  chosenVerdict,
  chosenExplanation,
  scoreBreakdown,
  onEditSituation,
  onReset,
}) => {
  const getVerdictLabel = (verdict: FinalVerdictType | null) => {
    switch (verdict) {
      case 'supported':
        return 'The claim is supported by the evidence.';
      case 'contradicted':
        return 'The claim is contradicted by the evidence.';
      case 'unsupported':
        return 'The claim is not sufficiently supported.';
      case 'uncertain':
        return 'There is not enough information to decide.';
      default:
        return chosenExplanation.title;
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      {/* Main Parchment Dossier */}
      <div className="relative rounded-3xl parchment-card border-2 border-amber-400 p-6 sm:p-10 shadow-2xl space-y-8">
        <div className="ornate-corner-tl" />
        <div className="ornate-corner-tr" />
        <div className="ornate-corner-bl" />
        <div className="ornate-corner-br" />

        {/* 1. Header: CASE RESOLUTION & MYSTERY COMPLETE */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-amber-500 via-amber-400 to-orange-600 p-0.5 shadow-xl flex items-center justify-center animate-bounce-subtle">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <AwardIcon className="w-8 h-8 text-amber-400" />
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-mono font-bold tracking-widest text-amber-400 uppercase">
              REASONING DOSSIER & VERDICT
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-5xl text-gold-gradient tracking-wide">
              INVESTIGATION COMPLETE
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto italic">
              Case: "{caseData.caseTitle}"
            </p>
          </div>
        </div>

        {/* 2. CURIOSITY STARS & REASONING QUALITY RUBRIC */}
        <div className="p-6 sm:p-7 rounded-2xl bg-slate-950/90 border border-amber-500/30 shadow-inner space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-amber-500/20">
            {/* Stars Display */}
            <div className="space-y-1.5">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <SparklesIcon className="w-4 h-4 text-amber-400" />
                Curiosity Stars (Reasoning Quality)
              </span>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((starNum) => (
                  <StarIcon
                    key={starNum}
                    className={`w-7 h-7 ${
                      starNum <= scoreBreakdown.starsEarned
                        ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]'
                        : 'text-slate-700'
                    } transition-all`}
                  />
                ))}
                <span className="ml-2 font-heading font-black text-2xl text-amber-300">
                  {scoreBreakdown.starsEarned}/5 Stars
                </span>
              </div>
            </div>

            {/* Score Percentage */}
            <div className="sm:text-right">
              <div className="text-[11px] font-mono text-slate-400 uppercase">
                Reasoning Rigor
              </div>
              <div className="font-heading font-black text-3xl sm:text-4xl text-gold-gradient">
                {scoreBreakdown.percentage}%
              </div>
              <span className="inline-block text-[11px] px-2.5 py-0.5 rounded-full font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                ✓ Evaluated by Evidence Standards
              </span>
            </div>
          </div>

          {/* Reasoning Behavior Checklist */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-amber-300 uppercase tracking-wider">
              Reasoning Discipline Rubric:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {scoreBreakdown.items.map((item) => (
                <div
                  key={item.id}
                  className={`p-3 rounded-xl border flex items-start justify-between gap-3 ${
                    item.earned
                      ? 'bg-amber-950/30 border-amber-500/30'
                      : 'bg-slate-900/40 border-slate-800 opacity-60'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      {item.earned ? (
                        <CheckIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : (
                        <XIcon className="w-4 h-4 text-slate-500 shrink-0" />
                      )}
                      <span className="text-xs font-semibold text-slate-200">
                        {item.label}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 pl-6">
                      {item.description}
                    </p>
                  </div>
                  <span className={`font-mono text-xs font-bold shrink-0 ${
                    item.earned ? 'text-amber-400' : 'text-slate-500'
                  }`}>
                    {item.earned ? '+1' : '+0'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. YOUR FINAL VERDICT & WHY IT IS SUPPORTED */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/80 border border-amber-500/30 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-amber-400">
            <span className="flex items-center gap-1.5">
              <ScaleIcon className="w-4 h-4 text-amber-400" />
              <span>Your Final Verdict & Assessment</span>
            </span>
            <span className="font-mono text-emerald-400">
              Evidence Grounded
            </span>
          </div>

          <h4 className="font-heading font-black text-lg sm:text-2xl text-slate-100">
            {getVerdictLabel(chosenVerdict)}
          </h4>

          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
            <span className="text-xs font-semibold text-amber-300">
              Scenario Explanation: "{chosenExplanation.title}"
            </span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {chosenExplanation.explanation}
            </p>
          </div>

          <div className="pt-2 border-t border-slate-800 text-xs text-amber-300/90 flex items-start gap-2">
            <span className="font-bold shrink-0">Why this verdict fits:</span>
            <span>{chosenExplanation.evidenceAlignmentReasoning}</span>
          </div>
        </div>

        {/* 4. COMPREHENSIVE DOSSIER: WHAT YOU CONSIDERED & WHAT EVIDENCE YOU FOUND */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* WHAT EVIDENCE YOU FOUND */}
          <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
            <h4 className="font-heading font-bold text-xs sm:text-sm text-amber-300 flex items-center gap-1.5 uppercase tracking-wider">
              <ScrollIcon className="w-4 h-4 text-amber-400" />
              <span>What Evidence You Found ({clues.length} Clues)</span>
            </h4>
            <div className="space-y-2 text-xs">
              {clues.map((clue, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-amber-400 font-bold">CLUE #{idx + 1}</span>
                    <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                      {clue.evidenceState.replace(' THE CLAIM', '')}
                    </span>
                  </div>
                  <h5 className="font-semibold text-slate-200">{clue.title}</h5>
                  <p className="text-[11px] text-slate-400 line-clamp-2">{clue.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* WHICH ALTERNATIVE EXPLANATIONS YOU CONSIDERED */}
          <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
            <h4 className="font-heading font-bold text-xs sm:text-sm text-amber-300 flex items-center gap-1.5 uppercase tracking-wider">
              <LightbulbIcon className="w-4 h-4 text-amber-400" />
              <span>Alternative Explanations Considered</span>
            </h4>
            <div className="space-y-2 text-xs text-slate-300">
              {caseData.alternativeTheories.map((theory, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-start gap-2">
                  <span className="text-amber-400 font-bold shrink-0 font-mono">{idx + 1}.</span>
                  <span className="leading-snug">{theory}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 italic">
              ✓ Good investigators always explore alternative possibilities before forming a verdict.
            </div>
          </div>
        </div>

        {/* 5. VIKARNA CORE PHILOSOPHY & CONCLUDING MESSAGE */}
        <div className="relative rounded-2xl bg-gradient-to-r from-amber-950/90 via-slate-900 to-amber-950/90 p-6 sm:p-7 border-2 border-amber-400/60 flex flex-col sm:flex-row items-center gap-6 shadow-2xl">
          <div className="shrink-0">
            <VikarnaAvatar size="sm" showQuote={false} />
          </div>

          <div className="space-y-2 text-center sm:text-left flex-1">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
              <CompassIcon className="w-4 h-4" />
              <span>Vikarna's Core Philosophy</span>
            </div>

            <h4 className="font-heading font-bold text-lg sm:text-xl text-gold-gradient">
              "Don't accept or reject a claim without examining the evidence."
            </h4>

            <p className="text-xs sm:text-sm text-slate-200 italic leading-relaxed">
              "{caseData.vikarnaWisdom.message}"
            </p>

            <div className="pt-2.5 border-t border-amber-500/30 text-xs text-amber-300/95 font-medium leading-relaxed">
              <span className="text-amber-400 font-bold">The Cardinal Rule: </span>
              VIKARNA does NOT teach to always disagree. It teaches never to follow blindly. Whether a claim is TRUE, FALSE, or UNCERTAIN, let facts alone determine the verdict.
            </div>
          </div>
        </div>

        {/* 6. RESTART & EXPLORE ACTIONS */}
        <div className="pt-4 border-t border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={onEditSituation}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-amber-200 text-xs sm:text-sm font-semibold border border-slate-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            <span>Edit This Case</span>
          </button>

          <button
            onClick={onReset}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 text-slate-950 font-heading font-bold text-sm sm:text-base tracking-wide hover:brightness-110 shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2.5 cursor-pointer transition-transform hover:scale-[1.02]"
          >
            <RefreshIcon className="w-4 h-4" />
            <span>Investigate Another Situation</span>
          </button>
        </div>
      </div>
    </div>
  );
};
