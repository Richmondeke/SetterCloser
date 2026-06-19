'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const ROLE_TYPES = ['Setter', 'Closer', 'Both'];
const COMP_TYPES = ['Commission Only', 'Base + Commission', 'Per Meeting', 'Salary'];

const INDUSTRIES_OPTIONS = [
  // Tech & Software
  'SaaS', 'FinTech', 'AI / ML', 'Cybersecurity', 'Cloud / DevOps', 'MarTech', 'EdTech', 'HealthTech',
  // Business Services
  'Agency', 'Consulting', 'Coaching', 'Recruiting / Staffing', 'Legal', 'Accounting',
  // Commerce
  'E-Commerce', 'Retail', 'Wholesale / Distribution', 'Marketplace',
  // Finance & Insurance
  'Insurance', 'Financial Services', 'Wealth Management', 'Lending / Mortgage',
  // Healthcare & Wellness
  'Healthcare', 'Pharma / Biotech', 'Wellness / Fitness', 'Mental Health',
  // Real Estate & Construction
  'Real Estate', 'PropTech', 'Construction', 'Architecture',
  // Media & Creative
  'Media / Entertainment', 'Advertising', 'Events', 'Gaming',
  // Energy & Environment
  'Energy / Utilities', 'Solar / Renewables', 'CleanTech',
  // Manufacturing & Logistics
  'Manufacturing', 'Logistics / Supply Chain', 'Automotive',
  // Nonprofit & Government
  'Nonprofit', 'Government / Public Sector', 'Education',
  // Telecom & Hardware
  'Telecom', 'Hardware / IoT',
  // Other
  'Crypto / Web3', 'Food & Beverage', 'Travel / Hospitality', 'Sports', 'Agriculture',
];

const FRAMEWORKS = ['SPIN Selling', 'Sandler', 'Challenger', 'MEDDIC', 'Solution Selling', 'Consultative', 'BANT', 'Gap Selling', 'Command of the Sale', 'Value Selling', 'Miller Heiman', 'Conceptual Selling'];

const COMMISSION_PERCENTAGES = [5, 8, 10, 12, 15, 18, 20, 25, 30, 35, 40, 50];

