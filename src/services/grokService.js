// ─── ADD YOUR GROK (xAI) API KEY HERE ───────────────────────

// ────────────────────────────────────────────────────────────

export async function callGrok(_ignored, systemPrompt, userPrompt) {
  const apiKey = GROK_API_KEY;
  if (!apiKey || apiKey === "YOUR_GROK_API_KEY_HERE") throw new Error("Please set your Grok API key in src/services/grokService.js");

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.9,
      max_tokens: 2000,
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      err?.error?.message || `Grok API error ${res.status}`
    );
  }

  const data = await res.json();
  const raw = data.choices?.[0]?.message?.content || "";

  // Strip markdown fences if present
  const cleaned = raw.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    // Return raw string as a fallback so UI can still display something
    return { raw };
  }
}
