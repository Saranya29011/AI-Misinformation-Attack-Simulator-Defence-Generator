import React from "react";

const AUDIENCE_COLORS = [
  "var(--cyan)",
  "var(--purple)",
  "var(--yellow)",
  "var(--accent)",
];

const cardStyle = {
  background: "var(--card)",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius2)",
  padding: 20,
};

export default function DefenseGenerator({ data }) {
  if (!data) return null;

  const { topic, summary, keyFacts = [], audiences = [], viralCounter } = data;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, animation: "fadeIn 0.4s ease" }}>

      {/* Topic summary */}
      <div style={{ ...cardStyle, borderColor: "var(--cyan)" }}>
        <div style={{ fontSize: 11, color: "var(--cyan)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6, fontFamily: "var(--font-display)" }}>
          🛡 Defense Strategy For
        </div>
        <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "var(--font-display)", color: "var(--text)", marginBottom: 8 }}>{topic}</div>
        <p style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.6 }}>{summary}</p>
      </div>

      {/* Key facts */}
      {keyFacts.length > 0 && (
        <div style={cardStyle}>
          <div style={{ fontSize: 11, color: "var(--green)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12, fontFamily: "var(--font-display)" }}>
            ✅ Key Facts to Share
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {keyFacts.map((f, i) => (
              <div key={i} style={{
                display: "flex", gap: 12, alignItems: "flex-start",
                background: "var(--bg3)", borderRadius: "var(--radius)", padding: "10px 14px",
              }}>
                <span style={{ color: "var(--green)", fontWeight: 700, flexShrink: 0 }}>#{i + 1}</span>
                <span style={{ fontSize: 13, color: "var(--text)", lineHeight: 1.5 }}>{f}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Audience messages */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
        {audiences.map((a, i) => {
          const cc = AUDIENCE_COLORS[i % AUDIENCE_COLORS.length];
          return (
            <div key={i} style={{ ...cardStyle, borderColor: cc, background: `color-mix(in srgb, ${cc} 5%, var(--card))` }}>
              <div style={{ fontSize: 11, color: cc, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4, fontFamily: "var(--font-display)" }}>
                {a.name}
              </div>
              <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
                <span style={{ fontSize: 10, color: "var(--text3)", border: "1px solid var(--border)", borderRadius: 3, padding: "2px 7px" }}>
                  {a.tone}
                </span>
                <span style={{ fontSize: 10, color: "var(--text3)", border: "1px solid var(--border)", borderRadius: 3, padding: "2px 7px" }}>
                  {a.platform}
                </span>
              </div>
              <p style={{ fontSize: 13, color: "var(--text)", lineHeight: 1.7 }}>{a.message}</p>
            </div>
          );
        })}
      </div>

      {/* Viral counter */}
      {viralCounter && (
        <div style={{
          ...cardStyle,
          borderColor: "var(--yellow)",
          background: "rgba(255,214,10,0.06)",
        }}>
          <div style={{ fontSize: 11, color: "var(--yellow)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8, fontFamily: "var(--font-display)" }}>
            ⚡ Viral Counter-Message (≤280 chars)
          </div>
          <p style={{ fontSize: 15, color: "var(--text)", lineHeight: 1.6, fontFamily: "var(--font-display)", fontWeight: 600 }}>
            "{viralCounter}"
          </p>
          <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 8 }}>
            {viralCounter.length}/280 characters
          </div>
        </div>
      )}
    </div>
  );
}
