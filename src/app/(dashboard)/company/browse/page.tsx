'use client';

import { useState, useMemo } from 'react';
import { useUser } from "@/context/UserContext";

/* ── Types ── */
type RoleType = 'Setter' | 'Closer';
type CompType = 'Commission Only' | 'Per Meeting' | 'Base + Commission';

interface Talent {
  initials: string;
  name: string;
  role: RoleType;
  headline: string;
  trustScore: number;
  meetings: number;
  earnings: string;
  skills: string[];
  available: boolean;
  comp: CompType;
  verified: boolean;
}

/* ── Demo data ── */
const DEMO_TALENT: Talent[] = [
  {
    initials: 'MR',
    name: 'Marcus Rivera',
    role: 'Closer',
    headline: 'Enterprise SaaS closer with 8+ years helping B2B teams scale from $1M to $20M ARR.',
    trustScore: 97,
    meetings: 342,
    earnings: '$218K',
    skills: ['SaaS', 'Enterprise', 'SPIN Selling', 'HubSpot'],
    available: true,
    comp: 'Commission Only',
    verified: true,
  },
  {
    initials: 'EK',
    name: 'Elena Kowalski',
    role: 'Setter',
    headline: 'Cold outbound specialist. 45%+ connect rate on LinkedIn and email campaigns.',
    trustScore: 94,
    meetings: 512,
    earnings: '$89K',
    skills: ['Cold Email', 'LinkedIn', 'Coaching', 'Apollo'],
    available: true,
    comp: 'Per Meeting',
    verified: true,
  },
  {
    initials: 'JP',
    name: 'Jason Patel',
    role: 'Closer',
    headline: 'High-ticket coaching closer. Average deal size $8K. 38% close rate on qualified calls.',
    trustScore: 91,
    meetings: 287,
    earnings: '$312K',
    skills: ['Coaching', 'High-Ticket', 'Consultative'],
    available: false,
    comp: 'Commission Only',
    verified: true,
  },
  {
    initials: 'SA',
    name: 'Sarah Adeyemi',
    role: 'Setter',
    headline: 'FinTech appointment setter. Fluent in English and French. Strong pipeline builder.',
    trustScore: 88,
    meetings: 198,
    earnings: '$54K',
    skills: ['FinTech', 'Cold Calling', 'Bilingual', 'Salesforce'],
    available: true,
    comp: 'Base + Commission',
    verified: true,
  },
  {
    initials: 'DL',
    name: 'Derek Lawson',
    role: 'Closer',
    headline: 'Agency sales specialist. Built and closed $2M+ in annual recurring contracts.',
    trustScore: 95,
    meetings: 156,
    earnings: '$425K',
    skills: ['Agency', 'Contracts', 'Negotiation', 'Zoom'],
    available: true,
    comp: 'Commission Only',
    verified: true,
  },
  {
    initials: 'TN',
    name: 'Tanya Nguyen',
    role: 'Setter',
    headline: 'E-commerce and DTC setter. Expert at qualifying inbound leads and booking demos.',
    trustScore: 86,
    meetings: 421,
    earnings: '$67K',
    skills: ['E-Commerce', 'Inbound', 'Calendly', 'Slack'],
    available: false,
    comp: 'Per Meeting',
    verified: false,
  },
  {
    initials: 'AJ',
    name: 'Amara Johnson',
    role: 'Closer',
    headline: 'Full-cycle rep specializing in FinTech. $4.2M closed in the last 12 months.',
    trustScore: 96,
    meetings: 478,
    earnings: '$380K',
    skills: ['FinTech', 'MEDDIC', 'Salesforce', 'Enterprise'],
    available: true,
    comp: 'Base + Commission',
    verified: true,
  },
  {
    initials: 'KC',
    name: 'Kevin Chen',
    role: 'Setter',
    headline: 'SaaS appointment setter with deep product knowledge. 60+ meetings booked/month consistently.',
    trustScore: 93,
    meetings: 312,
    earnings: '$78K',
    skills: ['SaaS', 'Cold Calling', 'Apollo', 'Outreach'],
    available: true,
    comp: 'Per Meeting',
    verified: true,
  },
];

/* ── Sort Options ── */
type SortKey = 'trustScore' | 'meetings' | 'name';

