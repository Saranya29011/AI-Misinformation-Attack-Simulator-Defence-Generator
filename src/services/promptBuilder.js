/**
 * System prompt shared across all modes.
 */
export const SYSTEM_PROMPT = `You are an expert AI fact-checker and misinformation detection engine.
Your job is to analyse headlines and news claims and determine whether they are real, fake, misleading, or unverified.
Use your knowledge of credible sources, known fact-checks, logical consistency, and common misinformation patterns.
Always respond with VALID JSON only — no markdown fences, no commentary outside the JSON.`;

/**
 * Builds a mode-specific user prompt and returns { systemPrompt, userPrompt }.
 */
export function buildPrompt(mode, headline, customTopic = "") {
  const topic = customTopic || headline;

  const schemas = {
    attack:  verdictPrompt(topic),
    battle:  aiBattlePrompt(topic),
    quiz:    spotTheFakePrompt(topic),
    tactic:  tacticLabPrompt(topic),
    defense: defenseGeneratorPrompt(topic),
  };

  return {
    systemPrompt: SYSTEM_PROMPT,
    userPrompt: schemas[mode] || schemas.attack,
  };
}

/* ── Verdict (main detection mode) ────────────────────────── */
function verdictPrompt(headline) {
  return `
Analyse this headline/claim for misinformation:
"${headline}"

Return ONLY this JSON:
{
  "headline": "string — the original headline",
  "verdict": "REAL" | "FAKE" | "MISLEADING" | "UNVERIFIED",
  "confidenceScore": number,
  "summary": "string — 2-3 sentence plain-English explanation of the verdict",
  "redFlags": ["string", "string"],
  "supportingFacts": ["string", "string"],
  "manipulationTactics": ["string"],
  "sourceSuggestions": ["string — credible sources to verify this"],
  "credibilityScores": {
    "sourceReliability": number,
    "claimAccuracy": number,
    "contextCompleteness": number
  },
  "viralRisk": number
}
All numbers 0-100. confidenceScore is how confident you are in the verdict.
viralRisk is how likely this false/misleading claim could spread.
If verdict is REAL, redFlags can be empty and viralRisk should be low.`;
}

/* ── AI Battle — fact-checker vs misinformation claim ──────── */
function aiBattlePrompt(headline) {
  return `
Analyse this headline claim through a structured fact-check debate:
"${headline}"

One side argues the claim is true/credible, the other argues it is false/misleading.
Return ONLY this JSON:
{
  "headline": "string",
  "rounds": [
    {
      "round": 1,
      "claimSide": { "argument": "string", "evidence": "string" },
      "factCheckSide": { "rebuttal": "string", "evidence": "string" }
    },
    {
      "round": 2,
      "claimSide": { "argument": "string", "evidence": "string" },
      "factCheckSide": { "rebuttal": "string", "evidence": "string" }
    },
    {
      "round": 3,
      "claimSide": { "argument": "string", "evidence": "string" },
      "factCheckSide": { "rebuttal": "string", "evidence": "string" }
    }
  ],
  "verdict": {
    "winner": "claim" | "factcheck",
    "reason": "string",
    "finalVerdict": "REAL" | "FAKE" | "MISLEADING" | "UNVERIFIED",
    "trustScore": number
  }
}`;
}

/* ── Spot the Fake — detection quiz ───────────────────────── */
function spotTheFakePrompt(headline) {
  return `
Given this headline: "${headline}"

Create a fact-check quiz. Present 4 statements/claims about this topic.
Some are accurate facts, some are false/misleading. The user must identify which ones are false.
Return ONLY this JSON:
{
  "topic": "string",
  "difficulty": "Easy" | "Medium" | "Hard",
  "statements": [
    { "id": "a", "text": "string", "isTrue": true | false, "explanation": "string" },
    { "id": "b", "text": "string", "isTrue": true | false, "explanation": "string" },
    { "id": "c", "text": "string", "isTrue": true | false, "explanation": "string" },
    { "id": "d", "text": "string", "isTrue": true | false, "explanation": "string" }
  ],
  "overallVerdict": "REAL" | "FAKE" | "MISLEADING",
  "summary": "string — overall fact-check summary of the headline"
}
Mix true and false statements. At least 1 must be true and at least 1 must be false.`;
}

/* ── Tactic Lab — detect manipulation tactics used ─────────── */
function tacticLabPrompt(headline) {
  return `
Analyse this headline/claim for manipulation and misinformation tactics:
"${headline}"

Return ONLY this JSON:
{
  "headline": "string",
  "overallVerdict": "REAL" | "FAKE" | "MISLEADING" | "UNVERIFIED",
  "overallDangerScore": number,
  "tactics": [
    {
      "name": "string",
      "category": "Emotional" | "Logical" | "Social" | "Technical",
      "detected": true | false,
      "severity": number,
      "description": "string — how this tactic is used in this specific headline",
      "howToSpot": "string"
    }
  ],
  "topTactic": "string — name of most dangerous tactic detected, or 'None' if clean",
  "immunizationTip": "string — how readers can protect themselves"
}
Include 4-5 common tactics and whether each is detected in this headline.
severity and overallDangerScore are 0-100.`;
}

/* ── Defense Generator — counter-messaging ─────────────────── */
function defenseGeneratorPrompt(headline) {
  return `
This headline may be misinformation:
"${headline}"

Generate fact-check responses and counter-messaging for different audiences.
Return ONLY this JSON:
{
  "headline": "string",
  "verdict": "REAL" | "FAKE" | "MISLEADING" | "UNVERIFIED",
  "summary": "string — what's wrong (or right) with this claim",
  "keyFacts": ["string", "string", "string"],
  "audiences": [
    {
      "name": "Critical Thinkers",
      "message": "string — evidence-based correction",
      "tone": "string",
      "platform": "string"
    },
    {
      "name": "Emotional Sharers",
      "message": "string — empathetic correction",
      "tone": "string",
      "platform": "string"
    },
    {
      "name": "Casual Scrollers",
      "message": "string — quick, clear correction",
      "tone": "string",
      "platform": "string"
    },
    {
      "name": "True Believers",
      "message": "string — respectful fact-based correction",
      "tone": "string",
      "platform": "string"
    }
  ],
  "viralCounter": "string — a short shareable fact-check under 280 chars"
}`;
}
