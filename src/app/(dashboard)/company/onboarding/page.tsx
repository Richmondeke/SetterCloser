'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';

const STEPS = ['Company Info', 'What You\'re Looking For', 'Review & Launch'];

const INDUSTRIES = ['SaaS', 'Coaching', 'E-Commerce', 'Agency', 'FinTech', 'Healthcare', 'Consulting', 'Other'];
const TEAM_SIZES = ['1-10', '11-50', '51-200', '200+'];
const ROLE_TYPES = ['Setter', 'Closer', 'Both', 'AI Agent'];
const COMP_MODELS = ['Commission Only', 'Base + Commission', 'Per Meeting'];
const PREFERRED_INDUSTRIES = ['SaaS', 'Coaching', 'E-Commerce', 'Agency', 'FinTech', 'Healthcare', 'Real Estate', 'Insurance', 'Crypto', 'Education'];

export default function CompanyOnboardingPage() {
  const router = useRouter();
  const { updateCompanyData, completeOnboarding } = useUser();
  const [step, setStep] = useState(0);

  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [website, setWebsite] = useState('');
  const [teamSize, setTeamSize] = useState('');
  const [location, setLocation] = useState('');

  const [roleType, setRoleType] = useState('');
  const [preferredIndustries, setPreferredIndustries] = useState<string[]>([]);
  const [compModel, setCompModel] = useState('');
  const [description, setDescription] = useState('');

  const toggleIndustry = (ind: string) => {
    setPreferredIndustries((prev) =>
      prev.includes(ind) ? prev.filter((i) => i !== ind) : [...prev, ind]
    );
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      {/* Step Indicator */}
      <div className="flex items-center justify-center mb-12">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-[14px] font-medium transition ${
                  i < step
                    ? 'bg-[#37cd84] text-[#0b0b0b]'
                    : i === step
                    ? 'bg-[#f36458] text-[#ffffff]'
                    : 'bg-[#353535] text-[#797979]'
                }`}
              >
                {i < step ? '✓' : i + 1}
              </div>
              <span className="font-mono text-[11px] text-[#797979] uppercase tracking-wider mt-2 whitespace-nowrap">
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`w-16 h-px mx-3 mb-5 ${
                  i < step ? 'bg-[#37cd84]' : 'bg-[#353535]'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Company Info */}
      {step === 0 && (
        <div className="bg-[#212121] rounded-[12px] p-8 border border-[#353535]">
          <h1 className="text-[#ffffff] text-[32px] tracking-[-0.32px] font-normal mb-8">
            Tell us about your company
          </h1>

          <div className="space-y-6">
            <div>
              <label className="block font-mono text-[11px] text-[#797979] uppercase tracking-wider mb-2">
                Company Name
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full bg-[#0b0b0b] border border-[#353535] rounded-[3px] h-[44px] text-[#b9b9b9] px-3 focus:border-[#f36458] focus:outline-none transition"
                placeholder="Acme Corp"
              />
            </div>

            <div>
              <label className="block font-mono text-[11px] text-[#797979] uppercase tracking-wider mb-2">
                Industry
              </label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full bg-[#0b0b0b] border border-[#353535] rounded-[3px] h-[44px] text-[#b9b9b9] px-3 focus:border-[#f36458] focus:outline-none transition appearance-none"
              >
                <option value="">Select industry</option>
                {INDUSTRIES.map((ind) => (
                  <option key={ind} value={ind}>{ind}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-mono text-[11px] text-[#797979] uppercase tracking-wider mb-2">
                Company Website
              </label>
              <input
                type="text"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full bg-[#0b0b0b] border border-[#353535] rounded-[3px] h-[44px] text-[#b9b9b9] px-3 focus:border-[#f36458] focus:outline-none transition"
                placeholder="https://acme.com"
              />
            </div>

            <div>
              <label className="block font-mono text-[11px] text-[#797979] uppercase tracking-wider mb-2">
                Team Size
              </label>
              <select
                value={teamSize}
                onChange={(e) => setTeamSize(e.target.value)}
                className="w-full bg-[#0b0b0b] border border-[#353535] rounded-[3px] h-[44px] text-[#b9b9b9] px-3 focus:border-[#f36458] focus:outline-none transition appearance-none"
              >
                <option value="">Select team size</option>
                {TEAM_SIZES.map((size) => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-mono text-[11px] text-[#797979] uppercase tracking-wider mb-2">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-[#0b0b0b] border border-[#353535] rounded-[3px] h-[44px] text-[#b9b9b9] px-3 focus:border-[#f36458] focus:outline-none transition"
                placeholder="New York, NY"
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 2: What you're looking for */}
      {step === 1 && (
        <div className="bg-[#212121] rounded-[12px] p-8 border border-[#353535]">
          <h1 className="text-[#ffffff] text-[32px] tracking-[-0.32px] font-normal mb-8">
            Define your ideal sales rep
          </h1>

          <div className="space-y-6">
            <div>
              <label className="block font-mono text-[11px] text-[#797979] uppercase tracking-wider mb-2">
                Role Type Needed
              </label>
              <div className="grid grid-cols-2 gap-3">
                {ROLE_TYPES.map((role) => (
                  <button
                    key={role}
                    onClick={() => setRoleType(role)}
                    className={`bg-[#0b0b0b] border rounded-[5px] p-4 cursor-pointer text-left transition ${
                      roleType === role
                        ? 'border-[#f36458] text-[#ffffff]'
                        : 'border-[#353535] text-[#b9b9b9]'
                    }`}
                  >
                    <span className="text-[15px]">{role}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-mono text-[11px] text-[#797979] uppercase tracking-wider mb-2">
                Preferred Industries
              </label>
              <div className="flex flex-wrap gap-2">
                {PREFERRED_INDUSTRIES.map((ind) => (
                  <button
                    key={ind}
                    onClick={() => toggleIndustry(ind)}
                    className={`rounded-full px-4 py-2 text-[13px] border transition ${
                      preferredIndustries.includes(ind)
                        ? 'border-[#f36458] text-[#ffffff] bg-[#0b0b0b]'
                        : 'border-[#353535] text-[#b9b9b9] bg-[#0b0b0b]'
                    }`}
                  >
                    {ind}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-mono text-[11px] text-[#797979] uppercase tracking-wider mb-2">
                Compensation Model
              </label>
              <div className="grid grid-cols-2 gap-3">
                {COMP_MODELS.map((model) => (
                  <button
                    key={model}
                    onClick={() => setCompModel(model)}
                    className={`bg-[#0b0b0b] border rounded-[5px] p-4 cursor-pointer text-left transition ${
                      compModel === model
                        ? 'border-[#f36458] text-[#ffffff]'
                        : 'border-[#353535] text-[#b9b9b9]'
                    }`}
                  >
                    <span className="text-[15px]">{model}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-mono text-[11px] text-[#797979] uppercase tracking-wider mb-2">
                Company Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-[#0b0b0b] border border-[#353535] rounded-[3px] text-[#b9b9b9] px-3 py-3 focus:border-[#f36458] focus:outline-none transition min-h-[120px] resize-none"
                placeholder="Tell candidates about your company, culture, and what makes you unique..."
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Review & Launch */}
      {step === 2 && (
        <div className="bg-[#212121] rounded-[12px] p-8 border border-[#353535]">
          <h1 className="text-[#ffffff] text-[32px] tracking-[-0.32px] font-normal mb-8">
            Review & Launch
          </h1>

          <div className="space-y-6">
            <div className="bg-[#0b0b0b] rounded-[5px] p-6 border border-[#353535]">
              <p className="font-mono text-[11px] text-[#797979] uppercase tracking-wider mb-3">Company Profile</p>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-[#797979] text-[14px]">Company Name</span>
                  <span className="text-[#ffffff] text-[14px]">{companyName || '—'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#797979] text-[14px]">Industry</span>
                  <span className="text-[#ffffff] text-[14px]">{industry || '—'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#797979] text-[14px]">Website</span>
                  <span className="text-[#ffffff] text-[14px]">{website || '—'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#797979] text-[14px]">Team Size</span>
                  <span className="text-[#ffffff] text-[14px]">{teamSize || '—'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#797979] text-[14px]">Location</span>
                  <span className="text-[#ffffff] text-[14px]">{location || '—'}</span>
                </div>
              </div>
            </div>

            <div className="bg-[#0b0b0b] rounded-[5px] p-6 border border-[#353535]">
              <p className="font-mono text-[11px] text-[#797979] uppercase tracking-wider mb-3">Hiring Preferences</p>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-[#797979] text-[14px]">Role Type</span>
                  <span className="text-[#ffffff] text-[14px]">{roleType || '—'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#797979] text-[14px]">Compensation</span>
                  <span className="text-[#ffffff] text-[14px]">{compModel || '—'}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-[#797979] text-[14px]">Industries</span>
                  <div className="flex flex-wrap gap-1 justify-end max-w-[60%]">
                    {preferredIndustries.length > 0 ? preferredIndustries.map((ind) => (
                      <span key={ind} className="bg-[#212121] text-[#b9b9b9] text-[11px] rounded-full px-2 py-0.5">{ind}</span>
                    )) : <span className="text-[#ffffff] text-[14px]">—</span>}
                  </div>
                </div>
              </div>
            </div>

            {description && (
              <div className="bg-[#0b0b0b] rounded-[5px] p-6 border border-[#353535]">
                <p className="font-mono text-[11px] text-[#797979] uppercase tracking-wider mb-3">Description</p>
                <p className="text-[#b9b9b9] text-[14px] leading-relaxed">{description}</p>
              </div>
            )}

            <button
              onClick={() => {
                updateCompanyData({
                  companyName,
                  industry,
                  website,
                  teamSize,
                  location,
                  description,
                  lookingFor: preferredIndustries,
                  compensationModel: compModel || null,
                });
                completeOnboarding();
                router.push('/company/dashboard');
              }}
              className="w-full bg-[#f36458] text-[#0b0b0b] rounded-full h-[48px] text-[15px] font-medium hover:opacity-90 transition cursor-pointer"
            >
              Launch Company Profile
            </button>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button
          onClick={() => setStep((s) => s - 1)}
          className={`text-[#b9b9b9] text-[14px] hover:text-[#ffffff] transition ${
            step === 0 ? 'invisible' : ''
          }`}
        >
          ← Back
        </button>
        {step < 2 && (
          <button
            onClick={() => {
              // Sync to context on each step forward
              if (step === 0) {
                updateCompanyData({ companyName, industry, website, teamSize, location });
              } else if (step === 1) {
                updateCompanyData({
                  description,
                  lookingFor: preferredIndustries,
                  compensationModel: compModel || null,
                });
              }
              setStep((s) => s + 1);
            }}
            disabled={
              (step === 0 && !companyName.trim()) ||
              (step === 1 && !roleType)
            }
            className={`bg-[#ffffff] text-[#0b0b0b] rounded-full px-8 h-[44px] text-[14px] font-medium hover:opacity-90 transition cursor-pointer ${
              (step === 0 && !companyName.trim()) ||
              (step === 1 && !roleType)
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
}
