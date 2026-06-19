"use client";

import { useState, useMemo } from "react";
import { useUser } from "@/context/UserContext";

/* ── Types ── */
type RoleType = "Setter" | "Closer" | "Both";
type Industry = "SaaS" | "Coaching" | "Agency" | "FinTech" | "E-Commerce" | "Healthcare";
type CompType = "Commission" | "Per Meeting" | "Base + Commission" | "Salary";

interface Job {
  title: string;
  company: string;
  posted: string;
  desc: string;
  role: RoleType;
  industry: Industry;
  comp: string;
  dealSize: string;
  compType: CompType;
  remote: boolean;
  tags: string[];
}

/* ── Demo data ── */
const DEMO_JOBS: Job[] = [
  {
    title: "Senior SaaS Closer",
    company: "ScaleUp.io",
    posted: "2d ago",
    desc: "Close high-ticket SaaS deals for a fast-growing revenue operations platform. Ideal for experienced closers who thrive in consultative sales environments.",
    role: "Closer",
    industry: "SaaS",
    comp: "10-15% commission",
    dealSize: "$5K-$50K deals",
    compType: "Commission",
    remote: true,
    tags: ["SaaS", "Closer", "Commission", "Remote"],
  },
  {
    title: "Outbound Setter — Coaching Niche",
    company: "MindShift Coaching",
    posted: "5d ago",
    desc: "Book qualified discovery calls for a premium coaching program. Must be comfortable with cold outreach via DM, email, and phone.",
    role: "Setter",
    industry: "Coaching",
    comp: "$150/meeting",
    dealSize: "$3K-$10K programs",
    compType: "Per Meeting",
    remote: true,
    tags: ["Coaching", "Setter", "Remote", "Per Meeting"],
  },
  {
    title: "Enterprise Account Executive",
    company: "DataSync AI",
    posted: "1d ago",
    desc: "Run demos and close mid-market to enterprise deals for an AI-powered data integration platform. MEDDIC experience preferred.",
    role: "Closer",
    industry: "SaaS",
    comp: "8-12% commission",
    dealSize: "$20K-$150K deals",
    compType: "Commission",
    remote: false,
    tags: ["SaaS", "Closer", "Commission", "Enterprise"],
  },
  {
    title: "Agency Sales Setter",
    company: "GrowthForge Agency",
    posted: "3d ago",
    desc: "Set appointments for a digital marketing agency selling to e-commerce brands. Strong communication skills and CRM proficiency required.",
    role: "Setter",
    industry: "Agency",
    comp: "$100/meeting",
    dealSize: "$2K-$8K retainers",
    compType: "Per Meeting",
    remote: true,
    tags: ["Agency", "Setter", "Remote", "Per Meeting"],
  },
  {
    title: "High-Ticket Closer — Finance",
    company: "WealthPath",
    posted: "6d ago",
    desc: "Close $5K-$25K financial education programs. Must have experience in high-ticket phone sales and a proven track record.",
    role: "Closer",
    industry: "Coaching",
    comp: "15-20% commission",
    dealSize: "$5K-$25K programs",
    compType: "Commission",
    remote: false,
    tags: ["Coaching", "Closer", "Commission", "High-Ticket"],
  },
  {
    title: "Full-Cycle Sales Rep — SaaS",
    company: "RevOps Labs",
    posted: "4d ago",
    desc: "Handle end-to-end sales from prospecting to close for a B2B SaaS tool. Great opportunity for versatile reps who can do both setting and closing.",
    role: "Both",
    industry: "SaaS",
    comp: "$3K base + 8% commission",
    dealSize: "$10K-$40K deals",
    compType: "Base + Commission",
    remote: true,
    tags: ["SaaS", "Both", "Remote", "Base + Commission"],
  },
  {
    title: "Cold Outreach Setter — FinTech",
    company: "PayStream",
    posted: "1d ago",
    desc: "Build pipeline for a payments infrastructure startup. LinkedIn + cold email sequences. Apollo and Salesforce experience a plus.",
    role: "Setter",
    industry: "FinTech",
    comp: "$200/meeting",
    dealSize: "$15K-$80K deals",
    compType: "Per Meeting",
    remote: true,
    tags: ["FinTech", "Setter", "Remote", "Per Meeting"],
  },
  {
    title: "Healthcare SaaS Closer",
    company: "MedFlow",
    posted: "3d ago",
    desc: "Close deals with medical practices and hospital networks for a patient management SaaS. Compliance and HIPAA familiarity helpful.",
    role: "Closer",
    industry: "Healthcare",
    comp: "$4K base + 10% commission",
    dealSize: "$8K-$60K deals",
    compType: "Base + Commission",
    remote: false,
    tags: ["Healthcare", "Closer", "Base + Commission"],
  },
];

