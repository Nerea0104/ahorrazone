"use client";
import { useState, useCallback, useMemo } from "react";
import DealCard from "./DealCard";
import { SOURCE_CONFIG } from "../lib/deals";

const PAGE_SIZE = 48;

const SORT_OPTIONS = ["newest", "discount", "price_asc", "price_desc"];

function sortDeals(deals, sort) {
  const arr = [...deals];
  switch (sort) {
    case "discount":
      return arr.sort((a, b) => (b.discount_pct ?? 0) - (a.discount_pct ?? 0));
    case "price_asc":
      return arr.sort((a, b) => a.price - b.price);
    case "price_desc":
      return arr.sort((a, b) => b.price - a.price);
    default:
      return arr.sort((a, b) => new Date(b.detected_at) - new Date(a.detected_at));
  }
}

export default function DealsGrid({ deals: initialDeals, dict, lang }) {
  const t = dict.ofertas;

  const [source, setSource] = useState("all");
  const [sort, setSort] = useState("newest");
  const [allDeals, setAllDeals] = useState(initialDeals);
  const [loading, setLoading] = useState(false);
  const [exhausted, setExhausted] = useState(initialDeals.length < PAGE_SIZE);

  const filters = [
    { key: "all",        label: t.filterAll },
    { key: "amazon",     label: t.filterAmazon },
    { key: "aliexpress", label: t.filterAli },
    { key: "eci",        label: t.filterEci },
  ];

  const sortLabels = {
    newest:     t.sortNewest,
    discount:   t.sortDiscount,
    price_asc:  t.sortPriceAsc,
    price_desc: t.sortPriceDesc,
  };

  const visible = useMemo(() => {
    const filtered = source === "all" ? allDeals : allDeals.filter((d) => d.source === source);
    return sortDeals(filtered, sort);
  }, [allDeals, source, sort]);

  const handleSource = useCallback((key) => setSource(key), []);

  const handleSort = useCallback((e) => setSort(e.target.value), []);

  const loadMore = useCallback(async () => {
    if (loading || exhausted) return;
    setLoading(true);
    try {
      const params = new URLSearchParams({
        offset: allDeals.length,
        limit: PAGE_SIZE,
        sort,
        ...(source !== "all" && { source }),
      });
      const res = await fetch(`/api/deals?${params}`);
      const next = await res.json();
      if (!next.length || next.length < PAGE_SIZE) setExhausted(true);
      setAllDeals((prev) => {
        const seen = new Set(prev.map((d) => d.slug));
        return [...prev, ...next.filter((d) => !seen.has(d.slug))];
      });
    } catch {
      // silent — user can retry
    } finally {
      setLoading(false);
    }
  }, [loading, exhausted, allDeals.length, sort, source]);

  const resultCount = (t.resultsCount ?? "{n} ofertas").replace("{n}", visible.length);

  return (
    <>
      {/* ── Filter bar ────────────────────────────────────────────────── */}
      <div
        style={{
          background: "#fff",
          border: "1px solid rgba(111,66,193,0.12)",
          borderRadius: "16px",
          padding: "18px 20px",
          marginBottom: "28px",
          boxShadow: "0 2px 12px rgba(111,66,193,0.06)",
        }}
      >
        {/* Row 1 — source filters */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              color: "#9ca3af",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginRight: "4px",
              flexShrink: 0,
            }}
          >
            {t.filterLabel}
          </span>
          {filters.map((f) => {
            const isActive = f.key === source;
            const cfg = SOURCE_CONFIG[f.key];
            return (
              <button
                key={f.key}
                onClick={() => handleSource(f.key)}
                style={{
                  padding: "6px 16px",
                  borderRadius: "999px",
                  border: isActive
                    ? `2px solid ${cfg ? cfg.color : "#6f42c1"}`
                    : "1.5px solid #e9e4f6",
                  background: isActive
                    ? cfg ? cfg.bg : "rgba(111,66,193,0.08)"
                    : "transparent",
                  color: isActive ? (cfg ? cfg.color : "#6f42c1") : "#6b7280",
                  fontWeight: isActive ? 700 : 500,
                  fontSize: "0.86rem",
                  cursor: "pointer",
                  transition: "all 0.15s",
                  lineHeight: 1,
                }}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: "rgba(111,66,193,0.07)",
            margin: "14px 0",
          }}
        />

        {/* Row 2 — count + sort */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontSize: "0.83rem",
              color: "#9ca3af",
              fontWeight: 500,
            }}
          >
            {resultCount}
          </span>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "#6b7280",
                whiteSpace: "nowrap",
              }}
            >
              {t.sortLabel}
            </span>
            <div style={{ position: "relative" }}>
              <select
                value={sort}
                onChange={handleSort}
                style={{
                  appearance: "none",
                  WebkitAppearance: "none",
                  background: "#fff",
                  border: "1.5px solid rgba(111,66,193,0.25)",
                  borderRadius: "10px",
                  padding: "7px 36px 7px 12px",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "#4b3b73",
                  cursor: "pointer",
                  outline: "none",
                  transition: "border-color 0.15s",
                  minWidth: "180px",
                }}
              >
                {SORT_OPTIONS.map((key) => (
                  <option key={key} value={key}>
                    {sortLabels[key]}
                  </option>
                ))}
              </select>
              {/* Custom chevron */}
              <svg
                style={{
                  position: "absolute",
                  right: "11px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                  color: "#6f42c1",
                }}
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M3 5l4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ── Grid ──────────────────────────────────────────────────────── */}
      {visible.length === 0 ? (
        <div className="text-center py-5">
          <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🔍</div>
          <p style={{ color: "#aaa", fontSize: "1rem" }}>{t.empty}</p>
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

      {/* ── Load more ─────────────────────────────────────────────────── */}
      {!exhausted && visible.length > 0 && (
        <div className="text-center mt-5">
          <button
            onClick={loadMore}
            disabled={loading}
            style={{
              padding: "12px 40px",
              borderRadius: "999px",
              border: "2px solid #6f42c1",
              background: loading ? "#f3eeff" : "#fff",
              color: "#6f42c1",
              fontWeight: 700,
              fontSize: "0.95rem",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.18s",
              boxShadow: "0 2px 12px rgba(111,66,193,0.1)",
            }}
          >
            {loading ? t.loadingMore : t.loadMore}
          </button>
        </div>
      )}
    </>
  );
}
