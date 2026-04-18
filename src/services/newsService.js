// ─── ADD YOUR NEWSDATA.IO API KEY HERE ──────────────────────
const NEWS_API_KEY = "YOUR_NEWSDATA_API_KEY_HERE";
// ────────────────────────────────────────────────────────────

export async function getNews(_ignored) {
  const apiKey = NEWS_API_KEY;
  if (!apiKey || apiKey === "YOUR_NEWSDATA_API_KEY_HERE") throw new Error("Please set your NewsData.io API key in src/services/newsService.js");

  const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&language=en&category=top`;
  const res = await fetch(url);

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.results?.message || `NewsData error ${res.status}`);
  }

  const data = await res.json();

  if (!data.results || !data.results.length) {
    throw new Error("No news results returned.");
  }

  return data.results; // array of article objects
}