/* ── Filter Config ── */
const ROLE_FILTERS: RoleType[] = ["Setter", "Closer", "Both"];
const INDUSTRY_FILTERS: Industry[] = ["SaaS", "Coaching", "Agency", "FinTech", "E-Commerce", "Healthcare"];
const COMP_FILTERS: CompType[] = ["Commission", "Per Meeting", "Base + Commission"];

export default function JobsPage() {
  const { demoMode } = useUser();
  const JOBS = demoMode ? DEMO_JOBS : [];

  const [appliedJobs, setAppliedJobs] = useState<Set<number>>(new Set());
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<RoleType | null>(null);
  const [industryFilter, setIndustryFilter] = useState<Industry | null>(null);
  const [compFilter, setCompFilter] = useState<CompType | null>(null);
  const [remoteOnly, setRemoteOnly] = useState(false);

  const filtered = useMemo(() => {
    return JOBS.filter((job) => {
      // Search
      if (search) {
        const q = search.toLowerCase();
        const matches =
          job.title.toLowerCase().includes(q) ||
          job.company.toLowerCase().includes(q) ||
          job.desc.toLowerCase().includes(q) ||
          job.tags.some((t) => t.toLowerCase().includes(q));
        if (!matches) return false;
      }
      // Role
      if (roleFilter && job.role !== roleFilter) return false;
      // Industry
      if (industryFilter && job.industry !== industryFilter) return false;
      // Comp type
      if (compFilter && job.compType !== compFilter) return false;
      // Remote
      if (remoteOnly && !job.remote) return false;
      return true;
    });
  }, [JOBS, search, roleFilter, industryFilter, compFilter, remoteOnly]);

  const activeCount =
    (roleFilter ? 1 : 0) +
    (industryFilter ? 1 : 0) +
    (compFilter ? 1 : 0) +
    (remoteOnly ? 1 : 0);

  const clearAll = () => {
    setRoleFilter(null);
    setIndustryFilter(null);
    setCompFilter(null);
    setRemoteOnly(false);
    setSearch("");
  };

  return (
    <div className="w-full">
      {/* ── Header ── */}
      <p className="mono-eyebrow">JOB BOARD</p>
      <h1 className="text-[#ffffff] text-[28px] md:text-[38px] tracking-[-0.84px] md:tracking-[-1.14px] font-normal mt-1">
        Find Jobs
      </h1>

      {/* ── Search Bar ── */}
      <div className="mt-6 relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#797979]"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by role, company, industry, or keyword..."
          className="w-full bg-[#212121] border border-[#353535] rounded-[3px] h-[44px] text-[#b9b9b9] pl-10 pr-4 text-[15px] focus:border-[#f36458] focus:outline-none transition placeholder:text-[#353535]"
        />
      </div>

      {/* ── Filter Rows ── */}
      <div className="mt-5 space-y-3">
        {/* Row 1: Role */}
        <div className="flex items-center gap-3 flex-wrap">
          <span className="font-mono text-[11px] text-[#797979] uppercase tracking-wider w-16 shrink-0">
            Role
          </span>
          {ROLE_FILTERS.map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(roleFilter === r ? null : r)}
              className={`border rounded-full px-4 py-1.5 text-[13px] cursor-pointer transition ${
                roleFilter === r
                  ? "border-[#f36458] text-[#ffffff] bg-[#212121]"
                  : "border-[#353535] text-[#b9b9b9] bg-[#0b0b0b] hover:border-[#797979]"
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Row 2: Industry */}
        <div className="flex items-center gap-3 flex-wrap">
          <span className="font-mono text-[11px] text-[#797979] uppercase tracking-wider w-16 shrink-0">
            Niche
          </span>
          {INDUSTRY_FILTERS.map((ind) => (
            <button
              key={ind}
              onClick={() => setIndustryFilter(industryFilter === ind ? null : ind)}
              className={`border rounded-full px-4 py-1.5 text-[13px] cursor-pointer transition ${
                industryFilter === ind
                  ? "border-[#f36458] text-[#ffffff] bg-[#212121]"
                  : "border-[#353535] text-[#b9b9b9] bg-[#0b0b0b] hover:border-[#797979]"
              }`}
            >
              {ind}
            </button>
          ))}
        </div>

        {/* Row 3: Pay & Remote */}
        <div className="flex items-center gap-3 flex-wrap">
          <span className="font-mono text-[11px] text-[#797979] uppercase tracking-wider w-16 shrink-0">
            Pay
          </span>
          {COMP_FILTERS.map((c) => (
            <button
              key={c}
              onClick={() => setCompFilter(compFilter === c ? null : c)}
              className={`border rounded-full px-4 py-1.5 text-[13px] cursor-pointer transition ${
                compFilter === c
                  ? "border-[#f36458] text-[#ffffff] bg-[#212121]"
                  : "border-[#353535] text-[#b9b9b9] bg-[#0b0b0b] hover:border-[#797979]"
              }`}
            >
              {c}
            </button>
          ))}
          <div className="h-4 w-px bg-[#353535]" />
          <button
            onClick={() => setRemoteOnly(!remoteOnly)}
            className={`border rounded-full px-4 py-1.5 text-[13px] cursor-pointer transition flex items-center gap-1.5 ${
              remoteOnly
                ? "border-[#f36458] text-[#ffffff] bg-[#212121]"
                : "border-[#353535] text-[#b9b9b9] bg-[#0b0b0b] hover:border-[#797979]"
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${remoteOnly ? "bg-[#37cd84]" : "bg-[#797979]"}`} />
            Remote Only
          </button>
        </div>
      </div>

      {/* ── Active filters summary ── */}
      {activeCount > 0 && (
        <div className="flex items-center gap-2 mt-4">
          <span className="text-[#797979] text-[13px]">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          </span>
          <span className="text-[#353535]">·</span>
          <button
            onClick={clearAll}
            className="text-[#f36458] text-[13px] hover:underline cursor-pointer"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* ── Job Cards ── */}
      <div className="mt-6 space-y-4">
        {filtered.length > 0 ? (
          filtered.map((job, i) => (
            <div
              key={i}
              className="bg-[#212121] rounded-[12px] p-6 border border-[#353535] hover:border-[#797979] transition cursor-pointer group"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <span
                    className={`text-[11px] font-mono uppercase rounded-full px-2.5 py-0.5 ${
                      job.role === "Setter"
                        ? "bg-[#55beff]/10 text-[#55beff]"
                        : job.role === "Closer"
                        ? "bg-[#f36458]/10 text-[#f36458]"
                        : "bg-[#37cd84]/10 text-[#37cd84]"
                    }`}
                  >
                    {job.role}
                  </span>
                  <h3 className="text-[#ffffff] text-[18px] group-hover:text-[#f36458] transition-colors">
                    {job.title}
                  </h3>
                </div>
                <span className="text-[#797979] text-[13px] shrink-0 ml-4">
                  {job.posted}
                </span>
              </div>
              <div className="text-[#b9b9b9] text-[15px] mt-1 ml-[calc(theme(spacing.3)+3rem)]">{job.company}</div>
              <p className="text-[#797979] text-[15px] mt-3 line-clamp-2">
                {job.desc}
              </p>
              <div className="flex justify-between items-center mt-4">
                <div className="flex gap-2 flex-wrap">
                  {job.tags.map((t) => (
                    <span
                      key={t}
                      className="bg-[#0b0b0b] text-[#b9b9b9] text-[11px] rounded-full px-2 py-0.5"
                    >
                      {t}
                    </span>
                  ))}
                  {job.remote && (
                    <span className="bg-[#37cd84]/10 text-[#37cd84] text-[11px] rounded-full px-2 py-0.5 flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-[#37cd84]" />
                      Remote
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 shrink-0 ml-4">
                  <div className="text-right">
                    <span className="text-[#37cd84] text-[15px] font-medium block">
                      {job.comp}
                    </span>
                    <span className="text-[#797979] text-[12px] block mt-0.5">
                      {job.dealSize}
                    </span>
                  </div>
                  {appliedJobs.has(i) ? (
                    <span className="bg-[#37cd84]/10 text-[#37cd84] border border-[#37cd84]/20 text-[13px] rounded-full px-4 py-1.5">
                      Applied ✓
                    </span>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setAppliedJobs((prev) => new Set(prev).add(i));
                      }}
                      className="bg-[#f36458] text-[#ffffff] text-[13px] rounded-full px-4 py-1.5 hover:opacity-90 transition cursor-pointer"
                    >
                      Apply
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : JOBS.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <span className="text-[32px] mb-3 opacity-30">💼</span>
            <p className="text-[#ffffff] text-[16px]">No job listings available</p>
            <p className="text-[#797979] text-[14px] mt-1 max-w-xs">
              Check back soon — new opportunities are posted regularly
            </p>
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-[#797979] text-[18px]">No jobs match your filters</p>
            <p className="text-[#353535] text-[15px] mt-2">
              Try adjusting your search or clearing some filters
            </p>
            <button
              onClick={clearAll}
              className="mt-4 text-[#f36458] text-[13px] hover:underline cursor-pointer"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
