import React, { useState } from "react";
import { getNews } from "../services/newsService";

export default function NewsFetcher({ onSelectHeadline }) {
  const [headlines, setHeadlines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);

  async function fetchNews() {
    setLoading(true);
    setError(null);
    try {
      const articles = await getNews();  // key is baked into newsService.js
      const titles = articles.slice(0, 6).map(a => a.title).filter(Boolean);
      setHeadlines(titles);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function pick(h) {
    setSelected(h);
    onSelectHeadline(h);
  }

  return (
    <div style={{ padding: "0 32px", marginBottom: 8 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
        <span style={{
          fontFamily: "var(--font-display)", fontSize: 15,
          textTransform: "uppercase", letterSpacing: "0.12em",  color: "#1f2937" ,
        }}>
          Live Headlines
        </span>
        <button
          onClick={fetchNews}
          disabled={loading}
          style={{
            background: "var(--bg3)",
            border: "1px solid var(--border)",
            color: loading ? "var(--text3)" : "var(--cyan)",
            padding: "5px 14px",
            borderRadius: "var(--radius)",
            fontSize: 16,
            fontFamily: "var(--font-mono)",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "all 0.2s",
          }}
        >
          {loading ? "Fetching…" : "⚡ Fetch Today's News"}
        </button>
        {error && <span style={{ fontSize: 12, color: "var(--accent)" }}>{error}</span>}
      </div>

      {headlines.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {headlines.map((h, i) => (
            <button
              key={i}
              onClick={() => pick(h)}
              style={{
                textAlign: "left",
                background: selected === h ? "rgba(0,212,255,0.08)" : "var(--card)",
                border: selected === h ? "1px solid var(--cyan)" : "1px solid var(--border)",
                color: selected === h ? "var(--cyan)" : "var(--text2)",
                borderRadius: "var(--radius)",
                padding: "8px 14px",
                fontSize: 16,
                fontFamily: "var(--font-mono)",
                cursor: "pointer",
                transition: "all 0.15s",
                lineHeight: 1.5,
              }}
            >
              <span style={{ color: "var(--text3)", marginRight: 8 }}>{String(i + 1).padStart(2, "0")}.</span>
              {h}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
