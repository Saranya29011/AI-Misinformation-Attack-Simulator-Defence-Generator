import React, { useState } from "react";

const inputStyle = {
  width: "100%",
  background: "var(--bg3)",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius)",
  color: "var(--text)",
  padding: "10px 14px",
  fontSize: 13,
  fontFamily: "var(--font-mono)",
  transition: "border-color 0.2s",
};

const labelStyle = {
  display: "block",
  fontSize: 11,
  color: "var(--text2)",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  marginBottom: 6,
  fontFamily: "var(--font-display)",
};

export default function ApiKeyPanel({ grokKey, newsKey, onSave }) {
  const [g, setG] = useState(grokKey || "");
  const [n, setN] = useState(newsKey || "");
  const [show, setShow] = useState(!grokKey);

  if (!show) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "0 32px 0 32px" }}>
        <span style={{ fontSize: 12, color: "var(--green)", display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--green)", display: "inline-block" }} />
          API Keys configured
        </span>
        <button
          onClick={() => setShow(true)}
          style={{
            background: "none", border: "1px solid var(--border)", color: "var(--text2)",
            padding: "4px 12px", borderRadius: "var(--radius)", fontSize: 12, cursor: "pointer",
          }}
        >
          Edit Keys
        </button>
      </div>
    );
  }

  return (
    <div style={{
      background: "var(--card)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius2)",
      padding: 24,
      margin: "24px 32px",
      animation: "fadeIn 0.3s ease",
    }}>
      <div style={{
        fontFamily: "var(--font-display)", fontWeight: 700,
        fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase",
        color: "var(--cyan)", marginBottom: 16,
      }}>
        🔑 API Configuration
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div>
          <label style={labelStyle}>Grok (xAI) API Key</label>
          <input
            type="password"
            placeholder="xai-..."
            value={g}
            onChange={e => setG(e.target.value)}
            style={inputStyle}
          />
          <p style={{ fontSize: 11, color: "var(--text3)", marginTop: 4 }}>
            Get one at <a href="https://console.x.ai" target="_blank" rel="noreferrer" style={{ color: "var(--cyan)" }}>console.x.ai</a>
          </p>
        </div>
        <div>
          <label style={labelStyle}>NewsData.io API Key</label>
          <input
            type="password"
            placeholder="pub_..."
            value={n}
            onChange={e => setN(e.target.value)}
            style={inputStyle}
          />
          <p style={{ fontSize: 11, color: "var(--text3)", marginTop: 4 }}>
            Get one at <a href="https://newsdata.io" target="_blank" rel="noreferrer" style={{ color: "var(--cyan)" }}>newsdata.io</a>
          </p>
        </div>
      </div>

      <p style={{ fontSize: 11, color: "var(--text3)", marginTop: 12 }}>
        Keys are stored in your browser's localStorage only. Never sent anywhere except directly to the respective APIs.
      </p>

      <button
        onClick={() => { onSave(g.trim(), n.trim()); setShow(false); }}
        disabled={!g.trim()}
        style={{
          marginTop: 16,
          background: g.trim() ? "var(--accent)" : "var(--bg3)",
          color: g.trim() ? "#fff" : "var(--text3)",
          border: "none",
          borderRadius: "var(--radius)",
          padding: "10px 24px",
          fontSize: 13,
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          letterSpacing: "0.08em",
          cursor: g.trim() ? "pointer" : "not-allowed",
          textTransform: "uppercase",
        }}
      >
        Save & Continue
      </button>
    </div>
  );
}
