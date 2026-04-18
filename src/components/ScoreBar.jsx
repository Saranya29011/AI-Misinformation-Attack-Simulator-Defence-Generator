import React, { useEffect, useRef } from "react";

const COLOR_MAP = {
  low: "var(--green)",
  mid: "var(--yellow)",
  high: "var(--accent)",
};

function scoreColor(v) {
  if (v < 40) return COLOR_MAP.low;
  if (v < 70) return COLOR_MAP.mid;
  return COLOR_MAP.high;
}

export default function ScoreBar({ label, value }) {
  const pct = Math.min(100, Math.max(0, value || 0));
  const color = scoreColor(pct);
  const fillRef = useRef(null);

  useEffect(() => {
    if (!fillRef.current) return;
    fillRef.current.style.width = "0%";
    const raf = requestAnimationFrame(() => {
      fillRef.current.style.transition = "width 0.8s cubic-bezier(0.16,1,0.3,1)";
      fillRef.current.style.width = `${pct}%`;
    });
    return () => cancelAnimationFrame(raf);
  }, [pct]);

  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
        <span style={{ fontSize: 12, color: "var(--text2)", fontFamily: "var(--font-display)", letterSpacing: "0.06em" }}>
          {label}
        </span>
        <span style={{ fontSize: 12, color, fontWeight: 700, fontFamily: "var(--font-mono)" }}>
          {pct}
        </span>
      </div>
      <div style={{
        height: 6, background: "var(--bg3)", borderRadius: 3, overflow: "hidden",
      }}>
        <div
          ref={fillRef}
          style={{
            height: "100%",
            width: "0%",
            background: color,
            borderRadius: 3,
            boxShadow: `0 0 8px ${color}`,
          }}
        />
      </div>
    </div>
  );
}
