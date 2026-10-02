import React, { useState, useMemo } from 'react';
import { 
  generateMockInvestigation, 
  calculateCuriosityScore, 
  evaluateHypothesis 
} from '../utils/investigationEngine';
import { 
  LeadChoice, 
  InvestigationLead, 
  DiscoveredClue, 
  PossibleExplanation, 
  FinalVerdictType, 
  PlayerHypothesis, 
  InvestigationPhase 
} from '../types';

import { InvestigationHeader } from './investigation/InvestigationHeader';
import { CaseCard } from './investigation/CaseCard';
import { VikarnaGuide } from './investigation/VikarnaGuide';
import { HypothesisBuilder } from './investigation/HypothesisBuilder';
import { InvestigationAnglesHub } from './investigation/InvestigationAnglesHub';
import { EvidenceBoard } from './investigation/EvidenceBoard';
import { DecisionCard } from './investigation/DecisionCard';
import { ResultScreen } from './investigation/ResultScreen';
import { AskVikarnaModal } from './investigation/AskVikarnaModal';
import { HintModal } from './investigation/HintModal';
import { FallacyModal } from './investigation/FallacyModal';

interface InvestigationScreenProps {
  situation: string;
  onEditSituation: () => void;
  onReset: () => void;
}

export const InvestigationScreen: React.FC<InvestigationScreenProps> = ({
  situation,
  onEditSituation,
  onReset,
}) => {
  // Generate the dynamic mock case based on the user's situation
  const caseData = useMemo(() => generateMockInvestigation(situation), [situation]);

  // Main navigation & lead state
  const [phase, setPhase] = useState<InvestigationPhase>('investigation');
  const [activeLeadId, setActiveLeadId] = useState<string>(caseData.leads[0]?.id || 'lead-evidence');
  const [allSelectedChoices, setAllSelectedChoices] = useState<LeadChoice[]>([]);
  const [discoveredClues, setDiscoveredClues] = useState<DiscoveredClue[]>([]);
  
  // Hypotheses & verdict state
  const [currentHypothesis, setCurrentHypothesis] = useState<PlayerHypothesis | null>(null);
  const [hypothesesCount, setHypothesesCount] = useState<number>(0);
  const [selectedVerdict, setSelectedVerdict] = useState<FinalVerdictType | null>(null);
  const [selectedExplanation, setSelectedExplanation] = useState<PossibleExplanation | null>(null);

  // Modals state
  const [isAskVikarnaOpen, setIsAskVikarnaOpen] = useState(false);
  const [isHintModalOpen, setIsHintModalOpen] = useState(false);
  const [fallacyModalData, setFallacyModalData] = useState<{
    isOpen: boolean;
    title: string;
    explanation: string;
  }>({
    isOpen: false,
    title: '',
    explanation: '',
  });

  const totalLeads = caseData.leads.length;

  // Handle answering an investigation angle lead
  const handleAnswerLead = (lead: InvestigationLead, choice: LeadChoice) => {
    // Avoid duplicates for the same lead
    if (discoveredClues.some((c) => c.leadId === lead.id)) return;

    setAllSelectedChoices((prev) => [...prev, choice]);

    const newClue: DiscoveredClue = {
      id: `clue-${lead.id}-${choice.id}`,
      leadId: lead.id,
      angle: lead.angle,
      angleLabel: lead.angleLabel,
      title: choice.clueTitle,
      text: choice.clueText,
      category: choice.evidenceCategory,
      evidenceState: choice.evidenceState,
      reasoningType: choice.reasoningType,
      discoveredAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedClues = [...discoveredClues, newClue];
    setDiscoveredClues(updatedClues);

    // Re-evaluate active hypothesis if one exists
    if (currentHypothesis) {
      const reevaluated = evaluateHypothesis(currentHypothesis.theoryText, caseData, updatedClues);
      setCurrentHypothesis(reevaluated);
    }
  };

  // Handle formulating or testing a hypothesis
  const handleSubmitHypothesis = (theoryText: string) => {
    const evaluation = evaluateHypothesis(theoryText, caseData, discoveredClues);
    setCurrentHypothesis(evaluation);
    setHypothesesCount((prev) => prev + 1);
  };

  // Open fallacy explanation modal
  const handleOpenFallacyModal = (title: string, explanation: string) => {
    setFallacyModalData({
      isOpen: true,
      title,
      explanation,
    });
  };

  // Proceed to Decision Phase
  const handleProceedToDecision = () => {
    setPhase('decision');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle final verdict selection in Decision Phase
  const handleSelectFinalVerdict = (verdict: FinalVerdictType, explanation: PossibleExplanation) => {
    setSelectedVerdict(verdict);
    setSelectedExplanation(explanation);
    setPhase('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Return to investigation from decision
  const handleReturnToInvestigation = () => {
    setPhase('investigation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calculate curiosity stars and reasoning rubric score
  const scoreBreakdown = useMemo(() => {
    return calculateCuriosityScore(allSelectedChoices, selectedVerdict, totalLeads, hypothesesCount);
  }, [allSelectedChoices, selectedVerdict, totalLeads, hypothesesCount]);

  return (
    <div className="py-6 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-6 sm:space-y-8 animate-fadeIn">
      {/* 1. Header: Brand, Live Evidence Counters, Ask Vikarna & Hint triggers */}
      <InvestigationHeader
        caseTitle={caseData.caseTitle}
        caseCategory={caseData.caseCategory}
        totalLeads={totalLeads}
        clues={discoveredClues}
        phase={phase}
        onEditSituation={onEditSituation}
        onReset={onReset}
        onOpenAskVikarna={() => setIsAskVikarnaOpen(true)}
        onOpenHintModal={() => setIsHintModalOpen(true)}
      />

      {/* PHASE 1: ACTIVE INVESTIGATION (Non-linear Angles & Hypothesis Testing) */}
      {phase === 'investigation' && (
        <div className="space-y-6 sm:space-y-8">
          {/* 2. CASE ANALYSIS: Situation + THE CLAIM + WHAT WE KNOW + WHAT DON'T WE KNOW */}
          <CaseCard
            situation={caseData.rawSituation}
            claim={caseData.extractedClaim}
            claimContextNote={caseData.claimContextNote}
            knownFacts={caseData.knownFacts}
            unknownFacts={caseData.unknownFacts}
            alternativeTheories={caseData.alternativeTheories}
            onEditSituation={onEditSituation}
            onSelectTheory={handleSubmitHypothesis}
          />

          {/* 3. VIKARNA SAGE GUIDANCE */}
          <VikarnaGuide
            customMessage={
              discoveredClues.length > 0
                ? `You have uncovered ${discoveredClues.length} clues. Test your hypothesis or investigate remaining angles before deciding.`
                : "A claim is an unverified assertion. Do not rush to agree or disagree; examine the evidence angles below."
            }
            principle={caseData.vikarnaWisdom.principle}
          />

          {/* 4. PLAYER HYPOTHESIS BENCH ("WHAT DO YOU THINK IS HAPPENING?") */}
          <HypothesisBuilder
            currentHypothesis={currentHypothesis}
            alternativeTheories={caseData.alternativeTheories}
            cluesCount={discoveredClues.length}
            onSubmitHypothesis={handleSubmitHypothesis}
            onOpenHintModal={() => setIsHintModalOpen(true)}
            onOpenFallacyModal={handleOpenFallacyModal}
            onSelectAngle={() => {
              const nextUnexplored = caseData.leads.find(
                (l) => !discoveredClues.some((c) => c.leadId === l.id)
              );
              if (nextUnexplored) setActiveLeadId(nextUnexplored.id);
            }}
          />

          {/* 5. MULTI-ANGLE INVESTIGATION HUB (Non-linear leads & evidence states) */}
          <InvestigationAnglesHub
            leads={caseData.leads}
            discoveredClues={discoveredClues}
            activeLeadId={activeLeadId}
            onSelectLead={(leadId) => setActiveLeadId(leadId)}
            onAnswerLead={handleAnswerLead}
            onOpenHintModal={() => setIsHintModalOpen(true)}
            onOpenFallacyModal={handleOpenFallacyModal}
            onProceedToDecision={handleProceedToDecision}
          />

          {/* 6. PERMANENT EVIDENCE BOARD & LIVE BALANCE METER */}
          <EvidenceBoard
            clues={discoveredClues}
            totalLeads={totalLeads}
          />
        </div>
      )}

      {/* PHASE 2: FINAL DECISION (4 Standard Verdicts + Detailed Scenario Selection) */}
      {phase === 'decision' && (
        <DecisionCard
          verdictOptions={caseData.verdictOptions}
          explanations={caseData.possibleExplanations}
          clues={discoveredClues}
          extractedClaim={caseData.extractedClaim}
          onSelectVerdict={handleSelectFinalVerdict}
          onReturnToInvestigation={handleReturnToInvestigation}
        />
      )}

      {/* PHASE 3: FINAL REASONING REVIEW & CURIOSITY STARS */}
      {phase === 'result' && selectedExplanation && (
        <ResultScreen
          caseData={caseData}
          clues={discoveredClues}
          chosenVerdict={selectedVerdict}
          chosenExplanation={selectedExplanation}
          scoreBreakdown={scoreBreakdown}
          onEditSituation={onEditSituation}
          onReset={onReset}
        />
      )}

      {/* Interactive Modals */}
      <AskVikarnaModal
        isOpen={isAskVikarnaOpen}
        onClose={() => setIsAskVikarnaOpen(false)}
        caseData={caseData}
        clues={discoveredClues}
      />

      <HintModal
        isOpen={isHintModalOpen}
        onClose={() => setIsHintModalOpen(false)}
        caseData={caseData}
        clues={discoveredClues}
      />

      <FallacyModal
        isOpen={fallacyModalData.isOpen}
        onClose={() => setFallacyModalData((prev) => ({ ...prev, isOpen: false }))}
        title={fallacyModalData.title}
        explanation={fallacyModalData.explanation}
      />
    </div>
  );
};
