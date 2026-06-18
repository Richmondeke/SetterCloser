"use client";

import { useState, useEffect, useCallback } from "react";
import { useUser } from "@/context/UserContext";

/* ─── Types ─── */
type EarningStatus = "Verified" | "Pending" | "Disputed" | "Auto-Verified";
type EarningType = "Meeting" | "Deal" | "Form";
type EarningMethod = "Calendar sync" | "Manual" | "CRM sync" | "Form webhook";

interface Earning {
  id: string;
  type: EarningType;
  company: string;
  amount: number;
  status: EarningStatus;
  date: string;
  method: EarningMethod;
}

interface Toast {
  id: string;
  company: string;
  visible: boolean;
}

/* ─── Demo data ─── */
const DEMO_INITIAL_EARNINGS: Earning[] = [
  { id: "e1", type: "Meeting", company: "ScaleUp.io", amount: 150, status: "Auto-Verified", date: "Jun 18, 2026", method: "Calendar sync" },
  { id: "e2", type: "Deal", company: "RevOps Labs", amount: 2400, status: "Verified", date: "Jun 17, 2026", method: "CRM sync" },
  { id: "e3", type: "Meeting", company: "CloseFast", amount: 150, status: "Pending", date: "Jun 17, 2026", method: "Manual" },
  { id: "e4", type: "Meeting", company: "DataFlow", amount: 150, status: "Auto-Verified", date: "Jun 16, 2026", method: "Calendar sync" },
  { id: "e5", type: "Form", company: "TechScale", amount: 75, status: "Verified", date: "Jun 16, 2026", method: "Form webhook" },
  { id: "e6", type: "Meeting", company: "GrowthHQ", amount: 150, status: "Disputed", date: "Jun 15, 2026", method: "Calendar sync" },
  { id: "e7", type: "Deal", company: "SalesForce Pro", amount: 4800, status: "Verified", date: "Jun 14, 2026", method: "CRM sync" },
  { id: "e8", type: "Meeting", company: "CloudOps", amount: 150, status: "Auto-Verified", date: "Jun 14, 2026", method: "Calendar sync" },
  { id: "e9", type: "Meeting", company: "PipelineCo", amount: 150, status: "Pending", date: "Jun 13, 2026", method: "Manual" },
  { id: "e10", type: "Deal", company: "AgencyX", amount: 1200, status: "Verified", date: "Jun 12, 2026", method: "Manual" },
];

const DEMO_STATS = [
  { value: "$12,400", label: "Total Verified", accent: "text-[#37cd84]" },
  { value: "47", label: "Meetings Booked", accent: "text-[#ffffff]" },
  { value: "$264", label: "Avg Per Meeting", accent: "text-[#ffffff]" },
  { value: "92%", label: "Verification Rate", accent: "text-[#ffffff]" },
];

const EMPTY_STATS = [
  { value: "$0", label: "Total Verified", accent: "text-[#37cd84]" },
  { value: "0", label: "Meetings Booked", accent: "text-[#ffffff]" },
  { value: "$0", label: "Avg Per Meeting", accent: "text-[#ffffff]" },
  { value: "0%", label: "Verification Rate", accent: "text-[#ffffff]" },
];

const FILTER_TABS = ["All", "Verified", "Pending", "Disputed"] as const;
type FilterTab = (typeof FILTER_TABS)[number];

/* ─── Helpers ─── */
const fmtCurrency = (n: number) =>
  `+$${n.toLocaleString("en-US")}`;

const statusDotColor: Record<EarningStatus, string> = {
  Verified: "bg-[#37cd84]",
  "Auto-Verified": "bg-[#37cd84]",
  Pending: "bg-[#797979]",
  Disputed: "bg-[#dd0000]",
};

const statusTextColor: Record<EarningStatus, string> = {
  Verified: "text-[#37cd84]",
  "Auto-Verified": "text-[#37cd84]",
  Pending: "text-[#797979]",
  Disputed: "text-[#dd0000]",
};