export default function NewJobPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [roleType, setRoleType] = useState('');
  const [compType, setCompType] = useState('');

  // Compensation fields
  const [commissionPct, setCommissionPct] = useState(10);
  const [customPct, setCustomPct] = useState('');
  const [useCustomPct, setUseCustomPct] = useState(false);
  const [salaryMin, setSalaryMin] = useState('');
  const [salaryMax, setSalaryMax] = useState('');
  const [salaryPeriod, setSalaryPeriod] = useState<'month' | 'year'>('year');
  const [perMeetingRate, setPerMeetingRate] = useState('');
  const [baseSalary, setBaseSalary] = useState('');
  const [dealSizeMin, setDealSizeMin] = useState('');
  const [dealSizeMax, setDealSizeMax] = useState('');

  const [industries, setIndustries] = useState<string[]>([]);
  const [customIndustry, setCustomIndustry] = useState('');
  const [industrySearch, setIndustrySearch] = useState('');
  const [frameworks, setFrameworks] = useState<string[]>([]);
  const [location, setLocation] = useState('');
  const [remote, setRemote] = useState(true);

  const toggleItem = (
    item: string,
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setList((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const addCustomIndustry = () => {
    const trimmed = customIndustry.trim();
    if (trimmed && !industries.includes(trimmed)) {
      setIndustries((prev) => [...prev, trimmed]);
      setCustomIndustry('');
    }
  };

  const filteredIndustries = industrySearch
    ? INDUSTRIES_OPTIONS.filter((ind) =>
        ind.toLowerCase().includes(industrySearch.toLowerCase())
      )
    : INDUSTRIES_OPTIONS;

  const effectivePct = useCustomPct ? Number(customPct) || 0 : commissionPct;

  const getCompSummary = () => {
    switch (compType) {
      case 'Commission Only':
        return `${effectivePct}% commission per deal`;
      case 'Base + Commission':
        return `$${baseSalary || '0'}/mo base + ${effectivePct}% commission`;
      case 'Per Meeting':
        return `$${perMeetingRate || '0'} per qualified meeting`;
      case 'Salary':
        return salaryMin && salaryMax
          ? `$${salaryMin} – $${salaryMax}/${salaryPeriod === 'year' ? 'yr' : 'mo'}`
          : '';
      default:
        return '';
    }
  };

  return (
    <div>
      <p className="font-mono text-[11px] text-[#797979] uppercase tracking-wider">Create</p>
      <h1 className="text-[#ffffff] text-[28px] md:text-[38px] font-normal tracking-[-0.28px] md:tracking-[-0.38px] mt-1">
        Post a New Job
      </h1>

      <div className="bg-[#212121] rounded-[12px] p-5 md:p-8 border border-[#353535] max-w-3xl mt-8">
        <div className="space-y-6">
          {/* Job Title */}
          <div>
            <label className="block font-mono text-[11px] text-[#797979] uppercase tracking-wider mb-2">
              Job Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#0b0b0b] border border-[#353535] rounded-[3px] h-[44px] text-[#b9b9b9] px-3 focus:border-[#f36458] focus:outline-none transition"
              placeholder="e.g., Enterprise SaaS Closer"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-mono text-[11px] text-[#797979] uppercase tracking-wider mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#0b0b0b] border border-[#353535] rounded-[3px] text-[#b9b9b9] px-3 py-3 focus:border-[#f36458] focus:outline-none transition min-h-[120px] resize-none"
              placeholder="Describe the role, expectations, and what makes this opportunity great..."
            />
          </div>

          {/* Role Type */}
          <div>
            <label className="block font-mono text-[11px] text-[#797979] uppercase tracking-wider mb-2">
              Role Type
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {ROLE_TYPES.map((role) => (
                <button
                  key={role}
                  onClick={() => setRoleType(role)}
                  className={`bg-[#0b0b0b] border rounded-[5px] p-4 cursor-pointer text-center transition ${
                    roleType === role
                      ? 'border-[#f36458] text-[#ffffff]'
                      : 'border-[#353535] text-[#b9b9b9]'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          {/* ═══ Compensation Type ═══ */}
          <div>
            <label className="block font-mono text-[11px] text-[#797979] uppercase tracking-wider mb-2">
              Compensation Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              {COMP_TYPES.map((comp) => (
                <button
                  key={comp}
                  onClick={() => setCompType(comp)}
                  className={`bg-[#0b0b0b] border rounded-[5px] p-4 cursor-pointer text-center transition ${
                    compType === comp
                      ? 'border-[#f36458] text-[#ffffff]'
                      : 'border-[#353535] text-[#b9b9b9]'
                  }`}
                >
                  {comp}
                </button>
              ))}
            </div>
          </div>

          {/* ═══ Dynamic Compensation Details ═══ */}
          {compType && (
            <div className="bg-[#0b0b0b] rounded-[8px] p-5 border border-[#353535] space-y-4">
              <p className="font-mono text-[11px] text-[#797979] uppercase tracking-wider">
                {compType === 'Commission Only' && 'Commission Percentage'}
                {compType === 'Base + Commission' && 'Base Salary + Commission'}
                {compType === 'Per Meeting' && 'Per Meeting Rate'}
                {compType === 'Salary' && 'Salary Range'}
              </p>

              {/* ── Commission Only ── */}
              {compType === 'Commission Only' && (
                <div className="space-y-4">
                  {!useCustomPct ? (
                    <>
                      <div className="flex flex-wrap gap-2">
                        {COMMISSION_PERCENTAGES.map((pct) => (
                          <button
                            key={pct}
                            onClick={() => setCommissionPct(pct)}
                            className={`rounded-full px-4 py-2 text-[13px] border transition cursor-pointer min-w-[56px] ${
                              commissionPct === pct
                                ? 'border-[#f36458] text-[#ffffff] bg-[#f36458]/10'
                                : 'border-[#353535] text-[#b9b9b9]'
                            }`}
                          >
                            {pct}%
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={() => setUseCustomPct(true)}
                        className="text-[#55beff] text-[13px] cursor-pointer hover:underline"
                      >
                        Enter custom percentage
                      </button>
                    </>
                  ) : (
                    <div className="flex items-center gap-3">
                      <div className="relative flex-1 max-w-[160px]">
                        <input
                          type="number"
                          min="1"
                          max="100"
                          value={customPct}
                          onChange={(e) => setCustomPct(e.target.value)}
                          className="w-full bg-[#212121] border border-[#353535] rounded-[3px] h-[44px] text-[#ffffff] px-3 pr-8 focus:border-[#f36458] focus:outline-none transition text-[18px]"
                          placeholder="15"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#797979] text-[16px]">%</span>
                      </div>
                      <span className="text-[#797979] text-[13px]">commission per deal</span>
                      <button
                        onClick={() => { setUseCustomPct(false); setCustomPct(''); }}
                        className="text-[#797979] text-[13px] cursor-pointer hover:text-[#ffffff]"
                      >
                        ← presets
                      </button>
                    </div>
                  )}

                  {/* Deal Size Range */}
                  <div>
                    <p className="font-mono text-[11px] text-[#797979] uppercase tracking-wider mb-2">
                      Average Deal Size (optional)
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#797979]">$</span>
                        <input
                          type="text"
                          value={dealSizeMin}
                          onChange={(e) => setDealSizeMin(e.target.value.replace(/[^0-9]/g, ''))}
                          className="w-full bg-[#212121] border border-[#353535] rounded-[3px] h-[40px] text-[#b9b9b9] pl-7 pr-3 focus:border-[#f36458] focus:outline-none transition text-[14px]"
                          placeholder="5,000"
                        />
                      </div>
                      <span className="text-[#797979] text-[13px]">to</span>
                      <div className="relative flex-1">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#797979]">$</span>
                        <input
                          type="text"
                          value={dealSizeMax}
                          onChange={(e) => setDealSizeMax(e.target.value.replace(/[^0-9]/g, ''))}
                          className="w-full bg-[#212121] border border-[#353535] rounded-[3px] h-[40px] text-[#b9b9b9] pl-7 pr-3 focus:border-[#f36458] focus:outline-none transition text-[14px]"
                          placeholder="50,000"
                        />
                      </div>
                    </div>
                    {dealSizeMin && effectivePct > 0 && (
                      <p className="text-[#37cd84] text-[12px] mt-2">
                        💰 Est. earnings per deal: ${Math.round(Number(dealSizeMin) * effectivePct / 100).toLocaleString()}
                        {dealSizeMax ? ` – $${Math.round(Number(dealSizeMax) * effectivePct / 100).toLocaleString()}` : ''}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* ── Base + Commission ── */}
              {compType === 'Base + Commission' && (
                <div className="space-y-4">
                  <div>
                    <p className="text-[#b9b9b9] text-[13px] mb-2">Base Salary</p>
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#797979]">$</span>
                        <input
                          type="text"
                          value={baseSalary}
                          onChange={(e) => setBaseSalary(e.target.value.replace(/[^0-9]/g, ''))}
                          className="w-full bg-[#212121] border border-[#353535] rounded-[3px] h-[44px] text-[#ffffff] pl-7 pr-3 focus:border-[#f36458] focus:outline-none transition"
                          placeholder="3,000"
                        />
                      </div>
                      <span className="text-[#797979] text-[13px]">/ month</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-[#b9b9b9] text-[13px] mb-2">Commission Percentage</p>
                    <div className="flex flex-wrap gap-2">
                      {[5, 8, 10, 12, 15, 20, 25, 30].map((pct) => (
                        <button
                          key={pct}
                          onClick={() => { setCommissionPct(pct); setUseCustomPct(false); }}
                          className={`rounded-full px-3 py-1.5 text-[13px] border transition cursor-pointer ${
                            !useCustomPct && commissionPct === pct
                              ? 'border-[#f36458] text-[#ffffff] bg-[#f36458]/10'
                              : 'border-[#353535] text-[#b9b9b9]'
                          }`}
                        >
                          {pct}%
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── Per Meeting ── */}
              {compType === 'Per Meeting' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1 max-w-[200px]">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#797979]">$</span>
                      <input
                        type="text"
                        value={perMeetingRate}
                        onChange={(e) => setPerMeetingRate(e.target.value.replace(/[^0-9]/g, ''))}
                        className="w-full bg-[#212121] border border-[#353535] rounded-[3px] h-[44px] text-[#ffffff] pl-7 pr-3 focus:border-[#f36458] focus:outline-none transition text-[18px]"
                        placeholder="150"
                      />
                    </div>
                    <span className="text-[#797979] text-[14px]">per qualified meeting booked</span>
                  </div>
                  <p className="text-[#797979] text-[12px]">
                    Only confirmed meetings that the prospect attends count toward payout.
                  </p>
                </div>
              )}

              {/* ── Salary ── */}
              {compType === 'Salary' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-3">
                    <button
                      onClick={() => setSalaryPeriod('year')}
                      className={`rounded-full px-4 py-1.5 text-[13px] border transition cursor-pointer ${
                        salaryPeriod === 'year'
                          ? 'border-[#f36458] text-[#ffffff]'
                          : 'border-[#353535] text-[#797979]'
                      }`}
                    >
                      Per Year
                    </button>
                    <button
                      onClick={() => setSalaryPeriod('month')}
                      className={`rounded-full px-4 py-1.5 text-[13px] border transition cursor-pointer ${
                        salaryPeriod === 'month'
                          ? 'border-[#f36458] text-[#ffffff]'
                          : 'border-[#353535] text-[#797979]'
                      }`}
                    >
                      Per Month
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#797979]">$</span>
                      <input
                        type="text"
                        value={salaryMin}
                        onChange={(e) => setSalaryMin(e.target.value.replace(/[^0-9]/g, ''))}
                        className="w-full bg-[#212121] border border-[#353535] rounded-[3px] h-[44px] text-[#ffffff] pl-7 pr-3 focus:border-[#f36458] focus:outline-none transition"
                        placeholder={salaryPeriod === 'year' ? '60,000' : '5,000'}
                      />
                    </div>
                    <span className="text-[#797979] text-[13px]">to</span>
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#797979]">$</span>
                      <input
                        type="text"
                        value={salaryMax}
                        onChange={(e) => setSalaryMax(e.target.value.replace(/[^0-9]/g, ''))}
                        className="w-full bg-[#212121] border border-[#353535] rounded-[3px] h-[44px] text-[#ffffff] pl-7 pr-3 focus:border-[#f36458] focus:outline-none transition"
                        placeholder={salaryPeriod === 'year' ? '120,000' : '10,000'}
                      />
                    </div>
                    <span className="text-[#797979] text-[13px] shrink-0">
                      /{salaryPeriod === 'year' ? 'yr' : 'mo'}
                    </span>
                  </div>
                </div>
              )}

              {/* Summary */}
              {getCompSummary() && (
                <div className="pt-3 border-t border-[#353535]">
                  <p className="text-[#37cd84] text-[13px]">
                    ✓ {getCompSummary()}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ═══ Required Industries ═══ */}
          <div>
            <label className="block font-mono text-[11px] text-[#797979] uppercase tracking-wider mb-2">
              Required Industries
            </label>

            {/* Search */}
            <input
              type="text"
              value={industrySearch}
              onChange={(e) => setIndustrySearch(e.target.value)}
              className="w-full bg-[#0b0b0b] border border-[#353535] rounded-[3px] h-[38px] text-[#b9b9b9] px-3 text-[13px] focus:border-[#f36458] focus:outline-none transition mb-3"
              placeholder="Search industries..."
            />

            {/* Selected chips */}
            {industries.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {industries.map((ind) => (
                  <button
                    key={ind}
                    onClick={() => toggleItem(ind, industries, setIndustries)}
                    className="rounded-full px-3 py-1.5 text-[12px] border border-[#f36458] text-[#ffffff] bg-[#f36458]/10 transition cursor-pointer flex items-center gap-1.5"
                  >
                    {ind}
                    <span className="text-[#f36458] text-[10px]">✕</span>
                  </button>
                ))}
              </div>
            )}

            {/* Available chips */}
            <div className="flex flex-wrap gap-1.5 max-h-[180px] overflow-y-auto pr-1">
              {filteredIndustries
                .filter((ind) => !industries.includes(ind))
                .map((ind) => (
                  <button
                    key={ind}
                    onClick={() => toggleItem(ind, industries, setIndustries)}
                    className="rounded-full px-3 py-1.5 text-[12px] border border-[#353535] text-[#797979] bg-[#0b0b0b] hover:border-[#b9b9b9] hover:text-[#b9b9b9] transition cursor-pointer"
                  >
                    {ind}
                  </button>
                ))}
              {filteredIndustries.filter((ind) => !industries.includes(ind)).length === 0 && !industrySearch && (
                <p className="text-[#797979] text-[12px]">All industries selected</p>
              )}
              {filteredIndustries.length === 0 && industrySearch && (
                <p className="text-[#797979] text-[12px]">No match found</p>
              )}
            </div>

            {/* Custom industry */}
            <div className="flex gap-2 mt-3">
              <input
                type="text"
                value={customIndustry}
                onChange={(e) => setCustomIndustry(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addCustomIndustry(); } }}
                className="flex-1 bg-[#0b0b0b] border border-[#353535] rounded-[3px] h-[36px] text-[#b9b9b9] px-3 text-[13px] focus:border-[#f36458] focus:outline-none transition"
                placeholder="Add custom industry..."
              />
              <button
                onClick={addCustomIndustry}
                className="bg-[#353535] text-[#b9b9b9] rounded-[3px] px-3 h-[36px] text-[13px] hover:bg-[#797979] hover:text-[#ffffff] transition cursor-pointer"
              >
                Add
              </button>
            </div>
          </div>

          {/* Required Frameworks */}
          <div>
            <label className="block font-mono text-[11px] text-[#797979] uppercase tracking-wider mb-2">
              Required Frameworks
            </label>
            <div className="flex flex-wrap gap-2">
              {FRAMEWORKS.map((fw) => (
                <button
                  key={fw}
                  onClick={() => toggleItem(fw, frameworks, setFrameworks)}
                  className={`rounded-full px-4 py-2 text-[13px] border transition cursor-pointer ${
                    frameworks.includes(fw)
                      ? 'border-[#f36458] text-[#ffffff] bg-[#0b0b0b]'
                      : 'border-[#353535] text-[#b9b9b9] bg-[#0b0b0b]'
                  }`}
                >
                  {fw}
                </button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block font-mono text-[11px] text-[#797979] uppercase tracking-wider mb-2">
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-[#0b0b0b] border border-[#353535] rounded-[3px] h-[44px] text-[#b9b9b9] px-3 focus:border-[#f36458] focus:outline-none transition"
              placeholder="e.g., New York, NY or Worldwide"
            />
          </div>

          {/* Remote Toggle */}
          <div className="flex items-center justify-between">
            <label className="font-mono text-[11px] text-[#797979] uppercase tracking-wider">
              Remote
            </label>
            <button
              onClick={() => setRemote(!remote)}
              className={`relative w-[52px] h-[28px] rounded-full transition cursor-pointer ${
                remote ? 'bg-[#f36458]' : 'bg-[#353535]'
              }`}
            >
              <div
                className={`absolute top-[3px] w-[22px] h-[22px] rounded-full bg-[#ffffff] transition-transform ${
                  remote ? 'translate-x-[27px]' : 'translate-x-[3px]'
                }`}
              />
            </button>
          </div>

          {/* Submit */}
          <button
            onClick={() => {
              alert("Job posted successfully!");
              router.push('/company/jobs');
            }}
            className="w-full bg-[#ffffff] text-[#0b0b0b] rounded-full h-[48px] text-[15px] font-medium hover:opacity-90 transition cursor-pointer mt-4"
          >
            Publish Job
          </button>
        </div>
      </div>
    </div>
  );
}
