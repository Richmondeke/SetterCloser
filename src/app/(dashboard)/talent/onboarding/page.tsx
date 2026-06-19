"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

/* ─── Step Definitions ─── */
const STEPS = ["Your Role", "Expertise", "Compensation", "Profile", "Review"] as const;

const INDUSTRIES = ["SaaS", "Coaching", "E-Commerce", "Agency", "FinTech", "Healthcare", "Real Estate", "Other"];
const FRAMEWORKS = ["SPIN", "NEPQ", "Sandler", "Challenger", "MEDDIC", "Consultative", "BANT", "Other"];
const COMP_OPTIONS = [
  { id: "commission", label: "Commission Only", desc: "100% performance-based pay" },
  { id: "base_commission", label: "Base + Commission", desc: "Stable base with upside potential" },
  { id: "per_meeting", label: "Per Meeting", desc: "Flat fee for every booked meeting" },
  { id: "salary", label: "Salary", desc: "Fixed monthly or annual salary" },
];
const TIMEZONES = [
  "UTC-8 (PST)", "UTC-7 (MST)", "UTC-6 (CST)", "UTC-5 (EST)",
  "UTC+0 (GMT)", "UTC+1 (CET)", "UTC+2 (EET)", "UTC+3 (MSK)",
  "UTC+5:30 (IST)", "UTC+8 (SGT)", "UTC+9 (JST)", "UTC+10 (AEST)",
];

/* ─── Form State Type ─── */
interface FormData {
  role: string;
  industries: string[];
  frameworks: string[];
  compensation: string;
  experience: string;
  timezone: string;
  headline: string;
  bio: string;
  linkedin: string;
  portfolio: string;
  videoIntro: string;
}

const INITIAL: FormData = {
  role: "",
  industries: [],
  frameworks: [],
  compensation: "",
  experience: "",
  timezone: "",
  headline: "",
  bio: "",
  linkedin: "",
  portfolio: "",
  videoIntro: "",
};

