import React, { useState } from "react";

const VERDICT_CONFIG = {
  REAL:       { color: "var(--green)",  icon: "✅" },
  FAKE:       { color: "var(--accent)", icon: "❌" },
  MISLEADING: { color: "var(--yellow)", icon: "⚠️" },
};

const cardStyle = {
  background: "var(--card)",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius2)",
  padding: 20,
};

export default function SpotTheFake({ data }) {
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);

  if (!data) return null;

  const { topic, statements = [], overallVerdict, summary, difficulty } = data;
  const diffColor = { Easy: "var(--green)", Medium: "var(--yellow)", Hard: "var(--accent)" };
  const vc = VERDICT_CONFIG[overallVerdict] || VERDICT_CONFIG.FAKE;

  function handleSelect(id) {
    if (revealed) return;
    setSelected(id);
  }

  function reveal() {
    if (!selected) return;
    setRevealed(true);
  }

  const selectedStatement = statements.find(s => s.id === selected);
  const correct = revealed && selectedStatement?.isTrue === false; // user correctly identified a false one

  function borderColor(s) {
    if (!revealed) return selected === s.id ? "var(--cyan)" : "var(--border)";
    if (!s.isTrue) return "var(--accent)";     // false — highlight red
    return "var(--green)";                      // true — highlight green
  }

  function bgColor(s) {
    if (!revealed) return selected === s.id ? "rgba(0,212,255,0.07)" : "var(--card)";
    if (!s.isTrue) return "rgba(230,57,70,0.07)";
    return "rgba(6,214,160,0.07)";
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, animation: "fadeIn 0.4s ease" }}>

      <div style={{ ...cardStyle, display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
        <div>
          <div style={{ fontSize: 11, color: "var(--cyan)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 4, fontFamily: "var(--font-display)" }}>
            🔍 Spot the False Statement
          </div>
          <p style={{ fontSize: 14, fontWeight: 700, fontFamily: "var(--font-display)", color: "var(--text)", marginBottom: 4 }}>{topic}</p>
          <p style={{ fontSize: 12, color: "var(--text2)" }}>Select the statement you think is FALSE</p>
        </div>
        <div style={{ fontSize: 12, fontWeight: 700, color: diffColor[difficulty] || "var(--text2)", border: `1px solid ${diffColor[difficulty] || "var(--border)"}`, borderRadius: 4, padding: "4px 12px", fontFamily: "var(--font-display)", whiteSpace: "nowrap" }}>
          {difficulty}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {statements.map(s => (
          <button
            key={s.id}
            onClick={() => handleSelect(s.id)}
            style={{
              textAlign: "left",
              background: bgColor(s),
              border: `1px solid ${borderColor(s)}`,
              borderRadius: "var(--radius)",
              padding: "14px 18px",
              fontSize: 13,
              fontFamily: "var(--font-mono)",
              color: "var(--text)",
              cursor: revealed ? "default" : "pointer",
              transition: "all 0.2s",
              lineHeight: 1.6,
              display: "flex",
              gap: 12,
              alignItems: "flex-start",
            }}
          >
            <span style={{
              minWidth: 24, height: 24, borderRadius: "50%",
              border: `2px solid ${borderColor(s)}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 11, fontWeight: 700, color: borderColor(s),
              flexShrink: 0, marginTop: 1,
            }}>
              {s.id.toUpperCase()}
            </span>
            <div style={{ flex: 1 }}>
              <span>{s.text}</span>
              {revealed && (
                <div style={{ marginTop: 8, fontSize: 12, color: s.isTrue ? "var(--green)" : "var(--accent)", borderLeft: `2px solid ${s.isTrue ? "var(--green)" : "var(--accent)"}`, paddingLeft: 8, lineHeight: 1.5 }}>
                  {s.isTrue ? "✅ TRUE — " : "❌ FALSE — "}{s.explanation}
                </div>
              )}
            </div>
            {revealed && (
              <span style={{ marginLeft: "auto", color: s.isTrue ? "var(--green)" : "var(--accent)", flexShrink: 0, fontWeight: 700 }}>
                {s.isTrue ? "TRUE" : "FALSE"}
              </span>
            )}
          </button>
        ))}
      </div>

      {!revealed && (
        <button
          onClick={reveal}
          disabled={!selected}
          style={{
            background: selected ? "var(--cyan)" : "var(--bg3)",
            color: selected ? "var(--bg)" : "var(--text3)",
            border: "none", borderRadius: "var(--radius)",
            padding: "12px 28px", fontSize: 13,
            fontFamily: "var(--font-display)", fontWeight: 700,
            letterSpacing: "0.08em", cursor: selected ? "pointer" : "not-allowed",
            textTransform: "uppercase", alignSelf: "flex-start",
          }}
        >
          Reveal Answers
        </button>
      )}

      {revealed && (
        <div style={{ ...cardStyle, borderColor: vc.color, background: `color-mix(in srgb, ${vc.color} 6%, var(--card))`, animation: "fadeIn 0.3s ease" }}>
          <div style={{ fontSize: 11, color: "var(--text2)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6, fontFamily: "var(--font-display)" }}>
            Overall Headline Verdict
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, fontFamily: "var(--font-display)", color: vc.color, marginBottom: 8 }}>
            {vc.icon} {overallVerdict}
          </div>
          <p style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.7 }}>{summary}</p>
        </div>
      )}
    </div>
  );
}
