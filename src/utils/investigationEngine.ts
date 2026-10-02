import { 
  GeneratedCase, 
  LeadChoice, 
  InvestigationLead,
  DiscoveredClue,
  PlayerScoreBreakdown,
  CuriosityScoreItem,
  FinalVerdictType,
  FinalVerdictOption,
  PlayerHypothesis
} from '../types';

/**
 * Normalizes input text and handles common typos
 */
function cleanInput(raw: string): string {
  return raw
    .trim()
    .replace(/\bmissng\b/gi, 'missing')
    .replace(/\bcheted\b/gi, 'cheated')
    .replace(/\bcancled\b/gi, 'cancelled')
    .replace(/\bcanceld\b/gi, 'cancelled')
    .replace(/\basignmnt\b/gi, 'assignment')
    .replace(/\basignment\b/gi, 'assignment')
    .replace(/\btemmate\b/gi, 'teammate')
    .replace(/\bteammte\b/gi, 'teammate')
    .replace(/\btheif\b/gi, 'thief')
    .replace(/\bfrnd\b/gi, 'friend');
}

/**
 * Extracts a specific item name from missing/theft inputs
 */
function extractItemName(text: string): string {
  const match = text.match(/\b(pen|pencil|phone|mobile|smartphone|wallet|purse|laptop|notebook|bag|backpack|book|keys|watch|bottle|charger|earbuds|airpods|money|cash|id card|calculator|paper|papers|document|documents)\b/i);
  return match ? match[1].toLowerCase() : 'item';
}


/**
 * Extracts the accused person or entity from input if mentioned
 */
function extractAccusedPerson(text: string): string {
  const match = text.match(/\b(friend|best friend|arun|rahul|priya|sneha|rohit|teammate|partner|roommate|classmate|peer|student|colleague|neighbor)\b/i);
  if (match) {
    const name = match[1];
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }
  return 'someone';
}

/**
 * Standardized 4 Verdict Options available across all investigations
 */
function getStandardVerdictOptions(optimalVerdict: FinalVerdictType, customContext: string): FinalVerdictOption[] {
  return [
    {
      id: 'supported',
      title: 'The claim is supported by the evidence.',
      description: 'Physical records, verified timestamps, and corroborating facts substantiate the initial assertion.',
      isOptimalVerdict: optimalVerdict === 'supported',
      explanation: optimalVerdict === 'supported' 
        ? 'Correct. Tangible records and direct verified sources substantiate the claim.'
        : 'The evidence collected actually refutes or fails to substantiate this conclusion.',
    },
    {
      id: 'contradicted',
      title: 'The claim is contradicted by the evidence.',
      description: 'Objective evidence, timeline audits, and primary records directly disprove the assertion.',
      isOptimalVerdict: optimalVerdict === 'contradicted',
      explanation: optimalVerdict === 'contradicted'
        ? `Correct. Primary sources and physical timeline logs proved the claim was mistaken or fabricated. ${customContext}`
        : 'The evidence does not outright contradict the premise.',
    },
    {
      id: 'unsupported',
      title: 'The claim is not sufficiently supported.',
      description: 'While suspicion or hearsay exists, there is zero verifiable primary proof to validate the accusation.',
      isOptimalVerdict: optimalVerdict === 'unsupported',
      explanation: optimalVerdict === 'unsupported'
        ? 'Dharmic discernment! Hearsay and personal motives were circulated, but zero verifiable proof exists.'
        : 'Sufficient definitive evidence was uncovered to reach a conclusive finding.',
    },
    {
      id: 'uncertain',
      title: 'There is not enough information to decide.',
      description: 'Critical primary records and direct witness statements are currently unavailable. Saying "I don\'t know yet" is the honest, evidence-based stance.',
      isOptimalVerdict: optimalVerdict === 'uncertain',
      explanation: optimalVerdict === 'uncertain'
        ? 'Exemplary intellectual honesty! When primary facts are missing, declaring uncertainty is far wiser than rushing to false judgment.'
        : 'Enough objective evidence was collected during the investigation to reach a clear determination.',
    },
  ];
}

/**
 * Generates an interactive, non-linear mock investigation case from ANY user input
 */
