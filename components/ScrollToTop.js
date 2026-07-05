"use client";
import { useState, useEffect } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Volver arriba"
      style={{
        position: "fixed",
        bottom: 28,
        right: 24,
        zIndex: 999,
        width: 46,
        height: 46,
        borderRadius: "50%",
        background: "#6f42c1",
        color: "#fff",
        border: "none",
        cursor: "pointer",
        fontSize: "1.15rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 20px rgba(111,66,193,0.45)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        pointerEvents: visible ? "all" : "none",
        transition: "opacity 0.3s ease, transform 0.3s ease, background 0.15s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#5a32a3")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "#6f42c1")}
    >
      ↑
    </button>
  );
}
