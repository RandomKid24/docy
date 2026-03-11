"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "@/components/providers/theme-provider";
import { DARK, LIGHT } from "@/data/site-config";
import { ArrowUp } from "lucide-react";

interface ToCSection {
  id: string;
  title: string;
  headings: { text: string; id: string }[];
}

interface ToCProps {
  sections: ToCSection[];
  ac?: string;
}

export function TableOfContents({ sections, ac: acProp }: ToCProps) {
  const { theme } = useTheme();
  const T = theme === "dark" ? DARK : LIGHT;
  const ac = acProp ?? "#8b5cf6";

  const [activeId, setActiveId] = useState("");
  const [scrollPct, setScrollPct] = useState(0);
  const activeElRef = useRef<HTMLAnchorElement | null>(null);

  // Track hash changes from scroll-spy
  useEffect(() => {
    const onHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) setActiveId(hash);
    };
    window.addEventListener("hashchange", onHash);
    onHash();
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // Scroll progress
  useEffect(() => {
    const el = document.getElementById("doc-scroll-container");
    if (!el) return;
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const pct = scrollHeight <= clientHeight
        ? 0
        : scrollTop / (scrollHeight - clientHeight);
      setScrollPct(Math.round(pct * 100));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // Keep active item visible inside the panel
  useEffect(() => {
    activeElRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [activeId]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${id}`);
    setActiveId(id);
  };

  const backToTop = () =>
    document.getElementById("doc-scroll-container")
      ?.scrollTo({ top: 0, behavior: "smooth" });

  if (sections.length === 0) return null;

  return (
    <aside
      className="w-[200px] shrink-0 flex flex-col h-full select-none"
      style={{ borderLeft: `1px solid ${T.border}` }}
    >
      {/* Read-progress line */}
      <div className="relative h-[2px] w-full" style={{ background: T.border }}>
        <div
          style={{
            height: "100%",
            width: `${scrollPct}%`,
            background: ac,
            transition: "width 0.4s cubic-bezier(0.4,0,0.2,1)",
            boxShadow: scrollPct === 100 ? `0 0 8px ${ac}` : "none",
          }}
          className={scrollPct === 100 ? "animate-pulse-subtle" : ""}
        />
      </div>

      <style>{`
        @keyframes pulse-subtle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 2s ease-in-out infinite;
        }
      `}</style>

      {/* Header */}
      <div className="px-4 pt-4 pb-2 flex items-center justify-between">
        <span
          style={{
            fontSize: "10px",
            textTransform: "uppercase",
            letterSpacing: "0.16em",
            fontWeight: 300,
            color: T.ink3,
            fontFamily: "var(--font-dm-mono, monospace)",
          }}
        >
          On this page
        </span>
        <span
          style={{
            fontSize: "10px",
            color: ac,
            fontFamily: "var(--font-dm-mono, monospace)",
            fontWeight: 300,
            opacity: scrollPct > 0 ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        >
          {scrollPct}%
        </span>
      </div>

      {/* Scrollable list */}
      <div className="flex-1 overflow-y-auto pb-4">
        {sections.map(section => {
          const sectionActive = section.id === activeId;
          const childActive = section.headings.some(h => h.id === activeId);
          const anyActive = sectionActive || childActive;

          return (
            <div key={section.id} className="mb-0.5">
              {/* Section title */}
              {section.title && (
                <a
                  ref={sectionActive ? el => { activeElRef.current = el; } : undefined}
                  href={`#${section.id}`}
                  onClick={e => { e.preventDefault(); scrollTo(section.id); }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "5px 16px",
                    fontSize: "12px",
                    fontWeight: anyActive ? 500 : 300,
                    color: anyActive ? T.ink : T.ink2,
                    letterSpacing: "-0.01em",
                    borderLeft: `2px solid ${sectionActive ? ac : "transparent"}`,
                    transition: "all 0.2s ease",
                    textDecoration: "none",
                  }}
                  onMouseEnter={e => { if (!sectionActive) e.currentTarget.style.color = T.ink; }}
                  onMouseLeave={e => { if (!sectionActive) e.currentTarget.style.color = anyActive ? T.ink : T.ink2; }}
                >
                  {section.title}
                </a>
              )}

              {/* h2 sub-headings */}
              {section.headings.map((h, i) => {
                const isOn = h.id === activeId;
                return (
                  <a
                    key={i}
                    ref={isOn ? el => { activeElRef.current = el; } : undefined}
                    href={`#${h.id}`}
                    onClick={e => { e.preventDefault(); scrollTo(h.id); }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "4px 16px 4px 28px",
                      fontSize: "11.5px",
                      fontWeight: isOn ? 500 : 300,
                      color: isOn ? T.ink : T.ink3,
                      borderLeft: `2px solid ${isOn ? ac : "transparent"}`,
                      transition: "all 0.18s ease",
                      textDecoration: "none",
                      letterSpacing: isOn ? "-0.01em" : "normal",
                    }}
                    onMouseEnter={e => {
                      if (!isOn) {
                        e.currentTarget.style.color = T.ink2;
                        e.currentTarget.style.borderLeftColor = `${ac}40`;
                      }
                    }}
                    onMouseLeave={e => {
                      if (!isOn) {
                        e.currentTarget.style.color = T.ink3;
                        e.currentTarget.style.borderLeftColor = "transparent";
                      }
                    }}
                  >
                    <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {h.text}
                    </span>
                  </a>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Back to top */}
      <div className="border-t px-4 py-3" style={{ borderColor: T.border }}>
        <button
          onClick={backToTop}
          className="group flex items-center gap-1.5"
          style={{
            fontSize: "11px",
            color: T.ink3,
            fontFamily: "var(--font-dm-mono, monospace)",
            letterSpacing: "0.02em",
            fontWeight: 300,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            transition: "color 0.2s ease",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = T.ink2)}
          onMouseLeave={e => (e.currentTarget.style.color = T.ink3)}
        >
          <ArrowUp size={11} strokeWidth={1.5} className="group-hover:-translate-y-0.5 transition-transform duration-200" />
          back to top
        </button>
      </div>
    </aside>
  );
}
