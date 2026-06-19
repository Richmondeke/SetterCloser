"use client";

import { useUser } from "@/context/UserContext";

/* ── Demo data ── */
const DEMO_PIPELINE_COLUMNS = [
  {
    stage: 'Applied',
    candidates: [
      { name: 'Jason Patel', initials: 'JP', role: 'CLOSER', job: 'Enterprise SaaS Closer', trust: 91, meetings: 287 },
      { name: 'Tanya Nguyen', initials: 'TN', role: 'SETTER', job: 'Cold Outbound Setter — Coaching', trust: 86, meetings: 421 },
      { name: 'Ryan O\'Brien', initials: 'RO', role: 'CLOSER', job: 'Full-Cycle Rep — FinTech', trust: 82, meetings: 156 },
      { name: 'Priya Sharma', initials: 'PS', role: 'SETTER', job: 'Cold Outbound Setter — Coaching', trust: 79, meetings: 98 },
    ],
  },
  {
    stage: 'Screening',
    candidates: [
      { name: 'Sarah Adeyemi', initials: 'SA', role: 'SETTER', job: 'Cold Outbound Setter — Coaching', trust: 88, meetings: 198 },
      { name: 'Kevin Chen', initials: 'KC', role: 'CLOSER', job: 'Enterprise SaaS Closer', trust: 93, meetings: 312 },
      { name: 'Laura Diaz', initials: 'LD', role: 'SETTER', job: 'Full-Cycle Rep — FinTech', trust: 85, meetings: 245 },
    ],
  },
  {
    stage: 'Interview',
    candidates: [
      { name: 'Marcus Rivera', initials: 'MR', role: 'CLOSER', job: 'Enterprise SaaS Closer', trust: 97, meetings: 342 },
      { name: 'Elena Kowalski', initials: 'EK', role: 'SETTER', job: 'Cold Outbound Setter — Coaching', trust: 94, meetings: 512 },
    ],
  },
  {
    stage: 'Offered',
    candidates: [
      { name: 'Derek Lawson', initials: 'DL', role: 'CLOSER', job: 'Enterprise SaaS Closer', trust: 95, meetings: 156 },
    ],
  },
  {
    stage: 'Hired',
    candidates: [
      { name: 'Amara Johnson', initials: 'AJ', role: 'CLOSER', job: 'Full-Cycle Rep — FinTech', trust: 96, meetings: 478 },
    ],
  },
];

const EMPTY_PIPELINE_COLUMNS = DEMO_PIPELINE_COLUMNS.map((col) => ({
  ...col,
  candidates: [],
}));

export default function PipelinePage() {
  const { demoMode } = useUser();
  const columns = demoMode ? DEMO_PIPELINE_COLUMNS : EMPTY_PIPELINE_COLUMNS;

  return (
    <div>
      <p className="font-mono text-[11px] text-[#797979] uppercase tracking-wider">Pipeline</p>
      <h1 className="text-[#ffffff] text-[28px] md:text-[38px] font-normal tracking-[-0.28px] md:tracking-[-0.38px] mt-1">
        Hiring Pipeline
      </h1>

      {/* Kanban Board */}
      <div className="flex gap-6 mt-8 overflow-x-auto pb-4">
        {columns.map((col) => (
          <div
            key={col.stage}
            className="bg-[#212121] rounded-[12px] p-4 border border-[#353535] min-w-[280px] min-h-[400px] shrink-0"
          >
            {/* Column header */}
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-[11px] text-[#797979] uppercase tracking-wider">
                {col.stage}
              </span>
              <span className="bg-[#0b0b0b] text-[#b9b9b9] text-[11px] font-mono rounded-full px-2 py-0.5">
                {col.candidates.length}
              </span>
            </div>

            {/* Candidate cards */}
            <div className="space-y-3">
              {col.candidates.length > 0 ? (
                col.candidates.map((c) => (
                  <div
                    key={c.name}
                    className="bg-[#0b0b0b] rounded-[5px] p-4 border border-[#353535] cursor-pointer hover:border-[#797979] transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#353535] flex items-center justify-center text-[#ffffff] text-[12px] font-medium shrink-0">
                        {c.initials}
                      </div>
                      <div className="min-w-0">
                        <p className="text-[#ffffff] text-[14px] truncate">{c.name}</p>
                        <span className="bg-[#212121] text-[#b9b9b9] text-[10px] font-mono rounded-full px-2 py-0.5 uppercase inline-block mt-0.5">
                          {c.role}
                        </span>
                      </div>
                    </div>

                    <p className="text-[#797979] text-[13px] mt-2 truncate">{c.job}</p>

                    <div className="flex gap-4 mt-3">
                      <div>
                        <span className="text-[#ffffff] text-[14px] font-medium">{c.trust}</span>
                        <span className="font-mono text-[10px] text-[#797979] ml-1">Trust</span>
                      </div>
                      <div>
                        <span className="text-[#ffffff] text-[14px] font-medium">{c.meetings}</span>
                        <span className="font-mono text-[10px] text-[#797979] ml-1">Meetings</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <span className="text-[32px] mb-3 opacity-30">👤</span>
                  <p className="text-[#ffffff] text-[16px]">No candidates</p>
                  <p className="text-[#797979] text-[14px] mt-1 max-w-xs">
                    Candidates will appear here as they move through your pipeline
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
