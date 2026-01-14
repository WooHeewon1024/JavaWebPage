import { useEffect, useMemo, useState } from "react";

const VIBES = [
  { key: "chill", label: "Chill", emoji: "😌", desc: "편하게 가자" },
  { key: "hype", label: "Hype", emoji: "🔥", desc: "오늘은 달린다" },
  { key: "focus", label: "Focus", emoji: "🧠", desc: "집중 모드 ON" },
];

export default function App() {
  const [mood, setMood] = useState("chill");
  const [oneLine, setOneLine] = useState("");
  const [saved, setSaved] = useState(false);

  const current = useMemo(() => VIBES.find(v => v.key === mood), [mood]);

  useEffect(() => {
    const savedMood = localStorage.getItem("mood");
    const savedLine = localStorage.getItem("oneLine");
    if (savedMood) setMood(savedMood);
    if (savedLine) setOneLine(savedLine);
  }, []);

  useEffect(() => {
    localStorage.setItem("mood", mood);
  }, [mood]);

  function saveLine() {
    localStorage.setItem("oneLine", oneLine);
    setSaved(true);
    setTimeout(() => setSaved(false), 900);
  }

  return (
    <div className={`page mood-${mood}`}>
      <div className="wrap">
        <header className="hero">
          <div className="pill">VIBE PAGE · v0.2</div>
          <h1 className="title">
            {current.emoji} 오늘은 <span className="accent">{current.label}</span> 모드
          </h1>
          <p className="sub">
            버튼 하나로 상태를 선택하고, 한 줄을 저장하세요. 새로고침해도 유지됩니다.
          </p>

          <div className="btnRow">
            {VIBES.map(v => (
              <button
                key={v.key}
                className={`btn ${mood === v.key ? "active" : ""}`}
                onClick={() => setMood(v.key)}
              >
                <span className="emoji">{v.emoji}</span>
                <span className="lbl">{v.label}</span>
              </button>
            ))}
          </div>

          <div className="panel">
            <div className="panelTop">
              <div className="panelTitle">지금 상태</div>
              <div className="panelTag">{current.desc}</div>
            </div>

            <div className="inputBox">
              <input
                value={oneLine}
                onChange={(e) => setOneLine(e.target.value)}
                placeholder="오늘 한 줄 (예: 30분만 집중하자)"
              />
              <button className="save" onClick={saveLine}>
                저장
              </button>
            </div>

            {saved && <div className="toast">저장됨</div>}
          </div>
        </header>

        <section className="grid">
          <Card title="오늘 목표" desc="작게 하나만 정하면 유지가 쉽습니다." />
          <Card title="진행 체크" desc="선택한 모드에 맞춰 템포를 조절하세요." />
          <Card title="공유" desc="완성되면 Vercel로 배포해서 URL로 공유합니다." />
        </section>

        <footer className="foot">
          <span>© vibe coding</span>
          <span className="muted">mood & one-line are saved locally</span>
        </footer>
      </div>

      <style>{css}</style>
    </div>
  );
}

function Card({ title, desc }) {
  return (
    <div className="card">
      <div className="cardTitle">{title}</div>
      <div className="cardDesc">{desc}</div>
      <div className="cardLine" />
    </div>
  );
}

