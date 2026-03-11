"use client";

import React, { useState, useEffect } from "react";
import { 
  ChevronRight, BookOpen, Users, Clock, Briefcase, BarChart2, Settings, 
  Sparkles, FileText 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/providers/theme-provider";
import { DARK, LIGHT, DocGroup } from "@/data/site-config";

// Map group ids to Lucide icons
const GROUP_ICONS: Record<string, React.ReactNode> = {
  intro:    <BookOpen    size={14} strokeWidth={1.8} />,
  core:     <Users       size={14} strokeWidth={1.8} />,
  time:     <Clock       size={14} strokeWidth={1.8} />,
  ops:      <Briefcase   size={14} strokeWidth={1.8} />,
  reports:  <BarChart2   size={14} strokeWidth={1.8} />,
  settings: <Settings    size={14} strokeWidth={1.8} />,
  misc:     <Sparkles    size={14} strokeWidth={1.8} />,
};

interface SidebarGroupProps {
  group: DocGroup;
  sectionId: string;
  activeId: string;
  ac: string;
}

export function SidebarGroup({ group, sectionId, activeId, ac }: SidebarGroupProps) {
  const [open, setOpen] = useState(group.defaultOpen);
  const { theme } = useTheme();
  const T = theme === "dark" ? DARK : LIGHT;

  const hasActive = group.pages.some(p => p.id === activeId);

  useEffect(() => {
    if (hasActive) setOpen(true);
  }, [hasActive]);

  const icon = GROUP_ICONS[group.id] || <BookOpen size={14} strokeWidth={1.8} />;

  return (
    <div className="mb-0.5 select-none">
      {/* Group header */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full group flex items-center gap-2 px-3 py-[7px] text-[12px] font-medium text-left rounded-lg transition-all duration-200"
        style={{
          color: hasActive ? ac : T.ink2,
          background: hasActive ? `${ac}12` : "transparent",
        }}
        onMouseEnter={e => {
          if (!hasActive) e.currentTarget.style.background = `${ac}08`;
          e.currentTarget.style.color = hasActive ? ac : T.ink;
        }}
        onMouseLeave={e => {
          if (!hasActive) e.currentTarget.style.background = "transparent";
          e.currentTarget.style.color = hasActive ? ac : T.ink2;
        }}
      >
        {/* Group icon */}
        <span
          className="shrink-0 transition-all duration-300"
          style={{ color: hasActive ? ac : T.ink3, transform: open ? "scale(1.05)" : "scale(1)" }}
        >
          {icon}
        </span>

        <span className="truncate flex-1 tracking-tight">{group.label}</span>

        <motion.span
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="shrink-0 flex items-center justify-center"
          style={{ color: T.ink3 }}
        >
          <ChevronRight size={12} strokeWidth={2} />
        </motion.span>
      </button>

      {/* Collapsible pages with Framer Motion */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div
              className="ml-[22px] border-l pl-1 my-0.5"
              style={{ borderColor: `${ac}30` }}
            >
              {group.pages.map((page, idx) => {
                const isOn = activeId === page.id;
                return (
                  <motion.a
                    initial={{ x: -4, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.03, duration: 0.2 }}
                    key={page.id}
                    href={`#${page.id}`}
                    className="sidebar-page-link group/item flex items-center gap-2 px-2 py-[5px] text-[12px] rounded-r-md relative transition-all duration-150"
                    style={{
                      fontWeight: isOn ? 500 : 400,
                      color: isOn ? T.ink : T.ink3,
                      background: isOn ? `${ac}18` : "transparent",
                      letterSpacing: isOn ? "-0.01em" : "normal",
                    }}
                    onMouseEnter={e => {
                      if (!isOn) {
                        e.currentTarget.style.background = `${ac}08`;
                        e.currentTarget.style.color = T.ink2;
                      }
                    }}
                    onMouseLeave={e => {
                      if (!isOn) {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = T.ink3;
                      }
                    }}
                  >
                    {/* Active indicator bar */}
                    {isOn && (
                      <motion.div
                        layoutId="active-indicator"
                        className="absolute left-[-1px] top-1 bottom-1 w-[2px] rounded-full"
                        style={{ backgroundColor: ac }}
                      />
                    )}

                    {/* Page icon */}
                    <AnimatePresence mode="popLayout">
                      {isOn && (
                        <motion.span
                          initial={{ scale: 0, opacity: 0, width: 0 }}
                          animate={{ scale: 1, opacity: 1, width: "auto" }}
                          exit={{ scale: 0, opacity: 0, width: 0 }}
                          className="shrink-0 overflow-hidden flex items-center"
                          style={{ color: ac }}
                        >
                          <FileText size={11} strokeWidth={1.8} className="mr-1" />
                        </motion.span>
                      )}
                    </AnimatePresence>

                    <span className="truncate">{page.label}</span>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
