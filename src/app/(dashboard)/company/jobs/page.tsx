"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser } from "@/context/UserContext";

/* ── Types ── */
type Applicant = { name: string; matchPct: number; status: string };

type DemoJob = {
  title: string;
  roleType: string;
  industry: string;
  posted: string;
  status: 'Active' | 'Paused';
  statusColor: string;
  applications: number;
  description: string;
  compensation: string;
  dealSize: string;
  location: string;
  frameworks: string[];
  requirements: string[];
  applicants: Applicant[];
};

/* ── Demo data ── */
const DEMO_JOBS: DemoJob[] = [
  {
    title: 'Enterprise SaaS Closer',
    roleType: 'Closer',
    industry: 'SaaS',
    posted: 'Posted 3 days ago',
    status: 'Active',
    statusColor: 'text-[#37cd84]',
    applications: 14,
    description:
      'Close high-ticket SaaS deals for a fast-growing revenue operations platform. Ideal for experienced closers who thrive in consultative sales.',
    compensation: '10-15% commission',
    dealSize: '$5K-$50K deals',
    location: 'Remote · Worldwide',
    frameworks: ['SPIN Selling', 'MEDDIC', 'Challenger'],
    requirements: [
      '3+ years closing experience in SaaS',
      'Track record of $500K+ annual quota attainment',
      'Experience with enterprise sales cycles',
      'CRM proficiency (HubSpot/Salesforce)',
    ],
    applicants: [
      { name: 'Alex Rivera', matchPct: 94, status: 'Trial Scheduled' },
      { name: 'Maya Chen', matchPct: 87, status: 'Invited' },
      { name: 'Sam Okafor', matchPct: 85, status: 'New' },
    ],
  },
  {
    title: 'Cold Outbound Setter — Coaching',
    roleType: 'Setter',
    industry: 'Coaching',
    posted: 'Posted 1 week ago',
    status: 'Active',
    statusColor: 'text-[#37cd84]',
    applications: 9,
    description:
      'Book qualified discovery calls for a premium coaching program. Must be comfortable with cold outreach via DM, email, and phone.',
    compensation: '$150 per qualified meeting',
    dealSize: '$3K-$10K programs',
    location: 'Remote · US/Canada',
    frameworks: ['Consultative', 'NEPQ'],
    requirements: [
      '1+ year of outbound setting experience',
      'Strong written communication skills',
      'Experience with LinkedIn outreach',
      'Self-motivated and organized',
    ],
    applicants: [
      { name: 'Jordan Patel', matchPct: 91, status: 'Interested' },
      { name: 'Taylor Kim', matchPct: 78, status: 'New' },
    ],
  },
  {
    title: 'Full-Cycle Rep — FinTech',
    roleType: 'Both',
    industry: 'FinTech',
    posted: 'Posted 2 weeks ago',
    status: 'Paused',
    statusColor: 'text-[#797979]',
    applications: 22,
    description:
      'Run demos and close mid-market deals for a payments platform. Handle end-to-end from prospecting to contract signing.',
    compensation: '$3K base + 8% commission',
    dealSize: '$15K-$80K deals',
    location: 'New York, NY · Hybrid',
    frameworks: ['MEDDIC', 'Solution Selling'],
    requirements: [
      '2+ years B2B sales experience',
      'FinTech or payments industry knowledge',
      'Strong demo and presentation skills',
      'Comfortable with hybrid work schedule',
    ],
    applicants: [
      { name: 'Chris Larson', matchPct: 82, status: 'Applied' },
      { name: 'Dana West', matchPct: 79, status: 'Applied' },
      { name: 'Blake Monroe', matchPct: 76, status: 'New' },
    ],
  },
];

/* ── Applicant status badge color helper ── */
function applicantStatusColor(status: string): string {
  switch (status) {
    case 'Trial Scheduled':
      return 'text-[#37cd84] bg-[#37cd84]/10';
    case 'Invited':
    case 'Interested':
      return 'text-[#55beff] bg-[#55beff]/10';
    case 'Applied':
      return 'text-[#c084fc] bg-[#c084fc]/10';
    case 'New':
    default:
      return 'text-[#797979] bg-[#797979]/10';
  }
}

