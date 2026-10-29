"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { TopBar } from "@/components/layout/top-bar";
import { Sidebar } from "@/components/layout/sidebar";
import { SearchModal } from "@/components/layout/search-modal";
import { motion, AnimatePresence } from "framer-motion";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHrms = pathname.startsWith("/hrms-guide");
  const isMarketing = pathname.startsWith("/marketing-guide");
  const isBilling = pathname.startsWith("/billing-guide");
  const isDocs = isHrms || isMarketing || isBilling;

  const currentSection = isBilling
    ? ("Billing Guide" as const)
    : isMarketing
      ? ("Marketing Guide" as const)
      : ("HRMS Guide" as const);

  if (!isDocs) {
    return <>{children}</>;
  }

  return (
    <>
      <div className="flex flex-col h-screen overflow-hidden">
        <TopBar currentSection={currentSection} />
        <div className="flex flex-1 overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={pathname + "-sidebar"}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="hidden md:flex shrink-0"
            >
              <Sidebar currentSection={currentSection} />
            </motion.div>
          </AnimatePresence>
          
          <AnimatePresence mode="wait" initial={false}>
            <motion.div 
              key={pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="flex-1 overflow-hidden"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <SearchModal currentSection={currentSection} />
    </>
  );
}
