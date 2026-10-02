export type ViewState = 'landing' | 'investigation';

export type InvestigationPhase = 'investigation' | 'decision' | 'result';

export type ReasoningType = 
  | 'evidence-seeking' 
  | 'assumption-based' 
  | 'bandwagon' 
  | 'alternative-perspective'
  | 'direct-accusation'
  | 'motive-seeking'
  | 'source-verification'
  | 'uncertainty-recognition';

export type EvidenceCategory = 
  | 'Physical Fact' 
  | 'Testimony' 
  | 'Context' 
  | 'Alternative Theory'
  | 'Official Record';

export type EvidenceState = 
  | 'SUPPORTS THE CLAIM' 
  | 'CONTRADICTS THE CLAIM' 
  | 'NEUTRAL' 
  | 'UNCERTAIN';

export type InvestigationAngle = 
  | 'examine-evidence'       // Examine physical records, logs, perimeter
  | 'check-source'          // Check the source (witness directness, hearsay, reliability)
  | 'look-contradictions'   // Look for contradictions (timeline conflicts, mismatched details)
  | 'alternative-explanation'// Consider another explanation (innocent causes, misplacement)
  | 'investigate-motive'    // Investigate possible motive (motive is a lead, NOT proof)
  | 'check-unknown';        // Check what is still unknown (information gaps)

export interface LeadChoice {
  id: string;
  text: string;
  reasoningType: ReasoningType;
  isEvidenceOriented: boolean;
  points: number; // Curiosity points
  feedback: string;
  fallacyName?: string; // e.g. "Bandwagon Fallacy", "Motive as Proof Fallacy", "Hostile Attribution"
  fallacyExplanation?: string;
  clueTitle: string;
  clueText: string;
  evidenceCategory: EvidenceCategory;
  evidenceState: EvidenceState;
}

export interface InvestigationLead {
  id: string;
  angle: InvestigationAngle;
  title: string;
  angleLabel: string;
  iconName: string;
  prompt: string;
  contextHint: string;
  choices: LeadChoice[];
  isMotiveCheck?: boolean; // If true, emphasizes that motive != proof
  motiveCaution?: string;
}

// Backward compatibility alias
export type AnswerChoice = LeadChoice;
export type InvestigationQuestion = InvestigationLead;

export interface DiscoveredClue {
  id: string;
  leadId: string;
  angle: InvestigationAngle;
  angleLabel: string;
  title: string;
  text: string;
  category: EvidenceCategory;
  evidenceState: EvidenceState;
  reasoningType: ReasoningType;
  discoveredAt: string;
}

export type HypothesisStatus = 
  | 'SUPPORTED BY CURRENT EVIDENCE' 
  | 'PARTIALLY SUPPORTED' 
  | 'NOT ENOUGH EVIDENCE' 
  | 'CONTRADICTED BY THE EVIDENCE';

export interface PlayerHypothesis {
  theoryText: string;
  status: HypothesisStatus;
  feedback: string;
  reasoningWeakness?: string;
  suggestedAction: string;
  evaluatedAtClueCount: number;
}

export type FinalVerdictType = 
  | 'supported'      // The claim is supported by the evidence.
  | 'contradicted'   // The claim is contradicted by the evidence.
  | 'unsupported'    // The claim is not sufficiently supported.
  | 'uncertain';     // There is not enough information to decide.

export interface FinalVerdictOption {
  id: FinalVerdictType;
  title: string;
  description: string;
  isOptimalVerdict: boolean;
  explanation: string;
}

export interface PossibleExplanation {
  id: string;
  title: string;
  explanation: string;
  supportedByEvidence: boolean;
  confidenceScore: number; // 0 - 100
  evidenceAlignmentReasoning: string;
  isOriginalClaim: boolean;
}

export interface AskVikarnaPreset {
  id: string;
  question: string;
  response: string;
  principle: string;
}

export interface GeneratedCase {
  id: string;
  rawSituation: string;
  caseCategory: string;
  caseTitle: string;
  extractedClaim: string;
  claimContextNote: string;
  knownFacts: string[]; // "WHAT DO WE KNOW?"
  unknownFacts: string[]; // "WHAT DON'T WE KNOW?"
  leads: InvestigationLead[]; // Available investigation angles
  alternativeTheories: string[]; // Alternative explanations to consider
  possibleExplanations: PossibleExplanation[]; // Final scenarios
  optimalVerdict: FinalVerdictType;
  verdictOptions: FinalVerdictOption[];
  hints: string[];
  vikarnaDialogue: AskVikarnaPreset[];
  vikarnaWisdom: {
    title: string;
    message: string;
    principle: string;
  };
  // Backward compatibility alias for leads
  questions: InvestigationLead[];
}

export interface CuriosityScoreItem {
  id: string;
  label: string;
  earned: boolean;
  points: number;
  description: string;
}

export interface PlayerScoreBreakdown {
  starsEarned: number; // 0 - 5 stars
  totalPoints: number;
  maxPoints: number;
  percentage: number;
  items: CuriosityScoreItem[];
  verdictTitle: string;
  verdictDescription: string;
  verdictQuality: 'optimal' | 'reasonable' | 'premature' | 'unsupported';
  supportedByEvidence: boolean;
}
