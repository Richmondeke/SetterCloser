"use client";

import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";

export default function CompanyDashboardPage() {
  const stats = [
    { value: '12', label: 'Active Candidates' },
    { value: '3', label: 'Open Positions' },
    { value: '2', label: 'AI Agents' },
    { value: '34', label: 'Meetings This Month' },
  ];

  const pipelineStages = [
    { label: 'Applied', count: 4, color: 'bg-[#353535]' },
    { label: 'Screening', count: 3, color: 'bg-[#797979]' },
    { label: 'Interviewing', count: 2, color: 'bg-[#55beff]' },
    { label: 'Offered', count: 1, color: 'bg-[#37cd84]' },
  ];

  const totalPipeline = pipelineStages.reduce((sum, s) => sum + s.count, 0);

  const latestCandidates = [
    { name: 'Marcus Rivera', role: 'CLOSER', stage: 'Interviewing', stageColor: 'text-[#55beff]' },
    { name: 'Elena Kowalski', role: 'SETTER', stage: 'Screening', stageColor: 'text-[#797979]' },
    { name: 'Jason Patel', role: 'CLOSER', stage: 'Applied', stageColor: 'text-[#b9b9b9]' },
  ];

  return (
    <div>
      <p className="font-mono text-[11px] text-[#797979] uppercase tracking-wider">Overview</p>
      <h1 className="text-[#ffffff] text-[38px] font-normal tracking-[-0.38px] mt-1">Dashboard</h1>

      {/* Stats Row */}
      <StaggerContainer staggerDelay={0.1} className="grid grid-cols-4 gap-4 mt-8">
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

            <div className="space-y-4">
              {/* Agent 1 — Aria */}
              <div className="bg-[#0b0b0b] rounded-[5px] p-4 border border-[#353535]">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[#ffffff] text-[15px]">Aria — Cold Outbound</p>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#37cd84]" />
                    <span className="text-[#37cd84] text-[13px]">Active</span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="text-[#b9b9b9] text-[13px]">142 leads contacted</span>
                  <span className="text-[#b9b9b9] text-[13px]">23 replies</span>
                  <span className="text-[#b9b9b9] text-[13px]">8 meetings booked</span>
                </div>
              </div>

              {/* Agent 2 — Nova */}
              <div className="bg-[#0b0b0b] rounded-[5px] p-4 border border-[#353535]">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[#ffffff] text-[15px]">Nova — Inbound Qualifier</p>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#797979]" />
                    <span className="text-[#797979] text-[13px]">Paused</span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="text-[#b9b9b9] text-[13px]">89 leads qualified</span>
                  <span className="text-[#b9b9b9] text-[13px]">14 replies</span>
                  <span className="text-[#b9b9b9] text-[13px]">5 meetings booked</span>
                </div>
              </div>
            </div>

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