/* ─── Step Indicator ─── */
function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-12">
      {STEPS.map((label, i) => {
        const completed = i < current;
        const active = i === current;
        return (
          <div key={label} className="flex items-center gap-0">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-medium ${
                  completed
                    ? "bg-[#37cd84] text-[#0b0b0b]"
                    : active
                    ? "bg-[#f36458] text-[#0b0b0b]"
                    : "bg-[#353535] text-[#797979]"
                }`}
              >
                {completed ? "✓" : i + 1}
              </div>
              <span className="font-mono text-[11px] text-[#797979] uppercase tracking-wider mt-2 whitespace-nowrap">
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`w-12 h-px mb-5 mx-1 ${completed ? "bg-[#37cd84]" : "bg-[#353535]"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ─── Main Page ─── */
export default function OnboardingPage() {
  const router = useRouter();
  const { updateTalentData, completeOnboarding } = useUser();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(INITIAL);

  const set = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const toggleArray = (key: "industries" | "frameworks", value: string) => {
    setForm((prev) => {
      const arr = prev[key];
      return { ...prev, [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value] };
    });
  };

  const next = () => {
    // Sync form data to context on each step transition
    if (step === 0) {
      updateTalentData({ roleType: form.role || null });
    } else if (step === 1) {
      updateTalentData({ industries: form.industries, frameworks: form.frameworks });
    } else if (step === 2) {
      updateTalentData({
        compensationPreference: form.compensation || null,
        yearsExperience: form.experience ? parseInt(form.experience) : null,
        timezone: form.timezone,
      });
    } else if (step === 3) {
      updateTalentData({
        headline: form.headline,
        bio: form.bio,
        linkedinUrl: form.linkedin,
        portfolioUrl: form.portfolio,
        videoIntroUrl: form.videoIntro,
      });
    }
    setStep((s) => Math.min(s + 1, 4));
  };
  const back = () => setStep((s) => Math.max(s - 1, 0));
  const goTo = (s: number) => setStep(s);

  /* ─── Shared Card Wrapper ─── */
  const Card = ({ children }: { children: React.ReactNode }) => (
    <div className="bg-[#212121] rounded-[12px] p-8 border border-[#353535] max-w-2xl mx-auto">{children}</div>
  );

  /* ─── Input Helper ─── */
  const Input = ({
    label,
    value,
    onChange,
    placeholder,
    optional,
    type = "text",
  }: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
    optional?: boolean;
    type?: string;
  }) => (
    <div className="mt-5">
      <label className="font-mono text-[11px] text-[#797979] uppercase tracking-wider block mb-2">
        {label} {optional && <span className="normal-case text-[#353535]">(optional)</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#0b0b0b] border border-[#353535] rounded-[3px] text-[#b9b9b9] h-[44px] px-3 focus:border-[#f36458] focus:outline-none transition"
      />
    </div>
  );

  /* ─── Steps ─── */
  const renderStep = () => {
    switch (step) {
      /* ── Step 1: Your Role ── */
      case 0:
        return (
          <Card>
            <h2 className="text-[#ffffff] text-[32px] tracking-[-0.32px] font-normal">What&apos;s your role?</h2>
            <p className="text-[#797979] mt-2">Select the type of sales work you do</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              {[
                { id: "setter", label: "Setter", desc: "I book meetings & qualify leads" },
                { id: "closer", label: "Closer", desc: "I run demos & close deals" },
                { id: "both", label: "Both", desc: "I do end-to-end sales" },
              ].map((r) => (
                <button
                  key={r.id}
                  onClick={() => set("role", r.id)}
                  className={`bg-[#0b0b0b] border rounded-[5px] p-6 cursor-pointer text-center transition ${
                    form.role === r.id ? "border-[#f36458]" : "border-[#353535]"
                  }`}
                >
                  <div className="text-[#ffffff] text-[16px] font-medium">{r.label}</div>
                  <div className="text-[#797979] text-[13px] mt-2">{r.desc}</div>
                </button>
              ))}
            </div>
          </Card>
        );

      /* ── Step 2: Expertise ── */
      case 1:
        return (
          <Card>
            <h2 className="text-[#ffffff] text-[32px] tracking-[-0.32px] font-normal">What industries do you know?</h2>
            <p className="text-[#797979] mt-2">Select all that apply</p>
            <div className="flex flex-wrap gap-2 mt-6">
              {INDUSTRIES.map((ind) => (
                <button
                  key={ind}
                  onClick={() => toggleArray("industries", ind)}
                  className={`border rounded-full px-4 py-2 text-[13px] cursor-pointer transition ${
                    form.industries.includes(ind)
                      ? "border-[#f36458] text-[#ffffff] bg-[#0b0b0b]"
                      : "border-[#353535] text-[#b9b9b9] bg-[#0b0b0b]"
                  }`}
                >
                  {ind}
                </button>
              ))}
            </div>

            <h3 className="text-[#ffffff] text-[20px] tracking-[-0.2px] font-normal mt-10">
              Sales frameworks you know
            </h3>
            <div className="flex flex-wrap gap-2 mt-4">
              {FRAMEWORKS.map((fw) => (
                <button
                  key={fw}
                  onClick={() => toggleArray("frameworks", fw)}
                  className={`border rounded-full px-4 py-2 text-[13px] cursor-pointer transition ${
                    form.frameworks.includes(fw)
                      ? "border-[#f36458] text-[#ffffff] bg-[#0b0b0b]"
                      : "border-[#353535] text-[#b9b9b9] bg-[#0b0b0b]"
                  }`}
                >
                  {fw}
                </button>
              ))}
            </div>
          </Card>
        );

      /* ── Step 3: Compensation ── */
      case 2:
        return (
          <Card>
            <h2 className="text-[#ffffff] text-[32px] tracking-[-0.32px] font-normal">
              How do you prefer to get paid?
            </h2>
            <p className="text-[#797979] mt-2">Select your preferred compensation model</p>
            <div className="grid grid-cols-2 gap-4 mt-8">
              {COMP_OPTIONS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => set("compensation", c.id)}
                  className={`bg-[#0b0b0b] border rounded-[5px] p-6 cursor-pointer text-center transition ${
                    form.compensation === c.id ? "border-[#f36458]" : "border-[#353535]"
                  }`}
                >
                  <div className="text-[#ffffff] text-[16px] font-medium">{c.label}</div>
                  <div className="text-[#797979] text-[13px] mt-2">{c.desc}</div>
                </button>
              ))}
            </div>

            <Input
              label="Years of sales experience"
              value={form.experience}
              onChange={(v) => set("experience", v)}
              placeholder="e.g. 5"
              type="number"
            />

            <div className="mt-5">
              <label className="font-mono text-[11px] text-[#797979] uppercase tracking-wider block mb-2">
                Your timezone
              </label>
              <select
                value={form.timezone}
                onChange={(e) => set("timezone", e.target.value)}
                className="w-full bg-[#0b0b0b] border border-[#353535] rounded-[3px] text-[#b9b9b9] h-[44px] px-3 focus:border-[#f36458] focus:outline-none transition appearance-none"
              >
                <option value="">Select timezone</option>
                {TIMEZONES.map((tz) => (
                  <option key={tz} value={tz}>
                    {tz}
                  </option>
                ))}
              </select>
            </div>
          </Card>
        );

      /* ── Step 4: Profile ── */
      case 3:
        return (
          <Card>
            <h2 className="text-[#ffffff] text-[32px] tracking-[-0.32px] font-normal">
              Tell companies about yourself
            </h2>
            <p className="text-[#797979] mt-2">This is what hiring managers will see</p>

            <Input
              label="Headline"
              value={form.headline}
              onChange={(v) => set("headline", v)}
              placeholder='e.g. Senior SaaS Closer | $2M+ Closed'
            />

            <div className="mt-5">
              <label className="font-mono text-[11px] text-[#797979] uppercase tracking-wider block mb-2">Bio</label>
              <textarea
                value={form.bio}
                onChange={(e) => set("bio", e.target.value)}
                placeholder="Tell us about your sales experience, results, and what makes you stand out…"
                className="w-full bg-[#0b0b0b] border border-[#353535] rounded-[3px] text-[#b9b9b9] p-3 min-h-[120px] focus:border-[#f36458] focus:outline-none transition resize-none"
              />
            </div>

            <Input
              label="LinkedIn URL"
              value={form.linkedin}
              onChange={(v) => set("linkedin", v)}
              placeholder="https://linkedin.com/in/yourprofile"
            />
            <Input
              label="Portfolio URL"
              value={form.portfolio}
              onChange={(v) => set("portfolio", v)}
              placeholder="https://yourportfolio.com"
              optional
            />
            <Input
              label="Video intro URL"
              value={form.videoIntro}
              onChange={(v) => set("videoIntro", v)}
              placeholder="https://loom.com/share/…"
              optional
            />
          </Card>
        );

      /* ── Step 5: Review ── */
      case 4: {
        const compLabel = COMP_OPTIONS.find((c) => c.id === form.compensation)?.label ?? "—";
        const roleLabel = form.role === "both" ? "Setter & Closer" : form.role ? form.role.charAt(0).toUpperCase() + form.role.slice(1) : "—";

        const rows: { label: string; value: string; editStep: number }[] = [
          { label: "Role", value: roleLabel, editStep: 0 },
          { label: "Industries", value: form.industries.join(", ") || "—", editStep: 1 },
          { label: "Frameworks", value: form.frameworks.join(", ") || "—", editStep: 1 },
          { label: "Compensation", value: compLabel, editStep: 2 },
          { label: "Experience", value: form.experience ? `${form.experience} years` : "—", editStep: 2 },
          { label: "Timezone", value: form.timezone || "—", editStep: 2 },
          { label: "Headline", value: form.headline || "—", editStep: 3 },
          { label: "Bio", value: form.bio ? (form.bio.length > 80 ? form.bio.slice(0, 80) + "…" : form.bio) : "—", editStep: 3 },
          { label: "LinkedIn", value: form.linkedin || "—", editStep: 3 },
        ];

        return (
          <Card>
            <h2 className="text-[#ffffff] text-[32px] tracking-[-0.32px] font-normal">You&apos;re all set!</h2>
            <p className="text-[#797979] mt-2">Review your information before launching your profile</p>

            <div className="mt-8 space-y-0">
              {rows.map((r) => (
                <div
                  key={r.label}
                  className="flex justify-between items-center py-4 border-b border-[#353535] last:border-0"
                >
                  <div>
                    <span className="mono-eyebrow text-[11px]">{r.label}</span>
                    <div className="text-[#ffffff] text-[15px] mt-0.5">{r.value}</div>
                  </div>
                  <button onClick={() => goTo(r.editStep)} className="text-[#55beff] text-[13px] cursor-pointer">
                    Edit
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                updateTalentData({
                  roleType: form.role || null,
                  industries: form.industries,
                  frameworks: form.frameworks,
                  compensationPreference: form.compensation || null,
                  yearsExperience: form.experience ? parseInt(form.experience) : null,
                  timezone: form.timezone,
                  headline: form.headline,
                  bio: form.bio,
                  linkedinUrl: form.linkedin,
                  portfolioUrl: form.portfolio,
                  videoIntroUrl: form.videoIntro,
                });
                completeOnboarding();
                router.push("/talent/dashboard");
              }}
              className="btn-brand w-full mt-8"
            >
              Launch My Profile
            </button>
          </Card>
        );
      }

      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-4">
      <StepIndicator current={step} />
      {renderStep()}

      {/* ── Navigation ── */}
      {step < 4 && (
        <div className="flex justify-between max-w-2xl mx-auto mt-8">
          {step > 0 ? (
            <button onClick={back} className="btn-ghost">
              Back
            </button>
          ) : (
            <div />
          )}
          <button
            onClick={next}
            disabled={
              (step === 0 && !form.role) ||
              (step === 1 && form.industries.length === 0) ||
              (step === 2 && form.frameworks.length === 0) ||
              (step === 3 && !form.compensation)
            }
            className={`bg-[#ffffff] text-[#0b0b0b] rounded-full h-[44px] px-8 font-medium cursor-pointer transition hover:opacity-90 ${
              (step === 0 && !form.role) ||
              (step === 1 && form.industries.length === 0) ||
              (step === 2 && form.frameworks.length === 0) ||
              (step === 3 && !form.compensation)
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
}