const css = `
:root{
  --bg:#0b1020;
  --card: rgba(255,255,255,0.06);
  --bd: rgba(255,255,255,0.12);
  --txt:#e5e7eb;
  --muted: rgba(229,231,235,0.75);
  --shadow: 0 30px 80px rgba(0,0,0,0.45);
  --r: 22px;
  --a: #2dd4bf;
  --b: #a78bfa;
}
.page{
  min-height:100vh;
  color:var(--txt);
  background:
    radial-gradient(1200px 600px at 10% 10%, rgba(45,212,191,0.18), transparent),
    radial-gradient(1200px 600px at 90% 20%, rgba(167,139,250,0.18), transparent),
    var(--bg);
  display:grid;
  place-items:center;
  padding:28px;
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
}
.wrap{ width:min(980px, 100%); }

.hero{
  border:1px solid var(--bd);
  background: var(--card);
  border-radius: var(--r);
  box-shadow: var(--shadow);
  padding:28px;
  backdrop-filter: blur(10px);
  transform: translateY(0);
  animation: pop 420ms ease both;
}
@keyframes pop { from{opacity:0; transform: translateY(10px)} to{opacity:1; transform: translateY(0)} }

.pill{
  display:inline-flex;
  gap:8px;
  align-items:center;
  border:1px solid var(--bd);
  background: rgba(255,255,255,0.04);
  padding:8px 12px;
  border-radius: 999px;
  font-size:12px;
  margin-bottom:14px;
}
.title{ font-size:38px; margin: 6px 0 10px; letter-spacing:-0.6px; }
.accent{ color: var(--a); }
.sub{ margin:0; color:var(--muted); line-height:1.6; }

.btnRow{
  display:flex;
  gap:10px;
  flex-wrap:wrap;
  margin-top:18px;
}
.btn{
  border:1px solid var(--bd);
  background: rgba(255,255,255,0.05);
  color:var(--txt);
  border-radius: 14px;
  padding:12px 14px;
  cursor:pointer;
  display:flex;
  gap:10px;
  align-items:center;
  transition: transform .12s ease, background .2s ease, border .2s ease;
}
.btn:hover{ transform: translateY(-2px); }
.btn:active{ transform: translateY(0) scale(0.99); }
.btn.active{
  border-color: rgba(45,212,191,0.55);
  background: rgba(45,212,191,0.10);
}
.emoji{ font-size:18px; }
.lbl{ font-weight:650; }

.panel{
  margin-top:18px;
  border:1px solid rgba(255,255,255,0.10);
  background: rgba(0,0,0,0.20);
  border-radius: 18px;
  padding:16px;
  position:relative;
}
.panelTop{
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:12px;
  margin-bottom:12px;
}
.panelTitle{ font-size:12px; color:rgba(229,231,235,0.75); }
.panelTag{
  font-size:12px;
  border:1px solid rgba(255,255,255,0.12);
  padding:6px 10px;
  border-radius: 999px;
  background: rgba(255,255,255,0.04);
}

.inputBox{
  display:flex;
  gap:10px;
}
input{
  flex:1;
  border:1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.05);
  border-radius: 14px;
  padding:12px 14px;
  color:var(--txt);
  outline:none;
}
input:focus{
  border-color: rgba(167,139,250,0.55);
}
.save{
  border:1px solid rgba(167,139,250,0.55);
  background: rgba(167,139,250,0.14);
  color:var(--txt);
  border-radius: 14px;
  padding:12px 14px;
  cursor:pointer;
}
.toast{
  position:absolute;
  right:16px;
  top:16px;
  font-size:12px;
  padding:8px 10px;
  border-radius: 999px;
  border:1px solid rgba(45,212,191,0.55);
  background: rgba(45,212,191,0.12);
  animation: fade 900ms ease both;
}
@keyframes fade { 0%{opacity:0; transform:translateY(-6px)} 20%{opacity:1; transform:translateY(0)} 100%{opacity:0} }

.grid{
  margin-top:16px;
  display:grid;
  gap:12px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}
@media (max-width: 900px){
  .grid{ grid-template-columns: 1fr; }
  .title{ font-size:32px; }
}
.card{
  border:1px solid var(--bd);
  background: rgba(255,255,255,0.05);
  border-radius: var(--r);
  padding:18px;
  box-shadow: 0 18px 50px rgba(0,0,0,0.25);
}
.cardTitle{ font-weight:700; margin-bottom:8px; }
.cardDesc{ color:var(--muted); line-height:1.6; }
.cardLine{
  margin-top:14px;
  height:2px;
  width:50px;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--a), var(--b));
  opacity:0.85;
}

.foot{
  margin-top:14px;
  display:flex;
  justify-content:space-between;
  color:rgba(229,231,235,0.65);
  font-size:12px;
}
.muted{ opacity:0.75; }

.page.mood-chill { --a:#2dd4bf; --b:#60a5fa; }
.page.mood-hype  { --a:#fb7185; --b:#f59e0b; }
.page.mood-focus { --a:#a78bfa; --b:#22c55e; }
`;
