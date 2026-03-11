"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { TopBar } from "@/components/layout/top-bar";
import { Sidebar } from "@/components/layout/sidebar";
import { SearchModal } from "@/components/layout/search-modal";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDocs = pathname.startsWith("/hrms-guide");

  if (!isDocs) {
    return <>{children}</>;
  }

  return (
    <>
      <div className="flex flex-col h-screen overflow-hidden">
        <TopBar />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          {children}
        </div>
      </div>
      <SearchModal />
    </>
  );
}
