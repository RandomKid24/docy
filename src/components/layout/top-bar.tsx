"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { DARK, LIGHT, SITE } from "@/data/site-config";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function TopBar({ currentSection }: { currentSection: string }) {
  const { theme, toggleTheme } = useTheme();
  const T = theme === "dark" ? DARK : LIGHT;
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [spinning, setSpinning] = useState(false);

  const [searching, setSearching] = useState(false);

  // @ts-ignore
  const ac = SITE.sections[currentSection]?.color || SITE.sections["HRMS Guide"].color;

  const handleSearchClick = () => {
    setSearching(true);
    window.dispatchEvent(new CustomEvent("open-search"));
    setTimeout(() => setSearching(false), 400);
  };

  // Shadow appears once user has scrolled past the top
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleThemeToggle = () => {
    setSpinning(true);
    toggleTheme();
    setTimeout(() => setSpinning(false), 400);
  };

  return (
    <header
      className="h-[52px] flex items-center px-6 border-b shrink-0 z-50 sticky top-0"
      style={{
        background: T.bg0,
        borderColor: T.border,
        transition: "box-shadow 0.3s ease",
        boxShadow: scrolled
          ? theme === "dark"
            ? "0 1px 24px rgba(0,0,0,0.45)"
            : "0 1px 16px rgba(0,0,0,0.08)"
          : "none",
      }}
    >
      {/* Logo */}
      <Link href="/home" className="flex items-center gap-3 shrink-0 mr-8 no-underline" style={{ color: T.ink }}>
        <img 
          src="/befu.png" 
          alt="BeForth" 
          className="w-7 h-7 object-contain transition-transform" 
          style={{ transform: scrolled ? "scale(0.9)" : "scale(1)" }}
        />
        <span style={{ fontSize: "17.5px", fontWeight: 500, letterSpacing: "-0.01em" }}>
          BeForth
        </span>
      </Link>

      {/* Nav links */}
      <div className="flex h-full">
        {SITE.nav.map(n => {
          const isActive = currentSection === n;
          const href = n === "Marketing Guide" ? "/marketing-guide" : "/hrms-guide";
          return (
            <Link
              key={n}
              href={href}
              className="h-full flex items-center px-3.5 text-[13.5px] font-normal no-underline border-b-2"
              style={{
                color: isActive ? T.ink : T.ink3,
                borderColor: isActive ? ac : "transparent",
                marginBottom: -1,
                transition: "color 0.2s ease, border-color 0.2s ease",
              }}
            >
              {n}
            </Link>
          );
        })}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 ml-auto">
        {/* Search button */}
        <button
          className="group flex items-center gap-2.5 px-4 py-2 border rounded-full text-[13px]"
          style={{
            background: T.bg1,
            borderColor: T.border2,
            color: T.ink3,
            minWidth: "260px",
            boxShadow: "inset 0 1px 2px rgba(0,0,0,0.04)",
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
          onClick={handleSearchClick}
          onMouseEnter={e => { 
            e.currentTarget.style.borderColor = T.ink3; 
            e.currentTarget.style.color = T.ink2;
          }}
          onMouseLeave={e => { 
            e.currentTarget.style.borderColor = T.border2; 
            e.currentTarget.style.color = T.ink3;
          }}
        >
          <div 
            style={{ 
              transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease",
              transform: searching ? "rotate(90deg) scale(0.7)" : "rotate(0deg) scale(1)",
              opacity: searching ? 0.5 : 1
            }}
            className="shrink-0"
          >
            <Search size={14} strokeWidth={2} />
          </div>
          <span className="flex-1 text-left font-light tracking-tight">Search anything…</span>
          <span className="font-mono text-[9px] px-1.5 py-0.5 rounded-full border shrink-0 opacity-60" style={{ background: T.bg2, borderColor: T.border }}>⌘K</span>
        </button>

        {/* Theme toggle */}
        <ThemeToggle className="scale-90" />
      </div>
    </header>
  );
}
