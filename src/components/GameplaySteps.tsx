import React from 'react';
import { 
  HelpCircle, 
  Search, 
  FileCheck2, 
  Scale, 
  Eye, 
  Lightbulb, 
  ShieldCheck
} from 'lucide-react';

const MAIN_STEPS = [
  {
    step: '1',
    title: 'Question',
    icon: HelpCircle,
    color: 'from-amber-500 to-yellow-500',
    description: 'Pause and identify what claim is actually being made. Notice underlying assumptions.',
  },
  {
    step: '2',
    title: 'Investigate',
    icon: Search,
    color: 'from-orange-500 to-amber-500',
    description: 'Ask precise inquiry questions. Seek missing context beyond popular opinions.',
  },
  {
    step: '3',
    title: 'Find Evidence',
    icon: FileCheck2,
    color: 'from-blue-500 to-indigo-500',
    description: 'Gather factual clues, verify sources, and evaluate alternative explanations.',
  },
  {
    step: '4',
    title: 'Decide',
    icon: Scale,
    color: 'from-emerald-500 to-teal-500',
    description: 'Form a reasoned, grounded conclusion based on proof rather than herd momentum.',
  },
];

const SEVEN_STAGES = [
  {
    number: '01',
    title: 'Identify the Claim',
    tagline: 'Separate emotion from statement',
    icon: Eye,
  },
  {
    number: '02',
    title: 'Question the Assumption',
    tagline: 'What is being taken for granted?',
    icon: HelpCircle,
  },
  {
    number: '03',
    title: 'Generate Questions',
    tagline: 'What key facts are missing?',
    icon: Lightbulb,
  },
  {
    number: '04',
    title: 'Collect Clues & Evidence',
    tagline: 'Gather verifiable observations',
    icon: FileCheck2,
  },
  {
    number: '05',
    title: 'Alternative Explanations',
    tagline: 'Could something else have happened?',
    icon: Search,
  },
  {
    number: '06',
    title: 'Make a Decision',
    tagline: 'Weigh all discovered facts',
    icon: Scale,
  },
  {
    number: '07',
    title: 'Reasoned Verdict',
    tagline: 'Confidence backed by evidence',
    icon: ShieldCheck,
  },
];

export const GameplaySteps: React.FC = () => {
  return (
    <section id="how-it-works" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-amber-500/15">
      {/* Section Header */}
      <div className="text-center space-y-3 mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-widest">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
          The Path of Inquiry
        </div>
        
        {/* Core Gameplay Badge / Flow */}
        <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-slate-100">
          How Investigation Works
        </h2>
        
        {/* 9. Small Section Explaining Gameplay Flow */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-2 text-sm sm:text-base font-heading font-semibold text-amber-300">
          <span className="px-3 py-1 bg-amber-950/60 border border-amber-500/30 rounded-lg">Question</span>
          <span className="text-amber-500">→</span>
          <span className="px-3 py-1 bg-amber-950/60 border border-amber-500/30 rounded-lg">Investigate</span>
          <span className="text-amber-500">→</span>
          <span className="px-3 py-1 bg-amber-950/60 border border-amber-500/30 rounded-lg">Find Evidence</span>
          <span className="text-amber-500">→</span>
          <span className="px-3 py-1 bg-amber-950/60 border border-amber-500/30 rounded-lg">Decide</span>
        </div>

        <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto pt-1">
          Vikarna doesn't teach you to always disagree with others — it teaches you to check the evidence before deciding.
        </p>
      </div>

      {/* 4 Main Core Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
        {MAIN_STEPS.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.step}
              className="relative rounded-2xl parchment-card border border-amber-500/20 hover:border-amber-400/50 p-6 transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/10"
            >
              {/* Step Number Stamp */}
              <div className="absolute top-4 right-4 font-heading font-black text-2xl text-slate-800 group-hover:text-amber-500/20 transition-colors">
                0{step.step}
              </div>

              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} p-0.5 mb-4 shadow-md`}>
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Icon className="w-6 h-6 text-amber-300 group-hover:scale-110 transition-transform" />
                </div>
              </div>

              {/* Step Title & Description */}
              <h3 className="font-heading font-bold text-lg text-slate-100 mb-2 group-hover:text-amber-300 transition-colors">
                {step.title}
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* The 7-Stage Investigation Matrix Preview */}
      <div className="rounded-2xl parchment-card border border-amber-500/20 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-amber-500/15">
          <div>
            <h4 className="font-heading font-bold text-lg text-amber-200">
              The 7-Stage Investigative Cycle
            </h4>
            <p className="text-xs text-slate-400">
              From raw situation to objective reasoning
            </p>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 w-fit">
            <span>Critical Thinking Engine</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {SEVEN_STAGES.slice(0, 4).map((stage) => {
            const Icon = stage.icon;
            return (
              <div
                key={stage.number}
                className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-amber-500/30 transition-all flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/25 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-amber-500">{stage.number}</span>
                    <h5 className="font-semibold text-xs text-slate-200">{stage.title}</h5>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">{stage.tagline}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mt-3">
          {SEVEN_STAGES.slice(4).map((stage) => {
            const Icon = stage.icon;
            return (
              <div
                key={stage.number}
                className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-amber-500/30 transition-all flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/25 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-amber-500">{stage.number}</span>
                    <h5 className="font-semibold text-xs text-slate-200">{stage.title}</h5>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">{stage.tagline}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
