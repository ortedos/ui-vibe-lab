"use client";

import { ChangeEvent, FormEvent, useState } from "react";

type Review = {
  score: number;
  findings: string[];
  actions: string[];
};

function toObjectUrl(file: File | null) {
  return file ? URL.createObjectURL(file) : null;
}

export default function HomePage() {
  const [leftFile, setLeftFile] = useState<File | null>(null);
  const [rightFile, setRightFile] = useState<File | null>(null);
  const [leftPreview, setLeftPreview] = useState<string | null>(null);
  const [rightPreview, setRightPreview] = useState<string | null>(null);
  const [context, setContext] = useState("Landing page for a property search feature with a form and CTA");
  const [review, setReview] = useState<Review | null>(null);
  const [mode, setMode] = useState<string | null>(null);

  function handleFile(side: "left" | "right", event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    const url = toObjectUrl(file);
    if (side === "left") {
      setLeftFile(file);
      setLeftPreview(url);
    } else {
      setRightFile(file);
      setRightPreview(url);
    }
  }

  async function handleReview(event: FormEvent) {
    event.preventDefault();
    const res = await fetch("/api/review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ context })
    });
    const data = await res.json();
    setReview(data.review ?? null);
    setMode(data.mode ?? null);
  }

  return (
    <main>
      <div className="row wrap" style={{ justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <div className="badge">AI-assisted UX critique</div>
          <h1 style={{ marginTop: 16, fontSize: 42 }}>UI Vibe Lab</h1>
          <p className="muted">Upload two interface screenshots, add context, and get a concise UX review with prioritized actions.</p>
        </div>
        {review ? (
          <div className="card" style={{ minWidth: 220 }}>
            <div className="small muted">Review score</div>
            <div className="score">{review.score}</div>
            {mode ? <div className="small muted">Mode: {mode}</div> : null}
          </div>
        ) : null}
      </div>

      <form className="grid" onSubmit={handleReview}>
        <div className="grid two">
          <section className="card">
            <h2>Version A</h2>
            <input type="file" accept="image/*" onChange={(e) => handleFile("left", e)} />
            <div className="preview-box" style={{ marginTop: 16 }}>
              {leftPreview ? <img src={leftPreview} alt="Version A preview" /> : <span className="muted">Upload screenshot A</span>}
            </div>
            {leftFile ? <p className="small muted">{leftFile.name}</p> : null}
          </section>

          <section className="card">
            <h2>Version B</h2>
            <input type="file" accept="image/*" onChange={(e) => handleFile("right", e)} />
            <div className="preview-box" style={{ marginTop: 16 }}>
              {rightPreview ? <img src={rightPreview} alt="Version B preview" /> : <span className="muted">Upload screenshot B</span>}
            </div>
            {rightFile ? <p className="small muted">{rightFile.name}</p> : null}
          </section>
        </div>

        <section className="card">
          <label htmlFor="context">Screen context</label>
          <textarea id="context" value={context} onChange={(e) => setContext(e.target.value)} />
          <p className="small muted" style={{ marginTop: 8 }}>
            In demo mode, the review is based on the provided context. To add real multimodal analysis, connect a vision-capable model in `/api/review`.
          </p>
          <button type="submit">Run UX review</button>
        </section>
      </form>

      {review ? (
        <div className="grid two" style={{ marginTop: 20 }}>
          <section className="card">
            <h2>Key findings</h2>
            <ul className="list">
              {review.findings.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </section>
          <section className="card">
            <h2>Priority actions</h2>
            <ul className="list">
              {review.actions.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </section>
        </div>
      ) : null}
    </main>
  );
}