export default function JobsPage() {
  const router = useRouter();
  const { demoMode } = useUser();
  const initialJobs = demoMode ? DEMO_JOBS : [];

  // Local status state for toggling Pause/Resume
  const [jobStatuses, setJobStatuses] = useState<Record<string, 'Active' | 'Paused'>>(() => {
    const map: Record<string, 'Active' | 'Paused'> = {};
    initialJobs.forEach((job) => {
      map[job.title] = job.status;
    });
    return map;
  });

  // Selected job for slide-out panel
  const [selectedJob, setSelectedJob] = useState<DemoJob | null>(null);

  const toggleStatus = (title: string) => {
    setJobStatuses((prev) => ({
      ...prev,
      [title]: prev[title] === 'Active' ? 'Paused' : 'Active',
    }));
  };

  const jobs = initialJobs.map((job) => ({
    ...job,
    status: jobStatuses[job.title] || job.status,
    statusColor: (jobStatuses[job.title] || job.status) === 'Active' ? 'text-[#37cd84]' : 'text-[#797979]',
  }));

  // Keep selected job status in sync
  const resolvedSelectedJob = selectedJob
    ? {
        ...selectedJob,
        status: (jobStatuses[selectedJob.title] || selectedJob.status) as 'Active' | 'Paused',
        statusColor:
          (jobStatuses[selectedJob.title] || selectedJob.status) === 'Active'
            ? 'text-[#37cd84]'
            : 'text-[#797979]',
      }
    : null;

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
              onClick={() => setSelectedJob(job)}
              className="bg-[#212121] rounded-[12px] p-6 border border-[#353535] cursor-pointer hover:border-[#555555] transition-colors"
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
                <button
                  onClick={(e) => { e.stopPropagation(); router.push('/company/jobs/new'); }}
                  className="text-[#55beff] text-[13px] hover:underline cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); toggleStatus(job.title); }}
                  className="text-[#55beff] text-[13px] hover:underline cursor-pointer"
                >
                  {job.status === 'Active' ? 'Pause' : 'Resume'}
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); router.push('/company/pipeline'); }}
                  className="text-[#55beff] text-[13px] hover:underline cursor-pointer"
                >
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

      {/* ── Slide-out detail panel ── */}
      {resolvedSelectedJob && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40 transition-opacity"
            onClick={() => setSelectedJob(null)}
          />

          {/* Panel */}
          <div className="fixed right-0 top-0 h-full w-full max-w-[520px] bg-[#212121] border-l border-[#353535] z-50 flex flex-col animate-in slide-in-from-right duration-300 overflow-hidden">
            {/* ── Header (sticky) ── */}
            <div className="sticky top-0 bg-[#212121] border-b border-[#353535] px-6 py-4 flex items-center justify-between z-10">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[13px] font-medium ${
                  resolvedSelectedJob.status === 'Active'
                    ? 'text-[#37cd84] bg-[#37cd84]/10'
                    : 'text-[#797979] bg-[#797979]/10'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    resolvedSelectedJob.status === 'Active' ? 'bg-[#37cd84]' : 'bg-[#797979]'
                  }`}
                />
                {resolvedSelectedJob.status}
              </span>
              <button
                onClick={() => setSelectedJob(null)}
                className="text-[#797979] hover:text-[#ffffff] text-[20px] transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* ── Scrollable content ── */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
              {/* Title & posted */}
              <div>
                <h2 className="text-[#ffffff] text-[24px] font-normal tracking-[-0.24px]">
                  {resolvedSelectedJob.title}
                </h2>
                <p className="text-[#797979] text-[13px] mt-1">{resolvedSelectedJob.posted}</p>
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Role Type', value: resolvedSelectedJob.roleType },
                  { label: 'Industry', value: resolvedSelectedJob.industry },
                  { label: 'Compensation', value: resolvedSelectedJob.compensation },
                  { label: 'Deal Size', value: resolvedSelectedJob.dealSize },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-[#0b0b0b] rounded-[10px] p-3 border border-[#353535]"
                  >
                    <p className="font-mono text-[11px] text-[#797979] uppercase tracking-wider">
                      {item.label}
                    </p>
                    <p className="text-[#ffffff] text-[14px] mt-1">{item.value}</p>
                  </div>
                ))}
              </div>

              {/* Location */}
              <div className="bg-[#0b0b0b] rounded-[10px] p-3 border border-[#353535]">
                <p className="font-mono text-[11px] text-[#797979] uppercase tracking-wider">
                  Location
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-[#ffffff] text-[14px]">{resolvedSelectedJob.location}</p>
                  {resolvedSelectedJob.location.toLowerCase().includes('remote') && (
                    <span className="bg-[#55beff]/10 text-[#55beff] text-[10px] font-mono rounded-full px-2 py-0.5 uppercase">
                      Remote
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <p className="font-mono text-[11px] text-[#797979] uppercase tracking-wider mb-2">
                  Description
                </p>
                <p className="text-[#b9b9b9] text-[14px] leading-relaxed">
                  {resolvedSelectedJob.description}
                </p>
              </div>

              {/* Frameworks */}
              <div>
                <p className="font-mono text-[11px] text-[#797979] uppercase tracking-wider mb-2">
                  Required Frameworks
                </p>
                <div className="flex flex-wrap gap-2">
                  {resolvedSelectedJob.frameworks.map((fw) => (
                    <span
                      key={fw}
                      className="bg-[#0b0b0b] text-[#b9b9b9] text-[12px] font-mono rounded-full px-3 py-1 border border-[#353535]"
                    >
                      {fw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div>
                <p className="font-mono text-[11px] text-[#797979] uppercase tracking-wider mb-2">
                  Requirements
                </p>
                <ul className="space-y-1.5">
                  {resolvedSelectedJob.requirements.map((req) => (
                    <li key={req} className="flex items-start gap-2 text-[#b9b9b9] text-[14px]">
                      <span className="text-[#55beff] mt-1.5 text-[8px]">●</span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Top Applicants */}
              <div>
                <p className="font-mono text-[11px] text-[#797979] uppercase tracking-wider mb-2">
                  Top Applicants
                </p>
                <div className="space-y-2">
                  {resolvedSelectedJob.applicants.map((app) => (
                    <div
                      key={app.name}
                      className="bg-[#0b0b0b] rounded-[10px] p-3 border border-[#353535] flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        {/* Avatar circle */}
                        <div className="w-8 h-8 rounded-full bg-[#353535] flex items-center justify-center text-[#b9b9b9] text-[12px] font-medium">
                          {app.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </div>
                        <div>
                          <p className="text-[#ffffff] text-[14px]">{app.name}</p>
                          <span
                            className={`inline-block text-[11px] font-mono rounded-full px-2 py-0.5 mt-0.5 ${applicantStatusColor(
                              app.status
                            )}`}
                          >
                            {app.status}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[#37cd84] text-[16px] font-medium">{app.matchPct}%</p>
                        <p className="font-mono text-[10px] text-[#797979] uppercase">Match</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Actions (sticky bottom) ── */}
            <div className="border-t border-[#353535] px-6 py-4 flex gap-3 bg-[#212121]">
              <button
                onClick={() => { setSelectedJob(null); router.push('/company/jobs/new'); }}
                className="flex-1 bg-[#ffffff] text-[#0b0b0b] rounded-full h-[40px] text-[14px] font-medium hover:opacity-90 transition cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  toggleStatus(resolvedSelectedJob.title);
                }}
                className={`flex-1 rounded-full h-[40px] text-[14px] font-medium transition cursor-pointer border ${
                  resolvedSelectedJob.status === 'Active'
                    ? 'border-[#797979] text-[#b9b9b9] hover:bg-[#353535]'
                    : 'border-[#37cd84] text-[#37cd84] hover:bg-[#37cd84]/10'
                }`}
              >
                {resolvedSelectedJob.status === 'Active' ? 'Pause' : 'Resume'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
