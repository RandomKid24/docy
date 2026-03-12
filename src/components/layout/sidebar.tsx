"use client";

import React from "react";
import { SidebarGroup } from "./sidebar-group";
import { DARK, LIGHT, SITE, SiteNav } from "@/data/site-config";
import { useTheme } from "@/components/providers/theme-provider";
import { motion } from "framer-motion";

export function Sidebar({ currentSection }: { currentSection: SiteNav }) {
  const { theme } = useTheme();
  const T = theme === "dark" ? DARK : LIGHT;
  const [activeId, setActiveId] = React.useState(currentSection === "Marketing Guide" ? "m-getting-started" : "what-is-hrms");

  React.useEffect(() => {
    // Set initial hash or default to first section
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "");
      if (hash) setActiveId(hash);
    }
    
    // Listen for hash changes (when user clicks sidebar links)
    const onHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) setActiveId(hash);
    };
    
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const section = SITE.sections[currentSection];
  const ac = section?.color || "#6a20a0";

  return (
    <motion.nav 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-[240px] shrink-0 border-r overflow-y-auto py-3 pb-12" 
      style={{ background: T.bg0, borderColor: T.border }}
    >
      {/* Section label */}
      <div className="px-4 pt-1 pb-4 flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: T.ink3 }}>
        <span className="accent-pulse w-1.5 h-1.5 rounded-full transition-colors shrink-0" style={{ background: ac }} />
        <span style={{ color: ac, fontWeight: 500 }}>{currentSection}</span>
      </div>

      <div className="flex flex-col gap-0.5">
        {section.groups.map((g, idx) => (
          <motion.div
            key={g.id}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + idx * 0.05, duration: 0.3 }}
          >
            <SidebarGroup 
              group={g} 
              sectionId={currentSection} 
              activeId={activeId} 
              ac={ac} 
            />
          </motion.div>
        ))}
      </div>
    </motion.nav>
  );
}
