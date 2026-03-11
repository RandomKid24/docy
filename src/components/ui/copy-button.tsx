"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";
import { DARK, LIGHT } from "@/data/site-config";

interface CopyBtnProps {
  text: string;
}

export function CopyBtn({ text }: CopyBtnProps) {
  const [done, setDone] = useState(false);
  const { theme } = useTheme();
  const T = theme === "dark" ? DARK : LIGHT;

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setDone(true);
    setTimeout(() => setDone(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 px-1.5 py-0.5 rounded text-[11px] font-mono hover:bg-opacity-10 transition-colors"
      style={{ color: T.ink3 }}
    >
      {done ? (
        <>
          <Check size={12} />
          <span>copied</span>
        </>
      ) : (
        <>
          <span>copy</span>
        </>
      )}
    </button>
  );
}
