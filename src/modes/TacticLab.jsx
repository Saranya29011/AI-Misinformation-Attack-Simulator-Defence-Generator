import React from "react";
import ScoreBar from "../components/ScoreBar";

const CATEGORY_COLORS = {
  Emotional: "var(--accent)",
  Logical:   "var(--cyan)",
  Social:    "var(--purple)",
  Technical: "var(--yellow)",
};

const VERDICT_CONFIG = {
  REAL:       { color: "var(--green)",  icon: "✅", label: "REAL" },
  FAKE:       { color: "var(--accent)", icon: "❌", label: "FAKE" },
  MISLEADING: { color: "var(--yellow)", icon: "⚠️", label: "MISLEADING" },
  UNVERIFIED: { color: "var(--purple)", icon: "❓", label: "UNVERIFIED" },
};

const cardStyle = {
  background: "var(--card)",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius2)",
  padding: 20,
};

export default function TacticLab({ data }) {
  if (!data) return null;
  const { headline, overallVerdict, tactics = [], overallDangerScore, topTactic, immunizationTip } = data;
  const vc = VERDICT_CONFIG[overallVerdict] || VERDICT_CONFIG.UNVERIFIED;

  const detected = tactics.filter(t => t.detected);
  const notDetected = tactics.filter(t => !t.detected);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, animation: "fadeIn 0.4s ease" }}>

      {/* Header */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 16, alignItems: "stretch" }}>
        <div style={{ ...cardStyle }}>
          <div style={{ fontSize: 11, color: "var(--text3)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6, fontFamily: "var(--font-display)" }}>🧪 Tactic Analysis</div>
          <p style={{ fontSize: 14, fontWeight: 700, fontFamily: "var(--font-display)", color: "var(--text)", lineHeight: 1.4, marginBottom: 10 }}>"{headline}"</p>
          <ScoreBar label="Overall Danger Score" value={overallDangerScore} />
        </div>
        <div style={{ ...cardStyle, borderColor: vc.color, background: `color-mix(in srgb, ${vc.color} 8%, var(--card))`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minWidth: 140 }}>
          <div style={{ fontSize: 32, marginBottom: 4 }}>{vc.icon}</div>
          <div style={{ fontSize: 16, fontWeight: 800, fontFamily: "var(--font-display)", color: vc.color }}>{vc.label}</div>
          <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 4 }}>Verdict</div>
        </div>
      </div>

      {/* Detected tactics */}
      {detected.length > 0 && (
        <div>
          <div style={{ fontSize: 11, color: "var(--accent)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12, fontFamily: "var(--font-display)" }}>
            🚨 Tactics Detected ({detected.length})
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 }}>
            {detected.map((t, i) => {
              const cc = CATEGORY_COLORS[t.category] || "var(--text2)";
              return (
                <div key={i} style={{ ...cardStyle, borderColor: cc, background: `color-mix(in srgb, ${cc} 5%, var(--card))` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, fontFamily: "var(--font-display)", color: "var(--text)" }}>{t.name}</span>
                    <span style={{ fontSize: 10, color: cc, border: `1px solid ${cc}`, borderRadius: 3, padding: "2px 7px", letterSpacing: "0.08em", whiteSpace: "nowrap" }}>{t.category}</span>
                  </div>
                  <ScoreBar label="Severity" value={t.severity} />
                  <p style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.6, marginBottom: 10 }}>{t.description}</p>
                  <div style={{ borderLeft: "3px solid var(--green)", paddingLeft: 10 }}>
                    <div style={{ fontSize: 10, color: "var(--green)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 3 }}>How to Spot It</div>
                    <p style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.5 }}>{t.howToSpot}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Not detected */}
      {notDetected.length > 0 && (
        <div>
          <div style={{ fontSize: 11, color: "var(--green)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12, fontFamily: "var(--font-display)" }}>
            ✅ Tactics NOT Detected ({notDetected.length})
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {notDetected.map((t, i) => (
              <span key={i} style={{ fontSize: 12, color: "var(--text3)", border: "1px solid var(--border)", borderRadius: 4, padding: "5px 12px", background: "var(--bg3)" }}>
                ✓ {t.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Immunization tip */}
      {immunizationTip && (
        <div style={{ ...cardStyle, borderColor: "var(--green)", background: "rgba(6,214,160,0.06)" }}>
          <div style={{ fontSize: 11, color: "var(--green)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8, fontFamily: "var(--font-display)" }}>💉 Immunization Tip</div>
          <p style={{ fontSize: 14, color: "var(--text)", lineHeight: 1.7 }}>{immunizationTip}</p>
        </div>
      )}
    </div>
  );
}
