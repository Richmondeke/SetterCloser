"use client";

import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";

export default function TalentDashboardPage() {
  const stats = [
    { value: "47", label: "Meetings Booked" },
    { value: "$12,400", label: "Total Earnings" },
    { value: "8.7", label: "Trust Score" },
    { value: "3", label: "Active Applications" },
  ];

  const recentEarnings = [
    { type: "Meeting", company: "ScaleUp.io", amount: "+$150", status: "Verified" as const },
    { type: "Deal Closed", company: "RevOps Labs", amount: "+$2,400", status: "Verified" as const },
    { type: "Meeting", company: "CloseFast", amount: "+$150", status: "Pending" as const },
    { type: "Meeting", company: "DataFlow", amount: "+$150", status: "Verified" as const },
  ];

  const jobMatches = [
    {
      title: "Senior Closer",
      company: "ScaleUp.io",
      tags: ["SaaS", "NEPQ", "Commission"],
      comp: "$5K-$15K/mo",
    },
    {
      title: "Outbound Setter",
      company: "GrowthForge",
      tags: ["Agency", "SPIN", "Remote"],
      comp: "$150/meeting",
    },
    {
      title: "Enterprise AE",
      company: "DataSync AI",
      tags: ["FinTech", "MEDDIC", "Base + Comm"],
      comp: "$8K-$20K/mo",
    },
  ];

  return (
    <div className="w-full">
      {/* ── Header ── */}
      <p className="mono-eyebrow">OVERVIEW</p>
      <h1 className="text-[#ffffff] text-[38px] tracking-[-1.14px] font-normal mt-1">Dashboard</h1>

      {/* ── Stats Row ── */}
      <StaggerContainer staggerDelay={0.1} className="grid grid-cols-4 gap-4 mt-8">
        {stats.map((s) => (
          <StaggerItem key={s.label}>
            <div className="bg-[#212121] rounded-[12px] p-6 border border-[#353535]">
              <div className="text-[#ffffff] text-[32px] tracking-[-0.32px] font-normal">{s.value}</div>
              <div className="font-mono text-[11px] text-[#797979] uppercase tracking-wider mt-1">{s.label}</div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* ── Two-Column Grid ── */}
      <FadeIn delay={0.3}>
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {/* Left: Recent Earnings */}
          <div className="card-dark">
            <p className="mono-eyebrow">VERIFIED ACTIVITY</p>
            <h2 className="text-[#ffffff] text-[24px] tracking-[-0.24px] font-normal mt-1">Recent Earnings</h2>

            <div className="mt-6">
              {recentEarnings.map((e, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center py-4 border-b border-[#353535] last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <span className="bg-[#0b0b0b] text-[#b9b9b9] text-[11px] font-mono rounded-full px-2 py-0.5">
                      {e.type}
                    </span>
                    <span className="text-[#ffffff] text-[15px]">{e.company}</span>
                  </div>
                  <div className="text-right">
                    <div className={`text-[15px] font-medium ${e.status === "Verified" ? "text-[#37cd84]" : "text-[#b9b9b9]"}`}>
                      {e.amount}
                    </div>
                    <div
                      className={`text-[11px] font-mono ${
                        e.status === "Verified" ? "text-[#37cd84]" : "text-[#797979]"
                      }`}
                    >
                      {e.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <a href="/talent/earnings" className="text-[#55beff] text-[13px] mt-4 inline-block hover:underline">
              View All Earnings →
            </a>
          </div>

          {/* Right: Job Matches */}
          <div className="card-dark">
            <p className="mono-eyebrow">RECOMMENDED</p>
            <h2 className="text-[#ffffff] text-[24px] tracking-[-0.24px] font-normal mt-1">Top Job Matches</h2>

            <div className="mt-6">
              {jobMatches.map((j, i) => (
                <div key={i} className="py-4 border-b border-[#353535] last:border-0">
                  <div className="text-[#ffffff] text-[16px]">{j.title}</div>
                  <div className="text-[#797979] text-[13px]">{j.company}</div>
                  <div className="flex gap-2 mt-2">
                    {j.tags.map((t) => (
                      <span key={t} className="bg-[#0b0b0b] text-[#b9b9b9] text-[11px] rounded-full px-2 py-0.5">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="text-[#37cd84] text-[13px] mt-2">{j.comp}</div>
                </div>
              ))}
            </div>

            <a href="/talent/jobs" className="text-[#55beff] text-[13px] mt-4 inline-block hover:underline">
              Browse All Jobs →
            </a>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