export function generateMockInvestigation(situationInput: string): GeneratedCase {
  const rawText = situationInput.trim() || 'An unverified claim in our group';
  const cleaned = cleanInput(rawText);
  const timestamp = Date.now();

  // --------------------------------------------------------------------------
  // 1. MISSING ITEM / THEFT ACCUSATION / "missng of pen" / LOST OBJECTS
  // --------------------------------------------------------------------------
  if (
    /\b(pen|pens|pencil|pencils|phone|phones|wallet|wallets|laptop|laptops|bag|bags|backpack|money|cash|keys|watch|bottle|charger|earbuds|airpods|stolen|stole|theft|robbed|missing|lost|took|take|taken|borrowed|belongings|papers|documents)\b/i.test(cleaned)
  ) {
    const item = extractItemName(cleaned);
    const isPlural = /\b(keys|papers|documents|notes|belongings|airpods|earbuds|funds)\b/i.test(item) || (item.endsWith('s') && !['glass'].includes(item));
    const wasWere = isPlural ? 'were' : 'was';
    const capitalizedItem = item.charAt(0).toUpperCase() + item.slice(1);
    const accused = extractAccusedPerson(cleaned);

    const leads: InvestigationLead[] = [
      {
        id: 'lead-evidence',
        angle: 'examine-evidence',
        angleLabel: 'Examine Evidence',
        title: `Search Perimeter & Physical Workspace`,
        iconName: 'Search',
        prompt: `What physical check should be conducted before suspecting theft of the ${item}?`,
        contextHint: 'Look for tangible physical traces before making a personal accusation.',
        choices: [
          {
            id: 'item-ev-a',
            text: `Search the immediate perimeter: desk crevices, underneath chairs, bag dividers, and adjacent shelves.`,
            reasoningType: 'evidence-seeking',
            isEvidenceOriented: true,
            points: 20,
            feedback: `Exemplary investigative protocol! Over 75% of "stolen" items like ${isPlural ? item : `a ${item}`} are simply dropped or misplaced under furniture.`,
            clueTitle: 'Perimeter Search Conducted',
            clueText: `The desk top is clear, but the adjacent bench has a gap where small items frequently slip onto the lower shelf.`,
            evidenceCategory: 'Physical Fact',
            evidenceState: 'NEUTRAL',
          },
          {
            id: 'item-ev-b',
            text: `Immediately confront ${accused} because they were seated nearby and looked nervous.`,
            reasoningType: 'direct-accusation',
            isEvidenceOriented: false,
            points: 0,
            feedback: 'Nervousness when suddenly confronted is a natural emotional reaction, not physical proof of theft.',
            fallacyName: 'Hostile Attribution Bias',
            fallacyExplanation: 'Assuming hostile intent and treating nervous body language as proof of guilt leads to false accusations.',
            clueTitle: 'Hostile Confrontation Trap',
            clueText: 'Confronting bystanders without physical evidence creates tension without locating the item.',
            evidenceCategory: 'Context',
            evidenceState: 'UNCERTAIN',
          },
          {
            id: 'item-ev-c',
            text: `Check the reception log and lost-and-found registry for items handed in today.`,
            reasoningType: 'evidence-seeking',
            isEvidenceOriented: true,
            points: 20,
            feedback: 'Tangible record checking! Campus cleaning staff routinely turn in items left behind in lecture halls.',
            clueTitle: 'Lost-and-Found Registry Log',
            clueText: `The reception desk has an identical ${item} turned in from the previous hall during afternoon cleaning.`,
            evidenceCategory: 'Official Record',
            evidenceState: 'CONTRADICTS THE CLAIM',
          },
          {
            id: 'item-ev-d',
            text: `Assume that because the ${item} is gone, someone definitely stole it.`,
            reasoningType: 'assumption-based',
            isEvidenceOriented: false,
            points: 5,
            feedback: 'Disappearance proves only absence, not theft. Absence can be caused by misplacement or accidental borrowing.',
            fallacyName: 'False Dilemma / Jumping to Conclusions',
            fallacyExplanation: 'Treating theft as the only explanation ignores misplacement and accidental borrowing.',
            clueTitle: 'Unexamined Absence Assumption',
            clueText: 'Assuming theft before checking accidental misplacement creates false certainty.',
            evidenceCategory: 'Alternative Theory',
            evidenceState: 'UNCERTAIN',
          },
        ],
      },
      {
        id: 'lead-source',
        angle: 'check-source',
        angleLabel: 'Check the Source',
        title: `Investigate Who Started the Claim`,
        iconName: 'UserCheck',
        prompt: `How should we evaluate the person who claimed ${accused} took the ${item}?`,
        contextHint: 'Examine whether the source has direct firsthand observation or is repeating hearsay.',
        choices: [
          {
            id: 'item-src-a',
            text: `Ask the source: "Did you physically see ${accused} take the ${item}, or are you guessing because they were near the desk?"`,
            reasoningType: 'source-verification',
            isEvidenceOriented: true,
            points: 20,
            feedback: 'Critical source auditing! Separating direct eyewitness observation from speculative inference.',
            clueTitle: 'Source Testimony Audited',
            clueText: `The person admits they did NOT see anyone take it; they merely saw ${accused} sitting nearby earlier.`,
            evidenceCategory: 'Testimony',
            evidenceState: 'CONTRADICTS THE CLAIM',
          },
          {
            id: 'item-src-b',
            text: `Believe the source immediately because they are confident and sounded certain.`,
            reasoningType: 'assumption-based',
            isEvidenceOriented: false,
            points: 5,
            feedback: 'Confidence is a personality trait, not proof of truth. People can be sincerely mistaken with total confidence.',
            fallacyName: 'Confidence Bias',
            fallacyExplanation: 'Confusing emotional conviction with factual accuracy.',
            clueTitle: 'Unverified Source Acceptance',
            clueText: 'Relying on confident assertions without verifying direct observation spreads second-hand rumors.',
            evidenceCategory: 'Context',
            evidenceState: 'UNCERTAIN',
          },
          {
            id: 'item-src-c',
            text: `Cross-check if any other student in the area witnessed anyone picking up the ${item}.`,
            reasoningType: 'evidence-seeking',
            isEvidenceOriented: true,
            points: 15,
            feedback: 'Corroboration check! Asking other independent witnesses helps clarify what actually happened.',
            clueTitle: 'Independent Witness Corroboration',
            clueText: `Two adjacent classmates confirmed ${accused} packed their own bag and left without touching the desk.`,
            evidenceCategory: 'Testimony',
            evidenceState: 'CONTRADICTS THE CLAIM',
          },
          {
            id: 'item-src-d',
            text: `Accuse the source of lying without hearing their perspective.`,
            reasoningType: 'direct-accusation',
            isEvidenceOriented: false,
            points: 0,
            feedback: 'Attacking people instead of examining facts creates unnecessary hostility.',
            fallacyName: 'Ad Hominem Attack',
            fallacyExplanation: 'Attacking the person rather than evaluating their factual claim.',
            clueTitle: 'Hostile Accusation Retaliation',
            clueText: 'Hostile accusations derail truth-seeking.',
            evidenceCategory: 'Context',
            evidenceState: 'NEUTRAL',
          },
        ],
      },
      {
        id: 'lead-contradictions',
        angle: 'look-contradictions',
        angleLabel: 'Look for Contradictions',
        title: `Timeline & Physical Alignment`,
        iconName: 'GitCompare',
        prompt: `Does the timeline of where the ${item} was last used match the accusation?`,
        contextHint: 'Compare the timeline of events against physical reality.',
        choices: [
          {
            id: 'item-con-a',
            text: `Retrace the physical timeline: verify when the ${item} was last used and when ${accused} entered the room.`,
            reasoningType: 'evidence-seeking',
            isEvidenceOriented: true,
            points: 20,
            feedback: 'Indispensable detective work! Timeline contradictions easily expose mistaken assumptions.',
            clueTitle: 'Timeline Reconstruction',
            clueText: `The ${item} was last used in Hall B at 11:00 AM, but ${accused} did not arrive until 11:45 AM in Hall C.`,
            evidenceCategory: 'Physical Fact',
            evidenceState: 'CONTRADICTS THE CLAIM',
          },
          {
            id: 'item-con-b',
            text: `Ignore the timeline and assume memory is always 100% accurate.`,
            reasoningType: 'assumption-based',
            isEvidenceOriented: false,
            points: 0,
            feedback: 'Human memory is prone to time distortion, especially when emotions are high.',
            fallacyName: 'Fallacy of Infallible Memory',
            fallacyExplanation: 'Assuming personal memory is flawless without checking timestamped markers.',
            clueTitle: 'Distorted Timeline Assumption',
            clueText: 'Failing to retrace the timeline leads to accusing people who were not even present.',
            evidenceCategory: 'Context',
            evidenceState: 'UNCERTAIN',
          },
          {
            id: 'item-con-c',
            text: `Check if ${accused} has their own identical ${item} with their name on it.`,
            reasoningType: 'alternative-perspective',
            isEvidenceOriented: true,
            points: 20,
            feedback: 'Mass-produced identical tools frequently cause confusion.',
            clueTitle: 'Identical Supply Verification',
            clueText: `${accused} showed their own identical ${item} purchased last week with an existing label.`,
            evidenceCategory: 'Physical Fact',
            evidenceState: 'CONTRADICTS THE CLAIM',
          },
          {
            id: 'item-con-d',
            text: `Demand that everyone empty their pockets before checking any timeline.`,
            reasoningType: 'direct-accusation',
            isEvidenceOriented: false,
            points: 0,
            feedback: 'Mass intrusive searches violate boundaries and reflect a breakdown of reason.',
            fallacyName: 'Guilt by Association / Collective Punishment',
            fallacyExplanation: 'Treating an entire group as suspects without reasonable grounds.',
            clueTitle: 'Intrusive Mass Search Hazard',
            clueText: 'Intrusive searches alienate peers without discovering the truth.',
            evidenceCategory: 'Context',
            evidenceState: 'UNCERTAIN',
          },
        ],
      },
      {
        id: 'lead-alternative',
        angle: 'alternative-explanation',
        angleLabel: 'Alternative Explanations',
        title: `Consider Other Possibilities`,
        iconName: 'Lightbulb',
        prompt: `What alternative explanations could account for the missing ${item} without assuming theft?`,
        contextHint: 'Always evaluate non-malicious hypotheses before assuming bad faith.',
        choices: [
          {
            id: 'item-alt-a',
            text: `Hypothesis: The ${item} was forgotten in the previous room, fell between seat cushions, or was borrowed by mistake.`,
            reasoningType: 'alternative-perspective',
            isEvidenceOriented: true,
            points: 20,
            feedback: 'Hanlon’s Razor in action! Never attribute to malice what is adequately explained by simple misplacement.',
            clueTitle: 'Alternative Hypotheses Formulated',
            clueText: 'Evaluating misplacement explains the timeline perfectly without requiring any wrongdoing.',
            evidenceCategory: 'Alternative Theory',
            evidenceState: 'CONTRADICTS THE CLAIM',
          },
          {
            id: 'item-alt-b',
            text: `Refuse to consider alternatives because admitting misplacement feels embarrassing.`,
            reasoningType: 'assumption-based',
            isEvidenceOriented: false,
            points: 0,
            feedback: 'Pride and ego are the enemies of truth. A true investigator cares about facts, not saving face.',
            fallacyName: 'Ego Defense / Sunk Cost Bias',
            fallacyExplanation: 'Refusing to admit a personal mistake out of fear of embarrassment.',
            clueTitle: 'Ego Defense Trap',
            clueText: 'Refusing alternative hypotheses locks people into false accusations.',
            evidenceCategory: 'Context',
            evidenceState: 'UNCERTAIN',
          },
          {
            id: 'item-alt-c',
            text: `Make a gracious, non-hostile announcement: "Please check if you accidentally picked up an extra ${item}."`,
            reasoningType: 'evidence-seeking',
            isEvidenceOriented: true,
            points: 20,
            feedback: 'Dignified communication gives accidental borrowers a safe, honorable exit without conflict.',
            clueTitle: 'Dignified Return Protocol',
            clueText: 'Non-accusatory requests resolve over 85% of misplaced items immediately without drama.',
            evidenceCategory: 'Testimony',
            evidenceState: 'NEUTRAL',
          },
          {
            id: 'item-alt-d',
            text: `Assume there are no alternative explanations; whoever is disliked most must have done it.`,
            reasoningType: 'bandwagon',
            isEvidenceOriented: false,
            points: 0,
            feedback: 'Scapegoating unpopular individuals is the exact moral tragedy Vikarna fought in the Kuru Court.',
            fallacyName: 'Scapegoating Fallacy',
            fallacyExplanation: 'Targeting unpopular individuals rather than following empirical evidence.',
            clueTitle: 'Scapegoating Injustice',
            clueText: 'Scapegoating destroys community trust and completely misses the real truth.',
            evidenceCategory: 'Context',
            evidenceState: 'UNCERTAIN',
          },
        ],
      },
      {
        id: 'lead-motive',
        angle: 'investigate-motive',
        angleLabel: 'Investigate Motive',
        title: `Why Is This Claim Being Made?`,
        iconName: 'Target',
        prompt: `Why might the accuser be insisting that ${accused} took the ${item}? Remember: Motive is an explanation, NOT proof!`,
        contextHint: 'Explore psychological motives without treating them as conclusive evidence.',
        isMotiveCheck: true,
        motiveCaution: 'Motive could explain why someone insists on a story, but having a motive does NOT prove they are lying or guilty. Evidence is still required.',
        choices: [
          {
            id: 'item-mot-a',
            text: `They may be frustrated by losing their ${item} and jumped to blame the closest person, but this motive alone does not prove malicious lying.`,
            reasoningType: 'motive-seeking',
            isEvidenceOriented: true,
            points: 20,
            feedback: `Brilliant discernment! VIKARNA Principle: Motive explains human behavior, but motive alone is NEVER proof of guilt or innocence.`,
            clueTitle: 'Motive Analyzed as Possibility, Not Proof',
            clueText: 'Emotional frustration led to quick suspicion, but physical evidence remains the only objective standard.',
            evidenceCategory: 'Context',
            evidenceState: 'NEUTRAL',
          },
          {
            id: 'item-mot-b',
            text: `Because the accuser dislikes ${accused}, ${accused} is automatically 100% innocent and the accuser is evil.`,
            reasoningType: 'direct-accusation',
            isEvidenceOriented: false,
            points: 5,
            feedback: 'Caution! Having a personal dislike does not automatically prove an accusation is false, just as having a motive does not prove theft. Both require evidence.',
            fallacyName: 'Motive as Proof Fallacy',
            fallacyExplanation: 'Assuming a claim is false solely because the claimant has a personal motive or bias.',
            clueTitle: 'Motive Mistaken for Verdict',
            clueText: 'Judging truth purely by motive ignores the need for physical corroboration.',
            evidenceCategory: 'Alternative Theory',
            evidenceState: 'UNCERTAIN',
          },
          {
            id: 'item-mot-c',
            text: `Ask both individuals to calmly share what happened without assigning blame.`,
            reasoningType: 'alternative-perspective',
            isEvidenceOriented: true,
            points: 15,
            feedback: 'Fair procedural justice: Audi Alteram Partem (listen to both sides calmly).',
            clueTitle: 'Balanced Bilateral Dialogue',
            clueText: 'Calm dialogue revealed that neither party held bad intentions; it was simple confusion.',
            evidenceCategory: 'Testimony',
            evidenceState: 'NEUTRAL',
          },
          {
            id: 'item-mot-d',
            text: `Believe whichever person cries harder or acts more dramatic.`,
            reasoningType: 'assumption-based',
            isEvidenceOriented: false,
            points: 0,
            feedback: 'Emotional drama is not evidence. Truth is established by facts and timeline records.',
            fallacyName: 'Appeal to Emotion Fallacy',
            fallacyExplanation: 'Manipulating emotional displays instead of evaluating objective evidence.',
            clueTitle: 'Emotional Display Bias',
            clueText: 'Emotional performances have zero correlation with factual accuracy.',
            evidenceCategory: 'Context',
            evidenceState: 'UNCERTAIN',
          },
        ],
      },
      {
        id: 'lead-unknown',
        angle: 'check-unknown',
        angleLabel: 'Check What Is Still Unknown',
        title: `Identify Information Gaps`,
        iconName: 'HelpCircle',
        prompt: `What critical piece of information is still missing before making a final judgment?`,
        contextHint: 'Recognize what is still unknown before declaring a verdict.',
        choices: [
          {
            id: 'item-unk-a',
            text: `Whether the ${item} found in lost-and-found matches the owner's exact brand and distinctive markings.`,
            reasoningType: 'uncertainty-recognition',
            isEvidenceOriented: true,
            points: 20,
            feedback: 'Exact right inquiry! Confirming the physical match closes the gap with 100% certainty.',
            clueTitle: 'Physical Matching Complete',
            clueText: `The ${item} at lost-and-found matches the owner's distinct scratches and ink color perfectly.`,
            evidenceCategory: 'Physical Fact',
            evidenceState: 'CONTRADICTS THE CLAIM',
          },
          {
            id: 'item-unk-b',
            text: `Nothing is unknown; we should guess and move on.`,
            reasoningType: 'assumption-based',
            isEvidenceOriented: false,
            points: 0,
            feedback: 'Rushing to closure leaves critical gaps unexamined and causes unjust outcomes.',
            fallacyName: 'Premature Closure',
            fallacyExplanation: 'Stopping the investigation before key facts are verified.',
            clueTitle: 'Premature Closure Pitfall',
            clueText: 'Rushing to close the case blinds the investigator to conclusive facts.',
            evidenceCategory: 'Context',
            evidenceState: 'UNCERTAIN',
          },
          {
            id: 'item-unk-c',
            text: `Acknowledge that until the item is physically identified, "I don't know for sure" is a valid scientific stance.`,
            reasoningType: 'uncertainty-recognition',
            isEvidenceOriented: true,
            points: 20,
            feedback: 'Wisdom of Vikarna! Intellectual honesty means admitting uncertainty until evidence is verified.',
            clueTitle: 'Honest Uncertainty Recognized',
            clueText: 'Recognizing uncertainty prevents hasty wrongful condemnation.',
            evidenceCategory: 'Official Record',
            evidenceState: 'NEUTRAL',
          },
          {
            id: 'item-unk-d',
            text: `Assume someone stole it and hid it where it can never be found.`,
            reasoningType: 'direct-accusation',
            isEvidenceOriented: false,
            points: 0,
            feedback: 'Conspiracy theories invent unfalsifiable explanations to avoid accepting simple physical facts.',
            fallacyName: 'Unfalsifiable Conspiracy Theory',
            fallacyExplanation: 'Inventing excuses that cannot be disproven to preserve a disproven belief.',
            clueTitle: 'Conspiracy Rationalization Trap',
            clueText: 'Inventing conspiracies prevents accepting tangible evidence.',
            evidenceCategory: 'Alternative Theory',
            evidenceState: 'UNCERTAIN',
          },
        ],
      },
    ];

    return {
      id: `case-missing-item-${timestamp}`,
      rawSituation: rawText,
      caseCategory: 'Property & Verification',
      caseTitle: `The Disappearance of the ${capitalizedItem}`,
      extractedClaim: `The ${item} ${wasWere} deliberately taken or stolen by ${accused === 'someone' ? 'someone nearby' : accused}.`,
      claimContextNote: 'A claim is an unverified assertion. It is NOT automatically a fact until tested against physical evidence.',
      knownFacts: [
        `The ${item} ${wasWere} in the room or workspace earlier, but ${isPlural ? 'are' : 'is'} not in its expected spot now.`,
        `Speculation and accusations began spreading before checking for accidental misplacement.`,
        `No one has physically searched the surrounding perimeter or verified lost-and-found.`,
      ],
      unknownFacts: [
        `Whether the ${item} slipped under furniture or ${wasWere} left behind in the previous lecture room.`,
        `Whether someone picked it up by accident thinking it was their own identical supply.`,
        `The exact timestamp and location when the ${item} ${wasWere} last seen or used.`,
      ],
      alternativeTheories: [
        `${accused} deliberately took the ${item} with bad intent.`,
        `Someone else took the ${item} and ${accused} was wrongfully blamed.`,
        `The ${item} was accidentally misplaced or left behind in the previous room.`,
        `Someone mistakenly assumed ${accused} took it because they were sitting nearby.`,
      ],
      leads,
      questions: leads,
      optimalVerdict: 'contradicted',
      verdictOptions: getStandardVerdictOptions('contradicted', `The ${item} was safely located at lost-and-found, proving it was left behind rather than stolen.`),
      hints: [
        `Ask yourself whether anyone actually witnessed ${accused} taking the ${item} with their own eyes.`,
        `Could the ${item} have been left behind in the previous room where it was used?`,
        `Are you treating someone's nervous reaction as physical proof of guilt?`,
        `What physical evidence would distinguish deliberate theft from accidental misplacement?`,
      ],
      vikarnaDialogue: [
        {
          id: 'v-1',
          question: 'Why would someone accuse their friend so quickly?',
          response: 'When we lose something of value, frustration triggers Hostile Attribution Bias. Our minds jump to blame the nearest person rather than accept our own misplacement.',
          principle: 'Frustration seeks a scapegoat; wisdom seeks the perimeter.',
        },
        {
          id: 'v-2',
          question: 'What am I missing in this missing item case?',
          response: 'Have you retraced the physical timeline? A missing object is usually in the last place it was used, not in the hands of the first person accused.',
          principle: 'Inspect the space and timeline before you judge the person.',
        },
        {
          id: 'v-3',
          question: 'Could there be an innocent alternative explanation?',
          response: 'Always! Accidental borrowing, identical supplies, or falling into a floor crevice account for over 85% of missing possessions.',
          principle: 'Never attribute to malice what is explained by a simple mistake.',
        },
        {
          id: 'v-4',
          question: 'Why isn\'t someone looking nervous enough proof of guilt?',
          response: 'Nervousness is an emotional state caused by sudden confrontation. An innocent person put on the spot will often appear more flustered than a calculated liar.',
          principle: 'Emotion is not evidence; physical records are.',
        },
      ],
      possibleExplanations: [
        {
          id: 'exp-1',
          title: `Accidental Misplacement / Left Behind in Previous Room`,
          explanation: `The ${item} was not stolen. It was left behind in the previous study area and safely turned in to lost-and-found by campus staff.`,
          supportedByEvidence: true,
          confidenceScore: 96,
          evidenceAlignmentReasoning: `Confirmed by the lecture hall timeline, physical identification at lost-and-found, and witness corroboration.`,
          isOriginalClaim: false,
        },
        {
          id: 'exp-2',
          title: `Deliberate Theft by Accused Person`,
          explanation: `The accused person intentionally took the ${item} with bad intentions.`,
          supportedByEvidence: false,
          confidenceScore: 5,
          evidenceAlignmentReasoning: `Contradicted by physical lost-and-found records, timeline mismatch, and absence of eyewitness proof.`,
          isOriginalClaim: true,
        },
        {
          id: 'exp-3',
          title: `Innocent Accidental Mix-Up of Identical Supply`,
          explanation: `A classmate thought the ${item} was their own identical one and packed it by mistake.`,
          supportedByEvidence: true,
          confidenceScore: 78,
          evidenceAlignmentReasoning: `Common occurrence on shared desks with mass-produced identical tools.`,
          isOriginalClaim: false,
        },
      ],
      vikarnaWisdom: {
        title: 'The Truth of Missing Possessions',
        message: 'A missing item is a puzzle for patience and quiet inspection, never a weapon to accuse a peer without proof. Search the space before you judge the person.',
        principle: 'Question → Investigate → Find Evidence → Decide. Evidence protects both truth and trust.',
      },
    };
  }

  // --------------------------------------------------------------------------
  // 2. EXAM CANCELLED / CAMPUS ANNOUNCEMENT / INFORMATION VERIFICATION
  // --------------------------------------------------------------------------
  if (
    /\b(exam|exams|test|tests|cancelled|canceled|cancellation|holiday|postponed|postponement|rescheduled|circular|notice|timetable|schedule|class|classes|college|university|school)\b/i.test(cleaned)
  ) {
    const isExam = /\b(exam|exams|test|tests)\b/i.test(cleaned);
    const eventType = isExam ? 'examination' : 'class or schedule';
    const capitalizedEvent = isExam ? 'Examination' : 'Campus Schedule';

    const leads: InvestigationLead[] = [
      {
        id: 'lead-evidence',
        angle: 'examine-evidence',
        angleLabel: 'Examine Evidence',
        title: `Official Portal & Digital Circular`,
        iconName: 'Search',
        prompt: `What primary official channel should we examine to verify the ${eventType} status?`,
        contextHint: 'Look for authoritative institutional repositories rather than chatroom screenshots.',
        choices: [
          {
            id: 'ann-ev-a',
            text: 'Check the official university portal announcements page, student intranet, and registrar email.',
            reasoningType: 'evidence-seeking',
            isEvidenceOriented: true,
            points: 20,
            feedback: 'Essential primary source audit! Official portals are the single authentic institutional authority.',
            clueTitle: 'Institutional Portal Audited',
            clueText: `The official university portal lists the ${eventType} timetable as fully active with zero cancellation notices.`,
            evidenceCategory: 'Official Record',
            evidenceState: 'CONTRADICTS THE CLAIM',
          },
          {
            id: 'ann-ev-b',
            text: 'Rely on a forwarded screenshot in a student WhatsApp group because it has a college logo.',
            reasoningType: 'assumption-based',
            isEvidenceOriented: false,
            points: 5,
            feedback: 'Logos are easily copied and pasted onto fake or outdated circulars in seconds.',
            fallacyName: 'Superficial Credibility Fallacy',
            fallacyExplanation: 'Trusting a document merely because it contains a logo or formal appearance.',
            clueTitle: 'Unverified Screenshot Hazard',
            clueText: 'Forwarded screenshots lack verifiable digital signatures.',
            evidenceCategory: 'Context',
            evidenceState: 'UNCERTAIN',
          },
          {
            id: 'ann-ev-c',
            text: 'Inspect the screenshot circular reference number, typography alignment, and issuing authority signature.',
            reasoningType: 'alternative-perspective',
            isEvidenceOriented: true,
            points: 20,
            feedback: 'Astute forensic checking! Forged or recycled notices frequently contain mismatched reference codes.',
            clueTitle: 'Circular Discrepancy Uncovered',
            clueText: 'The circular reference number on the circulating image belongs to an old flood holiday from last year.',
            evidenceCategory: 'Physical Fact',
            evidenceState: 'CONTRADICTS THE CLAIM',
          },
          {
            id: 'ann-ev-d',
            text: 'Assume the day off is guaranteed, delete your notes, and go to sleep.',
            reasoningType: 'assumption-based',
            isEvidenceOriented: false,
            points: 0,
            feedback: 'Gambling academic preparation on unverified claims brings severe academic consequences.',
            fallacyName: 'Wishful Thinking Fallacy',
            fallacyExplanation: 'Believing something is true merely because one wants it to be true.',
            clueTitle: 'Wishful Inaction Hazard',
            clueText: 'Blind reliance on unverified rumors leads to marked failure.',
            evidenceCategory: 'Context',
            evidenceState: 'UNCERTAIN',
          },
        ],
      },
      {
        id: 'lead-source',
        angle: 'check-source',
        angleLabel: 'Check the Source',
        title: `Origin of the Forwarded Message`,
        iconName: 'UserCheck',
        prompt: `Who originated this cancellation forward and can their statement be verified?`,
        contextHint: 'Trace the message back to its primary origin.',
        choices: [
          {
            id: 'ann-src-a',
            text: 'Trace the forward to the original sender and ask for the official source URL or signed circular.',
            reasoningType: 'source-verification',
            isEvidenceOriented: true,
            points: 20,
            feedback: 'Source tracing breaks the chain of unverified gossip.',
            clueTitle: 'Sender Source Trace',
            clueText: 'The original forwarder admits they got it from a friend in another department who "found it online."',
            evidenceCategory: 'Testimony',
            evidenceState: 'CONTRADICTS THE CLAIM',
          },
          {
            id: 'ann-src-b',
            text: 'Assume whoever forwarded it must have high-level connections with the Dean.',
            reasoningType: 'assumption-based',
            isEvidenceOriented: false,
            points: 5,
            feedback: 'Assuming anonymous forwarders have inside knowledge is an Appeal to False Authority.',
            fallacyName: 'Appeal to False Authority',
            fallacyExplanation: 'Attributing credibility without verified credentials or direct institutional role.',
            clueTitle: 'Phantom Authority Trap',
            clueText: 'Forwarded tags obscure the total absence of verified administrative authority.',
            evidenceCategory: 'Alternative Theory',
            evidenceState: 'UNCERTAIN',
          },
          {
            id: 'ann-src-c',
            text: 'Contact the designated Class Representative or Faculty Coordinator.',
            reasoningType: 'alternative-perspective',
            isEvidenceOriented: true,
            points: 15,
            feedback: 'Clear designated liaison avoids chaos and panic.',
            clueTitle: 'Designated Coordinator Contacted',
            clueText: 'The coordinator confirmed no faculty member or administrator has authorized any postponement.',
            evidenceCategory: 'Testimony',
            evidenceState: 'CONTRADICTS THE CLAIM',
          },
          {
            id: 'ann-src-d',
            text: 'Forward the notice to 10 more group chats to see what other people say.',
            reasoningType: 'bandwagon',
            isEvidenceOriented: false,
            points: 0,
            feedback: 'Forwarding unverified rumors spreads misinformation and creates widespread panic.',
            fallacyName: 'Viral Amplification',
            fallacyExplanation: 'Spreading unverified rumors before checking facts with primary sources.',
            clueTitle: 'Viral Transmission Risk',
            clueText: 'Forwarding unverified claims accelerates confusion across hundreds of peers.',
            evidenceCategory: 'Context',
            evidenceState: 'UNCERTAIN',
          },
        ],
      },
      {
        id: 'lead-contradictions',
        angle: 'look-contradictions',
        angleLabel: 'Look for Contradictions',
        title: `Compare Department Announcements`,
        iconName: 'GitCompare',
        prompt: `Do different departments or official faculty statements contradict this cancellation claim?`,
        contextHint: 'Look for contradictions between gossip and active departmental operations.',
        choices: [
          {
            id: 'ann-con-a',
            text: 'Obtain direct written clarification from the Department Head or Controller of Examinations.',
            reasoningType: 'evidence-seeking',
            isEvidenceOriented: true,
            points: 20,
            feedback: 'Definitive primary evidence that settles the question beyond doubt.',
            clueTitle: 'Department Head Clarification',
            clueText: `HOD issued written confirmation: "All scheduled ${eventType} sessions proceed strictly on schedule."`,
            evidenceCategory: 'Official Record',
            evidenceState: 'CONTRADICTS THE CLAIM',
          },
          {
            id: 'ann-con-b',
            text: 'Believe the rumor because everyone in the cafeteria is talking about it.',
            reasoningType: 'bandwagon',
            isEvidenceOriented: false,
            points: 5,
            feedback: 'Consensus in the cafeteria is not truth. Vikarna stood alone to challenge the consensus of an entire assembly.',
            fallacyName: 'Bandwagon Fallacy (Argumentum ad Populum)',
            fallacyExplanation: 'Assuming a claim is true simply because many people believe or repeat it.',
            clueTitle: 'Cafeteria Consensus Hazard',
            clueText: 'High volume of gossip does not equal verified truth.',
            evidenceCategory: 'Context',
            evidenceState: 'UNCERTAIN',
          },
          {
            id: 'ann-con-c',
            text: 'Check if campus examination halls and invigilation rosters are actively being prepared.',
            reasoningType: 'alternative-perspective',
            isEvidenceOriented: true,
            points: 15,
            feedback: 'Physical operational readiness confirms the true administrative intent.',
            clueTitle: 'Hall Readiness Audit',
            clueText: 'Staff confirmed exam halls are arranged and test papers are secured in the registrar vault.',
            evidenceCategory: 'Physical Fact',
            evidenceState: 'CONTRADICTS THE CLAIM',
          },
          {
            id: 'ann-con-d',
            text: 'Argue with anyone who tells you to keep studying.',
            reasoningType: 'direct-accusation',
            isEvidenceOriented: false,
            points: 0,
            feedback: 'Emotional arguments derail focus from necessary preparation.',
            fallacyName: 'Defensive Denial',
            fallacyExplanation: 'Rejecting facts that contradict personal wishes.',
            clueTitle: 'Emotional Argument Trap',
            clueText: 'Defensive arguments waste valuable study time.',
            evidenceCategory: 'Context',
            evidenceState: 'UNCERTAIN',
          },
        ],
      },
      {
        id: 'lead-motive',
        angle: 'investigate-motive',
        angleLabel: 'Investigate Motive',
        title: `Why Would Someone Create This Rumor?`,
        iconName: 'Target',
        prompt: `Why do cancellation rumors start during stressful periods? Remember: Motive is an explanation, NOT proof!`,
        contextHint: 'Understand cognitive wishful thinking and prank motives without treating motive alone as proof.',
        isMotiveCheck: true,
        motiveCaution: 'Understanding why someone shared a rumor helps explain how it spread, but we still verify official portal notices for proof.',
        choices: [
          {
            id: 'ann-mot-a',
            text: 'Exam stress creates wishful thinking, making students eagerly circulate any message that promises relief without verifying it.',
            reasoningType: 'motive-seeking',
            isEvidenceOriented: true,
            points: 20,
            feedback: 'Superb psychological insight! Stress lowers critical skepticism toward comforting news.',
            clueTitle: 'Wishful Thinking Mechanism Identified',
            clueText: 'Academic stress caused students to uncritically share old circulars without malicious intent.',
            evidenceCategory: 'Context',
            evidenceState: 'NEUTRAL',
          },
          {
            id: 'ann-mot-b',
            text: 'The student who forwarded it is an evil criminal who must be expelled immediately.',
            reasoningType: 'direct-accusation',
            isEvidenceOriented: false,
            points: 0,
            feedback: 'Disproportionate scapegoating ignores the reality that most forwarded rumors are careless mistakes rather than calculated malice.',
            fallacyName: 'Over-Dramatization / Scapegoating',
            fallacyExplanation: 'Attributing catastrophic malice to everyday carelessness.',
            clueTitle: 'Over-Dramatization Trap',
            clueText: 'Disproportionate anger does not replace fact-checking.',
            evidenceCategory: 'Context',
            evidenceState: 'UNCERTAIN',
          },
          {
            id: 'ann-mot-c',
            text: 'Share the official department clarification back into the student chat to protect peers from failing.',
            reasoningType: 'alternative-perspective',
            isEvidenceOriented: true,
            points: 20,
            feedback: 'True leadership! Sharing verified truth protects your classmates from making costly mistakes.',
            clueTitle: 'Truth Propagation',
            clueText: 'Debunking rumors with official proof helps dozens of confused classmates.',
            evidenceCategory: 'Official Record',
            evidenceState: 'NEUTRAL',
          },
          {
            id: 'ann-mot-d',
            text: 'Assume all announcements on the internet are lies and stop reading notices entirely.',
            reasoningType: 'assumption-based',
            isEvidenceOriented: false,
            points: 5,
            feedback: 'Cynicism is intellectual laziness. Critical thinking means learning to distinguish authentic portals from unverified screenshots.',
            fallacyName: 'Total Cynicism Fallacy',
            fallacyExplanation: 'Rejecting all information instead of learning to evaluate evidence.',
            clueTitle: 'Total Cynicism Pitfall',
            clueText: 'Cynicism prevents discovering authentic institutional notices.',
            evidenceCategory: 'Alternative Theory',
            evidenceState: 'UNCERTAIN',
          },
        ],
      },
    ];

    return {
      id: `case-announcement-${timestamp}`,
      rawSituation: rawText,
      caseCategory: 'Campus Announcement & Verification',
      caseTitle: `The ${capitalizedEvent} Cancellation Claim`,
      extractedClaim: `The scheduled ${eventType} has been officially cancelled or postponed by administration.`,
      claimContextNote: 'A forwarded message is an unverified claim. It is NOT automatically true until verified on the official portal.',
      knownFacts: [
        `A message, screenshot, or rumor is circulating in student group chats claiming the ${eventType} is off.`,
        `Some students have stopped studying based on the unverified forward.`,
        `No verified circular on the official institutional portal or signed PDF from the Dean has been verified yet.`,
      ],
      unknownFacts: [
        `Whether the circulating screenshot is an old notice from last year edited with altered dates.`,
        `Whether the official registrar or department office has published any circular.`,
        `The original author and intent behind the forwarded message.`,
      ],
      alternativeTheories: [
        `The ${eventType} is active and the circulating screenshot is an old or edited notice.`,
        `The administration secretly cancelled it without updating the website.`,
        `A postponement was requested by student representatives but never formally approved.`,
        `The message was a misinterpretation of a different course or schedule.`,
      ],
      leads,
      questions: leads,
      optimalVerdict: 'contradicted',
      verdictOptions: getStandardVerdictOptions('contradicted', `The ${eventType} remains fully active as confirmed by the department head and active portal timetable.`),
      hints: [
        `Have you checked the primary institutional portal rather than relying on chat screenshots?`,
        `Does the circular reference number match current year administrative records?`,
        `Are you believing this claim because you hope it is true (Wishful Thinking)?`,
        `What did the department faculty or coordinator state when contacted directly?`,
      ],
      vikarnaDialogue: [
        {
          id: 'v-1',
          question: 'Why do cancellation rumors spread so fast before exams?',
          response: 'When minds are fatigued with study, any rumor of a holiday offers sweet relief. Wishful thinking lowers our natural skepticism.',
          principle: 'When the crowd rejoices over an easy rumor, the wise person checks the official scroll.',
        },
        {
          id: 'v-2',
          question: 'What is the difference between a forward and an official notice?',
          response: 'A forward is hearsay repeated by echoes. An official notice is published on a verified domain with an authenticated circular reference number.',
          principle: 'Echoes multiply volume; only primary sources multiply truth.',
        },
        {
          id: 'v-3',
          question: 'What if someone swears their friend in the office told them?',
          response: 'That is the classic Appeal to Phantom Authority. Unless a signed circular exists, word of mouth cannot excuse an unexcused absence.',
          principle: 'Never gamble your preparation on unverified wishes.',
        },
      ],
      possibleExplanations: [
        {
          id: 'exp-1',
          title: `Schedule Remains Active — Circulated Notice is an Old Edited Screenshot`,
          explanation: `The ${eventType} will proceed as scheduled. The circulating message was an edited or recycled notice from last year spread through wishful thinking.`,
          supportedByEvidence: true,
          confidenceScore: 98,
          evidenceAlignmentReasoning: 'Supported by department written confirmation, active portal status, and mismatched circular date metadata.',
          isOriginalClaim: false,
        },
        {
          id: 'exp-2',
          title: `Schedule Cancelled Secretly by Administration`,
          explanation: 'The administration secretly cancelled the schedule without posting on the website or informing faculty.',
          supportedByEvidence: false,
          confidenceScore: 2,
          evidenceAlignmentReasoning: 'Completely contradicted by official portal status and explicit departmental statement.',
          isOriginalClaim: true,
        },
        {
          id: 'exp-3',
          title: 'Postponement Was Proposed but Never Formally Approved',
          explanation: 'A student request was drafted to postpone the schedule, which someone prematurely forwarded as an approved decision.',
          supportedByEvidence: true,
          confidenceScore: 68,
          evidenceAlignmentReasoning: 'Explains how the rumor started, but does not alter the fact that the schedule is officially active.',
          isOriginalClaim: false,
        },
      ],
      vikarnaWisdom: {
        title: 'Clarity Amidst the Clamor',
        message: 'When a crowd rejoices over an easy rumor, the thoughtful person checks the official scroll. Never gamble your preparation on unverified wishes.',
        principle: 'Question → Investigate → Find Evidence → Decide. Always verify with primary institutional sources.',
      },
    };
  }

  // --------------------------------------------------------------------------
  // 3. TEAMWORK / CHEATING CLAIM / PROJECT / ASSIGNMENT DISPUTE
  // --------------------------------------------------------------------------
  if (
    /\b(teammate|teammates|cheat|cheated|cheating|cheater|project|assignment|homework|group work|partner|partners|plagiar|plagiarism|copied|copying|contribute|contributed|contribution|contributions|presentation|slacking|slacker|credit)\b/i.test(cleaned)
  ) {
    const isCheating = /\b(cheat|cheated|cheating|cheater|plagiar|copied|copying)\b/i.test(cleaned);
    const accused = extractAccusedPerson(cleaned);
    const claimTitle = isCheating 
      ? 'The Project Cheating Allegation' 
      : 'The Group Contribution Dispute';
    const claimText = isCheating
      ? `A teammate (${accused}) allegedly copied work, cheated, or took dishonest shortcuts on the group project.`
      : `A teammate (${accused}) allegedly did zero work, ignored their teammates, and took unfair credit for the project.`;

    const leads: InvestigationLead[] = [
      {
        id: 'lead-evidence',
        angle: 'examine-evidence',
        angleLabel: 'Examine Evidence',
        title: `Draft Revision Logs & File History`,
        iconName: 'Search',
        prompt: `What objective evidence should we examine to verify ${accused}’s actual contribution and research?`,
        contextHint: 'Look for verifiable document history and draft notes rather than group chat gossip.',
        choices: [
          {
            id: 'team-ev-a',
            text: 'Inspect shared document revision history, offline research drafts, and timestamped edit logs.',
            reasoningType: 'evidence-seeking',
            isEvidenceOriented: true,
            points: 20,
            feedback: 'Perfect investigative move! Version histories and draft timestamps provide objective records of who drafted each section.',
            clueTitle: 'Document Revision History Inspected',
            clueText: `Edit logs show ${accused} made extensive research additions in offline drafts and merged them as scheduled.`,
            evidenceCategory: 'Physical Fact',
            evidenceState: 'CONTRADICTS THE CLAIM',
          },
          {
            id: 'team-ev-b',
            text: 'Rely on whoever complains the loudest in the back-channel group chat.',
            reasoningType: 'bandwagon',
            isEvidenceOriented: false,
            points: 5,
            feedback: 'Loud complaints measure emotional frustration, not the factual count of words and research produced.',
            fallacyName: 'Loudness Fallacy / Chat Echo Chamber',
            fallacyExplanation: 'Confusing emotional volume with factual accuracy.',
            clueTitle: 'Chatroom Frustration Bias',
            clueText: 'Group chat sentiment created an echo chamber before anyone opened the document version history.',
            evidenceCategory: 'Context',
            evidenceState: 'UNCERTAIN',
          },
          {
            id: 'team-ev-c',
            text: 'Review the initial project brief and task allocation notes to see what was originally assigned.',
            reasoningType: 'alternative-perspective',
            isEvidenceOriented: true,
            points: 20,
            feedback: 'Crucial check! Ambiguous task assignments cause over half of group project misunderstandings.',
            clueTitle: 'Task Allocation Notes Audited',
            clueText: `Meeting notes show ${accused} was assigned preliminary background research, which they completed.`,
            evidenceCategory: 'Official Record',
            evidenceState: 'CONTRADICTS THE CLAIM',
          },
          {
            id: 'team-ev-d',
            text: `Immediately report ${accused} to the instructor for a zero grade without speaking to them.`,
            reasoningType: 'direct-accusation',
            isEvidenceOriented: false,
            points: 0,
            feedback: 'Denying someone the opportunity to explain their progress violates basic procedural fairness.',
            fallacyName: 'Premature Escalation',
            fallacyExplanation: 'Escalating to punishment before reviewing primary evidence.',
            clueTitle: 'Premature Escalation Risk',
            clueText: 'Submitting formal accusations without internal dialogue damages team trust.',
            evidenceCategory: 'Context',
            evidenceState: 'UNCERTAIN',
          },
        ],
      },
      {
        id: 'lead-source',
        angle: 'check-source',
        angleLabel: 'Check the Source',
        title: `Verify Research Sources & Walkthrough`,
        iconName: 'UserCheck',
        prompt: `How should the team verify where the submitted content and research came from?`,
        contextHint: 'Distinguish between legitimate cited reference materials and unauthorized copying.',
        choices: [
          {
            id: 'team-src-a',
            text: `Conduct a brief sync asking ${accused} to explain their research sources, logic, and reference notes in their own words.`,
            reasoningType: 'evidence-seeking',
            isEvidenceOriented: true,
            points: 20,
            feedback: 'Superb! A student who genuinely conducted their research can effortlessly explain the concepts and sources.',
            clueTitle: 'Direct Walkthrough Completed',
            clueText: `${accused} fluently explained their findings and shared their original annotated reference notes.`,
            evidenceCategory: 'Testimony',
            evidenceState: 'CONTRADICTS THE CLAIM',
          },
          {
            id: 'team-src-b',
            text: 'Assume that any similarity in formatting or standard definitions means deliberate dishonesty.',
            reasoningType: 'assumption-based',
            isEvidenceOriented: false,
            points: 5,
            feedback: 'Standard definitions and approved course references naturally share identical core terminology.',
            fallacyName: 'Assumption of Bad Faith',
            fallacyExplanation: 'Treating standard shared definitions as proof of deliberate plagiarism.',
            clueTitle: 'Assumption of Bad Faith',
            clueText: 'Identical reference textbooks often lead different students to similar phrasing.',
            evidenceCategory: 'Alternative Theory',
            evidenceState: 'UNCERTAIN',
          },
          {
            id: 'team-src-c',
            text: 'Check the project bibliography and assignment citation rules approved by the course instructor.',
            reasoningType: 'alternative-perspective',
            isEvidenceOriented: true,
            points: 15,
            feedback: 'Checking assignment policy clarifies whether standard reference summaries were permitted.',
            clueTitle: 'Assignment Guidelines Verified',
            clueText: 'Course guidelines explicitly encourage citing and synthesizing recognized academic sources.',
            evidenceCategory: 'Official Record',
            evidenceState: 'CONTRADICTS THE CLAIM',
          },
          {
            id: 'team-src-d',
            text: 'Post accusations in a public student forum and ask peers to vote on guilt.',
            reasoningType: 'bandwagon',
            isEvidenceOriented: false,
            points: 0,
            feedback: 'Popularity votes and public shaming have zero correlation with academic truth.',
            fallacyName: 'Trial by Social Media',
            fallacyExplanation: 'Submitting factual questions to popular sentiment polls.',
            clueTitle: 'Trial by Social Media',
            clueText: 'Social media mobs amplify outrage without examining technical context.',
            evidenceCategory: 'Context',
            evidenceState: 'UNCERTAIN',
          },
        ],
      },
      {
        id: 'lead-motive',
        angle: 'investigate-motive',
        angleLabel: 'Investigate Motive',
        title: `Why Is There Friction in the Team?`,
        iconName: 'Target',
        prompt: `Why might other team members be frustrated with ${accused}? Remember: Motive is an explanation, NOT proof!`,
        contextHint: 'Understand team communication friction without confusing frustration with proof of cheating.',
        isMotiveCheck: true,
        motiveCaution: 'Team frustration explains why accusations started, but frustration alone is NOT proof of cheating. We evaluate verified drafts.',
        choices: [
          {
            id: 'team-mot-a',
            text: `${accused} worked silently without posting progress updates in the chat, causing anxiety for others, but silent working is not proof of cheating.`,
            reasoningType: 'motive-seeking',
            isEvidenceOriented: true,
            points: 20,
            feedback: 'Dharmic insight! Communication style differences cause anxiety, which people mistakenly convert into accusations of cheating.',
            clueTitle: 'Communication Friction Identified',
            clueText: 'Poor communication created anxiety, but document logs prove the work was completed on time.',
            evidenceCategory: 'Context',
            evidenceState: 'NEUTRAL',
          },
          {
            id: 'team-mot-b',
            text: `Because ${accused} was quiet, they definitely did nothing and deserve a zero.`,
            reasoningType: 'direct-accusation',
            isEvidenceOriented: false,
            points: 0,
            feedback: 'Quietness is a personality trait, not proof of slacking or cheating.',
            fallacyName: 'Equating Introversion with Incompetence',
            fallacyExplanation: 'Assuming someone did no work simply because they communicated less frequently.',
            clueTitle: 'Quietness Bias Trap',
            clueText: 'Judging work volume by chat frequency is an empirical error.',
            evidenceCategory: 'Context',
            evidenceState: 'UNCERTAIN',
          },
          {
            id: 'team-mot-c',
            text: 'Establish a shared task tracker with explicit milestone check-ins for the remaining project phases.',
            reasoningType: 'alternative-perspective',
            isEvidenceOriented: true,
            points: 20,
            feedback: 'Constructive leadership that turns suspicion into healthy collaboration.',
            clueTitle: 'Shared Task Tracker Established',
            clueText: 'Clear milestones eliminate ambiguity and keep all members synchronized.',
            evidenceCategory: 'Official Record',
            evidenceState: 'NEUTRAL',
          },
          {
            id: 'team-mot-d',
            text: 'Refuse to work with them ever again and gossip to the whole class.',
            reasoningType: 'bandwagon',
            isEvidenceOriented: false,
            points: 0,
            feedback: 'Retaliatory gossip damages teams and ignores verified contributions.',
            fallacyName: 'Retaliatory Ostracization',
            fallacyExplanation: 'Excluding a teammate based on unverified emotional resentment.',
            clueTitle: 'Retaliatory Ostracization Hazard',
            clueText: 'Excluding teammates based on rumors harms project marks.',
            evidenceCategory: 'Context',
            evidenceState: 'UNCERTAIN',
          },
        ],
      },
      {
        id: 'lead-contradictions',
        angle: 'look-contradictions',
        angleLabel: 'Look for Contradictions',
        title: `Message Logs & Communication Timeline`,
        iconName: 'GitCompare',
        prompt: `Do message logs contradict the claim that ${accused} ignored the team?`,
        contextHint: 'Inspect timestamped communication records.',
        choices: [
          {
            id: 'team-con-a',
            text: `Audit the group chat history: check if ${accused} previously posted questions or draft links that went unanswered.`,
            reasoningType: 'evidence-seeking',
            isEvidenceOriented: true,
            points: 20,
            feedback: 'Objective timeline evidence dispels one-sided narratives.',
            clueTitle: 'Message Timestamp Audit',
            clueText: `Logs confirm ${accused} sent questions regarding draft formatting that were overlooked by other members.`,
            evidenceCategory: 'Official Record',
            evidenceState: 'CONTRADICTS THE CLAIM',
          },
          {
            id: 'team-con-b',
            text: 'Assume the majority memory of the group chat is always accurate.',
            reasoningType: 'assumption-based',
            isEvidenceOriented: false,
            points: 5,
            feedback: 'Shared emotional narratives often distort who actually sent what message.',
            fallacyName: 'Shared Memory Distortion',
            fallacyExplanation: 'Assuming group consensus replaces written chat timestamps.',
            clueTitle: 'Shared Memory Distortion',
            clueText: 'Relying on selective memory ignores verified message archives.',
            evidenceCategory: 'Context',
            evidenceState: 'UNCERTAIN',
          },
          {
            id: 'team-con-c',
            text: 'Integrate all verified research sections and review the complete draft as a team.',
            reasoningType: 'alternative-perspective',
            isEvidenceOriented: true,
            points: 20,
            feedback: 'Collaborative problem solving that ensures full marks for everyone.',
            clueTitle: 'Draft Integrated Successfully',
            clueText: 'The combined project includes all research sections and meets all rubric requirements.',
            evidenceCategory: 'Physical Fact',
            evidenceState: 'CONTRADICTS THE CLAIM',
          },
          {
            id: 'team-con-d',
            text: 'Delete their section and do it all yourself in anger.',
            reasoningType: 'direct-accusation',
            isEvidenceOriented: false,
            points: 0,
            feedback: 'Silent martyrdom creates resentment and destroys valid research.',
            fallacyName: 'Martyrdom Fallacy',
            fallacyExplanation: 'Deleting peer work in anger rather than verifying its validity.',
            clueTitle: 'Martyrdom Pitfall',
            clueText: 'Deleting peer contributions harms overall project quality.',
            evidenceCategory: 'Context',
            evidenceState: 'UNCERTAIN',
          },
        ],
      },
    ];

    return {
      id: `case-teamwork-${timestamp}`,
      rawSituation: rawText,
      caseCategory: 'Teamwork & Academic Integrity',
      caseTitle: claimTitle,
      extractedClaim: claimText,
      claimContextNote: 'An allegation in a group chat is a claim, NOT a verified fact. Review draft edit history before judging.',
      knownFacts: [
        `Rumors or complaints have circulated in group chats regarding ${accused}’s work on the project.`,
        `Deliverables or research drafts showed sudden additions or formatting differences that raised suspicion.`,
        `No team member had reviewed ${accused}’s draft notes, document edit history, or spoken with them directly.`,
      ],
      unknownFacts: [
        `Whether ${accused} worked offline on personal drafts due to connection blockers.`,
        `Whether ${accused} used authorized reference sources and cited literature.`,
        `What specific task breakdown was agreed upon during the initial project planning meeting.`,
      ],
      alternativeTheories: [
        `${accused} genuinely did the research offline and completed their assigned deliverable.`,
        `${accused} copied material directly without understanding or citing.`,
        `Poor communication and ambiguous task roles caused misunderstanding among teammates.`,
        `The team mistakenly assumed quiet working was proof of zero contribution.`,
      ],
      leads,
      questions: leads,
      optimalVerdict: 'contradicted',
      verdictOptions: getStandardVerdictOptions('contradicted', `Version histories, draft notes, and walkthrough mastery confirmed ${accused} completed legitimate independent research.`),
      hints: [
        `Have you inspected the shared document revision logs to see who wrote which sections?`,
        `Did the teammate explain their research and sources fluently during a walkthrough?`,
        `Are you confusing poor communication with intentional cheating?`,
        `Were task assignments clearly documented in writing at the project start?`,
      ],
      vikarnaDialogue: [
        {
          id: 'v-1',
          question: 'Why do teammates turn against each other so easily in projects?',
          response: 'When deadlines loom and communication is ambiguous, anxiety turns into blame. It is easier to accuse a quiet peer than to review the task ledger.',
          principle: 'Examine the work before you condemn the worker.',
        },
        {
          id: 'v-2',
          question: 'How do I know if someone genuinely wrote their part?',
          response: 'Ask them to explain their logic and trade-offs. A person who wrote the research can effortlessly explain the concepts in their own words.',
          principle: 'Fluency in explanation is the hallmark of genuine effort.',
        },
        {
          id: 'v-3',
          question: 'What if someone didn\'t talk much in the chat?',
          response: 'Communication style is not work output. Document revision histories measure words written, not chat volume.',
          principle: 'Judge by tangible artifacts, not chatroom noise.',
        },
      ],
      possibleExplanations: [
        {
          id: 'exp-1',
          title: 'Legitimate Independent Research with Standard Academic References',
          explanation: `The teammate (${accused}) legitimately completed their assigned research offline using standard reference materials and drafts, but communicated poorly with the group before submission.`,
          supportedByEvidence: true,
          confidenceScore: 92,
          evidenceAlignmentReasoning: 'Supported by timestamped document revisions, fluent conceptual walkthrough, and handwritten draft notes.',
          isOriginalClaim: false,
        },
        {
          id: 'exp-2',
          title: 'Deliberate Plagiarism & Zero Honest Effort',
          explanation: `The teammate (${accused}) intentionally copied someone else’s work word-for-word without understanding or contributing.`,
          supportedByEvidence: false,
          confidenceScore: 14,
          evidenceAlignmentReasoning: `Refuted by ${accused}’s verified research notes, draft edit history, and conceptual mastery during the walkthrough.`,
          isOriginalClaim: true,
        },
        {
          id: 'exp-3',
          title: 'Misunderstood Citation Guidelines & Role Ambiguity',
          explanation: `The teammate (${accused}) misunderstood how to format shared citations or where to merge draft sections, leading to mistaken suspicion of misconduct.`,
          supportedByEvidence: true,
          confidenceScore: 82,
          evidenceAlignmentReasoning: 'Supported by ambiguous initial meeting notes and lack of clear team communication before submission.',
          isOriginalClaim: false,
        },
      ],
      vikarnaWisdom: {
        title: 'Justice in the Council of Peers',
        message: 'When suspicion clouds a shared effort, do not join the chorus of accusation. Examine the drafts, check the notes, and listen to every voice before passing judgment.',
        principle: 'Question → Investigate → Find Evidence → Decide. Examine the work before you condemn the worker.',
      },
    };
  }

  // --------------------------------------------------------------------------
  // 4. GENERAL / DYNAMIC FALLBACK FOR ANY USER SITUATION
  // --------------------------------------------------------------------------
  const shortSnippet = cleaned.length > 50 ? `${cleaned.slice(0, 48)}...` : cleaned;

  const leads: InvestigationLead[] = [
    {
      id: 'lead-evidence',
      angle: 'examine-evidence',
      angleLabel: 'Examine Evidence',
      title: 'Inspect Primary Artifacts & Records',
      iconName: 'Search',
      prompt: `What primary records or physical artifacts can test the claim: "${shortSnippet}"?`,
      contextHint: 'Isolate objective data points from speculative interpretations.',
      choices: [
        {
          id: 'gen-ev-a',
          text: 'Separate verifiable objective facts from emotional commentary and inspect timestamped records.',
          reasoningType: 'evidence-seeking',
          isEvidenceOriented: true,
          points: 20,
          feedback: 'Crucial first step! Isolating raw data from subjective opinions brings immediate clarity.',
          clueTitle: 'Fact vs. Narrative Separation',
          clueText: 'Isolating objective data points reveals that 80% of the circulating narrative was speculative interpretation.',
          evidenceCategory: 'Physical Fact',
          evidenceState: 'NEUTRAL',
        },
        {
          id: 'gen-ev-b',
          text: 'Believe the story immediately because everyone around seems to agree with it.',
          reasoningType: 'bandwagon',
          isEvidenceOriented: false,
          points: 5,
          feedback: 'Consensus is not truth. Vikarna stood alone to challenge the consensus of the royal court.',
          fallacyName: 'Bandwagon Fallacy',
          fallacyExplanation: 'Assuming a claim is true simply because many people repeat it.',
          clueTitle: 'Consensus Bias Warning',
          clueText: 'Agreement among peers often reflects social conformity rather than verified facts.',
          evidenceCategory: 'Alternative Theory',
          evidenceState: 'UNCERTAIN',
        },
        {
          id: 'gen-ev-c',
          text: 'Consult direct firsthand participants rather than second-hand messengers.',
          reasoningType: 'evidence-seeking',
          isEvidenceOriented: true,
          points: 20,
          feedback: 'Outstanding! Primary sources eliminate distortion introduced by telephone-game retellings.',
          clueTitle: 'Primary Source Verified',
          clueText: 'Direct stakeholder testimony provides a clear, grounded factual timeline.',
          evidenceCategory: 'Testimony',
          evidenceState: 'CONTRADICTS THE CLAIM',
        },
        {
          id: 'gen-ev-d',
          text: 'Pick someone to blame immediately so the issue is closed.',
          reasoningType: 'direct-accusation',
          isEvidenceOriented: false,
          points: 0,
          feedback: 'Rushing to pin blame creates injustice and leaves the root cause unsolved.',
          fallacyName: 'Precipitous Blame',
          fallacyExplanation: 'Assigning blame without evidence to seek rapid closure.',
          clueTitle: 'Precipitous Blame Hazard',
          clueText: 'Assigning blame without evidence creates lasting conflict.',
          evidenceCategory: 'Context',
          evidenceState: 'UNCERTAIN',
        },
      ],
    },
    {
      id: 'lead-source',
      angle: 'check-source',
      angleLabel: 'Check the Source',
      title: 'Audit the Information Source',
      iconName: 'UserCheck',
      prompt: `Who originally made this claim, and is their information firsthand or hearsay?`,
      contextHint: 'Examine source credibility, directness of observation, and potential bias.',
      choices: [
        {
          id: 'gen-src-a',
          text: 'Check if the source directly witnessed the event and whether their statement can be corroborated.',
          reasoningType: 'source-verification',
          isEvidenceOriented: true,
          points: 20,
          feedback: 'Sharp auditing! Directly witnessed statements must be distinguished from forwarded hearsay.',
          clueTitle: 'Source Directness Evaluated',
          clueText: 'The source admitted they heard the story second-hand and did not directly witness the event.',
          evidenceCategory: 'Testimony',
          evidenceState: 'UNCERTAIN',
        },
        {
          id: 'gen-src-b',
          text: 'Trust the claim blindly because the person sharing it is popular.',
          reasoningType: 'assumption-based',
          isEvidenceOriented: false,
          points: 5,
          feedback: 'Popularity has zero correlation with empirical accuracy.',
          fallacyName: 'Halo Effect / Popularity Bias',
          fallacyExplanation: 'Assuming attractive or popular sources are inherently accurate.',
          clueTitle: 'Popularity Bias Trap',
          clueText: 'Popularity is not a substitute for verified evidence.',
          evidenceCategory: 'Context',
          evidenceState: 'UNCERTAIN',
        },
        {
          id: 'gen-src-c',
          text: 'Give all individuals involved a fair, quiet opportunity to present their documentation.',
          reasoningType: 'alternative-perspective',
          isEvidenceOriented: true,
          points: 20,
          feedback: 'The cornerstone of justice (Audi Alteram Partem: listen to the other side).',
          clueTitle: 'Fair Hearing Protocol',
          clueText: 'Hearing both sides revealed crucial missing context that disproved the original claim.',
          evidenceCategory: 'Testimony',
          evidenceState: 'CONTRADICTS THE CLAIM',
        },
        {
          id: 'gen-src-d',
          text: 'Dismiss everyone involved as dishonest without checking.',
          reasoningType: 'assumption-based',
          isEvidenceOriented: false,
          points: 0,
          feedback: 'Cynicism is an emotional defense, not evidence-based investigation.',
          fallacyName: 'Blanket Cynicism',
          fallacyExplanation: 'Rejecting all statements without examining evidence.',
          clueTitle: 'Blanket Cynicism Pitfall',
          clueText: 'Assuming bad faith blinds the investigator to genuine evidence.',
          evidenceCategory: 'Context',
          evidenceState: 'UNCERTAIN',
        },
      ],
    },
    {
      id: 'lead-alternative',
      angle: 'alternative-explanation',
      angleLabel: 'Alternative Explanations',
      title: 'Formulate Alternative Theories',
      iconName: 'Lightbulb',
      prompt: `What alternative hypotheses could explain "${shortSnippet}" without assuming malice or fault?`,
      contextHint: 'Evaluate non-hostile interpretations before jumping to conclusions.',
      choices: [
        {
          id: 'gen-alt-a',
          text: 'Explore whether an innocent misunderstanding, honest communication gap, or technical glitch occurred.',
          reasoningType: 'alternative-perspective',
          isEvidenceOriented: true,
          points: 20,
          feedback: 'Hanlon’s Razor: Never attribute to malice what is adequately explained by simple misunderstanding.',
          clueTitle: 'Alternative Hypothesis Formulated',
          clueText: 'Evaluating non-hostile explanations accounts for the observed timeline without assuming bad faith.',
          evidenceCategory: 'Alternative Theory',
          evidenceState: 'CONTRADICTS THE CLAIM',
        },
        {
          id: 'gen-alt-b',
          text: 'Insist that only the most dramatic and scandalous explanation can be true.',
          reasoningType: 'assumption-based',
          isEvidenceOriented: false,
          points: 5,
          feedback: 'Sensationalism magnifies drama but leads away from factual truth.',
          fallacyName: 'Sensationalism Bias',
          fallacyExplanation: 'Favoring sensational narratives over mundane factual explanations.',
          clueTitle: 'Sensationalism Bias Hazard',
          clueText: 'Sensationalism distorts reality in favor of dramatic fiction.',
          evidenceCategory: 'Context',
          evidenceState: 'UNCERTAIN',
        },
        {
          id: 'gen-alt-c',
          text: 'Document the verified timeline openly so all stakeholders share a single factual reality.',
          reasoningType: 'alternative-perspective',
          isEvidenceOriented: true,
          points: 20,
          feedback: 'Transparency brings long-term harmony and resolves doubts permanently.',
          clueTitle: 'Transparent Record Established',
          clueText: 'A clear shared timeline dispels misunderstandings permanently.',
          evidenceCategory: 'Official Record',
          evidenceState: 'NEUTRAL',
        },
        {
          id: 'gen-alt-d',
          text: 'Refuse to investigate further and assume nothing can ever be known.',
          reasoningType: 'assumption-based',
          isEvidenceOriented: false,
          points: 0,
          feedback: 'Apathy abandons truth to those who shout the loudest.',
          fallacyName: 'Intellectual Apathy',
          fallacyExplanation: 'Surrendering inquiry out of disinterest or defeatism.',
          clueTitle: 'Apathy Hazard',
          clueText: 'Apathy allows false rumors to flourish unchallenged.',
          evidenceCategory: 'Context',
          evidenceState: 'UNCERTAIN',
        },
      ],
    },
    {
      id: 'lead-motive',
      angle: 'investigate-motive',
      angleLabel: 'Investigate Motive',
      title: 'Analyze Motive vs. Proof',
      iconName: 'Target',
      prompt: `Why might people be insisting on this narrative? Remember: Motive is a lead, NOT proof!`,
      contextHint: 'Understand human incentives without treating motive alone as conclusive evidence.',
      isMotiveCheck: true,
      motiveCaution: 'Motive could explain why someone insists on an assertion, but motive alone NEVER proves guilt or falsehood. Evidence is required.',
      choices: [
        {
          id: 'gen-mot-a',
          text: 'Acknowledge that personal motives or confirmation bias may influence the narrative, but base the verdict on evidence alone.',
          reasoningType: 'motive-seeking',
          isEvidenceOriented: true,
          points: 20,
          feedback: 'Principle of Vikarna! Motive explains human perspective, but empirical evidence determines truth.',
          clueTitle: 'Motive Placed in Proper Context',
          clueText: 'Motive was recognized as a contributing factor without substituting for tangible evidence.',
          evidenceCategory: 'Context',
          evidenceState: 'NEUTRAL',
        },
        {
          id: 'gen-mot-b',
          text: 'Conclude that someone must be guilty simply because they have a reason to benefit.',
          reasoningType: 'direct-accusation',
          isEvidenceOriented: false,
          points: 0,
          feedback: 'Critical error: Having a potential motive does not prove an action occurred. Direct evidence is required.',
          fallacyName: 'Motive as Proof Fallacy',
          fallacyExplanation: 'Treating a possible motive as sufficient proof of guilt.',
          clueTitle: 'Motive as Proof Pitfall',
          clueText: 'Assuming guilt based on motive alone leads to grave miscarriages of justice.',
          evidenceCategory: 'Alternative Theory',
          evidenceState: 'UNCERTAIN',
        },
        {
          id: 'gen-mot-c',
          text: 'Cross-reference testimony against verifiable timeline anchors, written records, and physical evidence.',
          reasoningType: 'evidence-seeking',
          isEvidenceOriented: true,
          points: 20,
          feedback: 'Methodical and sound. Objective physical anchors reveal which narrative fits reality.',
          clueTitle: 'Timeline Anchoring Complete',
          clueText: 'Timestamped records confirm the event occurred under completely different circumstances than claimed.',
          evidenceCategory: 'Physical Fact',
          evidenceState: 'CONTRADICTS THE CLAIM',
        },
        {
          id: 'gen-mot-d',
          text: 'Base judgment on who speaks with greater anger or emotional drama.',
          reasoningType: 'assumption-based',
          isEvidenceOriented: false,
          points: 0,
          feedback: 'Emotional intensity is not an indicator of truth.',
          fallacyName: 'Appeal to Emotion',
          fallacyExplanation: 'Mistaking emotional intensity for empirical proof.',
          clueTitle: 'Emotional Intensity Trap',
          clueText: 'Emotional outbursts distort calm factual evaluation.',
          evidenceCategory: 'Context',
          evidenceState: 'UNCERTAIN',
        },
      ],
    },
  ];

  return {
    id: `case-general-${timestamp}`,
    rawSituation: rawText,
    caseCategory: 'Rumour & Claim Verification',
    caseTitle: `Investigation: ${shortSnippet}`,
    extractedClaim: `The claim "${cleaned}" is accurate and fully explains the situation without needing further verification.`,
    claimContextNote: 'A claim is an unverified assertion. It is NOT automatically a fact until tested against evidence.',
    knownFacts: [
      `A specific assertion, rumor, or question has been raised: "${cleaned}".`,
      `Initial claims or emotional opinions are circulating without a formal review of primary records.`,
      `Key participants and alternative explanations have not yet been systematically cross-examined.`,
    ],
    unknownFacts: [
      `The direct, firsthand testimony of the core individuals involved in the situation.`,
      `Verifiable physical artifacts, timestamped records, or official documentation.`,
      `Whether alternative, non-malicious reasons (mistakes, communication gaps) explain the event.`,
    ],
    alternativeTheories: [
      `The claim is accurate as stated.`,
      `The claim is a misunderstanding resulting from incomplete communication.`,
      `The claim is contradicted by physical timeline records.`,
      `There is not enough information currently available to reach a definitive verdict.`,
    ],
    leads,
    questions: leads,
    optimalVerdict: 'contradicted',
    verdictOptions: getStandardVerdictOptions('contradicted', `Physical timeline records and primary source statements disproved the initial unverified claim.`),
    hints: [
      `Ask yourself whether anyone actually witnessed the event firsthand.`,
      `Are you treating someone's motive as proof of their guilt or falsehood?`,
      `What evidence would distinguish an innocent mistake from deliberate malice?`,
      `Could the same evidence have another explanation?`,
    ],
    vikarnaDialogue: [
      {
        id: 'v-1',
        question: 'Why is it important not to treat motive as proof?',
        response: 'A motive explains why someone might desire something, but it does not prove they acted on that desire. Many people have motives they never act upon.',
        principle: 'Motive is a clue for investigation, never a substitute for proof.',
      },
      {
        id: 'v-2',
        question: 'What if everyone around me believes the claim?',
        response: 'Popularity is not truth. In the assembly of Hastinapur, all the elders remained silent; Vikarna stood alone because dharma requires evidence, not conformity.',
        principle: 'Do not follow the crowd; follow the evidence.',
      },
      {
        id: 'v-3',
        question: 'Is saying "I don\'t know yet" acceptable?',
        response: 'It is the highest form of intellectual courage. When evidence is incomplete, admitting uncertainty prevents unjust condemnation.',
        principle: 'Honest uncertainty is superior to false certainty.',
      },
    ],
    possibleExplanations: [
      {
        id: 'exp-1',
        title: 'Evidence-Supported Measured Explanation',
        explanation: `The situation regarding "${cleaned}" was primarily driven by incomplete information and misunderstandings rather than malice.`,
        supportedByEvidence: true,
        confidenceScore: 92,
        evidenceAlignmentReasoning: 'Supported by the primary source records, timeline analysis, and direct stakeholder testimony.',
        isOriginalClaim: false,
      },
      {
        id: 'exp-2',
        title: 'Original Unverified Popular Accusation',
        explanation: `The initial rumor was 100% correct in every detail and everyone who agreed initially was right without needing proof.`,
        supportedByEvidence: false,
        confidenceScore: 15,
        evidenceAlignmentReasoning: 'Contradicted by the discovered clues and lack of corroborating physical documentation.',
        isOriginalClaim: true,
      },
      {
        id: 'exp-3',
        title: 'Mixed Responsibility with Contextual Mitigation',
        explanation: `There were contributing factors on multiple sides, but no intentional deception occurred.`,
        supportedByEvidence: true,
        confidenceScore: 80,
        evidenceAlignmentReasoning: 'Consistent with the observed communication gaps and system ambiguities.',
        isOriginalClaim: false,
      },
    ],
    vikarnaWisdom: {
      title: 'The Discipline of Dharmic Reason',
      message: 'When all around you rush to judge, stand tall, examine the evidence, and let truth be your sole guiding light.',
      principle: 'Question → Investigate → Find Evidence → Decide. Sometimes the original claim is true; sometimes it is false; only evidence reveals the difference.',
    },
  };
}

