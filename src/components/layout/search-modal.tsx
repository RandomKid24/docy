"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Search, FileText, Hash, ArrowRight, Clock, Layers } from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";
import { DARK, LIGHT, SITE } from "@/data/site-config";
import { useRouter } from "next/navigation";

// Build a flat index of all searchable pages with full metadata
const buildIndex = () =>
  Object.entries(SITE.sections).flatMap(([navName, sec]) =>
    sec.groups.flatMap(g =>
      g.pages.map(p => ({
        id: p.id,
        label: p.label,
        group: g.label,
        groupId: g.id,
        nav: navName,
        accentColor: sec.color,
      }))
    )
  );

const ALL_PAGES = buildIndex();

// Highlight matching text with a span
function Highlight({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-transparent font-semibold" style={{ color: "inherit" }}>
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
}

// Group results by their group label
function groupResults(results: typeof ALL_PAGES) {
  const map = new Map<string, typeof ALL_PAGES>();
  for (const r of results) {
    if (!map.has(r.group)) map.set(r.group, []);
    map.get(r.group)!.push(r);
  }
  return Array.from(map.entries());
}

const FEATURED = ALL_PAGES.slice(0, 5); // First 5 pages shown when idle

export function SearchModal() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const { theme } = useTheme();
  const T = theme === "dark" ? DARK : LIGHT;
  const ac = SITE.sections["HRMS Guide"]?.color || "#8b5cf6";
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const results = query.trim()
    ? ALL_PAGES.filter(p =>
        p.label.toLowerCase().includes(query.toLowerCase()) ||
        p.group.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 12)
    : [];

  const flatResults = query.trim() ? results : FEATURED;

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActiveIdx(0);
  }, []);

  const navigate = useCallback((id: string) => {
    router.push(`/hrms-guide#${id}`);
    close();
  }, [router, close]);

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(v => !v);
      }
      if (e.key === "Escape") close();
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-search", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-search", onOpen);
    };
  }, [close]);

  // Arrow key navigation inside modal
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIdx(i => Math.min(i + 1, flatResults.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIdx(i => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && flatResults[activeIdx]) {
        navigate(flatResults[activeIdx].id);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, flatResults, activeIdx, navigate]);

  // Scroll active result into view
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-idx="${activeIdx}"]`) as HTMLElement | null;
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIdx]);

  // Focus input on open
  useEffect(() => {
    if (open) setTimeout(() => searchRef.current?.focus(), 30);
  }, [open]);

  // Reset active index when query changes
  useEffect(() => { setActiveIdx(0); }, [query]);

  if (!open) return null;

  const grouped = query.trim() ? groupResults(results) : null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center pt-16 px-4"
      style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)" }}
      onClick={e => e.target === e.currentTarget && close()}
    >
      <div
        className="w-full max-w-[580px] rounded-2xl border overflow-hidden shadow-2xl"
        style={{
          background: T.bg0,
          borderColor: T.border2,
          animation: "searchSlideIn 0.18s cubic-bezier(0.16,1,0.3,1)",
          boxShadow: `0 32px 80px rgba(0,0,0,0.35), 0 0 0 1px ${T.border}`,
        }}
      >
        {/* ─── Input row ─── */}
        <div
          className="flex items-center gap-3 px-4 py-3.5 border-b"
          style={{ borderColor: T.border }}
        >
          <Search size={17} strokeWidth={2} style={{ color: T.ink3, flexShrink: 0 }} />
          <input
            ref={searchRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search pages, topics, keywords…"
            className="flex-1 bg-transparent border-none outline-none text-[15px]"
            style={{ color: T.ink, fontFamily: "inherit" }}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-[11px] font-mono px-1.5 py-0.5 rounded border transition-colors"
              style={{ color: T.ink3, borderColor: T.border2, background: T.bg2 }}
            >
              clear
            </button>
          )}
          <kbd
            className="text-[10px] font-mono px-1.5 py-0.5 rounded border hidden sm:block"
            style={{ background: T.bg2, borderColor: T.border2, color: T.ink3 }}
          >
            esc
          </kbd>
        </div>

        {/* ─── Results ─── */}
        <div ref={listRef} className="max-h-[420px] overflow-y-auto">

          {/* Empty state */}
          {!query && (
            <div>
              <div
                className="flex items-center gap-2 px-4 pt-4 pb-2 text-[10px] font-mono uppercase tracking-widest"
                style={{ color: T.ink3 }}
              >
                <Clock size={10} />
                Featured pages
              </div>
              {FEATURED.map((r, i) => (
                <ResultRow
                  key={r.id}
                  r={r} query="" idx={i} activeIdx={activeIdx}
                  T={T} ac={ac}
                  onClick={() => navigate(r.id)}
                  onHover={() => setActiveIdx(i)}
                />
              ))}
            </div>
          )}

          {/* Search results grouped */}
          {query && results.length === 0 && (
            <div className="py-16 text-center" style={{ color: T.ink3 }}>
              <Search size={28} strokeWidth={1} className="mx-auto mb-3 opacity-30" />
              <p className="text-[14px]">No results for <strong style={{ color: T.ink2 }}>"{query}"</strong></p>
              <p className="text-[12px] mt-1 opacity-60">Try a different keyword or section name.</p>
            </div>
          )}

          {query && grouped && (() => {
            let globalIdx = 0;
            return grouped.map(([groupLabel, pages]) => (
              <div key={groupLabel}>
                <div
                  className="flex items-center gap-2 px-4 pt-4 pb-1.5 text-[10px] font-mono uppercase tracking-widest"
                  style={{ color: T.ink3 }}
                >
                  <Layers size={10} />
                  {groupLabel}
                  <span className="ml-auto opacity-50">{pages.length}</span>
                </div>
                {pages.map(r => {
                  const idx = globalIdx++;
                  return (
                    <ResultRow
                      key={r.id}
                      r={r} query={query} idx={idx} activeIdx={activeIdx}
                      T={T} ac={ac}
                      onClick={() => navigate(r.id)}
                      onHover={() => setActiveIdx(idx)}
                    />
                  );
                })}
              </div>
            ));
          })()}
        </div>

        {/* ─── Footer shortcuts ─── */}
        <div
          className="border-t px-4 py-2 flex items-center gap-4 font-mono text-[10.5px]"
          style={{ borderColor: T.border, color: T.ink3 }}
        >
          {[["↑↓", "navigate"], ["↵", "open"], ["esc", "close"]].map(([k, v]) => (
            <span key={k} className="flex items-center gap-1">
              <kbd
                className="px-1.5 py-0.5 rounded border text-[10px] inline-block"
                style={{ background: T.bg2, borderColor: T.border2 }}
              >
                {k}
              </kbd>
              {v}
            </span>
          ))}
          <span className="ml-auto opacity-50">
            {query ? `${results.length} result${results.length !== 1 ? "s" : ""}` : `${ALL_PAGES.length} pages indexed`}
          </span>
        </div>
      </div>

      <style>{`
        @keyframes searchSlideIn {
          from { opacity: 0; transform: translateY(-12px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}

// ─── Individual result row ───────────────────────────────────────
function ResultRow({
  r, query, idx, activeIdx, T, ac, onClick, onHover,
}: {
  r: (typeof ALL_PAGES)[0];
  query: string;
  idx: number;
  activeIdx: number;
  T: typeof DARK;
  ac: string;
  onClick: () => void;
  onHover: () => void;
}) {
  const isActive = idx === activeIdx;
  return (
    <button
      data-idx={idx}
      onClick={onClick}
      onMouseEnter={onHover}
      className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors"
      style={{
        background: isActive ? `${ac}14` : "transparent",
        borderLeft: isActive ? `2px solid ${ac}` : "2px solid transparent",
      }}
    >
      <div
        className="shrink-0 w-7 h-7 flex items-center justify-center rounded-lg border transition-colors"
        style={{
          background: isActive ? `${ac}18` : T.bg2,
          borderColor: isActive ? `${ac}40` : T.border,
          color: isActive ? ac : T.ink3,
        }}
      >
        <FileText size={12} strokeWidth={2} />
      </div>

      <div className="flex-1 min-w-0">
        <div
          className="text-[13.5px] truncate"
          style={{ color: isActive ? T.ink : T.ink2, fontWeight: isActive ? 500 : 400 }}
        >
          <Highlight text={r.label} query={query} />
        </div>
        <div className="text-[11px] flex items-center gap-1 mt-0.5" style={{ color: T.ink3 }}>
          <Hash size={9} strokeWidth={2} />
          <Highlight text={r.group} query={query} />
        </div>
      </div>

      <ArrowRight
        size={13}
        strokeWidth={2}
        className="shrink-0 transition-all duration-150"
        style={{
          color: isActive ? ac : "transparent",
          transform: isActive ? "translateX(0)" : "translateX(-4px)",
          opacity: isActive ? 1 : 0,
        }}
      />
    </button>
  );
}
