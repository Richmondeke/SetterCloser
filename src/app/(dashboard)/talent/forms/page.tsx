"use client";

import { useState } from "react";
import { useUser } from "@/context/UserContext";
import Link from "next/link";

/* ── Demo Data ── */
const DEMO_STATS = { sent: 24, filled: 18, confirmed: 14, rate: "75%" };

const DEMO_FORMS = [
  { title: "ScaleUp.io Discovery Call", prospect: "James Wilson", status: "MEETING_CONFIRMED" as const, meeting: "Jun 20, 2:00 PM", created: "2d ago", slug: "sc-jw-001" },
  { title: "RevOps Demo Request", prospect: "Sarah Chen", status: "FILLED" as const, meeting: "Jun 22, 10:00 AM", created: "1d ago", slug: "rv-sc-002" },
  { title: "DataSync Enterprise", prospect: "Michael Brown", status: "DEAL_CLOSED" as const, meeting: "Jun 15, 3:30 PM", created: "5d ago", slug: "ds-mb-003" },
  { title: "GrowthForge Intro", prospect: "—", status: "SENT" as const, meeting: "—", created: "4h ago", slug: "gf-004" },
  { title: "MindShift Coaching", prospect: "Alex Torres", status: "FILLED" as const, meeting: "Jun 21, 11:00 AM", created: "3d ago", slug: "ms-at-005" },
  { title: "PayStream Cold Outreach", prospect: "—", status: "DRAFT" as const, meeting: "—", created: "1h ago", slug: "ps-006" },
];

const EMPTY_STATS = { sent: 0, filled: 0, confirmed: 0, rate: "0%" };

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  DRAFT: { label: "Draft", color: "#797979", bg: "#797979" },
  SENT: { label: "Sent", color: "#55beff", bg: "#55beff" },
  OPENED: { label: "Opened", color: "#e9c46a", bg: "#e9c46a" },
  FILLED: { label: "Filled", color: "#e9c46a", bg: "#e9c46a" },
  MEETING_CONFIRMED: { label: "Meeting Confirmed", color: "#37cd84", bg: "#37cd84" },
  DEAL_CLOSED: { label: "Deal Closed", color: "#37cd84", bg: "#37cd84" },
};

