"use client";

import Link from 'next/link';
import { useUser } from "@/context/UserContext";

/* ── Demo data ── */
const DEMO_JOBS = [
  {
    title: 'Enterprise SaaS Closer',
    roleType: 'Closer',
    industry: 'SaaS',
    posted: 'Posted 3 days ago',
    status: 'Active',
    statusColor: 'text-[#37cd84]',
    applications: 14,
  },
  {
    title: 'Cold Outbound Setter — Coaching',
    roleType: 'Setter',
    industry: 'Coaching',
    posted: 'Posted 1 week ago',
    status: 'Active',
    statusColor: 'text-[#37cd84]',
    applications: 9,
  },
  {
    title: 'Full-Cycle Rep — FinTech',
    roleType: 'Both',
    industry: 'FinTech',
    posted: 'Posted 2 weeks ago',
    status: 'Paused',
    statusColor: 'text-[#797979]',
    applications: 22,
  },
];

export default function JobsPage() {
  const { demoMode } = useUser();
  const jobs = demoMode ? DEMO_JOBS : [];

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-mono text-[11px] text-[#797979] uppercase tracking-wider">Manage</p>
          <h1 className="text-[#ffffff] text-[38px] font-normal tracking-[-0.38px] mt-1">
            Job Postings
          </h1>
        </div>
        <Link
          href="/company/jobs/new"
          className="bg-[#ffffff] text-[#0b0b0b] rounded-full px-6 h-[44px] text-[14px] font-medium hover:opacity-90 transition inline-flex items-center gap-2"
        >
          + New Job
        </Link>
      </div>

      {jobs.length > 0 ? (
        <div className="space-y-4 mt-8">
          {jobs.map((job) => (
            <div
              key={job.title}
              className="bg-[#212121] rounded-[12px] p-6 border border-[#353535]"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-[#ffffff] text-[18px] font-normal">{job.title}</h3>
                  <div className="flex gap-2 mt-2">
                    <span className="bg-[#0b0b0b] text-[#b9b9b9] text-[11px] font-mono rounded-full px-3 py-1 uppercase">
                      {job.roleType}
                    </span>
                    <span className="bg-[#0b0b0b] text-[#b9b9b9] text-[11px] font-mono rounded-full px-3 py-1 uppercase">
                      {job.industry}
                    </span>
                  </div>
                  <p className="text-[#797979] text-[13px] mt-2">{job.posted}</p>
                </div>

                <div className="text-right">
                  <span
                    className={`inline-flex items-center gap-1.5 bg-[#0b0b0b] rounded-full px-3 py-1 text-[13px] ${job.statusColor}`}
                  >
                    {job.status}
                  </span>
                  <p className="text-[#b9b9b9] text-[13px] mt-2">
                    {job.applications} applications
                  </p>
                </div>
              </div>

              <div className="flex gap-4 mt-4 pt-4 border-t border-[#353535]">
                <button className="text-[#55beff] text-[13px] hover:underline cursor-pointer">
                  Edit
                </button>
                <button className="text-[#55beff] text-[13px] hover:underline cursor-pointer">
                  {job.status === 'Active' ? 'Pause' : 'Resume'}
                </button>
                <button className="text-[#55beff] text-[13px] hover:underline cursor-pointer">
                  View Applicants
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center mt-8">
          <span className="text-[32px] mb-3 opacity-30">📋</span>
          <p className="text-[#ffffff] text-[16px]">No job postings yet</p>
          <p className="text-[#797979] text-[14px] mt-1 max-w-xs">
            Create your first job posting to start attracting top setters and closers
          </p>
          <Link
            href="/company/jobs/new"
            className="mt-4 bg-[#ffffff] text-[#0b0b0b] rounded-full px-6 h-[40px] text-[14px] font-medium hover:opacity-90 transition inline-flex items-center"
          >
            + Create Job
          </Link>
        </div>
      )}
    </div>
  );
}
