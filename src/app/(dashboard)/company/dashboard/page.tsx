"use client";

import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";
import { useUser } from "@/context/UserContext";

/* ── Demo data ── */
const DEMO_STATS = [
  { value: '12', label: 'Active Candidates' },
  { value: '3', label: 'Open Positions' },
  { value: '2', label: 'AI Agents' },
  { value: '34', label: 'Meetings This Month' },
];

const DEMO_PIPELINE_STAGES = [
  { label: 'Applied', count: 4, color: 'bg-[#353535]' },
  { label: 'Screening', count: 3, color: 'bg-[#797979]' },
  { label: 'Interviewing', count: 2, color: 'bg-[#55beff]' },
  { label: 'Offered', count: 1, color: 'bg-[#37cd84]' },
];

const DEMO_LATEST_CANDIDATES = [
  { name: 'Marcus Rivera', role: 'CLOSER', stage: 'Interviewing', stageColor: 'text-[#55beff]' },
  { name: 'Elena Kowalski', role: 'SETTER', stage: 'Screening', stageColor: 'text-[#797979]' },
  { name: 'Jason Patel', role: 'CLOSER', stage: 'Applied', stageColor: 'text-[#b9b9b9]' },
];

const DEMO_AGENTS = [
  {
    name: 'Aria — Cold Outbound',
    status: 'Active',
    statusColor: 'text-[#37cd84]',
    dotColor: 'bg-[#37cd84]',
    stats: ['142 leads contacted', '23 replies', '8 meetings booked'],
  },
  {
    name: 'Nova — Inbound Qualifier',
    status: 'Paused',
    statusColor: 'text-[#797979]',
    dotColor: 'bg-[#797979]',
    stats: ['89 leads qualified', '14 replies', '5 meetings booked'],
  },
];

export default function CompanyDashboardPage() {
  const { demoMode } = useUser();

  const stats = demoMode
    ? DEMO_STATS
    : DEMO_STATS.map((s) => ({ ...s, value: '0' }));

  const pipelineStages = demoMode
    ? DEMO_PIPELINE_STAGES
    : DEMO_PIPELINE_STAGES.map((s) => ({ ...s, count: 0 }));

  const totalPipeline = pipelineStages.reduce((sum, s) => sum + s.count, 0);

  const latestCandidates = demoMode ? DEMO_LATEST_CANDIDATES : [];
  const agents = demoMode ? DEMO_AGENTS : [];

  return (
    <div>
      <p className="font-mono text-[11px] text-[#797979] uppercase tracking-wider">Overview</p>
      <h1 className="text-[#ffffff] text-[38px] font-normal tracking-[-0.38px] mt-1">Dashboard</h1>

      {/* Stats Row */}
      <StaggerContainer staggerDelay={0.1} className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-8">
        {stats.map((stat) => (
          <StaggerItem key={stat.label}>
            <div
              className="bg-[#212121] rounded-[12px] p-6 border border-[#353535]"
            >
              <p className="text-[#ffffff] text-[36px] font-normal">{stat.value}</p>
              <p className="font-mono text-[11px] text-[#797979] uppercase tracking-wider mt-1">
                {stat.label}
              </p>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Two-column grid */}
      <FadeIn delay={0.3}>
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {/* Left: Hiring Pipeline Summary */}
          <div className="bg-[#212121] rounded-[12px] p-6 border border-[#353535]">
            <p className="font-mono text-[11px] text-[#797979] uppercase tracking-wider">Pipeline</p>
            <h2 className="text-[#ffffff] text-[24px] font-normal mt-1 mb-6">Active Pipeline</h2>

            {latestCandidates.length > 0 ? (
              <>
                {/* Pipeline bar */}
                <div className="flex rounded-full overflow-hidden h-3 mb-4">
                  {pipelineStages.map((stage) => (
                    <div
                      key={stage.label}
                      className={`${stage.color} transition-all`}
                      style={{ width: `${(stage.count / totalPipeline) * 100}%` }}
                    />
                  ))}
                </div>

                {/* Stage legend */}
                <div className="flex flex-wrap gap-4 mb-6">
                  {pipelineStages.map((stage) => (
                    <div key={stage.label} className="flex items-center gap-2">
                      <div className={`w-2.5 h-2.5 rounded-full ${stage.color}`} />
                      <span className="text-[#797979] text-[12px]">
                        {stage.label} ({stage.count})
                      </span>
                    </div>
                  ))}
                </div>

                {/* Latest candidates */}
                <div className="space-y-3">
                  {latestCandidates.map((c) => (
                    <div
                      key={c.name}
                      className="flex items-center justify-between bg-[#0b0b0b] rounded-[5px] p-3 border border-[#353535]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#353535] flex items-center justify-center text-[#ffffff] text-[12px] font-medium">
                          {c.name.split(' ').map((n) => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-[#ffffff] text-[14px]">{c.name}</p>
                          <p className="font-mono text-[10px] text-[#797979] uppercase">{c.role}</p>
                        </div>
                      </div>
                      <span className={`${c.stageColor} text-[13px]`}>{c.stage}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <span className="text-[32px] mb-3 opacity-30">📊</span>
                <p className="text-[#ffffff] text-[16px]">No candidates in your pipeline yet</p>
                <p className="text-[#797979] text-[14px] mt-1 max-w-xs">
                  Post a job or browse talent to start building your pipeline
                </p>
              </div>
            )}

            <a
              href="/company/pipeline"
              className="inline-block text-[#55beff] text-[14px] mt-5 hover:underline"
            >
              View Pipeline →
            </a>
          </div>

          {/* Right: AI Agent Performance */}
          <div className="bg-[#212121] rounded-[12px] p-6 border border-[#353535]">
            <p className="font-mono text-[11px] text-[#797979] uppercase tracking-wider">AI Agents</p>
            <h2 className="text-[#ffffff] text-[24px] font-normal mt-1 mb-6">Agent Activity</h2>

            {agents.length > 0 ? (
              <div className="space-y-4">
                {agents.map((agent) => (
                  <div key={agent.name} className="bg-[#0b0b0b] rounded-[5px] p-4 border border-[#353535]">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[#ffffff] text-[15px]">{agent.name}</p>
                      <div className="flex items-center gap-1.5">
                        <div className={`w-2 h-2 rounded-full ${agent.dotColor}`} />
                        <span className={`${agent.statusColor} text-[13px]`}>{agent.status}</span>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      {agent.stats.map((stat) => (
                        <span key={stat} className="text-[#b9b9b9] text-[13px]">{stat}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <span className="text-[32px] mb-3 opacity-30">🤖</span>
                <p className="text-[#ffffff] text-[16px]">No AI agents deployed yet</p>
                <p className="text-[#797979] text-[14px] mt-1 max-w-xs">
                  Deploy an AI agent to automate outreach and lead qualification
                </p>
              </div>
            )}

            <a
              href="/company/ai-agents"
              className="inline-block text-[#55beff] text-[14px] mt-5 hover:underline"
            >
              Manage Agents →
            </a>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