const typeBadgeLabel: Record<EarningType, string> = {
  Meeting: "Meeting",
  Deal: "Deal",
  Form: "Form",
};

/* ────────────────────────────────────────────── */
export default function EarningsPage() {
  const { demoMode } = useUser();

  const [calendarConnected, setCalendarConnected] = useState(false);
  const [showLogForm, setShowLogForm] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterTab>("All");
  const [earnings, setEarnings] = useState<Earning[]>(demoMode ? DEMO_INITIAL_EARNINGS : []);
  const [toasts, setToasts] = useState<Toast[]>([]);

  /* ── form state ── */
  const [formType, setFormType] = useState("");
  const [formCompany, setFormCompany] = useState("");
  const [formAmount, setFormAmount] = useState("");
  const [formDate, setFormDate] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formEvidence, setFormEvidence] = useState("");

  /* ── Sync earnings with demoMode changes ── */
  useEffect(() => {
    setEarnings(demoMode ? DEMO_INITIAL_EARNINGS : []);
  }, [demoMode]);

  const stats = demoMode ? DEMO_STATS : EMPTY_STATS;

  /* ── toast helper ── */
  const pushToast = useCallback((company: string) => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, company, visible: true }]);
    // auto-dismiss after 5 s
    setTimeout(() => {
      setToasts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, visible: false } : t))
      );
      // remove from DOM after fade
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 500);
    }, 5000);
  }, []);

  /* ── Real-time auto-detection simulation ── */
  useEffect(() => {
    if (!calendarConnected || !demoMode) return;

    const t1 = setTimeout(() => {
      const newEarning: Earning = {
        id: crypto.randomUUID(),
        type: "Meeting",
        company: "NewProspect Inc.",
        amount: 150,
        status: "Auto-Verified",
        date: "Just now",
        method: "Calendar sync",
      };
      setEarnings((prev) => [newEarning, ...prev]);
      pushToast("NewProspect Inc.");
    }, 8000);

    const t2 = setTimeout(() => {
      const newEarning: Earning = {
        id: crypto.randomUUID(),
        type: "Meeting",
        company: "FreshLead Co.",
        amount: 150,
        status: "Auto-Verified",
        date: "Just now",
        method: "Calendar sync",
      };
      setEarnings((prev) => [newEarning, ...prev]);
      pushToast("FreshLead Co.");
    }, 23000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [calendarConnected, demoMode, pushToast]);

  /* ── Submit handler ── */
  const handleSubmit = () => {
    const typeMap: Record<string, EarningType> = {
      "Meeting Booked": "Meeting",
      "Form Filled": "Form",
      "Deal Closed": "Deal",
    };
    const newEarning: Earning = {
      id: crypto.randomUUID(),
      type: typeMap[formType] ?? "Meeting",
      company: formCompany || "Unknown",
      amount: Number(formAmount) || 0,
      status: "Pending",
      date: formDate
        ? new Date(formDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : "Today",
      method: "Manual",
    };
    setEarnings((prev) => [newEarning, ...prev]);
    setShowLogForm(false);
    setFormType("");
    setFormCompany("");
    setFormAmount("");
    setFormDate("");
    setFormDesc("");
    setFormEvidence("");
  };

  /* ── Filtered list ── */
  const filteredEarnings =
    activeFilter === "All"
      ? earnings
      : earnings.filter((e) => {
          if (activeFilter === "Verified")
            return e.status === "Verified" || e.status === "Auto-Verified";
          return e.status === activeFilter;
        });

  /* ── Verification steps ── */
  const steps = [
    {
      num: "1",
      title: "You book a meeting",
      desc: "Schedule a call with a prospect through your connected calendar",
    },
    {
      num: "2",
      title: "We auto-detect it",
      desc: "Our system syncs with your calendar and CRM to verify the meeting occurred",
    },
    {
      num: "3",
      title: "Earnings confirmed",
      desc: "The hiring company is notified and your trust score updates in real-time",
    },
  ];

  const inputClass =
    "w-full bg-[#0b0b0b] border border-[#353535] rounded-[3px] text-[#b9b9b9] h-[44px] px-3 focus:border-[#f36458] focus:outline-none transition";

  return (
    <div className="w-full">
      {/* ── Toast notifications ── */}
      <div className="fixed top-6 right-6 z-50 flex flex-col gap-3">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`bg-[#212121] border border-[#37cd84] rounded-[12px] p-4 shadow-lg transition-opacity duration-500 ${
              t.visible ? "opacity-100" : "opacity-0"
            }`}
          >
            <p className="text-[#ffffff] text-[15px]">🎯 Meeting auto-detected</p>
            <p className="text-[#b9b9b9] text-[13px] mt-1">
              Booked meeting with {t.company} verified via Google Calendar
            </p>
          </div>
        ))}
      </div>

      {/* ── Page Header ── */}
      <div className="flex justify-between items-start">
        <div>
          <p className="font-mono text-[11px] text-[#797979] uppercase tracking-wider">
            VERIFIED EARNINGS
          </p>
          <h1 className="text-[#ffffff] text-[38px] tracking-[-1.14px] font-normal mt-1">
            My Earnings
          </h1>
        </div>
        <div className="flex items-center gap-3 mt-2">
          {calendarConnected ? (
            <span className="flex items-center gap-2 bg-[#212121] border border-[#37cd84] rounded-full px-4 py-2 text-[#37cd84] text-[13px]">
              <span className="w-2 h-2 rounded-full bg-[#37cd84]" />
              Calendar Connected
            </span>
          ) : (
            <button
              onClick={() => setCalendarConnected(true)}
              className="bg-[#0b0b0b] border border-[#353535] rounded-full px-4 py-2 text-[#b9b9b9] text-[13px] hover:border-[#f36458] transition cursor-pointer"
            >
              Connect Calendar
            </button>
          )}
          <button
            onClick={() => setShowLogForm(!showLogForm)}
            className="bg-[#ffffff] text-[#0b0b0b] rounded-full h-[44px] px-6 font-medium cursor-pointer transition hover:opacity-90"
          >
            + Log Earning
          </button>
        </div>
      </div>

      {/* ── Calendar Connection Banner ── */}
      {!calendarConnected ? (
        <div className="bg-[#212121] rounded-[12px] p-6 border border-dashed border-[#f36458] mt-6">
          <div className="flex items-start gap-4">
            <span className="text-[32px] leading-none">📅</span>
            <div>
              <h2 className="text-[#ffffff] text-[18px] font-normal">
                Connect your calendar for automatic verification
              </h2>
              <p className="text-[#b9b9b9] text-[15px] mt-1">
                Link your Google Calendar or Calendly to auto-detect booked
                meetings and verify your earnings in real-time.
              </p>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setCalendarConnected(true)}
                  className="bg-[#0b0b0b] border border-[#353535] rounded-[5px] px-4 py-3 text-[#ffffff] text-[15px] hover:border-[#f36458] transition cursor-pointer"
                >
                  Connect Google Calendar
                </button>
                <button
                  onClick={() => setCalendarConnected(true)}
                  className="bg-[#0b0b0b] border border-[#353535] rounded-[5px] px-4 py-3 text-[#ffffff] text-[15px] hover:border-[#f36458] transition cursor-pointer"
                >
                  Connect Calendly
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[#212121] rounded-[12px] p-4 border border-[#37cd84] mt-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#37cd84]" />
            <div>
              <p className="text-[#37cd84] text-[15px]">
                Google Calendar connected
              </p>
              <p className="text-[#797979] text-[13px]">
                Auto-detecting meetings in real-time
              </p>
            </div>
          </div>
          <button
            onClick={() => setCalendarConnected(false)}
            className="text-[#dd0000] text-[13px] cursor-pointer hover:underline"
          >
            Disconnect
          </button>
        </div>
      )}

      {/* ── Stats Row ── */}
      <div className="grid grid-cols-4 gap-4 mt-8">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-[#212121] rounded-[12px] p-6 border border-[#353535]"
          >
            <div
              className={`${s.accent} text-[32px] tracking-[-0.32px] font-normal`}
            >
              {s.value}
            </div>
            <div className="font-mono text-[11px] text-[#797979] uppercase tracking-wider mt-1">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* ── Log Earning Form ── */}
      {showLogForm && (
        <div className="bg-[#212121] rounded-[12px] p-8 border border-[#353535] mt-6">
          <h3 className="text-[#ffffff] text-[24px] tracking-[-0.24px] font-normal">
            Log a new earning
          </h3>

          <div className="grid md:grid-cols-2 gap-4 mt-6">
            {/* Type */}
            <div>
              <label className="font-mono text-[11px] text-[#797979] uppercase tracking-wider block mb-2">
                Type
              </label>
              <select
                value={formType}
                onChange={(e) => setFormType(e.target.value)}
                className={`${inputClass} appearance-none`}
              >
                <option value="">Select type</option>
                <option value="Meeting Booked">Meeting Booked</option>
                <option value="Form Filled">Form Filled</option>
                <option value="Deal Closed">Deal Closed</option>
              </select>
            </div>
            {/* Company */}
            <div>
              <label className="font-mono text-[11px] text-[#797979] uppercase tracking-wider block mb-2">
                Company Name
              </label>
              <input
                type="text"
                value={formCompany}
                onChange={(e) => setFormCompany(e.target.value)}
                placeholder="e.g. ScaleUp.io"
                className={inputClass}
              />
            </div>
            {/* Amount */}
            <div>
              <label className="font-mono text-[11px] text-[#797979] uppercase tracking-wider block mb-2">
                Amount ($)
              </label>
              <input
                type="number"
                value={formAmount}
                onChange={(e) => setFormAmount(e.target.value)}
                placeholder="0"
                className={inputClass}
              />
            </div>
            {/* Date */}
            <div>
              <label className="font-mono text-[11px] text-[#797979] uppercase tracking-wider block mb-2">
                Meeting Date
              </label>
              <input
                type="date"
                value={formDate}
                onChange={(e) => setFormDate(e.target.value)}
                className={inputClass}
              />
            </div>
            {/* Description — full width */}
            <div className="md:col-span-2">
              <label className="font-mono text-[11px] text-[#797979] uppercase tracking-wider block mb-2">
                Description
              </label>
              <textarea
                value={formDesc}
                onChange={(e) => setFormDesc(e.target.value)}
                placeholder="Brief description of the earning…"
                className="w-full bg-[#0b0b0b] border border-[#353535] rounded-[3px] text-[#b9b9b9] p-3 min-h-[80px] focus:border-[#f36458] focus:outline-none transition resize-none"
              />
            </div>
            {/* Evidence — full width */}
            <div className="md:col-span-2">
              <label className="font-mono text-[11px] text-[#797979] uppercase tracking-wider block mb-2">
                Evidence Link
              </label>
              <input
                type="text"
                value={formEvidence}
                onChange={(e) => setFormEvidence(e.target.value)}
                placeholder="Calendar link, CRM screenshot URL…"
                className={inputClass}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={() => setShowLogForm(false)}
              className="bg-[#0b0b0b] border border-[#353535] rounded-full px-4 py-2 text-[#b9b9b9] text-[13px] hover:border-[#f36458] transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="bg-[#ffffff] text-[#0b0b0b] rounded-full h-[44px] px-6 font-medium cursor-pointer transition hover:opacity-90"
            >
              Submit for Verification
            </button>
          </div>
        </div>
      )}

      {/* ── Earnings History ── */}
      <div className="mt-8">
        <p className="font-mono text-[11px] text-[#797979] uppercase tracking-wider">
          ALL ACTIVITY
        </p>
        <h2 className="text-[#ffffff] text-[24px] font-normal mt-1">
          Earnings History
        </h2>

        {/* Filter tabs */}
        <div className="flex gap-2 mt-4">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`rounded-full px-4 py-1.5 text-[13px] cursor-pointer transition border ${
                activeFilter === tab
                  ? "border-[#f36458] text-[#ffffff] bg-[#0b0b0b]"
                  : "border-[#353535] text-[#b9b9b9] bg-[#0b0b0b] hover:border-[#797979]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-[#212121] rounded-[12px] border border-[#353535] overflow-hidden mt-4">
          {/* Header */}
          <div className="bg-[#0b0b0b] px-6 py-3 grid grid-cols-6">
            {["Type", "Company", "Amount", "Status", "Method", "Date"].map(
              (col) => (
                <span
                  key={col}
                  className="font-mono text-[11px] text-[#797979] uppercase tracking-wider"
                >
                  {col}
                </span>
              )
            )}
          </div>

          {/* Rows or empty state */}
          {earnings.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <span className="text-[32px] mb-3 opacity-30">💰</span>
              <p className="text-[#ffffff] text-[16px]">No earnings recorded yet</p>
              <p className="text-[#797979] text-[14px] mt-1 max-w-xs">
                Book meetings to start earning. Connect your calendar to auto-detect activity.
              </p>
            </div>
          ) : filteredEarnings.length === 0 ? (
            <div className="px-6 py-8 text-center text-[#797979] text-[14px]">
              No earnings match this filter.
            </div>
          ) : (
            filteredEarnings.map((row, idx) => (
              <div
                key={row.id}
                className={`px-6 py-4 grid grid-cols-6 items-center ${
                  idx < filteredEarnings.length - 1
                    ? "border-b border-[#353535]"
                    : ""
                }`}
              >
                {/* Type badge */}
                <span>
                  <span className="bg-[#0b0b0b] text-[#b9b9b9] text-[11px] font-mono rounded-full px-2 py-0.5">
                    {typeBadgeLabel[row.type]}
                  </span>
                </span>
                {/* Company */}
                <span className="text-[#ffffff] text-[15px]">{row.company}</span>
                {/* Amount */}
                <span className="text-[#37cd84] text-[15px] font-medium">
                  {fmtCurrency(row.amount)}
                </span>
                {/* Status */}
                <span className="flex items-center gap-1.5">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${statusDotColor[row.status]}`}
                  />
                  <span className={`${statusTextColor[row.status]} text-[13px]`}>
                    {row.status === "Auto-Verified"
                      ? "Auto-Verified ⚡"
                      : row.status}
                  </span>
                </span>
                {/* Method */}
                <span className="text-[#797979] text-[13px]">{row.method}</span>
                {/* Date */}
                <span className="text-[#797979] text-[13px]">{row.date}</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ── How Verification Works ── */}
      <div className="mt-12 mb-8">
        <p className="font-mono text-[11px] text-[#797979] uppercase tracking-wider">
          HOW VERIFICATION WORKS
        </p>
        <h2 className="text-[#ffffff] text-[24px] font-normal mt-1">
          Your earnings are verified automatically
        </h2>

        <div className="grid grid-cols-3 gap-6 mt-6">
          {steps.map((s) => (
            <div
              key={s.num}
              className="bg-[#212121] rounded-[12px] p-6 border border-[#353535] text-center"
            >
              <div className="text-[#353535] text-[48px] font-normal tracking-tight leading-none">
                {s.num}
              </div>
              <p className="text-[#ffffff] text-[16px] mt-2">{s.title}</p>
              <p className="text-[#797979] text-[13px] mt-2">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
