import React from "react";

export default function Header() {
  return (
    <header style={{
      borderBottom: "1px solid var(--border)",
      padding: "20px 32px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "sticky",
      top: 0,
      zIndex: 100,
      background: "rgba(255,255,255,0.7)",
      backdropFilter: "blur(10px)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        
        <h1 style={{
        fontFamily: "Georgia, 'Times New Roman', serif",  // 📰 news style
        fontSize: "clamp(20px, 3vw, 32px)",               // 🔥 bigger
        fontWeight: 700,
        letterSpacing: "0.02em",
        color: "#1d4ed8",
        textTransform: "uppercase",
      }}>
        AI Fact-Check Engine
      </h1>
      </div>

      <span style={{
        position: "absolute",
        right: 32,
        fontFamily: "var(--font-mono)",
        fontSize: 20,
        color: "#1d4ed8",
        border: "1px solid #1d4ed8",
        padding: "2px 8px",
        borderRadius: "3px",
        letterSpacing: "0.1em",
      }}>
        RESEARCH TOOL
      </span>
    </header>
  );
}