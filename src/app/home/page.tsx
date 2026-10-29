"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/providers/theme-provider";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { DARK, LIGHT, SITE, ROUTES, SiteNav } from "@/data/site-config";

type Entry = { id: string; label: string; group: string; nav: SiteNav; color: string };

const ENTRIES: Entry[] = (Object.keys(SITE.sections) as SiteNav[]).flatMap(nav =>
  SITE.sections[nav].groups.flatMap(g =>
    g.pages.map(p => ({ id: p.id, label: p.label, group: g.label, nav, color: SITE.sections[nav].color }))
  )
);

const href = (nav: SiteNav, id: string) => `${ROUTES[nav]}#${id}`;

/** The three products, in the words the people using them would use. */
const SOFTWARE: {
  nav: SiteNav;
  name: string;
  product: string;
  forWho: string;
  popular: { id: string; label: string }[];
}[] = [
  {
    nav: "HRMS Guide",
    name: "HR and Attendance",
    product: "HRMS",
    forWho: "For HR teams and managers. Add employees, track attendance and approve leave.",
    popular: [
      { id: "employees", label: "Add and manage employees" },
      { id: "attendance", label: "Check attendance" },
      { id: "leave", label: "Approve leave" },
      { id: "roles", label: "Control who can see what" },
    ],
  },
  {
    nav: "Marketing Guide",
    name: "Marketing",
    product: "Marketing app",
    forWho: "For sales and marketing teams. Keep track of leads, send quotations and follow orders.",
    popular: [
      { id: "m-leads", label: "Work with leads" },
      { id: "m-quotations", label: "Send a quotation" },
      { id: "m-orders", label: "Follow an order" },
      { id: "m-reports", label: "See your reports" },
    ],
  },
  {
    nav: "Billing Guide",
    name: "Billing and Stock",
    product: "Retailware Pro",
    forWho: "For shop counters and back offices. Make bills, record purchases, count stock and close the day.",
    popular: [
      { id: "b-daily-jobs-make-a-sale", label: "Make a sale" },
      { id: "b-daily-jobs-add-customer", label: "Add a customer" },
      { id: "b-daily-jobs-record-a-purchase", label: "Record a purchase" },
      { id: "b-daily-jobs-close-the-day", label: "Close the day" },
    ],
  },
];

const NAMES: Record<SiteNav, string> = {
  "HRMS Guide": "HR and Attendance",
  "Marketing Guide": "Marketing",
  "Billing Guide": "Billing and Stock",
};

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
    .slice(0, 6)
    .map(x => x.e);
}

