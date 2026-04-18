import React from "react";
import ScoreBar from "../components/ScoreBar";

const VERDICT_CONFIG = {
  REAL:        { color: "var(--green)",  bg: "rgba(6,214,160,0.08)",   icon: "✅", label: "REAL" },
  FAKE:        { color: "var(--accent)", bg: "rgba(230,57,70,0.08)",   icon: "❌", label: "FAKE" },
  MISLEADING:  { color: "var(--yellow)", bg: "rgba(255,214,10,0.08)",  icon: "⚠️", label: "MISLEADING" },
  UNVERIFIED:  { color: "var(--purple)", bg: "rgba(139,92,246,0.08)",  icon: "❓", label: "UNVERIFIED" },
};

const cardStyle = {
  background: "var(--card)",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius2)",
  padding: 20,
};

export default function AttackChain({ data }) {
  if (!data) return null;

  const {
    headline,
    verdict,
    confidenceScore,
    summary,
    redFlags = [],
    supportingFacts = [],
    manipulationTactics = [],
    sourceSuggestions = [],
    credibilityScores = {},
    viralRisk,
  } = data;

  const vc = VERDICT_CONFIG[verdict] || VERDICT_CONFIG.UNVERIFIED;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, animation: "fadeIn 0.4s ease" }}>

      {/* Verdict banner */}
      <div style={{ ...cardStyle, borderColor: vc.color, background: vc.bg, display: "flex", alignItems: "center", gap: 20 }}>
        <div style={{ fontSize: 48, lineHeight: 1 }}>{vc.icon}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: "var(--text2)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 4, fontFamily: "var(--font-display)" }}>
            Fact-Check Result
          </div>
          <div style={{ fontSize: 28, fontWeight: 800, fontFamily: "var(--font-display)", color: vc.color, letterSpacing: "0.04em" }}>
            {vc.label}
          </div>
          <div style={{ fontSize: 13, color: "var(--text2)", marginTop: 4 }}>
            Confidence: <span style={{ color: vc.color, fontWeight: 700 }}>{confidenceScore}%</span>
          </div>
        </div>
        <svg width={80} height={80} viewBox="0 0 80 80">
          <circle cx={40} cy={40} r={32} fill="none" stroke="var(--border)" strokeWidth={6} />
          <circle cx={40} cy={40} r={32} fill="none" stroke={vc.color} strokeWidth={6}
            strokeDasharray={`${(confidenceScore / 100) * 201} 201`}
            strokeLinecap="round" transform="rotate(-90 40 40)"
            style={{ filter: `drop-shadow(0 0 6px ${vc.color})` }} />
          <text x={40} y={45} textAnchor="middle" fill={vc.color} fontSize={14} fontWeight={700} fontFamily="var(--font-mono)">
            {confidenceScore}
          </text>
        </svg>
      </div>

      {/* Headline + summary */}
      <div style={cardStyle}>
        <div style={{ fontSize: 11, color: "var(--text3)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6, fontFamily: "var(--font-display)" }}>
          Analysed Headline
        </div>
        <p style={{ fontSize: 15, fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--text)", marginBottom: 12, lineHeight: 1.5 }}>
          "{headline}"
        </p>
        <p style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.7 }}>{summary}</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {redFlags.length > 0 && (
          <div style={{ ...cardStyle, borderColor: "var(--accent)" }}>
            <div style={{ fontSize: 11, color: "var(--accent)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12, fontFamily: "var(--font-display)" }}>
              🚩 Red Flags
            </div>
            {redFlags.map((f, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 8, fontSize: 13, color: "var(--text)", lineHeight: 1.5 }}>
                <span style={{ color: "var(--accent)", flexShrink: 0 }}>▸</span>{f}
              </div>
            ))}
          </div>
        )}
        {supportingFacts.length > 0 && (
          <div style={{ ...cardStyle, borderColor: "var(--green)" }}>
            <div style={{ fontSize: 11, color: "var(--green)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12, fontFamily: "var(--font-display)" }}>
              ✅ Supporting Facts
            </div>
            {supportingFacts.map((f, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 8, fontSize: 13, color: "var(--text)", lineHeight: 1.5 }}>
                <span style={{ color: "var(--green)", flexShrink: 0 }}>▸</span>{f}
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={cardStyle}>
          <div style={{ fontSize: 11, color: "var(--text2)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12, fontFamily: "var(--font-display)" }}>
            Credibility Scores
          </div>
          <ScoreBar label="Source Reliability" value={credibilityScores.sourceReliability} />
          <ScoreBar label="Claim Accuracy" value={credibilityScores.claimAccuracy} />
          <ScoreBar label="Context Completeness" value={credibilityScores.contextCompleteness} />
        </div>
        <div style={cardStyle}>
          <div style={{ fontSize: 11, color: "var(--yellow)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12, fontFamily: "var(--font-display)" }}>
            Viral Risk
          </div>
          <ScoreBar label="Viral Risk Score" value={viralRisk} />
          {manipulationTactics.length > 0 && (
            <div style={{ marginTop: 14 }}>
              <div style={{ fontSize: 11, color: "var(--text3)", marginBottom: 8, letterSpacing: "0.08em", textTransform: "uppercase" }}>Tactics Detected</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {manipulationTactics.map((t, i) => (
                  <span key={i} style={{ fontSize: 11, color: "var(--yellow)", border: "1px solid var(--yellow)", borderRadius: 3, padding: "2px 8px" }}>{t}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {sourceSuggestions.length > 0 && (
        <div style={{ ...cardStyle, borderColor: "var(--cyan)" }}>
          <div style={{ fontSize: 11, color: "var(--cyan)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12, fontFamily: "var(--font-display)" }}>
            🔍 Verify With These Sources
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {sourceSuggestions.map((s, i) => (
              <span key={i} style={{ fontSize: 12, color: "var(--cyan)", background: "rgba(0,212,255,0.07)", border: "1px solid rgba(0,212,255,0.3)", borderRadius: 4, padding: "5px 12px" }}>{s}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