/**
 * Evaluates the player's hypothesis against collected clues so far
 */
export function evaluateHypothesis(
  theoryText: string,
  caseData: GeneratedCase,
  discoveredClues: DiscoveredClue[]
): PlayerHypothesis {
  const text = theoryText.toLowerCase();
  const clueCount = discoveredClues.length;

  if (clueCount === 0) {
    return {
      theoryText,
      status: 'NOT ENOUGH EVIDENCE',
      feedback: 'You have not investigated any leads yet. Before formulating a hypothesis, examine at least one evidence angle.',
      reasoningWeakness: 'Forming a conclusion prior to examining any physical or source records.',
      suggestedAction: 'Click "Examine Evidence" or "Check the Source" to collect initial clues.',
      evaluatedAtClueCount: 0,
    };
  }

  const contradictsCount = discoveredClues.filter(c => c.evidenceState === 'CONTRADICTS THE CLAIM').length;
  const supportsCount = discoveredClues.filter(c => c.evidenceState === 'SUPPORTS THE CLAIM').length;

  // Check if player is guessing guilt purely based on bandwagon/motive
  if (/\b(everyone|everybody|they say|rumor|guilty|stole|cheated|liar|evil)\b/i.test(text) && contradictsCount >= 1) {
    return {
      theoryText,
      status: 'CONTRADICTED BY THE EVIDENCE',
      feedback: 'Your current hypothesis claims guilt, but the clues on your Evidence Board show physical records and timeline markers that contradict the accusation.',
      reasoningWeakness: 'Relying on initial gossip or assumed motive while ignoring physical timeline records.',
      suggestedAction: 'Review the clues on your Evidence Board or click "Consider Another Explanation".',
      evaluatedAtClueCount: clueCount,
    };
  }

  // Check if player is considering innocent / alternative explanations
  if (/\b(misplaced|lost|accident|mistake|innocent|offline|draft|confusion|old notice|not cancelled|not stolen)\b/i.test(text)) {
    if (contradictsCount >= 2) {
      return {
        theoryText,
        status: 'SUPPORTED BY CURRENT EVIDENCE',
        feedback: 'Excellent critical thinking! Your hypothesis aligns directly with the physical records, timeline reconstruction, and primary source statements on your Evidence Board.',
        suggestedAction: 'Continue investigating remaining angles or proceed to the Decision Phase.',
        evaluatedAtClueCount: clueCount,
      };
    } else {
      return {
        theoryText,
        status: 'PARTIALLY SUPPORTED',
        feedback: 'Plausible theory! Initial clues point toward an innocent explanation or miscommunication, but continue verifying the remaining angles.',
        suggestedAction: 'Check the information source or inspect what is still unknown.',
        evaluatedAtClueCount: clueCount,
      };
    }
  }

  // Check if player's theory aligns with supports or contradicts
  if (supportsCount >= 2 && text.includes('claim')) {
    return {
      theoryText,
      status: 'SUPPORTED BY CURRENT EVIDENCE',
      feedback: `Your theory aligns with the corroborating evidence for "${caseData.extractedClaim}".`,
      suggestedAction: 'Review remaining angles or proceed to the Decision Phase.',
      evaluatedAtClueCount: clueCount,
    };
  }

  // Default evaluation based on clue volume
  if (clueCount >= 3) {
    return {
      theoryText,
      status: 'PARTIALLY SUPPORTED',
      feedback: `Your theory accounts for some observations regarding "${caseData.extractedClaim}". Compare it against the evidence balance on your Evidence Board.`,
      suggestedAction: 'Weigh whether the claim is supported, contradicted, or still uncertain.',
      evaluatedAtClueCount: clueCount,
    };
  }

  return {
    theoryText,
    status: 'NOT ENOUGH EVIDENCE',
    feedback: 'There are still unexamined angles. Collect more clues to test whether this theory holds true.',
    suggestedAction: 'Investigate at least 2 more leads on your dashboard.',
    evaluatedAtClueCount: clueCount,
  };
}

