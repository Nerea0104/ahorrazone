"use client";
import { useState, useEffect } from "react";

export default function HeroCarousel({ slides, label, ctaLabel }) {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrent((i) => (i + 1) % slides.length);
        setFading(false);
      }, 280);
    }, 3600);
    return () => clearInterval(t);
  }, [slides.length]);

  const go = (i) => {
    if (i === current) return;
    setFading(true);
    setTimeout(() => {
      setCurrent(i);
      setFading(false);
    }, 280);
  };

  const s = slides[current];

  return (
    <div className="az-phone az-float">
      {/* Header */}
      <div className="az-phone-header">
        <span className="az-phone-avatar">🤖</span>
        <div>
          <div style={{ fontWeight: 700, lineHeight: 1.1 }}>Ahorrazone bot</div>
          <div className="text-muted" style={{ fontSize: "0.78rem" }}>{label}</div>
        </div>
        <div
          style={{
            marginLeft: "auto",
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "#22c55e",
            boxShadow: "0 0 0 3px rgba(34,197,94,0.2)",
          }}
        />
      </div>

      {/* Alert bubble */}
      <div
        className="az-alert mt-3"
        style={{
          opacity: fading ? 0 : 1,
          transform: fading ? "translateY(8px)" : "none",
          transition: "opacity 0.28s ease, transform 0.28s ease",
        }}
      >
        <div className="d-flex align-items-center justify-content-between gap-2">
          <span style={{ fontWeight: 700, color: "#6f42c1", fontSize: "0.88rem" }}>
            {s.badge}
          </span>
          <span
            style={{
              fontSize: "0.7rem",
              background: "rgba(111,66,193,0.1)",
              color: "#6f42c1",
              borderRadius: "5px",
              padding: "2px 7px",
              fontWeight: 600,
              whiteSpace: "nowrap",
            }}
          >
            {s.store}
          </span>
        </div>
        <div className="mt-2" style={{ fontWeight: 600, fontSize: "0.95rem" }}>
          📌 {s.product}
        </div>
        <div className="mt-1 d-flex align-items-center gap-2 flex-wrap">
          <span
            className="text-muted text-decoration-line-through"
            style={{ fontSize: "0.85rem" }}
          >
            {s.was}
          </span>
          <span style={{ fontWeight: 800, fontSize: "1.05rem" }}>{s.now}</span>
          <span className="badge" style={{ background: "#198754", fontSize: "0.78rem" }}>
            {s.pct}
          </span>
        </div>
        <a
          href="https://t.me/Ahorrazone_bot"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-sm w-100 mt-3"
          style={{ background: "#6f42c1", color: "#fff", fontWeight: 600, borderRadius: "10px" }}
        >
          {ctaLabel}
        </a>
      </div>

      {/* Dots */}
      <div className="d-flex justify-content-center gap-2 mt-3 pb-1">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            aria-label={`Slide ${i + 1}`}
            style={{
              width: i === current ? 24 : 8,
              height: 8,
              borderRadius: 4,
              background: i === current ? "#6f42c1" : "rgba(111,66,193,0.2)",
              border: "none",
              padding: 0,
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}
