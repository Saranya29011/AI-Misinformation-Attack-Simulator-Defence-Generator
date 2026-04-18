import { useState, useEffect } from "react";

import Header from "./components/Header";
import ModeSelector from "./components/ModeSelector";
import NewsFetcher from "./components/NewsFetcher";
import ResultPanel from "./components/ResultPanel";

import { buildPrompt } from "./services/promptBuilder";
import { callGrok } from "./services/grokService";

const MODE_DESCRIPTIONS = {
  attack:  "Analyse a headline — detect if it is Real, Fake, Misleading, or Unverified with confidence score.",
  battle:  "Watch Claim Side vs Fact-Checker AI debate the credibility of this headline in 3 rounds.",
  quiz:    "Given a headline, identify which statements about it are true and which are false.",
  tactic:  "Detect which manipulation tactics are actually present in this specific headline.",
  defense: "Generate fact-check responses and corrections for different audience types.",
};

export default function App() {
  const [mode, setMode] = useState("attack");
  const [headline, setHeadline] = useState("");
  const [customTopic, setCustomTopic] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => { setResult(null); setError(null); }, [mode]);

  const topic = customTopic.trim() || headline.trim();

  async function runSimulation() {
    if (!topic) { setError("Please enter a headline or fetch news first."); return; }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const { systemPrompt, userPrompt } = buildPrompt(mode, headline, customTopic);
      const data = await callGrok(null, systemPrompt, userPrompt);
      setResult(data);
    } catch (err) {
      setError(err.message || "AI request failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />

      {/* Mode Selector */}
      <ModeSelector mode={mode} setMode={setMode} />

      {/* Mode description */}
      <div style={{
        padding: "12px 32px",
        fontSize: 14,
        color: "var(--text2)",
        borderBottom: "1px solid var(--border)",
        fontFamily: "var(--font-mono)",
        background: "rgba(255,255,255,0.01)",
      }}>
        <span style={{ color: "var(--cyan)" }}>▶ </span>{MODE_DESCRIPTIONS[mode]}
      </div>

      {/* Input area */}
      <div style={{ padding: "24px 32px", display: "flex", flexDirection: "column", gap: 16 }}>

        {/* News fetcher */}
        <NewsFetcher onSelectHeadline={h => { setHeadline(h); setCustomTopic(""); }} />

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
          <span style={{ fontSize: 11, color: "var(--text3)", letterSpacing: "0.1em" }}>OR TYPE YOUR OWN</span>
          <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
        </div>

        {/* Custom topic input */}
        <input
          placeholder={mode === "quiz" ? "Paste a headline for the quiz…" : "Type a headline or topic…"}
          value={customTopic}
          onChange={e => { setCustomTopic(e.target.value); setHeadline(""); }}
          style={{
            width: "100%",
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
            color: "var(--text)",
            padding: "12px 16px",
            fontSize: 15,
            fontFamily: "var(--font-mono)",
            transition: "border-color 0.2s",
          }}
          onFocus={e => (e.target.style.borderColor = "var(--cyan)")}
          onBlur={e => (e.target.style.borderColor = "var(--border)")}
        />

        {/* Selected headline display */}
        {headline && !customTopic && (
          <div style={{
            background: "rgba(0,212,255,0.06)",
            border: "1px solid var(--cyan)",
            borderRadius: "var(--radius)",
            padding: "10px 14px",
            fontSize: 14,
            color: "var(--cyan)",
            fontFamily: "var(--font-mono)",
          }}>
            <span style={{ color: "var(--text3)", marginRight: 8 }}>Selected:</span>
            {headline}
          </div>
        )}

        {/* Error */}
        {error && (
          <div style={{
            background: "rgba(230,57,70,0.08)",
            border: "1px solid var(--accent)",
            borderRadius: "var(--radius)",
            padding: "10px 14px",
            fontSize: 13,
            color: "var(--accent)",
          }}>
            {error}
          </div>
        )}

        {/* Run button */}
        <button
          onClick={runSimulation}
          disabled={loading || !topic}
          style={{
            alignSelf: "flex-start",
            background: loading ? "var(--bg3)" : (!topic ? "var(--bg3)" : "var(--accent)"),
            color: loading || !topic ? "var(--text3)" : "#fff",
            border: "none",
            borderRadius: "var(--radius)",
            padding: "12px 32px",
            fontSize: 16,
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            cursor: loading || !topic ? "not-allowed" : "pointer",
            boxShadow: !loading && topic ? "var(--glow-red)" : "none",
            transition: "all 0.2s",
          }}
        >
          {loading ? (
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{
                width: 12, height: 12, border: "2px solid var(--text3)",
                borderTopColor: "var(--text)", borderRadius: "50%",
                display: "inline-block",
                animation: "spin 0.7s linear infinite",
              }} />
              Analyzing…
            </span>
          ) : "⚡ Run Simulation"}
        </button>
      </div>

      {/* Results */}
      {result && (
        <div style={{ padding: "0 32px 48px" }}>
          <div style={{
            fontSize: 11, color: "var(--text3)", letterSpacing: "0.12em",
            textTransform: "uppercase", marginBottom: 16, fontFamily: "var(--font-display)",
            display: "flex", alignItems: "center", gap: 8,
          }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green)" }} />
            Analysis Complete
          </div>
          <ResultPanel result={result} mode={mode} />
        </div>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
