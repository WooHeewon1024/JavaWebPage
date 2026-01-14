import { useState } from "react";

export default function App() {
  const [mood, setMood] = useState("chill");
  const vibes = [
    { key: "chill", label: "😌 chill", desc: "편하게 가자" },
    { key: "hype", label: "🔥 hype", desc: "오늘은 달린다" },
    { key: "focus", label: "🧠 focus", desc: "집중 모드 ON" },
  ];
  const current = vibes.find((v) => v.key === mood);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.badge}>vibe page</div>
        <h1 style={styles.title}>오늘의 바이브를 고르자</h1>
        <p style={styles.sub}>버튼 누르면 바로 반응하는 살아있는 웹페이지.</p>

        <div style={styles.row}>
          {vibes.map((v) => (
            <button
              key={v.key}
              onClick={() => setMood(v.key)}
              style={{ ...styles.btn, ...(mood === v.key ? styles.btnActive : {}) }}
            >
              {v.label}
            </button>
          ))}
        </div>

        <div style={styles.panel}>
          <div style={styles.panelTitle}>지금 모드</div>
          <div style={styles.panelValue}>{current.label}</div>
          <div style={styles.panelDesc}>{current.desc}</div>
        </div>

        <footer style={styles.footer}>
          <span>✨ 오늘도 vibe coding</span>
          <a
            style={styles.link}
            href="https://example.com"
            onClick={(e) => e.preventDefault()}
          >
            (링크는 나중에)
          </a>
        </footer>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    background:
      "radial-gradient(1200px 600px at 10% 10%, #2dd4bf33, transparent), radial-gradient(1200px 600px at 90% 20%, #a78bfa33, transparent), #0b1020",
    padding: 24,
    color: "#e5e7eb",
    fontFamily:
      "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
  },
  card: {
    width: "min(720px, 100%)",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.10)",
    borderRadius: 20,
    padding: 24,
    boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
    backdropFilter: "blur(10px)",
  },
  badge: {
    display: "inline-block",
    padding: "6px 10px",
    borderRadius: 999,
    fontSize: 12,
    border: "1px solid rgba(255,255,255,0.16)",
    background: "rgba(255,255,255,0.05)",
    marginBottom: 14,
  },
  title: { fontSize: 34, margin: "6px 0 10px" },
  sub: { margin: 0, opacity: 0.85, lineHeight: 1.6 },
  row: { display: "flex", gap: 10, flexWrap: "wrap", marginTop: 18 },
  btn: {
    padding: "10px 14px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.14)",
    background: "rgba(255,255,255,0.06)",
    color: "#e5e7eb",
    cursor: "pointer",
    transition: "transform 0.08s ease, background 0.2s ease, border 0.2s ease",
  },
  btnActive: {
    border: "1px solid rgba(45,212,191,0.6)",
    background: "rgba(45,212,191,0.12)",
  },
  panel: {
    marginTop: 18,
    padding: 16,
    borderRadius: 16,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(0,0,0,0.18)",
  },
  panelTitle: { fontSize: 12, opacity: 0.75, marginBottom: 6 },
  panelValue: { fontSize: 22, fontWeight: 700 },
  panelDesc: { marginTop: 6, opacity: 0.85 },
  footer: {
    marginTop: 18,
    display: "flex",
    justifyContent: "space-between",
    opacity: 0.7,
    fontSize: 13,
  },
  link: { color: "#93c5fd", textDecoration: "none" },
};
