"use client";

import Link from 'next/link';
import { useUser } from "@/context/UserContext";

/* ── Demo data ── */
const DEMO_AGENTS = [
  {
    name: 'Aria',
    template: 'COLD OUTBOUND',
    status: 'Active',
    statusColor: 'text-[#37cd84]',
    dotColor: 'bg-[#37cd84]',
    leadsContacted: 142,
    replies: 23,
    meetingsBooked: 8,
    mode: 'Human-in-the-loop',
  },
  {
    name: 'Nova',
    template: 'INBOUND QUALIFIER',
    status: 'Paused',
    statusColor: 'text-[#797979]',
    dotColor: 'bg-[#797979]',
    leadsContacted: 89,
    replies: 14,
    meetingsBooked: 5,
    mode: 'Fully autonomous',
  },
];

export default function AIAgentsPage() {
  const { demoMode } = useUser();
  const agents = demoMode ? DEMO_AGENTS : [];

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-mono text-[11px] text-[#797979] uppercase tracking-wider">AI Agents</p>
          <h1 className="text-[#ffffff] text-[38px] font-normal tracking-[-0.38px] mt-1">
            AI Sales Agents
          </h1>
        </div>
        <Link
          href="/company/ai-agents/new"
          className="bg-[#f36458] text-[#0b0b0b] rounded-full px-6 h-[44px] text-[14px] font-medium hover:opacity-90 transition inline-flex items-center gap-2"
        >
          + Deploy Agent
        </Link>
      </div>

      {agents.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {agents.map((agent) => (
            <div
              key={agent.name}
              className="bg-[#212121] rounded-[12px] p-6 border border-[#353535]"
            >
              {/* Top: Name + Status */}
              <div className="flex items-center justify-between">
                <h3 className="text-[#ffffff] text-[18px] font-normal">{agent.name}</h3>
                <div className="flex items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-full ${agent.dotColor}`} />
                  <span className={`${agent.statusColor} text-[13px]`}>{agent.status}</span>
                </div>
              </div>

              {/* Template */}
              <p className="font-mono text-[11px] text-[#797979] uppercase tracking-wider mt-1">
                {agent.template}
              </p>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div>
                  <p className="text-[#ffffff] text-[24px] font-normal">{agent.leadsContacted}</p>
                  <p className="font-mono text-[11px] text-[#797979] uppercase">Leads Contacted</p>
                </div>
                <div>
                  <p className="text-[#ffffff] text-[24px] font-normal">{agent.replies}</p>
                  <p className="font-mono text-[11px] text-[#797979] uppercase">Replies</p>
                </div>
                <div>
                  <p className="text-[#ffffff] text-[24px] font-normal">{agent.meetingsBooked}</p>
                  <p className="font-mono text-[11px] text-[#797979] uppercase">Meetings Booked</p>
                </div>
              </div>

              {/* Mode */}
              <p className="text-[#b9b9b9] text-[13px] mt-3">{agent.mode}</p>

              {/* Actions */}
              <div className="flex gap-4 mt-4 pt-4 border-t border-[#353535]">
                <button className="text-[#55beff] text-[13px] hover:underline cursor-pointer">
                  Configure
                </button>
                <button className="text-[#55beff] text-[13px] hover:underline cursor-pointer">
                  {agent.status === 'Active' ? 'Pause' : 'Resume'}
                </button>
                <button className="text-[#55beff] text-[13px] hover:underline cursor-pointer">
                  View Activity
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center mt-8">
          <span className="text-[32px] mb-3 opacity-30">🤖</span>
          <p className="text-[#ffffff] text-[16px]">No AI agents deployed yet</p>
          <p className="text-[#797979] text-[14px] mt-1 max-w-xs">
            Deploy your first AI sales agent to automate outreach and qualify leads
          </p>
        </div>
      )}
    </div>
  );
}
