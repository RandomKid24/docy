"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/providers/theme-provider";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { DARK, LIGHT, SITE, ROUTES, SiteNav } from "@/data/site-config";

const BLURB: Record<SiteNav, string> = {
  "HRMS Guide": "Employees, attendance, leave, shifts and roles, written for HR teams and the managers who approve things.",
  "Marketing Guide": "From a new lead to a quotation to an order, and the reports that show how the pipeline is doing.",
  "Billing Guide": "Retailware Pro at the counter and the back office: bills, purchases, stock counts, and closing the day.",
};

const TRY: { nav: SiteNav; id: string; label: string }[] = [
  { nav: "Billing Guide", id: "b-daily-jobs-make-a-sale", label: "Make a sale" },
  { nav: "Billing Guide", id: "b-daily-jobs-close-the-day", label: "Close the day" },
  { nav: "HRMS Guide", id: "leave", label: "Approve leave" },
  { nav: "Marketing Guide", id: "m-quotations", label: "Send a quotation" },
];

type Entry = { id: string; label: string; group: string; nav: SiteNav; color: string };

const ENTRIES: Entry[] = (Object.keys(SITE.sections) as SiteNav[]).flatMap(nav =>
  SITE.sections[nav].groups.flatMap(g =>
    g.pages.map(p => ({ id: p.id, label: p.label, group: g.label, nav, color: SITE.sections[nav].color }))
  )
);

function rank(q: string): Entry[] {
  const words = q.toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  return ENTRIES.map(e => {
    const l = e.label.toLowerCase();
    const hay = `${l} ${e.group.toLowerCase()} ${e.nav.toLowerCase()}`;
    if (!words.every(w => hay.includes(w))) return null;
    const s = words.reduce((a, w) => a + (l.startsWith(w) ? 4 : l.includes(w) ? 3 : 1), 0);
    // how-to pages answer "what do I do" questions, so they beat screen references; shorter titles win ties
    return { e, s: s + (e.group.startsWith("How to do") ? 3 : 0) - l.length / 100 };
  })
    .filter((x): x is { e: Entry; s: number } => !!x)
    .sort((a, b) => b.s - a.s)
    .slice(0, 7)
    .map(x => x.e);
}

const href = (nav: SiteNav, id: string) => `${ROUTES[nav]}#${id}`;

/** Crops a region of a 1600x1000 Retailware screenshot; x/y/w/h are in source pixels. */
function Crop({ src, x, y, w, h, alt, className = "" }: { src: string; x: number; y: number; w: number; h: number; alt: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ aspectRatio: `${w} / ${h}` }}>
      <img
        src={src}
        alt={alt}
        style={{
          position: "absolute",
          width: `${(1600 / w) * 100}%`,
          left: `${-(x / w) * 100}%`,
          top: `${-(y / h) * 100}%`,
          maxWidth: "none",
        }}
      />
    </div>
  );
}