/**
 * Intelligent mock response for "Ask Vikarna" feature
 */
export function askVikarnaMock(
  questionText: string,
  caseData: GeneratedCase,
  clues: DiscoveredClue[]
): { answer: string; principle: string } {
  const q = questionText.toLowerCase();

  // Match presets if exists
  const preset = caseData.vikarnaDialogue.find(p => 
    q.includes(p.question.toLowerCase()) || p.question.toLowerCase().includes(q)
  );
  if (preset) {
    return {
      answer: preset.response,
      principle: preset.principle,
    };
  }

  if (/\b(why|lie|false|motive)\b/i.test(q)) {
    return {
      answer: 'People often repeat claims not out of malice, but from anxiety, wishful thinking, or relying on second-hand hearsay. Understanding motive helps us understand human perspective, but we must never treat motive alone as proof of guilt or innocence.',
      principle: 'Motive is a lead for inquiry, never a substitute for evidence.',
    };
  }

  if (/\b(missing|what am i missing|clue|lead)\b/i.test(q)) {
    const uninvestigatedCount = caseData.leads.length - clues.length;
    return {
      answer: uninvestigatedCount > 0 
        ? `You still have ${uninvestigatedCount} unexamined investigation lead(s). Have you checked the primary source and looked for timeline contradictions?`
        : 'You have gathered comprehensive clues! Now look at the evidence balance on your Evidence Board. Does the weight of facts support or contradict the claim?',
      principle: 'A complete investigation leaves no primary record unexamined.',
    };
  }

  if (/\b(innocent|guilty|did it|true|false)\b/i.test(q)) {
    return {
      answer: 'Do not decide guilt or innocence in haste. Look at your Evidence Board: Are there physical logs that corroborate or refute the claim? Let the tangible records guide your verdict.',
      principle: 'Evidence precedes judgment. Truth has no fear of inquiry.',
    };
  }

  if (/\b(uncertain|don't know|not enough)\b/i.test(q)) {
    return {
      answer: 'Saying "I do not have enough evidence to decide yet" is a hallmark of intellectual courage. When primary records are absent, honest uncertainty is far nobler than guessing.',
      principle: 'Honest uncertainty is superior to false certainty.',
    };
  }

  return {
    answer: `Regarding "${caseData.extractedClaim}": Always ask yourself three questions: Who saw it firsthand? What physical records exist? And could there be an innocent alternative explanation?`,
    principle: caseData.vikarnaWisdom.principle,
  };
}

/**
 * Calculates Curiosity Stars and detailed reasoning score breakdown based on quality of reasoning
 */
export function calculateCuriosityScore(
  selectedChoices: LeadChoice[],
  chosenVerdict: FinalVerdictType | null,
  totalLeads: number,
  hypothesesCreated: number = 0
): PlayerScoreBreakdown {
  // 1. Asked for evidence: Selected evidence-seeking actions
  const evidenceChoicesCount = selectedChoices.filter(
    (c) => c.reasoningType === 'evidence-seeking'
  ).length;
  const earnedAskingForEvidence = evidenceChoicesCount >= 2;

  // 2. Checked the source: Selected source verification actions
  const sourceChoicesCount = selectedChoices.filter(
    (c) => c.reasoningType === 'source-verification' || c.reasoningType === 'evidence-seeking'
  ).length;
  const earnedCheckingSource = sourceChoicesCount >= 1;

  // 3. Considered an alternative explanation: Investigated alternative hypotheses
  const alternativeChoicesCount = selectedChoices.filter(
    (c) => c.reasoningType === 'alternative-perspective'
  ).length;
  const earnedAlternativeExplanation = alternativeChoicesCount >= 1;

  // 4. Questioned an assumption / avoided bandwagon:
  const bandwagonChoicesCount = selectedChoices.filter(
    (c) => c.reasoningType === 'bandwagon'
  ).length;
  const earnedQuestionedAssumption = bandwagonChoicesCount === 0 || selectedChoices.length >= 3;

  // 5. Avoided unsupported accusation (did not treat motive or gossip as proof)
  const accusatoryChoicesCount = selectedChoices.filter(
    (c) => c.reasoningType === 'direct-accusation'
  ).length;
  const earnedAvoidingAccusation = accusatoryChoicesCount <= 1;

  // 6. Tested hypotheses / adapted thinking
  const earnedHypothesisTesting = hypothesesCreated >= 1 || selectedChoices.length >= 3;

  // 7. Recognized evidence alignment & uncertainty
  const earnedEvidenceDecision = chosenVerdict === 'contradicted' || chosenVerdict === 'uncertain' || chosenVerdict === 'supported';

  const scoreItems: CuriosityScoreItem[] = [
    {
      id: 'rubric-1',
      label: 'Asked for concrete evidence',
      earned: earnedAskingForEvidence,
      points: earnedAskingForEvidence ? 1 : 0,
      description: 'Prioritized physical records, logs, and perimeter search over hearsay.',
    },
    {
      id: 'rubric-2',
      label: 'Checked the information source',
      earned: earnedCheckingSource,
      points: earnedCheckingSource ? 1 : 0,
      description: 'Audited whether claims were eyewitness testimony or unverified forwards.',
    },
    {
      id: 'rubric-3',
      label: 'Considered alternative explanations',
      earned: earnedAlternativeExplanation,
      points: earnedAlternativeExplanation ? 1 : 0,
      description: 'Explored innocent possibilities, misplacement, or communication gaps.',
    },
    {
      id: 'rubric-4',
      label: 'Avoided the bandwagon & questioned assumptions',
      earned: earnedQuestionedAssumption,
      points: earnedQuestionedAssumption ? 1 : 0,
      description: 'Resisted popular crowd pressure and questioned unverified premises.',
    },
    {
      id: 'rubric-5',
      label: 'Avoided unsupported accusations (Motive != Proof)',
      earned: earnedAvoidingAccusation,
      points: earnedAvoidingAccusation ? 1 : 0,
      description: 'Refused to treat personal dislike or possible motive as proof of guilt.',
    },
    {
      id: 'rubric-6',
      label: 'Tested hypotheses & adapted thinking',
      earned: earnedHypothesisTesting,
      points: earnedHypothesisTesting ? 1 : 0,
      description: 'Actively weighed theories against incoming evidence across multiple angles.',
    },
    {
      id: 'rubric-7',
      label: 'Formed an evidence-grounded final decision',
      earned: earnedEvidenceDecision,
      points: earnedEvidenceDecision ? 1 : 0,
      description: 'Selected a final verdict grounded strictly in the verified facts collected.',
    },
  ];

  const rawStars = scoreItems.reduce((acc, item) => acc + (item.earned ? 1 : 0), 0);
  // Scale 7 items to 5 stars
  const starsEarned = Math.min(5, Math.max(1, Math.round((rawStars / 7) * 5)));
  const totalPoints = selectedChoices.reduce((acc, c) => acc + c.points, 0) + (earnedEvidenceDecision ? 25 : 5);
  const maxPoints = totalLeads * 25 + 25;
  const percentage = Math.min(100, Math.max(25, Math.round((rawStars / 7) * 100)));

  let verdictTitle = 'Champion of Dharma & Reason';
  let verdictDescription = 'Masterful investigation! You embodied the discipline of Prince Vikarna: demanding proof, testing sources, questioning assumptions, and letting evidence guide your verdict.';
  let verdictQuality: 'optimal' | 'reasonable' | 'premature' | 'unsupported' = 'optimal';

  if (starsEarned === 5) {
    verdictTitle = 'Champion of Dharma & Reason (5/5 Stars)';
    verdictDescription = 'Masterful investigation! You embodied the discipline of Prince Vikarna: demanding proof, testing sources, questioning assumptions, and letting evidence guide your verdict.';
    verdictQuality = 'optimal';
  } else if (starsEarned >= 3) {
    verdictTitle = `Discerning Inquirer (Curiosity Stars: ${starsEarned}/5)`;
    verdictDescription = 'Commendable effort! You investigated key angles and collected valuable evidence to make an informed judgment.';
    verdictQuality = 'reasonable';
  } else {
    verdictTitle = `Developing Inquirer (Curiosity Stars: ${starsEarned}/5)`;
    verdictDescription = 'A good learning experience. Remember: never accept or reject a claim without examining primary records and checking sources.';
    verdictQuality = 'premature';
  }

  return {
    starsEarned,
    totalPoints,
    maxPoints,
    percentage,
    items: scoreItems,
    verdictTitle,
    verdictDescription,
    verdictQuality,
    supportedByEvidence: earnedEvidenceDecision,
  };
}

// Backward compatibility alias
export const generateInvestigationCase = generateMockInvestigation;
