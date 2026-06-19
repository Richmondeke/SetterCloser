'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const ROLE_TYPES = ['Setter', 'Closer', 'Both'];
const COMP_TYPES = ['Commission Only', 'Base + Commission', 'Per Meeting', 'Salary'];
const INDUSTRIES_OPTIONS = ['SaaS', 'Coaching', 'E-Commerce', 'Agency', 'FinTech', 'Healthcare', 'Real Estate', 'Insurance', 'Consulting'];
const FRAMEWORKS = ['SPIN Selling', 'Sandler', 'Challenger', 'MEDDIC', 'Solution Selling', 'Consultative', 'BANT'];

export default function NewJobPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [roleType, setRoleType] = useState('');
  const [compType, setCompType] = useState('');
  const [compDetails, setCompDetails] = useState('');
  const [industries, setIndustries] = useState<string[]>([]);
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

  return (
    <div>
      <p className="font-mono text-[11px] text-[#797979] uppercase tracking-wider">Create</p>
      <h1 className="text-[#ffffff] text-[38px] font-normal tracking-[-0.38px] mt-1">
        Post a New Job
      </h1>

      <div className="bg-[#212121] rounded-[12px] p-8 border border-[#353535] max-w-3xl mt-8">
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
              className="w-full bg-[#0b0b0b] border border-[#353535] rounded-[3px] text-[#b9b9b9] px-3 py-3 focus:border-[#f36458] focus:outline-none transition min-h-[160px] resize-none"
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

          {/* Compensation Type */}
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

          {/* Compensation Details */}
          <div>
            <label className="block font-mono text-[11px] text-[#797979] uppercase tracking-wider mb-2">
              Compensation Details
            </label>
            <input
              type="text"
              value={compDetails}
              onChange={(e) => setCompDetails(e.target.value)}
              className="w-full bg-[#0b0b0b] border border-[#353535] rounded-[3px] h-[44px] text-[#b9b9b9] px-3 focus:border-[#f36458] focus:outline-none transition"
              placeholder='e.g., "$150 per meeting" or "$5K-$15K/mo OTE"'
            />
          </div>

          {/* Required Industries */}
          <div>
            <label className="block font-mono text-[11px] text-[#797979] uppercase tracking-wider mb-2">
              Required Industries
            </label>
            <div className="flex flex-wrap gap-2">
              {INDUSTRIES_OPTIONS.map((ind) => (
                <button
                  key={ind}
                  onClick={() => toggleItem(ind, industries, setIndustries)}
                  className={`rounded-full px-4 py-2 text-[13px] border transition cursor-pointer ${
                    industries.includes(ind)
                      ? 'border-[#f36458] text-[#ffffff] bg-[#0b0b0b]'
                      : 'border-[#353535] text-[#b9b9b9] bg-[#0b0b0b]'
                  }`}
                >
                  {ind}
                </button>
              ))}
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
            onClick={() => router.push('/company/jobs')}
            className="w-full bg-[#ffffff] text-[#0b0b0b] rounded-full h-[48px] text-[15px] font-medium hover:opacity-90 transition cursor-pointer mt-4"
          >
            Publish Job
          </button>
        </div>
      </div>
    </div>
  );
}