export default function FormsPage() {
  const { demoMode } = useUser();
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  const stats = demoMode ? DEMO_STATS : EMPTY_STATS;
  const forms = demoMode ? DEMO_FORMS : [];

  const copyLink = (slug: string) => {
    navigator.clipboard.writeText(`https://settercloser.guava.earth/confirm/${slug}`);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  return (
    <div className="w-full">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <p className="mono-eyebrow">CONFIRMATIONS</p>
          <h1 className="text-[#ffffff] text-[28px] md:text-[38px] tracking-[-0.84px] md:tracking-[-1.14px] font-normal mt-1">My Forms</h1>
        </div>
        <Link
          href="/talent/forms/new"
          className="bg-[#f36458] text-[#ffffff] rounded-full px-5 py-2.5 text-[13px] font-medium hover:opacity-90 transition"
        >
          + Generate New Form
        </Link>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-8">
        {[
          { value: stats.sent, label: "Forms Sent" },
          { value: stats.filled, label: "Forms Filled" },
          { value: stats.confirmed, label: "Meetings Confirmed" },
          { value: stats.rate, label: "Conversion Rate" },
        ].map((s) => (
          <div key={s.label} className="bg-[#212121] rounded-[12px] p-6 border border-[#353535]">
            <div className="text-[#ffffff] text-[32px] tracking-[-0.32px] font-normal">{s.value}</div>
            <div className="font-mono text-[11px] text-[#797979] uppercase tracking-wider mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── Forms List ── */}
      {forms.length > 0 ? (
        <div className="mt-8 space-y-3">
          {/* Table Header — hidden on mobile */}
          <div className="hidden lg:grid grid-cols-[1fr_140px_160px_120px_80px_100px] gap-4 px-6 py-2">
            <span className="font-mono text-[11px] text-[#797979] uppercase tracking-wider">Form</span>
            <span className="font-mono text-[11px] text-[#797979] uppercase tracking-wider">Prospect</span>
            <span className="font-mono text-[11px] text-[#797979] uppercase tracking-wider">Status</span>
            <span className="font-mono text-[11px] text-[#797979] uppercase tracking-wider">Meeting</span>
            <span className="font-mono text-[11px] text-[#797979] uppercase tracking-wider">Created</span>
            <span className="font-mono text-[11px] text-[#797979] uppercase tracking-wider text-right">Link</span>
          </div>

          {forms.map((f) => {
            const sc = STATUS_CONFIG[f.status] || STATUS_CONFIG.DRAFT;
            return (
              <div
                key={f.slug}
                className="bg-[#212121] rounded-[12px] border border-[#353535] hover:border-[#797979] transition px-5 py-4 lg:grid lg:grid-cols-[1fr_140px_160px_120px_80px_100px] lg:gap-4 lg:items-center"
              >
                {/* Mobile: stacked card layout */}
                <div className="flex items-start justify-between lg:block">
                  <span className="text-[#ffffff] text-[15px]">{f.title}</span>
                  <div className="flex items-center gap-1.5 lg:hidden">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: sc.bg }} />
                    <span className="text-[12px]" style={{ color: sc.color }}>{sc.label}</span>
                  </div>
                </div>

                {/* Mobile meta row */}
                <div className="flex items-center gap-4 mt-2 lg:hidden">
                  <span className="text-[#b9b9b9] text-[12px]">{f.prospect}</span>
                  <span className="text-[#797979] text-[12px]">•</span>
                  <span className="text-[#797979] text-[12px]">{f.meeting}</span>
                  <span className="text-[#797979] text-[12px]">•</span>
                  <span className="text-[#797979] text-[12px]">{f.created}</span>
                </div>
                <div className="mt-3 lg:hidden">
                  <button
                    onClick={() => copyLink(f.slug)}
                    className="text-[13px] cursor-pointer transition hover:opacity-80"
                    style={{ color: copiedSlug === f.slug ? "#37cd84" : "#55beff" }}
                  >
                    {copiedSlug === f.slug ? "Copied!" : "Copy Link →"}
                  </button>
                </div>

                {/* Desktop: inline columns (hidden on mobile) */}
                <span className="hidden lg:block text-[#b9b9b9] text-[13px]">{f.prospect}</span>
                <div className="hidden lg:flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: sc.bg }} />
                  <span className="text-[13px]" style={{ color: sc.color }}>{sc.label}</span>
                </div>
                <span className="hidden lg:block text-[#797979] text-[13px]">{f.meeting}</span>
                <span className="hidden lg:block text-[#797979] text-[13px]">{f.created}</span>
                <div className="hidden lg:block text-right">
                  <button
                    onClick={() => copyLink(f.slug)}
                    className="text-[13px] cursor-pointer transition hover:opacity-80"
                    style={{ color: copiedSlug === f.slug ? "#37cd84" : "#55beff" }}
                  >
                    {copiedSlug === f.slug ? "Copied!" : "Copy Link"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center mt-8">
          <span className="text-[32px] mb-3 opacity-30">▢</span>
          <p className="text-[#ffffff] text-[16px]">No forms created yet</p>
          <p className="text-[#797979] text-[14px] mt-1 max-w-xs">
            Generate confirmation forms to send to your prospects and track meeting bookings.
          </p>
          <Link
            href="/talent/forms/new"
            className="mt-4 bg-[#f36458] text-[#ffffff] text-[13px] rounded-full px-5 py-2 hover:opacity-90 transition"
          >
            Generate Your First Form
          </Link>
        </div>
      )}
    </div>
  );
}
