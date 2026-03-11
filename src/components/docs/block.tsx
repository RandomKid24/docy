"use client";

import React from "react";
import { CopyBtn } from "@/components/ui/copy-button";
import { DARK, LIGHT } from "@/data/site-config";
import { useTheme } from "@/components/providers/theme-provider";
import { ContentBlock } from "@/data/docs-content";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface BlockProps {
  b: ContentBlock;
  onNav?: (id: string) => void;
  ac: string;
}

/**
 * Converts inline markdown to React elements:
 *   **bold**, *italic*, `code`, [label](url), and • bullet prefix
 */
function inlineMd(text: React.ReactNode, T: typeof DARK, ac: string): React.ReactNode {
  if (typeof text !== "string") return text;

  const parts: React.ReactNode[] = [];
  // Combined regex for **bold**, *italic*, `code`, [text](url)
  const re = /\*\*(.+?)\*\*|\*(.+?)\*|`([^`]+)`|\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let match: RegExpExecArray | null;

  // Replace markdown bullet prefix • with a styled dot
  let src = text.replace(/^•\s*/, "");
  const hasBullet = text.startsWith("•");

  re.lastIndex = 0;
  while ((match = re.exec(src)) !== null) {
    if (match.index > last) parts.push(src.slice(last, match.index));

    if (match[1] !== undefined) {
      // **bold**
      parts.push(<strong key={match.index} style={{ color: T.ink, fontWeight: 600 }}>{match[1]}</strong>);
    } else if (match[2] !== undefined) {
      // *italic*
      parts.push(<em key={match.index}>{match[2]}</em>);
    } else if (match[3] !== undefined) {
      // `code`
      parts.push(
        <code
          key={match.index}
          className="font-mono text-[12.5px] px-1 py-0.5 rounded"
          style={{ background: T.bg2, color: ac, border: `1px solid ${T.border}` }}
        >
          {match[3]}
        </code>
      );
    } else if (match[4] !== undefined && match[5] !== undefined) {
      // [label](url)
      const href = match[5];
      parts.push(
        <a
          key={match.index}
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel="noopener noreferrer"
          style={{ color: ac, textDecoration: "underline", textUnderlineOffset: "2px" }}
        >
          {match[4]}
        </a>
      );
    }
    last = match.index + match[0].length;
  }
  if (last < src.length) parts.push(src.slice(last));

  return hasBullet
    ? <span className="flex gap-2"><span style={{ color: ac, flexShrink: 0 }}>·</span><span>{parts}</span></span>
    : parts.length === 1 ? parts[0] : <>{parts}</>;
}


export function Block({ b, onNav, ac }: BlockProps) {
  const { theme } = useTheme();
  const T = theme === "dark" ? DARK : LIGHT;
  const router = useRouter();

  const handleNav = (id: string) => {
    if (onNav) {
      onNav(id);
    } else {
      // Logic for internal routing if needed
    }
  };

  if (b.type === "lede") return (
    <p className="text-lg leading-relaxed font-light" style={{ color: T.ink2 }}>{inlineMd(b.text, T, ac)}</p>
  );
  
  if (b.type === "h2") return (
    <h2 id={b.text?.toLowerCase().replace(/\s+/g, '-')} className="font-serif text-[22px] font-normal mt-8 mb-2 scroll-mt-20" style={{ color: T.ink }}>{b.text}</h2>
  );
  
  if (b.type === "p") return (
    <p className="text-[14.5px] leading-relaxed font-light" style={{ color: T.ink2 }}>{inlineMd(b.text, T, ac)}</p>
  );

  if (b.type === "callout") {
    const isNote = b.variant === "note";
    const borderC = isNote ? ac : "#1a7a3a";
    const bgC = isNote ? ac + "14" : "#1a7a3a14";
    const labelC = isNote ? ac : "#1a7a3a";
    return (
      <div className="p-4 rounded-lg border" style={{ borderColor: `${borderC}50`, background: bgC }}>
        <span className="block font-mono text-[10.5px] uppercase tracking-widest mb-1.5 font-medium" style={{ color: labelC }}>{b.label}</span>
        <p className="text-[13.5px] font-light leading-normal m-0" style={{ color: T.ink2 }}>{b.text}</p>
      </div>
    );
  }

  if (b.type === "code") return (
    <div className="border rounded-lg overflow-hidden" style={{ borderColor: T.border2 }}>
      <div className="flex items-center justify-between px-3.5 py-2 border-b" style={{ borderColor: T.border, background: T.bg2 }}>
        <span className="font-mono text-[11px] tracking-wide" style={{ color: T.ink3 }}>{b.label || b.lang}</span>
        <CopyBtn text={b.code || ""} />
      </div>
      <pre className="p-4 overflow-x-auto font-mono text-[12.5px] leading-relaxed m-0" style={{ color: T.ink, background: T.bg1 }}>
        <code>{b.code}</code>
      </pre>
    </div>
  );

  if (b.type === "features") return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
      {b.items?.map((f, i) => (
        <div key={i} className="p-4.5 border rounded-lg" style={{ borderColor: T.border2, background: T.bg1 }}>
          <span className="text-xl mb-2.5 block">{f.icon}</span>
          <strong className="block text-[13.5px] font-medium mb-1" style={{ color: T.ink }}>{f.title}</strong>
          <p className="text-[12.5px] font-light leading-normal m-0" style={{ color: T.ink3 }}>{f.desc}</p>
        </div>
      ))}
    </div>
  );

  if (b.type === "steps") return (
    <div className="border rounded-lg overflow-hidden" style={{ borderColor: T.border2 }}>
      {b.items?.map((step, i) => (
        <div key={i} className="flex border-b last:border-0" style={{ borderColor: T.border, background: T.bg1 }}>
          <span className="font-mono text-[11px] text-center w-12 py-5 shrink-0 border-r flex flex-start justify-center tracking-wide" style={{ color: T.ink3, borderColor: T.border, background: T.bg2 }}>{step.n}</span>
          <div className="p-5 flex-1">
            <strong className="block text-[13.5px] font-medium mb-1.5" style={{ color: T.ink }}>{step.title}</strong>
            {step.body && <p className="text-[13.5px] font-light leading-normal m-0" style={{ color: T.ink2 }}>{step.body}</p>}
          </div>
        </div>
      ))}
    </div>
  );

  if (b.type === "linklist") return (
    <div className="border rounded-lg overflow-hidden" style={{ borderColor: T.border2 }}>
      {b.items?.map((item, i) => (
        <button key={i} onClick={() => handleNav(item.id)} className="flex items-center justify-between px-4.5 py-3 w-full border-b last:border-0 text-left transition-colors font-sans font-light text-[13.5px]"
          style={{ background: T.bg1, borderColor: T.border, color: T.ink2 }}
          onMouseEnter={e => e.currentTarget.style.background = T.bg2}
          onMouseLeave={e => e.currentTarget.style.background = T.bg1}
        >
          <span>{item.label}</span>
          <span style={{ color: T.ink3 }}>→</span>
        </button>
      ))}
    </div>
  );

  if (b.type === "api") {
    const mc: Record<string, string> = { GET: "#1060a8", POST: "#1a7a3a", PUT: "#c8920a", DELETE: "#c02020", PATCH: "#6a20a0" };
    return (
      <div className="border rounded-lg overflow-hidden" style={{ borderColor: T.border2 }}>
        <div className="flex items-center gap-3 px-4 py-3 border-b" style={{ background: T.bg2, borderColor: T.border }}>
          <span className="font-mono text-[11px] font-medium tracking-widest px-2 py-0.5 rounded border" style={{ borderColor: mc[b.method || "GET"], color: mc[b.method || "GET"] }}>{b.method}</span>
          <code className="font-mono text-[13px]" style={{ color: T.ink }}>{b.path}</code>
        </div>
        <p className="px-4 py-2.5 text-[13px] font-light border-b m-0" style={{ color: T.ink3, borderColor: T.border, background: T.bg1 }}>{b.desc}</p>
        <div className="bg-transparent">
          <div className="flex items-center justify-between px-3.5 py-2 border-b" style={{ borderColor: T.border, background: T.bg2 }}>
            <span className="font-mono text-[11px]" style={{ color: T.ink3 }}>response</span>
            <CopyBtn text={b.response || ""} />
          </div>
          <pre className="p-4 overflow-x-auto font-mono text-[12.5px] leading-relaxed m-0" style={{ color: T.ink, background: T.bg1 }}>
            <code>{b.response}</code>
          </pre>
        </div>
      </div>
    );
  }

  return null;
}
