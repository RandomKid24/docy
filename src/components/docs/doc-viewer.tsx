"use client";

import React, { useEffect, useState, useRef } from "react";
import { SITE, DARK, LIGHT } from "@/data/site-config";
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
  section: "HRMS Guide" | "Marketing Guide";
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
function buildBreadcrumbMap(section: "HRMS Guide" | "Marketing Guide") {
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

  // Flatten all pages
  const allContents: DocContent[] = [];
  for (const g of sectionConfig.groups) {
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

  // Scroll-spy: update active id from hash
  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) setActiveId(hash);
    };
    window.addEventListener("hashchange", onHashChange);
    const hash = window.location.hash.replace("#", "");
    if (hash) setActiveId(hash);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  // IntersectionObserver for scroll-spy active section AND reveal animation
  useEffect(() => {
    const obActive = new IntersectionObserver(
      entries => {
        const visible = entries.find(e => e.isIntersecting);
        if (visible) {
          const id = visible.target.id;
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
          className="sticky top-0 z-30 border-b px-10 md:px-16 h-10 flex items-center gap-2 text-[12px] font-sans transition-all duration-300"
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

        {/* ── Doc content ── */}
        <div className="px-10 md:px-16 py-12">
          <div className="max-w-[760px] mx-auto">

            {/* Main Title */}
            <h1
              className="text-[44px] md:text-[52px] font-semibold leading-tight mb-3 tracking-tight"
              style={{ color: T.ink, fontFamily: "var(--font-dm-serif, serif)" }}
            >
              {section === "HRMS Guide" ? "HRMS User Guide" : "Marketing User Guide"}
            </h1>
            <p className="text-lg font-light leading-relaxed mb-16" style={{ color: T.ink2 }}>
              {section === "HRMS Guide" 
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
                        className="text-[10px] font-sans font-medium uppercase tracking-[0.08em] px-2 py-0.5 rounded-full border"
                        style={{ color: ac, borderColor: `${ac}40`, background: `${ac}10` }}
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
                    <div style={{ color: ac }}>
                      {TITLE_ICONS[contentId] || <FileText size={28} strokeWidth={1.5} />}
                    </div>
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
