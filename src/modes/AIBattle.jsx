import React from "react";

const VERDICT_CONFIG = {
  REAL:       { color: "var(--green)",  icon: "✅" },
  FAKE:       { color: "var(--accent)", icon: "❌" },
  MISLEADING: { color: "var(--yellow)", icon: "⚠️" },
  UNVERIFIED: { color: "var(--purple)", icon: "❓" },
};

const cardStyle = {
  background: "var(--card)",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius2)",
  padding: 20,
};

export default function AIBattle({ data }) {
  if (!data) return null;
  const { headline, rounds = [], verdict = {} } = data;
  const vc = VERDICT_CONFIG[verdict.finalVerdict] || VERDICT_CONFIG.UNVERIFIED;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, animation: "fadeIn 0.4s ease" }}>

      <div style={{ ...cardStyle, borderColor: "var(--purple)", background: "rgba(139,92,246,0.06)" }}>
        <div style={{ fontSize: 11, color: "var(--purple)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6, fontFamily: "var(--font-display)" }}>
          ⚔️ AI Fact-Check Battle
        </div>
        <div style={{ fontSize: 15, fontWeight: 700, fontFamily: "var(--font-display)", color: "var(--text)", lineHeight: 1.4 }}>
          "{headline}"
        </div>
      </div>

      {rounds.map((r, i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div style={{ ...cardStyle, borderColor: "var(--accent)", background: "rgba(230,57,70,0.05)" }}>
            <div style={{ fontSize: 10, color: "var(--accent)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8, fontFamily: "var(--font-display)" }}>
              Round {r.round} — Claim Side 🔴
            </div>
            <p style={{ fontSize: 13, color: "var(--text)", lineHeight: 1.6, marginBottom: 10 }}>{r.claimSide?.argument}</p>
            <p style={{ fontSize: 12, color: "var(--text2)", borderLeft: "2px solid var(--accent)", paddingLeft: 8, lineHeight: 1.5 }}>{r.claimSide?.evidence}</p>
          </div>
          <div style={{ ...cardStyle, borderColor: "var(--green)", background: "rgba(6,214,160,0.05)" }}>
            <div style={{ fontSize: 10, color: "var(--green)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8, fontFamily: "var(--font-display)" }}>
              Round {r.round} — Fact-Checker 🟢
            </div>
            <p style={{ fontSize: 13, color: "var(--text)", lineHeight: 1.6, marginBottom: 10 }}>{r.factCheckSide?.rebuttal}</p>
            <p style={{ fontSize: 12, color: "var(--text2)", borderLeft: "2px solid var(--green)", paddingLeft: 8, lineHeight: 1.5 }}>{r.factCheckSide?.evidence}</p>
          </div>
        </div>
      ))}

      {verdict.finalVerdict && (
        <div style={{ ...cardStyle, borderColor: vc.color, background: `color-mix(in srgb, ${vc.color} 8%, var(--card))`, textAlign: "center" }}>
          <div style={{ fontSize: 11, color: "var(--text2)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8, fontFamily: "var(--font-display)" }}>Final Verdict</div>
          <div style={{ fontSize: 32, marginBottom: 6 }}>{vc.icon}</div>
          <div style={{ fontSize: 22, fontWeight: 800, fontFamily: "var(--font-display)", color: vc.color, marginBottom: 8 }}>
            {verdict.finalVerdict}
          </div>
          <p style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.6, marginBottom: 10 }}>{verdict.reason}</p>
          <div style={{ fontSize: 13, color: "var(--text)" }}>
            Trust Score: <span style={{ fontWeight: 700, color: vc.color }}>{verdict.trustScore}/100</span>
          </div>
        </div>
      )}
    </div>
  );
}
