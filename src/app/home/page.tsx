"use client";

import React from "react";
import Link from "next/link";
import { useTheme } from "@/components/providers/theme-provider";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { DARK, LIGHT } from "@/data/site-config";
import { ArrowRight, Box, Shield, Zap, Layers } from "lucide-react";
import { Tilt } from "@/components/ui/tilt";
import { Spotlight } from "@/components/ui/spotlight";

export default function HomePage() {
  const { theme, toggleTheme } = useTheme();
  const T = theme === "dark" ? DARK : LIGHT;

  const products = [
    {
      title: "Core HR",
      description: "Manage your workforce data centrally. Employee records, departments, onboarding, and company structure.",
      icon: <Box size={24} strokeWidth={1.5} />,
      slug: "hrms-guide#what-is-hrms",
      color: "#6a20a0",
      status: "Live"
    },
    {
      title: "Time & Attendance",
      description: "Track work hours, manage leave policies, and handle shift scheduling automatically.",
      icon: <Zap size={24} strokeWidth={1.5} />,
      slug: "hrms-guide#dashboard",
      color: "#1a7a3a",
      status: "Live"
    },
    {
      title: "Recruitment & Ops",
      description: "Streamline hiring, manage company assets, and create custom forms for surveys and feedback.",
      icon: <Shield size={24} strokeWidth={1.5} />,
      slug: "hrms-guide#forms",
      color: "#1060a8",
      status: "Beta"
    },
    {
      title: "Marketing Guide",
      description: "Complete guide for leads, orders, organizations, and marketing analytics.",
      icon: <Layers size={24} strokeWidth={1.5} />,
      slug: "marketing-guide#m-getting-started",
      color: "#0ea5e9",
      status: "New"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen font-sans selection:bg-black/10 transition-colors duration-300" style={{ backgroundColor: T.bg0, color: T.ink }}>
      {/* Absolute Header purely for theme toggle in this isolated view */}
      <header className="absolute top-0 right-0 p-6 z-50">
        <ThemeToggle />
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-32 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full border mb-12" style={{ borderColor: T.border2, background: T.bg1 }}>
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#1a7a3a" }} />
          <span className="font-mono text-[11.5px] tracking-wide uppercase" style={{ color: T.ink3 }}>Beforth Systems</span>
        </div>

        <h1 className="font-serif text-5xl md:text-7xl font-normal tracking-tight leading-[1.1] mb-8" style={{ color: T.ink }}>
          Build software that respects the craft.
        </h1>
        
        <p className="text-xl md:text-2xl font-light leading-relaxed max-w-2xl mx-auto mb-16" style={{ color: T.ink2 }}>
          We design and engineer structural primitives for the modern web. No noise, just tools that work perfectly.
        </p>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full text-left font-sans">
          {products.map((product, i) => (
            <ProductCard key={i} product={product} T={T} />
          ))}
        </div>
      </main>

      <footer className="py-8 border-t text-center font-mono text-[11px] uppercase tracking-widest" style={{ borderColor: T.border, color: T.ink3 }}>
        © {new Date().getFullYear()} Beforth Systems
      </footer>
    </div>
  );
}

function ProductCard({ product, T }: { product: any, T: any }) {
  return (
    <Tilt
      rotationFactor={8}
      isRevese
      className="h-full"
      springOptions={{
        stiffness: 26.7,
        damping: 4.1,
        mass: 0.2,
      }}
    >
      <Link 
        href={`/${product.slug}`}
        className="group block p-8 rounded-xl border relative overflow-hidden text-left h-full flex flex-col"
        style={{ 
          backgroundColor: T.bg1, 
          borderColor: T.border,
        }}
      >
        <Spotlight
          className="blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"
          size={300}
          style={{
            background: `radial-gradient(circle at center, ${product.color}, transparent 80%)`
          } as any}
        />
        
        {/* Status Badge */}
        <div 
          className="absolute top-6 right-6 font-mono text-[10px] uppercase tracking-widest px-2 py-1 rounded border z-10"
          style={{ borderColor: T.border, color: T.ink3, backgroundColor: T.bg0 }}
        >
          {product.status}
        </div>

        <div className="mb-6 mr-10 relative z-10" style={{ color: product.color }}>
          {product.icon}
        </div>
        
        <h2 className="font-serif text-2xl font-normal mb-3 relative z-10" style={{ color: T.ink }}>
          {product.title}
        </h2>
        
        <p className="text-[14.5px] font-light leading-relaxed mb-8 relative z-10" style={{ color: T.ink2 }}>
          {product.description}
        </p>
        
        <div className="mt-auto flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest relative z-10 transition-colors" style={{ color: T.ink3 }}>
          Explore <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
        </div>
      </Link>
    </Tilt>
  );
}