/** Crops a region of a 1600x1000 Retailware screenshot; x/y/w/h are in source pixels. */
function Crop({ src, x, y, w, h, alt }: { src: string; x: number; y: number; w: number; h: number; alt: string }) {
  return (
    <div className="relative overflow-hidden" style={{ aspectRatio: `${w} / ${h}` }}>
      <img
        src={src}
        alt={alt}
        style={{ position: "absolute", width: `${(1600 / w) * 100}%`, left: `${-(x / w) * 100}%`, top: `${-(y / h) * 100}%`, maxWidth: "none" }}
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
      if (e.key === "/" && !(document.activeElement instanceof HTMLInputElement)) {
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

  return (
    <div className="home min-h-screen" style={{ background: T.bg0, color: T.ink }}>
      <header className="flex items-center justify-between px-6 md:px-12 h-16 border-b" style={{ borderColor: T.border }}>
        <Link href="/home" className="flex items-center gap-3 no-underline" style={{ color: T.ink }}>
          <img src="/befu.png" alt="" className="w-7 h-7 object-contain" />
          <span className="text-[17px] font-medium tracking-tight">BeForth Help Center</span>
        </Link>
        <ThemeToggle className="scale-90" />
      </header>

      {/* Say what this is, then give the two ways in: search, or pick your software */}
      <section className="px-6 md:px-12 pt-14 md:pt-20 pb-12">
        <h1 className="display rise text-[clamp(2.6rem,6vw,5.5rem)] max-w-[16ch]">
          How can we help you today?
        </h1>
        <p className="rise mt-6 text-[18px] md:text-[20px] leading-relaxed max-w-[48ch]" style={{ color: T.ink2, animationDelay: ".08s" }}>
          Step-by-step guides for our software, with a picture for every step. Type what you want to do, or choose your software below.
        </p>

        <div className="rise mt-10 max-w-[720px]" style={{ animationDelay: ".16s" }}>
          <label htmlFor="ask" className="block text-[14px] mb-2" style={{ color: T.ink2 }}>
            Search for what you want to do
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
              placeholder="for example: add a customer"
              role="combobox"
              aria-expanded={results.length > 0}
              aria-controls="answers"
              className="flex-1 min-w-0 bg-transparent border-0 outline-none text-[22px] md:text-[28px] font-light tracking-tight"
              style={{ color: T.ink }}
            />
          </div>

          <ul id="answers" role="listbox">
            {q.trim() && results.length === 0 && (
              <li className="py-5 text-[15px]" style={{ color: T.ink2 }}>
                Nothing found for &ldquo;{q}&rdquo;. Try one word, like <em>customer</em> or <em>leave</em>.
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
                  <span className="text-[13px] text-right" style={{ color: T.ink3 }}>{NAMES[r.nav]}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Which software */}
      <section className="border-t" style={{ borderColor: T.border }}>
        <h2 className="px-6 md:px-12 pt-12 pb-2 text-[15px] font-medium" style={{ color: T.ink2 }}>
          Which software are you using?
        </h2>
        <div className="grid md:grid-cols-3">
          {SOFTWARE.map(s => {
            const sec = SITE.sections[s.nav];
            const pages = sec.groups.reduce((n, g) => n + g.pages.length, 0);
            return (
              <div key={s.nav} className="px-6 md:px-12 py-10 border-b md:border-b-0 md:border-r last:border-r-0" style={{ borderColor: T.border }}>
                <p className="flex items-center gap-2 text-[13px]" style={{ color: T.ink3 }}>
                  <span className="w-2 h-2" style={{ background: sec.color }} />
                  {s.product}
                </p>
                <h3 className="display mt-3 text-[clamp(2rem,3vw,2.75rem)]" style={{ fontWeight: 300 }}>
                  <Link href={href(s.nav, sec.groups[0].pages[0].id)} className="no-underline hover:underline underline-offset-[10px] decoration-2" style={{ color: T.ink, textDecorationColor: sec.color }}>
                    {s.name}
                  </Link>
                </h3>
                <p className="mt-4 text-[16px] leading-relaxed max-w-[36ch]" style={{ color: T.ink2 }}>{s.forWho}</p>

                <p className="mt-8 mb-1 text-[13px]" style={{ color: T.ink3 }}>Popular topics</p>
                <ul>
                  {s.popular.map(p => (
                    <li key={p.id}>
                      <Link href={href(s.nav, p.id)} className="row block py-2.5 border-t no-underline text-[16px]" style={{ borderColor: T.border, color: T.ink }}>
                        {p.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href={href(s.nav, sec.groups[0].pages[0].id)}
                  className="inline-block mt-5 text-[15px] underline underline-offset-[6px] decoration-2"
                  style={{ color: T.ink, textDecorationColor: sec.color }}
                >
                  Open the {s.name} guide ({pages} pages)
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* What a guide page looks like */}
      <section className="grid lg:grid-cols-12 gap-x-12 gap-y-8 px-6 md:px-12 py-16 md:py-20 border-t" style={{ borderColor: T.border }}>
        <div className="lg:col-span-5">
          <h2 className="display text-[clamp(1.9rem,3.2vw,3rem)]" style={{ fontWeight: 300 }}>
            Every step has a picture.
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed max-w-[40ch]" style={{ color: T.ink2 }}>
            Each guide shows the real screen. A numbered circle points to the exact button or box you need, so you always know where to click next. Names and numbers in the pictures are sample data.
          </p>
        </div>
        <figure className="lg:col-span-7">
          <div className="border" style={{ borderColor: T.border2 }}>
            <Crop src="/billing/27838129-e86c0000d9e533de.jpg" x={900} y={330} w={700} h={430} alt="Billing screen with a numbered circle on the Net payable total" />
          </div>
          <figcaption className="mt-3 text-[14px]" style={{ color: T.ink3 }}>
            Example from &ldquo;Make a sale&rdquo; in the Billing guide. Circle 1 shows where the total appears.
          </figcaption>
        </figure>
      </section>

      <footer className="flex flex-wrap justify-between gap-4 px-6 md:px-12 py-8 border-t text-[13px]" style={{ borderColor: T.border, color: T.ink3 }}>
        <span>&copy; {new Date().getFullYear()} BeForth Systems</span>
        <span>Tip: press / to jump to search</span>
      </footer>
    </div>
  );
}
