import React from "react";

const MODES = [
  { id: "attack",  label: "Fact Check", icon: "🔎" },
  { id: "battle",  label: "AI Battle", icon: "⚔️" },
  { id: "quiz",    label: "Spot the False", icon: "🧩" },
  { id: "tactic",  label: "Tactic Lab", icon: "🧪" },
  { id: "defense", label: "Counter Messaging", icon: "🛡️" },
];

export default function ModeSelector({ mode, setMode }) {
  return (
   <div
  style={{
    display: "flex",
    gap: 24,
    padding: "14px 32px",
    paddingLeft: "700px",   // 👈 pushes tabs to right
    borderBottom: "1px solid var(--border)",
    overflowX: "auto",
  }}
>
      {MODES.map((m) => {
        const active = mode === m.id;

        return (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            style={{
              background: "none",               // ❌ remove button look
              border: "none",
              padding: "8px 0",
              cursor: "pointer",
              position: "relative",
              display: "flex",
              alignItems: "center",
              gap: 6,

              fontSize: 16,
              fontWeight: active ? 600 : 400,
              color: active ? "var(--accent)" : "var(--text2)",
              whiteSpace: "nowrap",
              transition: "0.2s",
            }}
          >
            <span style={{ fontSize: 14 }}>{m.icon}</span>
            <span>{m.label}</span>

            {/* Underline (Google News style) */}
            {active && (
              <span
                style={{
                  position: "absolute",
                  bottom: -14,
                  left: 0,
                  width: "100%",
                  height: 3,
                  background: "var(--accent)",
                  borderRadius: 2,
                }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}