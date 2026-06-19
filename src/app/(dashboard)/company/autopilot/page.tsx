"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

/* ─── Types ─── */
type RoleType = "Setter" | "Closer" | "Both";
type CompModel = "Commission Only" | "Base + Commission" | "Per Meeting";
type MatchStatus = "Trial Scheduled" | "Interested" | "Invited" | "New Match";

/* ─── Mock match data ─── */
const MATCHES: {
  name: string;
  initials: string;
  role: "CLOSER" | "SETTER" | "BOTH";
  matchPct: number;
  trust: number;
  meetings: number;
  earned: string;
  headline: string;
  status: MatchStatus;
}[] = [
  {
    name: "Alex Rivera",
    initials: "AR",
    role: "CLOSER",
    matchPct: 94,
    trust: 9.2,
    meetings: 67,
    earned: "$24K",
    headline: "High-ticket SaaS closer · 3 yrs experience · available immediately",
    status: "Trial Scheduled",
  },
  {
    name: "Jordan Patel",
    initials: "JP",
    role: "SETTER",
    matchPct: 91,
    trust: 8.8,
    meetings: 112,
    earned: "$18K",
    headline: "B2B appointment setter · coaching & SaaS verticals",
    status: "Interested",
  },
  {
    name: "Maya Chen",
    initials: "MC",
    role: "CLOSER",
    matchPct: 87,
    trust: 8.1,
    meetings: 43,
    earned: "$31K",
    headline: "Enterprise closer · fintech & SaaS · $31K closed last quarter",
    status: "Invited",
  },
  {
    name: "Sam Okafor",
    initials: "SO",
    role: "BOTH",
    matchPct: 85,
    trust: 7.9,
    meetings: 89,
    earned: "$22K",
    headline: "Full-cycle rep · sets & closes · e-com and agency verticals",
    status: "New Match",
  },
];

const ACTIVITY_LOG = [
  { text: "Trial call with Alex Rivera auto-scheduled for June 20 at 2pm EST", time: "2 hours ago" },
  { text: "Jordan Patel expressed interest in your Closer role", time: "5 hours ago" },
  { text: "Auto-invited Maya Chen (87% match)", time: "8 hours ago" },
  { text: "New match found: Sam Okafor (85% match)", time: "12 hours ago" },
  { text: "Autopilot activated with criteria: Closer · SaaS · Trust 7+", time: "1 day ago" },
];

const INDUSTRIES = [
  'SaaS', 'FinTech', 'AI / ML', 'Cybersecurity', 'Cloud / DevOps', 'MarTech', 'EdTech', 'HealthTech',
  'Agency', 'Consulting', 'Coaching', 'Recruiting / Staffing', 'Legal', 'Accounting',
  'E-Commerce', 'Retail', 'Wholesale / Distribution', 'Marketplace',
  'Insurance', 'Financial Services', 'Wealth Management', 'Lending / Mortgage',
  'Healthcare', 'Pharma / Biotech', 'Wellness / Fitness', 'Mental Health',
  'Real Estate', 'PropTech', 'Construction',
  'Media / Entertainment', 'Advertising', 'Events', 'Gaming',
  'Energy / Utilities', 'Solar / Renewables', 'CleanTech',
  'Manufacturing', 'Logistics / Supply Chain', 'Automotive',
  'Nonprofit', 'Government / Public Sector', 'Education',
  'Telecom', 'Hardware / IoT',
  'Crypto / Web3', 'Food & Beverage', 'Travel / Hospitality', 'Sports', 'Agriculture',
] as const;

const FRAMEWORKS = ['SPIN Selling', 'Sandler', 'Challenger', 'MEDDIC', 'Solution Selling', 'Consultative', 'BANT', 'NEPQ', 'Gap Selling', 'Command of the Sale', 'Value Selling', 'Miller Heiman'];

const TIMEZONES = [
  'Any Timezone',
  'UTC-8 (PST)', 'UTC-7 (MST)', 'UTC-6 (CST)', 'UTC-5 (EST)',
  'UTC+0 (GMT)', 'UTC+1 (CET)', 'UTC+2 (EET)', 'UTC+3 (MSK)',
  'UTC+5:30 (IST)', 'UTC+8 (SGT)', 'UTC+9 (JST)', 'UTC+10 (AEST)',
];

