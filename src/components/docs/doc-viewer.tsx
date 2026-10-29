"use client";

import React, { useEffect, useState, useRef } from "react";
import { SITE, DARK, LIGHT, SiteNav } from "@/data/site-config";
import { CONTENT, getDefaultContent, DocContent } from "@/data/docs-content";
import { useTheme } from "@/components/providers/theme-provider";
import { Block } from "@/components/docs/block";
import { TableOfContents } from "@/components/layout/table-of-contents";
import { 
  ChevronRight, BookOpen, FileText, LayoutDashboard, Menu, Users, 
  UserPlus, Layers, Box, Clock, Calendar, Sparkles, Briefcase, 
  UserMinus, Zap, BarChart2, Settings, Lock, Eye, Lightbulb, Shield
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DocViewerProps {
  section: SiteNav;
  onNavigate?: (slug: string) => void;
}

const TITLE_ICONS: Record<string, React.ReactNode> = {
  "what-is-hrms": <BookOpen size={28} strokeWidth={1.5} />,
  "how-to-login": <Shield size={28} strokeWidth={1.5} />,
  "dashboard": <LayoutDashboard size={28} strokeWidth={1.5} />,
  "sidebar": <Menu size={28} strokeWidth={1.5} />,
  "employees": <Users size={28} strokeWidth={1.5} />,
  "onboarding": <UserPlus size={28} strokeWidth={1.5} />,
  "forms": <FileText size={28} strokeWidth={1.5} />,
  "departments": <Layers size={28} strokeWidth={1.5} />,
  "assets": <Box size={28} strokeWidth={1.5} />,
  "attendance": <Clock size={28} strokeWidth={1.5} />,
  "leave": <Calendar size={28} strokeWidth={1.5} />,
  "holidays": <Sparkles size={28} strokeWidth={1.5} />,
  "recruitment": <Briefcase size={28} strokeWidth={1.5} />,
  "resignations": <UserMinus size={28} strokeWidth={1.5} />,
  "shifts": <Zap size={28} strokeWidth={1.5} />,
  "reports-overview": <BarChart2 size={28} strokeWidth={1.5} />,
  "settings": <Settings size={28} strokeWidth={1.5} />,
  "roles": <Lock size={28} strokeWidth={1.5} />,
  "visibility": <Eye size={28} strokeWidth={1.5} />,
  "quick-tips": <Lightbulb size={28} strokeWidth={1.5} />,
  // Marketing Icons
  "m-getting-started": <Shield size={28} strokeWidth={1.5} />,
  "m-dashboard": <LayoutDashboard size={28} strokeWidth={1.5} />,
  "m-domains": <Layers size={28} strokeWidth={1.5} />,
  "m-leads": <Sparkles size={28} strokeWidth={1.5} />,
  "m-quotations": <FileText size={28} strokeWidth={1.5} />,
  "m-orders": <Box size={28} strokeWidth={1.5} />,
  "m-database": <Users size={28} strokeWidth={1.5} />,
  "m-reports": <BarChart2 size={28} strokeWidth={1.5} />,
  "m-report-templates": <Layers size={28} strokeWidth={1.5} />,
  "m-settings": <Settings size={28} strokeWidth={1.5} />,
  "m-notifications": <Zap size={28} strokeWidth={1.5} />,
};

// Build a lookup: page id → { groupLabel, pageTitle }
function buildBreadcrumbMap(section: SiteNav) {
  const map = new Map<string, { group: string; title: string }>();
  const sectionConfig = SITE.sections[section];
  if (!sectionConfig) return map;
  for (const g of sectionConfig.groups) {
    for (const page of g.pages) {
      map.set(page.id, { group: g.label, title: page.label });
    }
  }
  return map;
}

export function DocViewer({ section, onNavigate }: DocViewerProps) {
  const { theme } = useTheme();
  const T = theme === "dark" ? DARK : LIGHT;
  const [activeId, setActiveId] = useState<string>("");
  const [visibleIds, setVisibleIds] = useState<Set<string>>(new Set());

  const breadcrumbMap = buildBreadcrumbMap(section);
  const sectionConfig = SITE.sections[section];
  if (!sectionConfig) return null;

  const ac = sectionConfig.color;

  // The billing guide has ~140 pages, so show one group at a time instead of one endless scroll.
  const isBilling = section === "Billing Guide";
  const shownGroup = isBilling
    ? sectionConfig.groups.find(g => g.pages.some(p => p.id === activeId)) ?? sectionConfig.groups[0]
    : null;

  // Flatten all pages
  const allContents: DocContent[] = [];
  for (const g of sectionConfig.groups) {
    if (shownGroup && g !== shownGroup) continue;
    for (const page of g.pages) {
      const content = CONTENT[page.id] || getDefaultContent(page.label, g.label);
      allContents.push({ ...content, id: page.id } as DocContent & { id: string });
    }
  }

  // Build structured ToC
  const tocSections = allContents.map(c => ({
    id: c.id || "",
    title: c.title,
    headings: c.blocks
      .filter(b => b.type === "h2")
      .map(b => {
        const text = (b as { type: "h2"; text: string }).text;
        return {
          text,
          id: text.toLowerCase().replace(/[^\w]+/g, "-").replace(/^-+|-+$/g, ""),
        };
      }),
  }));

  // A link or sidebar click names a target; keep it pinned until the group switch and image loading settle,
  // otherwise scroll-spy rewrites the hash to whatever is on screen mid-transition.
  const pinned = useRef("");
  const lastSpy = useRef("");
  const knownIds = new Set(sectionConfig.groups.flatMap(g => g.pages.map(p => p.id)));
  const pin = (h: string) => {
    if (h && h !== lastSpy.current && knownIds.has(h)) pinned.current = h;
  };

  // Scroll-spy: update active id from hash
  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      pin(hash);
      if (hash) setActiveId(hash);
    };
    window.addEventListener("hashchange", onHashChange);
    onHashChange();
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  // After switching groups the target did not exist yet when the hash changed, so scroll to it now.
  const shownGroupId = shownGroup?.id ?? section;
  useEffect(() => {
    const box = document.getElementById("doc-scroll-container");
    const target = pinned.current || window.location.hash.replace("#", "");
    const go = () => {
      const el = target && document.getElementById(target);
      if (el) el.scrollIntoView({ behavior: "instant" });
      else box?.scrollTo({ top: 0, behavior: "instant" });
    };
    go();
    // Screenshots above the target keep loading and push it down; re-aim until they settle or the reader scrolls.
    const timers = [250, 600, 1200, 2000].map(ms => window.setTimeout(go, ms));
    if (target && (shownGroup ? shownGroup.pages.some(p => p.id === target) : knownIds.has(target))) {
      timers.push(window.setTimeout(() => { if (pinned.current === target) pinned.current = ""; }, 2300));
    }
    const stopTimers = () => timers.forEach(clearTimeout);
    const stop = () => { stopTimers(); pinned.current = ""; };
    box?.addEventListener("wheel", stop, { once: true });
    box?.addEventListener("touchstart", stop, { once: true });
    window.addEventListener("keydown", stop, { once: true });
    return () => {
      stopTimers();
      box?.removeEventListener("wheel", stop);
      box?.removeEventListener("touchstart", stop);
      window.removeEventListener("keydown", stop);
    };
  }, [shownGroupId]);

  // IntersectionObserver for scroll-spy active section AND reveal animation
  useEffect(() => {
    const obActive = new IntersectionObserver(
      entries => {
        const visible = entries.find(e => e.isIntersecting);
        if (visible && !pinned.current) {
          const id = visible.target.id;
          lastSpy.current = id;
          window.history.replaceState(null, "", `#${id}`);
          window.dispatchEvent(new Event("hashchange"));
          setActiveId(id);
        }
      },
      {
        root: document.getElementById("doc-scroll-container"),
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      }
    );

    const obReveal = new IntersectionObserver(
      entries => {
        setVisibleIds(prev => {
          const next = new Set(prev);
          let changed = false;
          for (const e of entries) {
            if (e.isIntersecting && !next.has(e.target.id)) {
              next.add(e.target.id);
              changed = true;
            }
          }
          return changed ? next : prev;
        });
      },
      {
        root: document.getElementById("doc-scroll-container"),
        rootMargin: "0px 0px -100px 0px",
        threshold: 0,
      }
    );

    allContents.forEach(c => {
      if (c.id) {
        const el = document.getElementById(c.id);
        if (el) {
          obActive.observe(el);
          obReveal.observe(el);
        }
      }
    });

    return () => {
      obActive.disconnect();
      obReveal.disconnect();
    };
  }, [allContents]);

  const handleNavigate = (id: string) => {
    if (onNavigate) {
      onNavigate(id);
    } else {
      window.location.hash = id;
    }
  };

  // Derive breadcrumb from activeId
  const crumb = activeId ? breadcrumbMap.get(activeId) : null;

  return (
    <div className="flex flex-1 overflow-hidden h-full relative" style={{ backgroundColor: T.bg0 }}>
      <main className="flex-1 overflow-y-auto scroll-smooth" id="doc-scroll-container">

        {/* ── Sticky Breadcrumb bar ── */}
        <div
          className="sticky top-0 z-30 border-b px-5 md:px-16 h-10 flex items-center gap-2 text-[12px] font-sans transition-all duration-300"
          style={{
            background: `${T.bg0}ee`,
            borderColor: T.border,
            backdropFilter: "blur(8px)",
          }}
        >
          <BookOpen size={12} strokeWidth={2} style={{ color: T.ink3, flexShrink: 0 }} />
          <a
            href="/home"
            className="transition-colors hover:underline tracking-tight"
            style={{ color: T.ink3 }}
          >
            Docs
          </a>
          <ChevronRight size={10} strokeWidth={2} style={{ color: T.ink3 }} />
          <span style={{ color: T.ink3, letterSpacing: "-0.01em" }}>{section}</span>
          
          <div className="relative flex-1 overflow-hidden h-full flex items-center">
            <AnimatePresence mode="popLayout">
              {crumb && (
                <motion.span 
                  key={crumb.group + crumb.title} 
                  initial={{ y: 8, opacity: 0, filter: "blur(4px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -8, opacity: 0, filter: "blur(4px)" }}
                  transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                  className="flex items-center gap-2 absolute left-0"
                >
                  <ChevronRight size={10} strokeWidth={2} style={{ color: T.ink3 }} />
                  <span className="tracking-tight" style={{ color: T.ink2 }}>{crumb.group}</span>
                  <ChevronRight size={10} strokeWidth={2} style={{ color: T.ink3 }} />
                  <span
                    className="font-medium truncate max-w-[200px] tracking-tight"
                    style={{ color: ac }}
                  >
                    {crumb.title}
                  </span>
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Phone page picker (the sidebar is hidden below md) */}
        <div className="md:hidden px-5 pt-4">
          <select
            aria-label="Go to page"
            value={activeId || sectionConfig.groups[0].pages[0].id}
            onChange={e => handleNavigate(e.target.value)}
            className="w-full border rounded-md px-3 py-2 text-[14px]"
            style={{ background: T.bg1, color: T.ink, borderColor: T.border2 }}
          >
            {sectionConfig.groups.map(g => (
              <optgroup key={g.id} label={g.label}>
                {g.pages.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
              </optgroup>
            ))}
          </select>
        </div>

        {/* ── Doc content ── */}
        <div className="px-5 md:px-16 py-8 md:py-12">
          <div className="max-w-[760px] mx-auto">

            {/* Main Title */}
            <h1
              className="text-[34px] md:text-[52px] font-semibold leading-tight mb-3 tracking-tight"
              style={{ color: T.ink, fontFamily: "var(--font-dm-serif, serif)" }}
            >
              {shownGroup ? shownGroup.label : section === "HRMS Guide" ? "HRMS User Guide" : "Marketing User Guide"}
            </h1>
            <p className="text-lg font-light leading-relaxed mb-16" style={{ color: T.ink2 }}>
              {isBilling
                ? "Retailware Pro billing software. Numbered marks on the screenshots show where to click."
                : section === "HRMS Guide"
                ? "The complete handbook for managing your workforce, time & attendance, operations, and system administration."
                : "The complete guide for lead management, orders, organizations, contacts, customers, and marketing reports."}
            </p>

            {/* Sections */}
            {allContents.map((content) => {
              const contentId = content.id || "";
              const isRevealed = visibleIds.has(contentId);
              
              return (
                <div
                  key={contentId}
                  id={contentId}
                  className={`pt-16 mt-16 border-t first:pt-0 first:mt-0 first:border-0 scroll-mt-14 transition-all duration-700 ease-out fill-mode-forwards ${
                    isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{
                    borderColor: T.border,
                  }}
                >
                  {/* Breadcrumb eyebrow per section */}
                  <div className="flex items-center gap-1.5 mb-3">
                    {content.group && (
                      <span
                        className="font-mono text-[10.5px] font-medium uppercase tracking-[0.14em] pl-2.5 border-l-2"
                        style={{ color: ac, borderColor: ac }}
                      >
                        {content.group}
                      </span>
                    )}
                    {content.readTime && (
                      <span className="text-[10px] font-sans font-normal" style={{ color: T.ink3 }}>
                        {content.group ? "· " : ""}{content.readTime}
                      </span>
                    )}
                  </div>

                  {/* Section Title with Icon */}
                  <div className="flex items-center gap-3 mb-6">
                    {!isBilling && (
                      <div style={{ color: ac }}>
                        {TITLE_ICONS[contentId] || <FileText size={28} strokeWidth={1.5} />}
                      </div>
                    )}
                    <h2
                      className="text-[32px] font-semibold tracking-tight"
                      style={{ color: T.ink, fontFamily: "var(--font-dm-serif, serif)" }}
                    >
                      {content.title}
                    </h2>
                  </div>

                  {/* Content Blocks */}
                  <div className="flex flex-col gap-6 md:gap-10 relative z-10">
                    {content.blocks.map((b, i) => (
                      <Block key={i} b={b} onNav={handleNavigate} ac={ac} />
                    ))}
                  </div>
                </div>
              );
            })}

            {shownGroup && (() => {
              const gs = sectionConfig.groups;
              const at = gs.indexOf(shownGroup);
              const prev = gs[at - 1];
              const next = gs[at + 1];
              const Go = ({ g, dir }: { g: typeof shownGroup; dir: "Previous" | "Next" }) => (
                <button
                  onClick={() => handleNavigate(g.pages[0].id)}
                  className={`group flex-1 text-left py-5 border-t transition-colors ${dir === "Next" ? "md:text-right" : ""}`}
                  style={{ borderColor: T.border2, color: T.ink }}
                >
                  <span className="block font-mono text-[10.5px] uppercase tracking-[0.14em] mb-1" style={{ color: T.ink3 }}>{dir} group</span>
                  <span className="text-[19px] tracking-tight group-hover:underline underline-offset-[6px] decoration-2" style={{ textDecorationColor: ac }}>{g.label.replace("Reference: ", "Reference, ")}</span>
                </button>
              );
              return (
                <nav aria-label="Group navigation" className="mt-20 flex flex-col md:flex-row gap-x-10">
                  {prev ? <Go g={prev} dir="Previous" /> : <span className="flex-1" />}
                  {next ? <Go g={next} dir="Next" /> : <span className="flex-1" />}
                </nav>
              );
            })()}

            <div className="h-40" />
          </div>
        </div>
      </main>

      {/* Right ToC panel */}
      <div className="hidden lg:block shrink-0" style={{ borderLeft: `1px solid ${T.border}` }}>
        <TableOfContents sections={tocSections} ac={ac} />
      </div>

      <style>{`
        @keyframes fade-slide-in {
          0% { opacity: 0; transform: translateY(-4px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-slide-in {
          animation: fade-slide-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}
