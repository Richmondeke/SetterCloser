'use client';

import { useState } from 'react';

const FILTERS = ['All Roles', 'Setters', 'Closers', 'SaaS', 'Coaching', 'Available Now', 'Verified'];

const TALENT = [
  {
    initials: 'MR',
    name: 'Marcus Rivera',
    role: 'CLOSER',
    headline: 'Enterprise SaaS closer with 8+ years helping B2B teams scale from $1M to $20M ARR.',
    trustScore: 97,
    meetings: 342,
    earnings: '$218K',
    skills: ['SaaS', 'Enterprise', 'SPIN Selling', 'HubSpot'],
    available: true,
    comp: 'Commission Only',
  },
  {
    initials: 'EK',
    name: 'Elena Kowalski',
    role: 'SETTER',
    headline: 'Cold outbound specialist. 45%+ connect rate on LinkedIn and email campaigns.',
    trustScore: 94,
    meetings: 512,
    earnings: '$89K',
    skills: ['Cold Email', 'LinkedIn', 'Coaching', 'Apollo'],
    available: true,
    comp: 'Per Meeting',
  },
  {
    initials: 'JP',
    name: 'Jason Patel',
    role: 'CLOSER',
    headline: 'High-ticket coaching closer. Average deal size $8K. 38% close rate on qualified calls.',
    trustScore: 91,
    meetings: 287,
    earnings: '$312K',
    skills: ['Coaching', 'High-Ticket', 'Consultative'],
    available: false,
    comp: 'Commission Only',
  },
  {
    initials: 'SA',
    name: 'Sarah Adeyemi',
    role: 'SETTER',
    headline: 'FinTech appointment setter. Fluent in English and French. Strong pipeline builder.',
    trustScore: 88,
    meetings: 198,
    earnings: '$54K',
    skills: ['FinTech', 'Cold Calling', 'Bilingual', 'Salesforce'],
    available: true,
    comp: 'Base + Commission',
  },
  {
    initials: 'DL',
    name: 'Derek Lawson',
    role: 'CLOSER',
    headline: 'Agency sales specialist. Built and closed $2M+ in annual recurring contracts.',
    trustScore: 95,
    meetings: 156,
    earnings: '$425K',
    skills: ['Agency', 'Contracts', 'Negotiation', 'Zoom'],
    available: true,
    comp: 'Commission Only',
  },
  {
    initials: 'TN',
    name: 'Tanya Nguyen',
    role: 'SETTER',
    headline: 'E-commerce and DTC setter. Expert at qualifying inbound leads and booking demos.',
    trustScore: 86,
    meetings: 421,
    earnings: '$67K',
    skills: ['E-Commerce', 'Inbound', 'Calendly', 'Slack'],
    available: false,
    comp: 'Per Meeting',
  },
];

export default function BrowseTalentPage() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All Roles');

  return (
    <div>
      <p className="font-mono text-[11px] text-[#797979] uppercase tracking-wider">Marketplace</p>
      <h1 className="text-[#ffffff] text-[38px] font-normal tracking-[-0.38px] mt-1">
        Browse Talent
      </h1>

      {/* Search */}
      <div className="mt-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search setters & closers..."
          className="w-full bg-[#212121] border border-[#353535] rounded-[3px] h-[44px] text-[#b9b9b9] px-4 focus:border-[#f36458] focus:outline-none transition"
        />
      </div>

      {/* Filter pills */}
      <div className="flex gap-3 flex-wrap mt-4">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`rounded-full px-4 py-2 text-[13px] border transition cursor-pointer ${
              activeFilter === filter
                ? 'border-[#f36458] text-[#ffffff] bg-[#212121]'
                : 'border-[#353535] text-[#b9b9b9] bg-[#212121]'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Talent Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {TALENT.map((t) => (
          <div
            key={t.name}
            className="bg-[#212121] rounded-[12px] p-6 border border-[#353535] hover:border-[#797979] transition cursor-pointer hover:-translate-y-0.5"
          >
            {/* Top */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#353535] flex items-center justify-center text-[#ffffff] text-[15px] font-medium shrink-0">
                {t.initials}
              </div>
              <div className="min-w-0">
                <p className="text-[#ffffff] text-[16px]">{t.name}</p>
                <span className="bg-[#0b0b0b] text-[#b9b9b9] text-[11px] font-mono rounded-full px-2 py-0.5 uppercase inline-block mt-0.5">
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
    </div>
  );
}
