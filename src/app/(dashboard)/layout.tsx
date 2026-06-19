"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

/* ─── Nav structures by view mode ─── */
const SETTER_NAV = [
  {
    label: "MAIN",
    items: [
      { name: "Dashboard", href: "/talent/dashboard", icon: "◎" },
      { name: "Find Jobs", href: "/talent/jobs", icon: "◇" },
      { name: "My Forms", href: "/talent/forms", icon: "▢" },
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

const CLOSER_NAV = [
  {
    label: "MAIN",
    items: [
      { name: "Dashboard", href: "/talent/dashboard", icon: "◎" },
      { name: "Find Jobs", href: "/talent/jobs", icon: "◇" },
      { name: "My Forms", href: "/talent/forms", icon: "▢" },
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

const HIRING_NAV = [
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

const ADMIN_NAV = [
  {
    label: "OVERVIEW",
    items: [
      { name: "Admin Dashboard", href: "/company/dashboard", icon: "◎" },
      { name: "All Talent", href: "/company/browse", icon: "◇" },
      { name: "All Jobs", href: "/company/jobs", icon: "▤" },
      { name: "Pipeline", href: "/company/pipeline", icon: "⊞" },
    ],
  },
  {
    label: "AI & AUTOMATION",
    items: [
      { name: "AI Agents", href: "/company/ai-agents", icon: "⚡" },
      { name: "Autopilot", href: "/company/autopilot", icon: "↻" },
    ],
  },
  {
    label: "TALENT VIEW",
    items: [
      { name: "Talent Dashboard", href: "/talent/dashboard", icon: "◎" },
      { name: "Job Board", href: "/talent/jobs", icon: "◇" },
      { name: "Forms", href: "/talent/forms", icon: "▢" },
      { name: "Earnings", href: "/talent/earnings", icon: "$" },
      { name: "Talent Profile", href: "/talent/profile", icon: "○" },
    ],
  },
  {
    label: "SYSTEM",
    items: [
      { name: "Settings", href: "/company/settings", icon: "⚙" },
      { name: "Sign Out", href: "/", icon: "→" },
    ],
  },
];

/* ─── View Mode Config ─── */
const VIEW_MODES = [
  { key: "admin" as const, label: "Admin", color: "#f36458", icon: "⊕" },
  { key: "hiring" as const, label: "Hiring", color: "#55beff", icon: "◎" },
  { key: "setter" as const, label: "Setter", color: "#37cd84", icon: "◇" },
  { key: "closer" as const, label: "Closer", color: "#e9c46a", icon: "⊞" },
];

function getNavForMode(mode: string) {
  switch (mode) {
    case "admin": return ADMIN_NAV;
    case "hiring": return HIRING_NAV;
    case "closer": return CLOSER_NAV;
    default: return SETTER_NAV;
  }
}

function getDashboardForMode(mode: string) {
  switch (mode) {
    case "admin":
    case "hiring":
      return "/company/dashboard";
    default:
      return "/talent/dashboard";
  }
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const {
    userName, userInitials, userRole, companyData, signOut,
    demoMode, toggleDemoMode, theme, toggleTheme,
    viewMode, setViewMode,
    hydrated, isAuthenticated, onboardingComplete,
  } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  // Close notifications dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    if (showNotifications) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showNotifications]);

  // ── Auth guard: redirect to sign-in if not authenticated ──
  useEffect(() => {
    if (hydrated && !isAuthenticated) {
      router.push('/sign-in');
    }
  }, [hydrated, isAuthenticated, router]);

  // Check if we're currently on an onboarding page (exempt from onboarding guard)
  const isOnboardingPage = pathname.includes('/onboarding');

  // ── Onboarding guard: redirect to onboarding if not complete ──
  useEffect(() => {
    if (hydrated && isAuthenticated && !onboardingComplete && !isOnboardingPage) {
      if (userRole === 'talent') {
        router.push('/talent/onboarding');
      } else if (userRole === 'company') {
        router.push('/company/onboarding');
      }
    }
  }, [hydrated, isAuthenticated, onboardingComplete, userRole, router, isOnboardingPage]);

  // Show nothing until hydration is complete to prevent flash
  if (!hydrated) return null;

  // Show nothing while redirecting unauthenticated users
  if (!isAuthenticated) return null;

  // Show nothing while redirecting to onboarding (but NOT if we're already on onboarding)
  if (isAuthenticated && !onboardingComplete && !isOnboardingPage) return null;

  const DEMO_NOTIFICATIONS = [
    { text: "New meeting confirmed — James Wilson", time: "2h ago" },
    { text: "Deal closed — DataSync AI, $12K", time: "1d ago" },
    { text: "New application received — ScaleUp.io", time: "3d ago" },
  ];

  const navSections = getNavForMode(viewMode);
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  const handleViewModeChange = (mode: typeof viewMode) => {
    setViewMode(mode);
    router.push(getDashboardForMode(mode));
  };

  /* ─── Sidebar content (shared between desktop & mobile) ─── */
  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Wordmark */}
      <div className="p-6 border-b border-[#353535] flex items-center gap-2">
        <Image src="/favicon.png" alt="SetterCloser" width={24} height={24} />
        <span className="text-[15px] font-medium text-[#ffffff] tracking-[-0.2px]">
          SetterCloser
        </span>
      </div>

      {/* ── Role Switcher (Dropdown) ── */}
      <div className="px-3 pt-4 pb-2">
        <span className="font-mono text-[11px] text-[#797979] uppercase tracking-wider px-3 mb-2 block">
          View As
        </span>
        <div className="relative px-1">
          <button
            onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
            className="w-full flex items-center justify-between gap-2 bg-[#0b0b0b] border border-[#353535] rounded-[6px] px-3 py-2.5 cursor-pointer hover:border-[#797979] transition"
          >
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: VIEW_MODES.find(m => m.key === viewMode)?.color }}
              />
              <span
                className="text-[13px] font-medium"
                style={{ color: VIEW_MODES.find(m => m.key === viewMode)?.color }}
              >
                {VIEW_MODES.find(m => m.key === viewMode)?.label}
              </span>
            </div>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-[#797979]">
              <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {roleDropdownOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setRoleDropdownOpen(false)} />
              <div className="absolute top-full left-0 right-0 mt-1 bg-[#212121] border border-[#353535] rounded-[8px] overflow-hidden z-50 shadow-lg shadow-black/30">
                {VIEW_MODES.map((mode) => (
                  <button
                    key={mode.key}
                    onClick={() => {
                      handleViewModeChange(mode.key);
                      setRoleDropdownOpen(false);
                    }}
                    className={`w-full flex items-center gap-2 px-3 py-2.5 text-[13px] cursor-pointer transition ${
                      viewMode === mode.key
                        ? 'bg-[#0b0b0b]'
                        : 'hover:bg-[#0b0b0b]/50'
                    }`}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: viewMode === mode.key ? mode.color : "#353535" }}
                    />
                    <span
                      className="font-medium"
                      style={{ color: viewMode === mode.key ? mode.color : "#797979" }}
                    >
                      {mode.label}
                    </span>
                    {viewMode === mode.key && (
                      <span className="ml-auto text-[11px]" style={{ color: mode.color }}>✓</span>
                    )}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-2 overflow-y-auto">
        {navSections.map((section) => (
          <div key={section.label} className="mb-4">
            <span className="font-mono text-[11px] text-[#797979] uppercase tracking-wider px-6 mb-2 block">
              {section.label}
            </span>

            {section.items.map((item) =>
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
            )}
          </div>
        ))}
      </nav>

      {/* Demo Mode Toggle */}
      <div className="mx-6 mb-2 p-3 bg-[#0b0b0b] rounded-[8px] border border-[#353535]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full ${demoMode ? 'bg-[#37cd84]' : 'bg-[#797979]'}`} />
            <span className="text-[13px] text-[#b9b9b9]">Demo Mode</span>
          </div>
          <button
            onClick={toggleDemoMode}
            className={`relative w-9 h-5 rounded-full transition-colors cursor-pointer ${
              demoMode ? 'bg-[#37cd84]' : 'bg-[#353535]'
            }`}
          >
            <span
              className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                demoMode ? 'translate-x-4' : 'translate-x-0.5'
              }`}
            />
          </button>
        </div>
        <p className="text-[11px] text-[#797979] mt-1.5 font-mono">
          {demoMode ? 'SHOWING MOCK DATA' : 'LIVE MODE — EMPTY STATES'}
        </p>
      </div>

      {/* Theme Toggle */}
      <div className="mx-6 mb-4 p-3 bg-[#0b0b0b] rounded-[8px] border border-[#353535]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[14px]">{theme === 'dark' ? '🌙' : '☀️'}</span>
            <span className="text-[13px] text-[#b9b9b9]">{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
          </div>
          <button
            onClick={toggleTheme}
            className={`relative w-9 h-5 rounded-full transition-colors cursor-pointer ${
              theme === 'light' ? 'bg-[#55beff]' : 'bg-[#353535]'
            }`}
          >
            <span
              className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                theme === 'light' ? 'translate-x-4' : 'translate-x-0.5'
              }`}
            />
          </button>
        </div>
      </div>

      {/* User block */}
      <div className="p-6 border-t border-[#353535] flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#353535] flex items-center justify-center text-[#ffffff] text-[13px] font-medium shrink-0">
          {userInitials}
        </div>
        <div className="min-w-0">
          <p className="text-[#ffffff] text-[15px] truncate">
            {viewMode === "hiring" || viewMode === "admin"
              ? (companyData.companyName || userName || "Admin")
              : userName || "Sales Rep"}
          </p>
          <p className="font-mono text-[11px] uppercase" style={{
            color: VIEW_MODES.find(m => m.key === viewMode)?.color || "#797979"
          }}>
            {VIEW_MODES.find(m => m.key === viewMode)?.label} Mode
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

          {/* Right — mode badge + notification + avatar */}
          <div className="flex items-center gap-4">
            <span
              className="text-[11px] font-mono uppercase rounded-full px-2.5 py-0.5"
              style={{
                color: VIEW_MODES.find(m => m.key === viewMode)?.color,
                backgroundColor: `${VIEW_MODES.find(m => m.key === viewMode)?.color}15`,
              }}
            >
              {viewMode} mode
            </span>
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="text-[#b9b9b9] hover:text-[#ffffff] transition text-sm cursor-pointer relative"
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
                {demoMode && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#f36458]" />
                )}
              </button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-[#212121] border border-[#353535] rounded-[12px] shadow-lg z-50 overflow-hidden">
                  <div className="p-4 border-b border-[#353535]">
                    <p className="text-[#ffffff] text-[14px] font-medium">Notifications</p>
                  </div>
                  {demoMode ? (
                    <div className="divide-y divide-[#353535]">
                      {DEMO_NOTIFICATIONS.map((n, i) => (
                        <div key={i} className="p-4 hover:bg-[#0b0b0b]/50 transition">
                          <p className="text-[#b9b9b9] text-[14px]">{n.text}</p>
                          <p className="text-[#797979] text-[12px] font-mono mt-1">{n.time}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 text-center">
                      <p className="text-[#797979] text-[14px]">No new notifications</p>
                    </div>
                  )}
                </div>
              )}
            </div>
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
