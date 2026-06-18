"use client";

import { useState } from "react";

const FILTERS = ["All", "Setter", "Closer", "SaaS", "Coaching", "Agency", "Remote", "Commission"];

const JOBS = [
  {
    title: "Senior SaaS Closer",
    company: "ScaleUp.io",
    posted: "2d ago",
    desc: "Close high-ticket SaaS deals for a fast-growing revenue operations platform. Ideal for experienced closers who thrive in consultative sales environments.",
    tags: ["SaaS", "Closer", "Commission"],
    comp: "$5K-$15K/mo",
  },
  {
    title: "Outbound Setter — Coaching Niche",
    company: "MindShift Coaching",
    posted: "5d ago",
    desc: "Book qualified discovery calls for a premium coaching program. Must be comfortable with cold outreach via DM, email, and phone.",
    tags: ["Coaching", "Setter", "Remote"],
    comp: "$150/meeting",
  },
  {
    title: "Enterprise Account Executive",
    company: "DataSync AI",
    posted: "1d ago",
    desc: "Run demos and close mid-market to enterprise deals for an AI-powered data integration platform. MEDDIC experience preferred.",
    tags: ["SaaS", "Closer", "Commission"],
    comp: "$8K-$20K/mo",
  },
  {
    title: "Agency Sales Setter",
    company: "GrowthForge Agency",
    posted: "3d ago",
    desc: "Set appointments for a digital marketing agency selling to e-commerce brands. Strong communication skills and CRM proficiency required.",
    tags: ["Agency", "Setter", "Remote"],
    comp: "$100/meeting",
  },
  {
    title: "High-Ticket Closer — Finance",
    company: "WealthPath",
    posted: "6d ago",
    desc: "Close $5K-$25K financial education programs. Must have experience in high-ticket phone sales and a proven track record.",
    tags: ["Coaching", "Closer", "Commission"],
    comp: "$10K-$30K/mo",
  },
  {
    title: "Full-Cycle Sales Rep",
    company: "RevOps Labs",
    posted: "4d ago",
    desc: "Handle end-to-end sales from prospecting to close for a B2B SaaS tool. Great opportunity for versatile reps who can do both setting and closing.",
    tags: ["SaaS", "Remote", "Commission"],
    comp: "$6K-$12K/mo",
  },
];

export default function JobsPage() {
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? JOBS : JOBS.filter((j) => j.tags.includes(active));

  return (
    <div className="w-full">
      {/* ── Header ── */}
      <p className="mono-eyebrow">JOB BOARD</p>
      <h1 className="text-[#ffffff] text-[38px] tracking-[-1.14px] font-normal mt-1">Find Jobs</h1>

      {/* ── Filter Bar ── */}
      <div className="flex gap-3 flex-wrap mt-6">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`border rounded-full px-4 py-2 text-[13px] cursor-pointer transition ${
              active === f
                ? "border-[#f36458] text-[#ffffff] bg-[#212121]"
                : "border-[#353535] text-[#b9b9b9] bg-[#212121]"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* ── Job Cards ── */}
      <div className="mt-8 space-y-4">
        {filtered.map((job, i) => (
          <div
            key={i}
            className="bg-[#212121] rounded-[12px] p-6 border border-[#353535] hover:border-[#797979] transition cursor-pointer"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-[#ffffff] text-[18px]">{job.title}</h3>
              <span className="text-[#797979] text-[13px] shrink-0 ml-4">{job.posted}</span>
            </div>
            <div className="text-[#b9b9b9] text-[15px] mt-1">{job.company}</div>
            <p className="text-[#797979] text-[15px] mt-3 line-clamp-2">{job.desc}</p>
            <div className="flex justify-between items-center mt-4">
              <div className="flex gap-2">
                {job.tags.map((t) => (
                  <span key={t} className="bg-[#0b0b0b] text-[#b9b9b9] text-[11px] rounded-full px-2 py-0.5">
                    {t}
                  </span>
                ))}
              </div>
              <span className="text-[#37cd84] text-[15px] font-medium">{job.comp}</span>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-16 text-[#797979]">
            No jobs found for &quot;{active}&quot;. Try a different filter.
          </div>
        )}
      </div>
    </div>
  );
}