export default function HomePage() {
  const { theme } = useTheme();
  const T = theme === "dark" ? DARK : LIGHT;
  const router = useRouter();
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const results = useMemo(() => rank(q), [q]);

  useEffect(() => setActive(0), [q]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = document.activeElement instanceof HTMLInputElement;
      if (e.key === "/" && !typing) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setActive(i => Math.min(i + 1, results.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive(i => Math.max(i - 1, 0)); }
    else if (e.key === "Enter" && results[active]) router.push(href(results[active].nav, results[active].id));
    else if (e.key === "Escape") setQ("");
  };

  const total = ENTRIES.length;
  const sections = Object.keys(SITE.sections) as SiteNav[];

  return (
    <div className="home min-h-screen" style={{ background: T.bg0, color: T.ink }}>
      {/* Masthead */}
      <header className="flex items-center justify-between px-6 md:px-12 h-16 border-b" style={{ borderColor: T.border }}>
        <Link href="/home" className="flex items-center gap-3 no-underline" style={{ color: T.ink }}>
          <img src="/befu.png" alt="" className="w-7 h-7 object-contain" />
          <span className="text-[17px] font-medium tracking-tight">BeForth</span>
          <span className="mono text-[11px] uppercase tracking-[0.16em] hidden sm:inline" style={{ color: T.ink3 }}>Help</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-[13.5px]">
          {sections.map(n => (
            <Link key={n} href={href(n, SITE.sections[n].groups[0].pages[0].id)} className="no-underline hover:underline underline-offset-4" style={{ color: T.ink2 }}>
              {n.replace(" Guide", "")}
            </Link>
          ))}
        </nav>
        <ThemeToggle className="scale-90" />
      </header>

      {/* First frame: ask, then see what the answer looks like */}
      <section className="grid lg:grid-cols-12 gap-x-12 px-6 md:px-12 pt-14 md:pt-24 pb-20 md:pb-28">
        <div className="lg:col-span-7">
          <p className="mono text-[11.5px] uppercase tracking-[0.18em] mb-8 rise" style={{ color: T.ink3 }}>
            {total} how-to pages, three products
          </p>
          <h1 className="display rise text-[clamp(3rem,7.4vw,6.75rem)]" style={{ animationDelay: ".05s" }}>
            Find the step you are stuck on.
          </h1>

          <div className="mt-14 rise" style={{ animationDelay: ".15s" }}>
            <label htmlFor="ask" className="mono text-[11px] uppercase tracking-[0.16em] block mb-2" style={{ color: T.ink3 }}>
              What are you trying to do?
            </label>
            <div className="ask flex items-baseline border-b-2 pb-2" style={{ borderColor: T.ink }}>
              <input
                id="ask"
                ref={inputRef}
                value={q}
                onChange={e => setQ(e.target.value)}
                onKeyDown={onInputKey}
                autoComplete="off"
                spellCheck={false}
                placeholder="add a customer, close the day"
                role="combobox"
                aria-expanded={results.length > 0}
                aria-controls="answers"
                className="flex-1 min-w-0 bg-transparent border-0 outline-none text-[22px] md:text-[30px] font-light tracking-tight"
                style={{ color: T.ink }}
              />
              <span className="mono text-[11px] hidden sm:inline" style={{ color: T.ink3 }}>press /</span>
            </div>

            <ul id="answers" role="listbox" className="lg:min-h-[19rem]">
              {q.trim() && results.length === 0 && (
                <li className="py-5 text-[15px]" style={{ color: T.ink2 }}>
                  Nothing matches &ldquo;{q}&rdquo;. Try one word, like <em>customer</em> or <em>stock</em>.
                </li>
              )}
              {results.map((r, i) => (
                <li key={r.nav + r.id} role="option" aria-selected={i === active}>
                  <Link
                    href={href(r.nav, r.id)}
                    data-on={i === active}
                    onMouseEnter={() => setActive(i)}
                    className="row flex items-baseline gap-4 py-3.5 border-b no-underline"
                    style={{ borderColor: T.border, background: i === active ? T.bg1 : "transparent", color: T.ink }}
                  >
                    <span className="w-2 h-2 shrink-0 self-center" style={{ background: r.color }} />
                    <span className="text-[17px] flex-1">{r.label}</span>
                    <span className="mono text-[11px] uppercase tracking-[0.1em] text-right" style={{ color: T.ink3 }}>
                      {r.nav.replace(" Guide", "")} / {r.group.replace("Reference: ", "")}
                    </span>
                  </Link>
                </li>
              ))}
              {!q.trim() && (
                <li className="pt-6">
                  <p className="text-[14px] mb-3" style={{ color: T.ink3 }}>Or start with one of the usual ones.</p>
                  <div className="flex flex-wrap gap-x-7 gap-y-2">
                    {TRY.map(t => (
                      <Link key={t.id} href={href(t.nav, t.id)} className="text-[17px] underline underline-offset-[6px] decoration-1" style={{ color: T.ink, textDecorationColor: SITE.sections[t.nav].color }}>
                        {t.label}
                      </Link>
                    ))}
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* A real answer: step 7 of Make a sale, cropped to the bill total */}
        <figure className="lg:col-span-5 mt-6 lg:mt-24 relative">
          <div className="reveal border" style={{ borderColor: T.border2 }}>
            <Crop src="/billing/27838129-e86c0000d9e533de.jpg" x={1000} y={380} w={600} h={400} alt="Retailware Pro sale screen with the Net payable total marked with a numbered circle" />
          </div>
          <figcaption className="mt-4 flex gap-4 items-baseline">
            <span className="mono text-[11px] uppercase tracking-[0.14em] shrink-0" style={{ color: T.ink3 }}>Make a sale, step 7</span>
            <span className="text-[14px] leading-snug" style={{ color: T.ink2 }}>
              Every step has a picture like this. The numbered circle shows exactly where to look or click.{" "}
              <Link href={href("Billing Guide", "b-daily-jobs-make-a-sale")} className="underline underline-offset-4" style={{ color: T.ink }}>Read the steps</Link>
            </span>
          </figcaption>
        </figure>
      </section>

      {/* The three guides as indexes, ruled not boxed */}
      <section className="border-t" style={{ borderColor: T.border }}>
        <div className="grid md:grid-cols-3">
          {sections.map((nav, i) => {
            const sec = SITE.sections[nav];
            const count = sec.groups.reduce((n, g) => n + g.pages.length, 0);
            return (
              <div key={nav} className="px-6 md:px-12 py-14 border-b md:border-b-0 md:border-r last:border-r-0" style={{ borderColor: T.border }}>
                <div className="flex items-baseline justify-between mono text-[11px] uppercase tracking-[0.16em]" style={{ color: T.ink3 }}>
                  <span>0{i + 1}</span>
                  <span>{count} pages</span>
                </div>
                <h2 className="display mt-6 text-[clamp(2.1rem,3.2vw,3rem)]" style={{ fontWeight: 300 }}>
                  <Link href={href(nav, sec.groups[0].pages[0].id)} className="no-underline hover:underline underline-offset-[10px] decoration-2" style={{ color: T.ink, textDecorationColor: sec.color }}>
                    {nav.replace(" Guide", "")}
                  </Link>
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed max-w-[34ch]" style={{ color: T.ink2 }}>{BLURB[nav]}</p>

                <ul className="mt-9">
                  {sec.groups.map(g => (
                    <li key={g.id}>
                      <Link
                        href={href(nav, g.pages[0].id)}
                        className="row flex items-baseline gap-3 py-2.5 border-t no-underline"
                        style={{ borderColor: T.border, color: T.ink }}
                      >
                        <span className="text-[15px] flex-1">{g.label.replace("Reference: ", "")}</span>
                        <span className="mono text-[11px]" style={{ color: T.ink3 }}>{g.pages.length}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* How to read the pictures */}
      <section className="grid lg:grid-cols-12 gap-x-12 gap-y-10 px-6 md:px-12 py-20 md:py-28 border-t" style={{ borderColor: T.border }}>
        <div className="lg:col-span-5">
          <p className="mono text-[11px] uppercase tracking-[0.18em] mb-6" style={{ color: T.ink3 }}>How the pages work</p>
          <h2 className="display text-[clamp(2rem,3.6vw,3.25rem)]" style={{ fontWeight: 300 }}>
            One job, one page, one picture per step.
          </h2>
        </div>
        <div className="lg:col-span-7 lg:pl-10">
          <p className="text-[17px] leading-relaxed max-w-[52ch]" style={{ color: T.ink2 }}>
            Each page starts with where the screen lives and who is allowed to use it, then walks through the clicks in order. Names and numbers in the pictures are sample data, so nothing you see belongs to a real customer.
          </p>
          <div className="mt-10 border" style={{ borderColor: T.border2 }}>
            <Crop src="/billing/c2abc133-d7266bd29ada9598.jpg" x={0} y={0} w={640} h={80} alt="Retailware Pro top menu with the Transaction menu marked with a numbered circle" />
          </div>
          <p className="mt-4 mono text-[11px] uppercase tracking-[0.14em]" style={{ color: T.ink3 }}>
            Step 1 of Make a sale: click Transaction in the top bar
          </p>
        </div>
      </section>

      <footer className="flex flex-wrap justify-between gap-4 px-6 md:px-12 py-8 border-t mono text-[11px] uppercase tracking-[0.16em]" style={{ borderColor: T.border, color: T.ink3 }}>
        <span>&copy; {new Date().getFullYear()} BeForth Systems</span>
        <span>Press / to search from anywhere on this page</span>
      </footer>
    </div>
  );
}
