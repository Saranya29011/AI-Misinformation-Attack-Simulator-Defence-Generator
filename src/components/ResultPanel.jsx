import React from "react";
import AttackChain from "../modes/AttackChain";
import AIBattle from "../modes/AIBattle";
import SpotTheFake from "../modes/SpotTheFake";
import TacticLab from "../modes/TacticLab";
import DefenseGenerator from "../modes/DefenseGenerator";

export default function ResultPanel({ result, mode }) {
  if (!result) return null;

  // Fallback: raw string error from Grok
  if (result.raw) {
    return (
      <div style={{
        background: "var(--card)", border: "1px solid var(--border)",
        borderRadius: "var(--radius2)", padding: 20,
        animation: "fadeIn 0.4s ease",
      }}>
        <div style={{ fontSize: 11, color: "var(--yellow)", marginBottom: 8, fontFamily: "var(--font-display)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Raw Response (JSON parse failed)
        </div>
        <pre style={{ fontSize: 12, color: "var(--text2)", whiteSpace: "pre-wrap", lineHeight: 1.6 }}>{result.raw}</pre>
      </div>
    );
  }

  const components = {
    attack: <AttackChain data={result} />,
    battle: <AIBattle data={result} />,
    quiz: <SpotTheFake data={result} />,
    tactic: <TacticLab data={result} />,
    defense: <DefenseGenerator data={result} />,
  };

  return components[mode] || (
    <pre style={{ color: "var(--text2)", fontSize: 12, whiteSpace: "pre-wrap" }}>
      {JSON.stringify(result, null, 2)}
    </pre>
  );
}
