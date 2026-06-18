"use client";

import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";
import { useUser } from "@/context/UserContext";

/* ── Mock data (only shown in demo mode) ── */
const DEMO_STATS = [
  { value: "47", label: "Meetings Booked" },
  { value: "$12,400", label: "Total Earnings" },
  { value: "8.7", label: "Trust Score" },
  { value: "3", label: "Active Applications" },
];

const DEMO_EARNINGS = [
  { type: "Meeting", company: "ScaleUp.io", amount: "+$150", status: "Verified" as const },
  { type: "Deal Closed", company: "RevOps Labs", amount: "+$2,400", status: "Verified" as const },
  { type: "Meeting", company: "CloseFast", amount: "+$150", status: "Pending" as const },
  { type: "Meeting", company: "DataFlow", amount: "+$150", status: "Verified" as const },
];

const DEMO_JOBS = [
  { title: "Senior Closer", company: "ScaleUp.io", tags: ["SaaS", "NEPQ", "Commission"], comp: "10-15% commission" },
  { title: "Outbound Setter", company: "GrowthForge", tags: ["Agency", "SPIN", "Remote"], comp: "$150/meeting" },
  { title: "Enterprise AE", company: "DataSync AI", tags: ["FinTech", "MEDDIC"], comp: "8-12% commission" },
];

const EMPTY_STATS = [
  { value: "0", label: "Meetings Booked" },
  { value: "$0", label: "Total Earnings" },
  { value: "—", label: "Trust Score" },
  { value: "0", label: "Active Applications" },
];

/* ── Empty State Component ── */
function EmptyState({ icon, title, desc, cta, href }: { icon: string; title: string; desc: string; cta?: string; href?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <span className="text-[32px] mb-3 opacity-30">{icon}</span>
      <p className="text-[#ffffff] text-[16px]">{title}</p>
      <p className="text-[#797979] text-[14px] mt-1 max-w-xs">{desc}</p>
      {cta && href && (
        <a href={href} className="mt-4 bg-[#f36458] text-[#ffffff] text-[13px] rounded-full px-5 py-2 hover:opacity-90 transition">
          {cta}
        </a>
      )}
    </div>
  );
}

export default function TalentDashboardPage() {
  const { demoMode } = useUser();

  const stats = demoMode ? DEMO_STATS : EMPTY_STATS;
  const recentEarnings = demoMode ? DEMO_EARNINGS : [];
  const jobMatches = demoMode ? DEMO_JOBS : [];

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

            {recentEarnings.length > 0 ? (
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
            ) : (
              <EmptyState
                icon="$"
                title="No earnings yet"
                desc="Your verified meetings and closed deals will appear here automatically."
                cta="Find Jobs"
                href="/talent/jobs"
              />
            )}

            <a href="/talent/earnings" className="text-[#55beff] text-[13px] mt-4 inline-block hover:underline">
              View All Earnings →
            </a>
          </div>

          {/* Right: Job Matches */}
          <div className="card-dark">
            <p className="mono-eyebrow">RECOMMENDED</p>
            <h2 className="text-[#ffffff] text-[24px] tracking-[-0.24px] font-normal mt-1">Top Job Matches</h2>

            {jobMatches.length > 0 ? (
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
            ) : (
              <EmptyState
                icon="◇"
                title="No matches yet"
                desc="Complete your profile to get personalized job recommendations."
                cta="Browse Jobs"
                href="/talent/jobs"
              />
            )}

            <a href="/talent/jobs" className="text-[#55beff] text-[13px] mt-4 inline-block hover:underline">
              Browse All Jobs →
            </a>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
