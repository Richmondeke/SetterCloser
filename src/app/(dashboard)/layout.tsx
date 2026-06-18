"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

/* ─── Nav structure ─── */
const TALENT_NAV = [
  {
    label: "MAIN",
    items: [
      { name: "Dashboard", href: "/talent/dashboard", icon: "◎" },
      { name: "Find Jobs", href: "/talent/jobs", icon: "◇" },
      { name: "My Earnings", href: "/talent/earnings", icon: "$" },
    ],
  },
  {
    label: "ACCOUNT",
    items: [
      { name: "Profile", href: "/talent/profile", icon: "○" },
      { name: "Settings", href: "/talent/settings", icon: "⚙" },
      { name: "Sign Out", href: "/", icon: "→" },
    ],
  },
];

const COMPANY_NAV = [
  {
    label: "MAIN",
    items: [
      { name: "Dashboard", href: "/company/dashboard", icon: "◎" },
      { name: "Browse Talent", href: "/company/browse", icon: "◇" },
      { name: "Job Postings", href: "/company/jobs", icon: "▤" },
      { name: "Pipeline", href: "/company/pipeline", icon: "⊞" },
    ],
  },
  {
    label: "AI",
    items: [
      { name: "AI Agents", href: "/company/ai-agents", icon: "⚡" },
      { name: "Autopilot", href: "/company/autopilot", icon: "↻" },
    ],
  },
  {
    label: "ACCOUNT",
    items: [
      { name: "Settings", href: "/company/settings", icon: "⚙" },
      { name: "Sign Out", href: "/", icon: "→" },
    ],
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { userName, userInitials, userRole, companyData, signOut } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isCompany = pathname.startsWith("/company");
  const navSections = isCompany ? COMPANY_NAV : TALENT_NAV;

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  /* ─── Sidebar content (shared between desktop & mobile) ─── */
  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Wordmark */}
      <div className="p-6 border-b border-[#353535] flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#f36458]" />
        <span className="text-[15px] font-medium text-[#ffffff] tracking-[-0.2px]">
          SetterCloser
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {navSections.map((section) => (
          <div key={section.label} className="mb-6">
            <span className="font-mono text-[11px] text-[#797979] uppercase tracking-wider px-6 mb-2 block">
              {section.label}
            </span>

            {section.items.map((item) => (
              item.name === "Sign Out" ? (
                <button
                  key={item.href}
                  onClick={() => {
                    setSidebarOpen(false);
                    signOut();
                    router.push("/");
                  }}
                  className="flex items-center gap-3 px-6 py-2.5 text-[15px] rounded-[5px] mx-3 transition cursor-pointer text-[#b9b9b9] hover:bg-[#0b0b0b] hover:text-[#ffffff] w-full text-left"
                >
                  <span className="w-5 text-center text-[13px] opacity-60">
                    {item.icon}
                  </span>
                  {item.name}
                </button>
              ) : (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-6 py-2.5 text-[15px] rounded-[5px] mx-3 transition cursor-pointer ${
                  isActive(item.href)
                    ? "bg-[#0b0b0b] text-[#ffffff]"
                    : "text-[#b9b9b9] hover:bg-[#0b0b0b] hover:text-[#ffffff]"
                }`}
              >
                <span className="w-5 text-center text-[13px] opacity-60">
                  {item.icon}
                </span>
                {item.name}
              </Link>
              )
            ))}
          </div>
        ))}
      </nav>

      {/* User block */}
      <div className="p-6 border-t border-[#353535] flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#353535] flex items-center justify-center text-[#ffffff] text-[13px] font-medium shrink-0">
          {userInitials}
        </div>
        <div className="min-w-0">
          <p className="text-[#ffffff] text-[15px] truncate">
            {isCompany ? (companyData.companyName || userName) : userName}
          </p>
          <p className="font-mono text-[11px] text-[#797979] uppercase">
            {userRole === "company" ? "Company" : "Sales Rep"}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#0b0b0b]">
      {/* ── Desktop sidebar ── */}
      <aside className="hidden md:flex w-64 bg-[#212121] border-r border-[#353535] flex-col h-screen fixed left-0 top-0 z-30">
        <SidebarContent />
      </aside>

      {/* ── Mobile overlay ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Mobile sidebar ── */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-[#212121] border-r border-[#353535] z-50 transform transition-transform duration-200 md:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent />
      </aside>

      {/* ── Main content ── */}
      <div className="md:ml-64 flex-1 min-h-screen flex flex-col">
        {/* Top bar */}
        <header className="h-16 border-b border-[#353535] flex items-center justify-between px-8 shrink-0">
          {/* Left — hamburger on mobile, empty on desktop */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden text-[#b9b9b9] hover:text-[#ffffff] transition cursor-pointer"
              aria-label="Open sidebar"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <line x1="3" y1="5" x2="17" y2="5" />
                <line x1="3" y1="10" x2="17" y2="10" />
                <line x1="3" y1="15" x2="17" y2="15" />
              </svg>
            </button>
          </div>

          {/* Right — notification + avatar */}
          <div className="flex items-center gap-4">
            <button
              className="text-[#b9b9b9] hover:text-[#ffffff] transition text-sm cursor-pointer"
              aria-label="Notifications"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M13.5 6.75a4.5 4.5 0 1 0-9 0c0 4.5-2.25 5.625-2.25 5.625h13.5S13.5 11.25 13.5 6.75Z" />
                <path d="M10.297 15.375a1.5 1.5 0 0 1-2.594 0" />
              </svg>
            </button>
            <div className="w-7 h-7 rounded-full bg-[#353535] flex items-center justify-center text-[#ffffff] text-[11px] font-medium">
              {userInitials}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-8 flex-1">{children}</main>
      </div>
    </div>
  );
}