export default function BrowseTalentPage() {
  const { demoMode } = useUser();
  const TALENT = demoMode ? DEMO_TALENT : [];

  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<RoleType | null>(null);
  const [compFilter, setCompFilter] = useState<CompType | null>(null);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortKey>('trustScore');

  const filtered = useMemo(() => {
    let results = TALENT.filter((t) => {
      // Search
      if (search) {
        const q = search.toLowerCase();
        const matches =
          t.name.toLowerCase().includes(q) ||
          t.headline.toLowerCase().includes(q) ||
          t.skills.some((s) => s.toLowerCase().includes(q)) ||
          t.role.toLowerCase().includes(q);
        if (!matches) return false;
      }
      // Role
      if (roleFilter && t.role !== roleFilter) return false;
      // Comp
      if (compFilter && t.comp !== compFilter) return false;
      // Available
      if (availableOnly && !t.available) return false;
      // Verified
      if (verifiedOnly && !t.verified) return false;
      return true;
    });

    // Sort
    results.sort((a, b) => {
      if (sortBy === 'trustScore') return b.trustScore - a.trustScore;
      if (sortBy === 'meetings') return b.meetings - a.meetings;
      return a.name.localeCompare(b.name);
    });

    return results;
  }, [TALENT, search, roleFilter, compFilter, availableOnly, verifiedOnly, sortBy]);

  const activeCount =
    (roleFilter ? 1 : 0) +
    (compFilter ? 1 : 0) +
    (availableOnly ? 1 : 0) +
    (verifiedOnly ? 1 : 0);

  const clearAll = () => {
    setRoleFilter(null);
    setCompFilter(null);
    setAvailableOnly(false);
    setVerifiedOnly(false);
    setSearch('');
  };

  return (
    <div>
      <p className="font-mono text-[11px] text-[#797979] uppercase tracking-wider">Marketplace</p>
      <h1 className="text-[#ffffff] text-[38px] font-normal tracking-[-0.38px] mt-1">
        Browse Talent
      </h1>

      {/* ── Search ── */}
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
          placeholder="Search by name, skill, niche, or keyword..."
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
          {(['Setter', 'Closer'] as RoleType[]).map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(roleFilter === r ? null : r)}
              className={`border rounded-full px-4 py-1.5 text-[13px] cursor-pointer transition flex items-center gap-1.5 ${
                roleFilter === r
                  ? 'border-[#f36458] text-[#ffffff] bg-[#212121]'
                  : 'border-[#353535] text-[#b9b9b9] bg-[#0b0b0b] hover:border-[#797979]'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  r === 'Setter' ? 'bg-[#55beff]' : 'bg-[#f36458]'
                }`}
              />
              {r}s
            </button>
          ))}
        </div>

        {/* Row 2: Comp + Toggles */}
        <div className="flex items-center gap-3 flex-wrap">
          <span className="font-mono text-[11px] text-[#797979] uppercase tracking-wider w-16 shrink-0">
            Pay
          </span>
          {(['Commission Only', 'Per Meeting', 'Base + Commission'] as CompType[]).map((c) => (
            <button
              key={c}
              onClick={() => setCompFilter(compFilter === c ? null : c)}
              className={`border rounded-full px-4 py-1.5 text-[13px] cursor-pointer transition ${
                compFilter === c
                  ? 'border-[#f36458] text-[#ffffff] bg-[#212121]'
                  : 'border-[#353535] text-[#b9b9b9] bg-[#0b0b0b] hover:border-[#797979]'
              }`}
            >
              {c}
            </button>
          ))}
          <div className="h-4 w-px bg-[#353535]" />
          <button
            onClick={() => setAvailableOnly(!availableOnly)}
            className={`border rounded-full px-4 py-1.5 text-[13px] cursor-pointer transition flex items-center gap-1.5 ${
              availableOnly
                ? 'border-[#37cd84] text-[#37cd84] bg-[#37cd84]/10'
                : 'border-[#353535] text-[#b9b9b9] bg-[#0b0b0b] hover:border-[#797979]'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                availableOnly ? 'bg-[#37cd84]' : 'bg-[#797979]'
              }`}
            />
            Available Now
          </button>
          <button
            onClick={() => setVerifiedOnly(!verifiedOnly)}
            className={`border rounded-full px-4 py-1.5 text-[13px] cursor-pointer transition flex items-center gap-1.5 ${
              verifiedOnly
                ? 'border-[#f36458] text-[#ffffff] bg-[#212121]'
                : 'border-[#353535] text-[#b9b9b9] bg-[#0b0b0b] hover:border-[#797979]'
            }`}
          >
            ✓ Verified
          </button>
        </div>
      </div>

      {/* ── Results Bar ── */}
      <div className="flex items-center justify-between mt-5">
        <div className="flex items-center gap-2">
          <span className="text-[#797979] text-[13px]">
            {filtered.length} rep{filtered.length !== 1 ? 's' : ''} found
          </span>
          {activeCount > 0 && (
            <>
              <span className="text-[#353535]">·</span>
              <button
                onClick={clearAll}
                className="text-[#f36458] text-[13px] hover:underline cursor-pointer"
              >
                Clear all
              </button>
            </>
          )}
        </div>
        {/* Sort */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] text-[#797979] uppercase tracking-wider">
            Sort
          </span>
          {([
            { key: 'trustScore' as SortKey, label: 'Trust Score' },
            { key: 'meetings' as SortKey, label: 'Meetings' },
            { key: 'name' as SortKey, label: 'Name' },
          ]).map((s) => (
            <button
              key={s.key}
              onClick={() => setSortBy(s.key)}
              className={`text-[13px] cursor-pointer transition px-2 py-0.5 rounded ${
                sortBy === s.key
                  ? 'text-[#ffffff] bg-[#353535]'
                  : 'text-[#797979] hover:text-[#b9b9b9]'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Talent Grid ── */}
      {TALENT.length > 0 ? (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {filtered.map((t) => (
              <div
                key={t.name}
                className="bg-[#212121] rounded-[12px] p-6 border border-[#353535] hover:border-[#797979] transition cursor-pointer hover:-translate-y-0.5 group"
              >
                {/* Top */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#353535] flex items-center justify-center text-[#ffffff] text-[15px] font-medium shrink-0">
                    {t.initials}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-[#ffffff] text-[16px] group-hover:text-[#f36458] transition-colors">
                        {t.name}
                      </p>
                      {t.verified && (
                        <span className="text-[#37cd84] text-[11px]" title="Verified">✓</span>
                      )}
                    </div>
                    <span
                      className={`text-[11px] font-mono uppercase rounded-full px-2 py-0.5 inline-block mt-0.5 ${
                        t.role === 'Setter'
                          ? 'bg-[#55beff]/10 text-[#55beff]'
                          : 'bg-[#f36458]/10 text-[#f36458]'
                      }`}
                    >
                      {t.role}
                    </span>
                  </div>
                </div>

                {/* Headline */}
                <p className="text-[#b9b9b9] text-[15px] mt-3 line-clamp-2">{t.headline}</p>

                {/* Stats row */}
                <div className="flex gap-4 mt-4">
                  <div>
                    <p className="text-[#ffffff] text-[16px] font-medium">{t.trustScore}</p>
                    <p className="font-mono text-[11px] text-[#797979]">Trust</p>
                  </div>
                  <div>
                    <p className="text-[#ffffff] text-[16px] font-medium">{t.meetings}</p>
                    <p className="font-mono text-[11px] text-[#797979]">Meetings</p>
                  </div>
                  <div>
                    <p className="text-[#ffffff] text-[16px] font-medium">{t.earnings}</p>
                    <p className="font-mono text-[11px] text-[#797979]">Earnings</p>
                  </div>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-1 mt-3">
                  {t.skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-[#0b0b0b] text-[#797979] text-[11px] rounded-full px-2 py-0.5"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Bottom */}
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-[#353535]">
                  <div className="flex items-center gap-1.5">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        t.available ? 'bg-[#37cd84]' : 'bg-[#797979]'
                      }`}
                    />
                    <span
                      className={`text-[13px] ${
                        t.available ? 'text-[#37cd84]' : 'text-[#797979]'
                      }`}
                    >
                      {t.available ? 'Available' : 'Busy'}
                    </span>
                  </div>
                  <span className="text-[#b9b9b9] text-[13px]">{t.comp}</span>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-[#797979] text-[18px]">No talent matches your filters</p>
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
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center mt-4">
          <span className="text-[32px] mb-3 opacity-30">👥</span>
          <p className="text-[#ffffff] text-[16px]">No talent profiles found</p>
          <p className="text-[#797979] text-[14px] mt-1 max-w-xs">
            Talent profiles will appear here once setters and closers join the platform
          </p>
        </div>
      )}
    </div>
  );
}
