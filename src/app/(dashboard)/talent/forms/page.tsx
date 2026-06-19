"use client";

import { useState } from "react";
import { useUser } from "@/context/UserContext";
import Link from "next/link";

/* ── Demo Data ── */
const DEMO_STATS = { sent: 24, filled: 18, confirmed: 14, rate: "75%" };

interface FormEntry {
  title: string;
  prospect: string;
  prospectEmail: string;
  prospectCompany: string;
  status: "DRAFT" | "SENT" | "OPENED" | "FILLED" | "MEETING_CONFIRMED" | "DEAL_CLOSED";
  meeting: string;
  created: string;
  slug: string;
  description: string;
  meetingLink: string;
  notes: string;
  dealValue: string;
  timeline: { action: string; time: string }[];
}

const DEMO_FORMS: FormEntry[] = [
  {
    title: "ScaleUp.io Discovery Call",
    prospect: "James Wilson",
    prospectEmail: "james@scaleup.io",
    prospectCompany: "ScaleUp.io",
    status: "MEETING_CONFIRMED",
    meeting: "Jun 20, 2:00 PM",
    created: "2d ago",
    slug: "sc-jw-001",
    description: "Initial discovery call to discuss ScaleUp.io's sales pipeline needs and how our solution can help them scale from $2M to $10M ARR.",
    meetingLink: "https://meet.google.com/abc-defg-hij",
    notes: "James mentioned they're evaluating 3 vendors. Budget approved for Q3. Decision maker is VP of Sales.",
    dealValue: "$18,000",
    timeline: [
      { action: "Form created", time: "Jun 18, 9:00 AM" },
      { action: "Form sent to prospect", time: "Jun 18, 9:05 AM" },
      { action: "Prospect opened form", time: "Jun 18, 11:30 AM" },
      { action: "Form filled by James Wilson", time: "Jun 18, 2:15 PM" },
      { action: "Meeting confirmed for Jun 20", time: "Jun 18, 2:15 PM" },
    ],
  },
  {
    title: "RevOps Demo Request",
    prospect: "Sarah Chen",
    prospectEmail: "sarah@revops.co",
    prospectCompany: "RevOps Co",
    status: "FILLED",
    meeting: "Jun 22, 10:00 AM",
    created: "1d ago",
    slug: "rv-sc-002",
    description: "Product demo for RevOps team. They need a CRM integration with automated follow-up sequences.",
    meetingLink: "https://zoom.us/j/123456789",
    notes: "Sarah is the head of operations. Team of 15 SDRs looking to automate outreach.",
    dealValue: "$24,000",
    timeline: [
      { action: "Form created", time: "Jun 19, 8:00 AM" },
      { action: "Form sent to prospect", time: "Jun 19, 8:10 AM" },
      { action: "Prospect opened form", time: "Jun 19, 10:00 AM" },
      { action: "Form filled by Sarah Chen", time: "Jun 19, 3:45 PM" },
    ],
  },
  {
    title: "DataSync Enterprise",
    prospect: "Michael Brown",
    prospectEmail: "m.brown@datasync.com",
    prospectCompany: "DataSync Inc",
    status: "DEAL_CLOSED",
    meeting: "Jun 15, 3:30 PM",
    created: "5d ago",
    slug: "ds-mb-003",
    description: "Enterprise deal for DataSync's 50-person sales team. Full platform license with custom onboarding.",
    meetingLink: "https://meet.google.com/xyz-uvwx-rst",
    notes: "Deal closed at $36K/year. 2-year contract signed. Implementation starts Jul 1.",
    dealValue: "$36,000",
    timeline: [
      { action: "Form created", time: "Jun 14, 10:00 AM" },
      { action: "Form sent to prospect", time: "Jun 14, 10:05 AM" },
      { action: "Prospect opened form", time: "Jun 14, 11:00 AM" },
      { action: "Form filled by Michael Brown", time: "Jun 14, 2:00 PM" },
      { action: "Meeting confirmed for Jun 15", time: "Jun 14, 2:00 PM" },
      { action: "Meeting held — positive outcome", time: "Jun 15, 4:00 PM" },
      { action: "Deal closed — $36,000/yr", time: "Jun 17, 11:00 AM" },
    ],
  },
  {
    title: "GrowthForge Intro",
    prospect: "—",
    prospectEmail: "—",
    prospectCompany: "GrowthForge",
    status: "SENT",
    meeting: "—",
    created: "4h ago",
    slug: "gf-004",
    description: "Cold outreach form for GrowthForge. Targeting their VP of Growth for a consultative call.",
    meetingLink: "",
    notes: "Sent via LinkedIn DM. Awaiting response.",
    dealValue: "TBD",
    timeline: [
      { action: "Form created", time: "Jun 20, 10:00 AM" },
      { action: "Form sent to prospect", time: "Jun 20, 10:05 AM" },
    ],
  },
  {
    title: "MindShift Coaching",
    prospect: "Alex Torres",
    prospectEmail: "alex@mindshift.co",
    prospectCompany: "MindShift Coaching",
    status: "FILLED",
    meeting: "Jun 21, 11:00 AM",
    created: "3d ago",
    slug: "ms-at-005",
    description: "Coaching program enrollment form. Alex is interested in the 12-week closer accelerator.",
    meetingLink: "https://calendly.com/setter/mindshift",
    notes: "Alex runs a coaching company with 200+ clients. Interested in reselling our platform.",
    dealValue: "$12,000",
    timeline: [
      { action: "Form created", time: "Jun 17, 9:00 AM" },
      { action: "Form sent to prospect", time: "Jun 17, 9:10 AM" },
      { action: "Prospect opened form", time: "Jun 17, 4:00 PM" },
      { action: "Form filled by Alex Torres", time: "Jun 18, 9:30 AM" },
    ],
  },
  {
    title: "PayStream Cold Outreach",
    prospect: "—",
    prospectEmail: "—",
    prospectCompany: "PayStream",
    status: "DRAFT",
    meeting: "—",
    created: "1h ago",
    slug: "ps-006",
    description: "Draft form for PayStream payment solutions. Targeting their sales director.",
    meetingLink: "",
    notes: "Need to finalize the form copy before sending.",
    dealValue: "TBD",
    timeline: [
      { action: "Form created (draft)", time: "Jun 20, 1:00 PM" },
    ],
  },
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
  const [selectedForm, setSelectedForm] = useState<FormEntry | null>(null);

  const stats = demoMode ? DEMO_STATS : EMPTY_STATS;
  const forms = demoMode ? DEMO_FORMS : [];

  const copyLink = (slug: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
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
                onClick={() => setSelectedForm(f)}
                className="bg-[#212121] rounded-[12px] border border-[#353535] hover:border-[#797979] transition px-5 py-4 lg:grid lg:grid-cols-[1fr_140px_160px_120px_80px_100px] lg:gap-4 lg:items-center cursor-pointer"
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
                    onClick={(e) => copyLink(f.slug, e)}
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
                    onClick={(e) => copyLink(f.slug, e)}
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

      {/* ═══ Form Details Slide-Out Panel ═══ */}
      {selectedForm && (() => {
        const sc = STATUS_CONFIG[selectedForm.status] || STATUS_CONFIG.DRAFT;
        return (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/50 z-40 transition-opacity"
              onClick={() => setSelectedForm(null)}
            />

            {/* Panel */}
            <div className="fixed top-0 right-0 h-full w-full max-w-[520px] bg-[#212121] border-l border-[#353535] z-50 overflow-y-auto shadow-2xl shadow-black/40">
              {/* Header */}
              <div className="sticky top-0 bg-[#212121] border-b border-[#353535] px-6 py-4 flex items-center justify-between z-10">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: sc.bg }} />
                    <span className="text-[13px] font-medium" style={{ color: sc.color }}>{sc.label}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedForm(null)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#353535] transition cursor-pointer text-[#797979] hover:text-[#ffffff]"
                >
                  ✕
                </button>
              </div>

              <div className="px-6 py-6 space-y-6">
                {/* Title */}
                <div>
                  <h2 className="text-[#ffffff] text-[24px] font-medium tracking-[-0.24px]">
                    {selectedForm.title}
                  </h2>
                  <p className="text-[#797979] text-[13px] mt-1">Created {selectedForm.created}</p>
                </div>

                {/* Description */}
                <div>
                  <label className="font-mono text-[11px] text-[#797979] uppercase tracking-wider block mb-2">Description</label>
                  <p className="text-[#b9b9b9] text-[14px] leading-relaxed">
                    {selectedForm.description}
                  </p>
                </div>

                {/* Prospect Info */}
                <div className="bg-[#0b0b0b] rounded-[8px] p-4 border border-[#353535] space-y-3">
                  <label className="font-mono text-[11px] text-[#797979] uppercase tracking-wider block">Prospect Details</label>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-[#797979] text-[11px] font-mono uppercase">Name</p>
                      <p className="text-[#ffffff] text-[14px] mt-0.5">{selectedForm.prospect}</p>
                    </div>
                    <div>
                      <p className="text-[#797979] text-[11px] font-mono uppercase">Email</p>
                      <p className="text-[#ffffff] text-[14px] mt-0.5">{selectedForm.prospectEmail}</p>
                    </div>
                    <div>
                      <p className="text-[#797979] text-[11px] font-mono uppercase">Company</p>
                      <p className="text-[#ffffff] text-[14px] mt-0.5">{selectedForm.prospectCompany}</p>
                    </div>
                    <div>
                      <p className="text-[#797979] text-[11px] font-mono uppercase">Deal Value</p>
                      <p className="text-[#ffffff] text-[14px] mt-0.5">{selectedForm.dealValue}</p>
                    </div>
                  </div>
                </div>

                {/* Meeting Info */}
                {selectedForm.meeting !== "—" && (
                  <div className="bg-[#0b0b0b] rounded-[8px] p-4 border border-[#353535] space-y-3">
                    <label className="font-mono text-[11px] text-[#797979] uppercase tracking-wider block">Meeting</label>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-[8px] bg-[#212121] border border-[#353535] flex items-center justify-center text-[16px]">
                        📅
                      </div>
                      <div>
                        <p className="text-[#ffffff] text-[14px]">{selectedForm.meeting}</p>
                        {selectedForm.meetingLink && (
                          <p className="text-[#55beff] text-[12px] mt-0.5 truncate max-w-[300px]">
                            {selectedForm.meetingLink}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Notes */}
                <div>
                  <label className="font-mono text-[11px] text-[#797979] uppercase tracking-wider block mb-2">Notes</label>
                  <p className="text-[#b9b9b9] text-[14px] leading-relaxed bg-[#0b0b0b] rounded-[8px] p-4 border border-[#353535]">
                    {selectedForm.notes}
                  </p>
                </div>

                {/* Timeline */}
                <div>
                  <label className="font-mono text-[11px] text-[#797979] uppercase tracking-wider block mb-3">Activity Timeline</label>
                  <div className="space-y-0">
                    {selectedForm.timeline.map((event, i) => (
                      <div key={i} className="flex gap-3">
                        {/* Timeline line */}
                        <div className="flex flex-col items-center">
                          <div
                            className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                            style={{
                              backgroundColor: i === selectedForm.timeline.length - 1 ? sc.color : "#353535",
                            }}
                          />
                          {i < selectedForm.timeline.length - 1 && (
                            <div className="w-px flex-1 bg-[#353535] my-1" />
                          )}
                        </div>
                        {/* Event */}
                        <div className="pb-4">
                          <p className="text-[#ffffff] text-[13px]">{event.action}</p>
                          <p className="text-[#797979] text-[11px] mt-0.5">{event.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-2 border-t border-[#353535]">
                  <button
                    onClick={(e) => copyLink(selectedForm.slug, e)}
                    className="flex-1 bg-[#0b0b0b] border border-[#353535] text-[#ffffff] rounded-full h-[40px] text-[13px] font-medium hover:border-[#797979] transition cursor-pointer"
                  >
                    {copiedSlug === selectedForm.slug ? "✓ Copied!" : "Copy Form Link"}
                  </button>
                  {selectedForm.status === "DRAFT" && (
                    <button
                      className="flex-1 bg-[#f36458] text-[#ffffff] rounded-full h-[40px] text-[13px] font-medium hover:opacity-90 transition cursor-pointer"
                    >
                      Send Form
                    </button>
                  )}
                </div>
              </div>
            </div>
          </>
        );
      })()}
    </div>
  );
}