/* ─── Status badge colours ─── */
function statusClasses(s: MatchStatus) {
  switch (s) {
    case "Trial Scheduled":
      return "bg-[#f36458] text-[#0b0b0b]";
    case "Interested":
      return "bg-[#0b0b0b] text-[#37cd84]";
    case "Invited":
      return "bg-[#0b0b0b] text-[#55beff]";
    case "New Match":
      return "bg-[#0b0b0b] text-[#797979]";
  }
}

/* ─────────────────────────────────────────────────────── */
export default function AutopilotPage() {
  const router = useRouter();
  const { demoMode } = useUser();
  const [isActive, setIsActive] = useState(false);

  /* ── Form state ── */
  const [roleType, setRoleType] = useState<RoleType | null>(null);
  const [industries, setIndustries] = useState<string[]>([]);
  const [industrySearch, setIndustrySearch] = useState("");
  const [customIndustry, setCustomIndustry] = useState("");
  const [selFrameworks, setSelFrameworks] = useState<string[]>([]);
  const [trustScore, setTrustScore] = useState(7);
  const [compModel, setCompModel] = useState<CompModel | null>(null);
  const [budget, setBudget] = useState("");
  const [experience, setExperience] = useState("Any");
  const [timezone, setTimezone] = useState("Any Timezone");
  const [autoInvite, setAutoInvite] = useState(true);
  const [autoSchedule, setAutoSchedule] = useState(true);

  const toggleIndustry = (ind: string) =>
    setIndustries((prev) =>
      prev.includes(ind) ? prev.filter((i) => i !== ind) : [...prev, ind]
    );

  const toggleFramework = (fw: string) =>
    setSelFrameworks((prev) =>
      prev.includes(fw) ? prev.filter((f) => f !== fw) : [...prev, fw]
    );

  const addCustomIndustry = () => {
    const trimmed = customIndustry.trim();
    if (trimmed && !industries.includes(trimmed)) {
      setIndustries((prev) => [...prev, trimmed]);
      setCustomIndustry("");
    }
  };

  const filteredIndustries = industrySearch
    ? INDUSTRIES.filter((ind) => ind.toLowerCase().includes(industrySearch.toLowerCase()))
    : INDUSTRIES;

  /* ────────── SETUP MODE ────────── */
  if (!isActive) {
    return (
      <div>
        {/* Page heading */}
        <p className="font-mono text-[11px] text-[#797979] uppercase tracking-wider mb-1">
          AUTOMATED HIRING
        </p>
        <h1 className="text-[#ffffff] text-[38px] font-normal tracking-[-0.38px] mb-10">
          Autopilot
        </h1>

        {/* Criteria card */}
        <div className="bg-[#212121] rounded-[12px] p-8 border border-[#353535] max-w-3xl mx-auto">
          <h2 className="text-[#ffffff] text-[32px] tracking-[-0.32px] font-normal mb-2">
            Set your hiring criteria
          </h2>
          <p className="text-[#b9b9b9] text-[15px] mb-8">
            Define what you&apos;re looking for once. We&apos;ll auto-match, vet, and invite the best talent.
          </p>

          {/* ── Role Type ── */}
          <FieldLabel>Role Type</FieldLabel>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            {(["Setter", "Closer", "Both"] as RoleType[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRoleType(r)}
                className={`bg-[#0b0b0b] border rounded-[5px] p-4 text-[15px] cursor-pointer transition ${
                  roleType === r
                    ? "border-[#f36458] text-[#ffffff]"
                    : "border-[#353535] text-[#b9b9b9] hover:border-[#797979]"
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          {/* ── Industries (searchable + custom) ── */}
          <FieldLabel>Preferred Industries</FieldLabel>
          <input
            type="text"
            value={industrySearch}
            onChange={(e) => setIndustrySearch(e.target.value)}
            className="w-full bg-[#0b0b0b] border border-[#353535] rounded-[3px] h-[36px] text-[#b9b9b9] px-3 text-[13px] focus:border-[#f36458] focus:outline-none transition mb-2"
            placeholder="Search industries..."
          />
          {industries.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-2">
              {industries.map((ind) => (
                <button
                  key={ind}
                  type="button"
                  onClick={() => toggleIndustry(ind)}
                  className="rounded-full px-3 py-1 text-[12px] border border-[#f36458] text-[#ffffff] bg-[#f36458]/10 cursor-pointer transition flex items-center gap-1"
                >
                  {ind} <span className="text-[#f36458] text-[10px]">✕</span>
                </button>
              ))}
            </div>
          )}
          <div className="flex flex-wrap gap-1.5 max-h-[140px] overflow-y-auto mb-2">
            {filteredIndustries
              .filter((ind) => !industries.includes(ind))
              .map((ind) => (
                <button
                  key={ind}
                  type="button"
                  onClick={() => toggleIndustry(ind)}
                  className="rounded-full px-3 py-1 text-[12px] border border-[#353535] text-[#797979] bg-[#0b0b0b] hover:border-[#b9b9b9] hover:text-[#b9b9b9] transition cursor-pointer"
                >
                  {ind}
                </button>
              ))}
          </div>
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={customIndustry}
              onChange={(e) => setCustomIndustry(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addCustomIndustry(); } }}
              className="flex-1 bg-[#0b0b0b] border border-[#353535] rounded-[3px] h-[34px] text-[#b9b9b9] px-3 text-[13px] focus:border-[#f36458] focus:outline-none transition"
              placeholder="Add custom industry..."
            />
            <button
              type="button"
              onClick={addCustomIndustry}
              className="bg-[#353535] text-[#b9b9b9] rounded-[3px] px-3 h-[34px] text-[13px] hover:bg-[#797979] hover:text-[#ffffff] transition cursor-pointer"
            >
              Add
            </button>
          </div>

          {/* ── Required Frameworks ── */}
          <FieldLabel>Sales Frameworks</FieldLabel>
          <p className="text-[#797979] text-[12px] mb-2 -mt-1">Match talent who are trained in these methodologies</p>
          <div className="flex flex-wrap gap-1.5 mb-6">
            {FRAMEWORKS.map((fw) => (
              <button
                key={fw}
                type="button"
                onClick={() => toggleFramework(fw)}
                className={`rounded-full px-3 py-1.5 text-[12px] border cursor-pointer transition ${
                  selFrameworks.includes(fw)
                    ? "border-[#f36458] text-[#ffffff] bg-[#f36458]/10"
                    : "border-[#353535] text-[#797979] bg-[#0b0b0b] hover:border-[#b9b9b9]"
                }`}
              >
                {fw}
              </button>
            ))}
          </div>

          {/* ── Trust Score ── */}
          <FieldLabel>Minimum Trust Score</FieldLabel>
          <div className="flex items-center gap-4 mb-6">
            <input
              type="range"
              min={1}
              max={10}
              value={trustScore}
              onChange={(e) => setTrustScore(Number(e.target.value))}
              className="flex-1 appearance-none h-1 bg-[#353535] rounded-full accent-[#f36458] cursor-pointer"
            />
            <span className="font-mono text-[15px] text-[#ffffff] w-8 text-right">
              {trustScore}
            </span>
          </div>

          {/* ── Compensation Model ── */}
          <FieldLabel>Compensation Model</FieldLabel>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {(["Commission Only", "Base + Commission", "Per Meeting"] as CompModel[]).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCompModel(c)}
                className={`bg-[#0b0b0b] border rounded-[5px] p-3 text-[13px] cursor-pointer transition ${
                  compModel === c
                    ? "border-[#f36458] text-[#ffffff]"
                    : "border-[#353535] text-[#b9b9b9] hover:border-[#797979]"
                }`}
              >
                {c}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setCompModel(null)}
              className={`bg-[#0b0b0b] border rounded-[5px] p-3 text-[13px] cursor-pointer transition ${
                compModel === null
                  ? "border-[#f36458] text-[#ffffff]"
                  : "border-[#353535] text-[#b9b9b9] hover:border-[#797979]"
              }`}
            >
              Any
            </button>
          </div>

          {/* ── Max Budget ── */}
          <FieldLabel>Maximum Budget</FieldLabel>
          <div className="relative mb-6">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#797979]">$</span>
            <input
              type="text"
              value={budget}
              onChange={(e) => setBudget(e.target.value.replace(/[^0-9,]/g, ''))}
              placeholder="5,000/mo"
              className="w-full bg-[#0b0b0b] border border-[#353535] rounded-[3px] text-[#b9b9b9] h-[44px] pl-7 pr-4 text-[15px] focus:border-[#f36458] focus:outline-none transition"
            />
          </div>

          {/* ── Min Experience ── */}
          <FieldLabel>Minimum Experience</FieldLabel>
          <select
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="w-full bg-[#0b0b0b] border border-[#353535] rounded-[3px] text-[#b9b9b9] h-[44px] px-4 text-[15px] focus:border-[#f36458] focus:outline-none transition mb-6 appearance-none cursor-pointer"
          >
            <option>Any</option>
            <option>1+ years</option>
            <option>2+ years</option>
            <option>3+ years</option>
            <option>5+ years</option>
            <option>7+ years</option>
            <option>10+ years</option>
          </select>

          {/* ── Timezone ── */}
          <FieldLabel>Preferred Timezone</FieldLabel>
          <select
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            className="w-full bg-[#0b0b0b] border border-[#353535] rounded-[3px] text-[#b9b9b9] h-[44px] px-4 text-[15px] focus:border-[#f36458] focus:outline-none transition mb-6 appearance-none cursor-pointer"
          >
            {TIMEZONES.map((tz) => (
              <option key={tz}>{tz}</option>
            ))}
          </select>

          {/* ── Toggles ── */}
          <div className="space-y-4 mb-8">
            <ToggleRow
              label="Automatically invite matched talent"
              checked={autoInvite}
              onChange={setAutoInvite}
            />
            <ToggleRow
              label="Auto-schedule trial calls with interested reps"
              checked={autoSchedule}
              onChange={setAutoSchedule}
            />
          </div>

          {/* ── Submit ── */}
          <button
            type="button"
            onClick={() => setIsActive(true)}
            className="w-full bg-[#f36458] text-[#0b0b0b] rounded-full h-[48px] text-[15px] font-medium cursor-pointer hover:opacity-90 transition"
          >
            Activate Autopilot
          </button>
        </div>
      </div>
    );
  }

  /* ────────── ACTIVE MODE ────────── */
  return (
    <div>
      {/* Page heading */}
      <p className="font-mono text-[11px] text-[#797979] uppercase tracking-wider mb-1">
        AUTOMATED HIRING
      </p>
      <h1 className="text-[#ffffff] text-[38px] font-normal tracking-[-0.38px] mb-10">
        Autopilot
      </h1>

      {/* ── Active banner ── */}
      <div className="bg-[#212121] rounded-[12px] p-6 border border-[#37cd84] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-[#37cd84] shrink-0" />
          <div>
            <p className="text-[#37cd84] text-[18px] font-normal">Autopilot is active</p>
            <p className="text-[#797979] text-[13px]">
              Matching criteria: Closer · SaaS · Trust 7+ · Commission
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsActive(false)}
            className="text-[#b9b9b9] text-[13px] hover:text-[#ffffff] transition cursor-pointer"
          >
            Edit Criteria
          </button>
          <button
            type="button"
            onClick={() => setIsActive(false)}
            className="bg-[#212121] text-[#dd0000] border border-[#dd0000] rounded-full h-[36px] px-4 text-[13px] cursor-pointer hover:opacity-80 transition"
          >
            Pause
          </button>
        </div>
      </div>

      {/* ── Stats row ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-8">
        {[
          { value: "12", label: "Matches Found" },
          { value: "8", label: "Auto-Invited" },
          { value: "5", label: "Interested" },
          { value: "2", label: "Trial Calls Scheduled" },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-[#212121] rounded-[12px] p-6 border border-[#353535]"
          >
            <p className="text-[#ffffff] text-[32px] font-normal tracking-[-0.32px]">
              {s.value}
            </p>
            <p className="font-mono text-[11px] text-[#797979] uppercase tracking-wider mt-1">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* ── Top Matches ── */}
      <div className="mt-8">
        <p className="font-mono text-[11px] text-[#797979] uppercase tracking-wider mb-4">
          AUTO-MATCHED TALENT
        </p>
        <h2 className="text-[#ffffff] text-[24px] font-normal tracking-[-0.24px] mb-4">
          Your Top Matches
        </h2>

        {!demoMode ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <span className="text-[32px] mb-3 opacity-30">🔍</span>
            <p className="text-[#ffffff] text-[16px]">No autopilot matches yet</p>
            <p className="text-[#797979] text-[14px] mt-1 max-w-xs">
              Autopilot is scanning for talent that matches your criteria. Check back soon.
            </p>
          </div>
        ) : (
        <div className="space-y-4">
          {MATCHES.map((m) => (
            <div
              key={m.name}
              className="bg-[#212121] rounded-[12px] p-6 border border-[#353535] flex items-start justify-between"
            >
              {/* Left */}
              <div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#353535] flex items-center justify-center text-[#ffffff] text-[15px] font-medium shrink-0">
                    {m.initials}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[#ffffff] text-[18px] font-normal">{m.name}</span>
                    <span className="bg-[#0b0b0b] text-[#b9b9b9] text-[11px] font-mono rounded-full px-3 py-1 uppercase">
                      {m.role}
                    </span>
                  </div>
                </div>
                <p className="text-[#37cd84] text-[13px] font-mono mt-2 ml-16">
                  {m.matchPct}% match
                </p>
                <p className="text-[#b9b9b9] text-[15px] mt-2 ml-16">{m.headline}</p>
                <p className="text-[#797979] text-[13px] font-mono mt-2 ml-16">
                  Trust {m.trust} · {m.meetings} meetings · {m.earned} earned
                </p>
              </div>

              {/* Right */}
              <div className="flex flex-col items-end gap-3 shrink-0 ml-6">
                <span
                  className={`text-[11px] font-mono rounded-full px-3 py-1 ${statusClasses(
                    m.status
                  )}`}
                >
                  {m.status}
                </span>
                <div className="flex items-center gap-4 mt-1">
                  <button
                    type="button"
                    onClick={() => router.push('/company/browse')}
                    className="text-[#55beff] text-[13px] cursor-pointer hover:opacity-80 transition"
                  >
                    View Profile
                  </button>
                  <button
                    type="button"
                    onClick={() => alert("Scheduling coming soon")}
                    className="text-[#55beff] text-[13px] cursor-pointer hover:opacity-80 transition"
                  >
                    Schedule Call
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        )}
      </div>

      {/* ── Activity Log ── */}
      <div className="mt-8">
        <p className="font-mono text-[11px] text-[#797979] uppercase tracking-wider mb-4">
          RECENT ACTIVITY
        </p>
        <h2 className="text-[#ffffff] text-[24px] font-normal tracking-[-0.24px] mb-4">
          Autopilot Activity Log
        </h2>

        <div className="bg-[#212121] rounded-[12px] p-6 border border-[#353535]">
          <div className="space-y-4">
            {ACTIVITY_LOG.map((entry, i) => (
              <div key={i} className="flex items-start gap-4">
                <span className="w-2 h-2 rounded-full bg-[#37cd84] mt-2 shrink-0" />
                <div>
                  <p className="text-[#b9b9b9] text-[15px]">{entry.text}</p>
                  <p className="text-[#797979] text-[13px] font-mono mt-0.5">{entry.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Helpers ─── */
function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="font-mono text-[11px] text-[#797979] uppercase tracking-wider mb-2 block">
      {children}
    </label>
  );
}

function ToggleRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[#b9b9b9] text-[15px]">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition cursor-pointer ${
          checked ? "bg-[#f36458]" : "bg-[#353535]"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-[#ffffff] transition-transform ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}
