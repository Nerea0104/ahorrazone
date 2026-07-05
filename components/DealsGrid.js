"use client";
import { useState } from "react";
import DealCard from "./DealCard";
import { SOURCE_CONFIG } from "../lib/deals";

export default function DealsGrid({ deals, dict, lang }) {
  const [active, setActive] = useState("all");

  const filters = [
    { key: "all",        label: dict.ofertas.filterAll },
    { key: "amazon",     label: dict.ofertas.filterAmazon },
    { key: "aliexpress", label: dict.ofertas.filterAli },
    { key: "eci",        label: dict.ofertas.filterEci },
  ];

  const visible = active === "all" ? deals : deals.filter((d) => d.source === active);

  return (
    <>
      {/* Source filter */}
      <div className="d-flex flex-wrap gap-2 mb-4">
        {filters.map((f) => {
          const isActive = f.key === active;
          const cfg = SOURCE_CONFIG[f.key];
          return (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              style={{
                padding: "7px 16px",
                borderRadius: "999px",
                border: isActive
                  ? `2px solid ${cfg ? cfg.color : "#6f42c1"}`
                  : "2px solid #e9e4f6",
                background: isActive ? (cfg ? cfg.bg : "rgba(111,66,193,0.08)") : "#fff",
                color: isActive ? (cfg ? cfg.color : "#6f42c1") : "#6b7280",
                fontWeight: isActive ? 700 : 500,
                fontSize: "0.88rem",
                cursor: "pointer",
                transition: "all 0.18s",
              }}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {visible.length === 0 ? (
        <div className="text-center py-5">
          <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🔍</div>
          <p style={{ color: "#aaa", fontSize: "1rem" }}>{dict.ofertas.empty}</p>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4">
          {visible.map((deal) => (
            <div key={deal.slug} className="col">
              <DealCard deal={deal} dict={dict.deal} lang={lang} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
