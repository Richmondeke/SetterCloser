export default function ProfilePage() {
  const profile = {
    name: "Alex Rivera",
    initials: "AR",
    headline: "Senior SaaS Closer | $2M+ Closed",
    role: "Closer",
    trustScore: 8.7,
    meetingsBooked: 47,
    dealsClosed: 12,
    totalEarnings: "$12,400",
    bio: "Results-driven closer with 6+ years of experience in B2B SaaS sales. Specializing in consultative selling for mid-market and enterprise accounts. Consistently exceed quota by 140%+ with a focus on building long-term customer relationships. Experienced with complex sales cycles ranging from 30-90 days.",
    industries: ["SaaS", "FinTech", "Agency"],
    frameworks: ["NEPQ", "MEDDIC", "Consultative"],
    compensation: "Commission Only",
    timezone: "UTC-5 (EST)",
    availability: "Full-time",
    linkedin: "linkedin.com/in/alexrivera",
    portfolio: "alexrivera.sales",
    videoIntro: "loom.com/share/alex-intro",
  };

  return (
    <div className="w-full">
      {/* ── Header ── */}
      <div className="flex justify-between items-start">
        <div>
          <p className="mono-eyebrow">PROFILE</p>
          <h1 className="text-[#ffffff] text-[38px] tracking-[-1.14px] font-normal mt-1">My Profile</h1>
        </div>
        <button className="btn-ghost mt-2">Edit Profile</button>
      </div>

      {/* ── Top Section ── */}
      <div className="flex gap-8 items-start mt-8">
        {/* Avatar */}
        <div className="w-20 h-20 rounded-full bg-[#353535] flex items-center justify-center text-[#ffffff] text-[24px] font-medium shrink-0">
          {profile.initials}
        </div>
        {/* Info */}
        <div>
          <h2 className="text-[#ffffff] text-[32px] tracking-[-0.32px] font-normal">{profile.name}</h2>
          <p className="text-[#b9b9b9] text-[18px] mt-1">{profile.headline}</p>
          <div className="flex items-center gap-4 mt-3">
            <span className="bg-[#0b0b0b] text-[#b9b9b9] text-[11px] font-mono rounded-full px-3 py-1 border border-[#353535]">
              {profile.role}
            </span>
            <span className="text-[#37cd84] text-[14px] font-medium">
              ★ {profile.trustScore} Trust Score
            </span>
          </div>
        </div>
      </div>

      {/* ── Stats Bar ── */}
      <div className="flex items-center gap-0 mt-8 card-dark">
        {[
          { value: profile.meetingsBooked.toString(), label: "Meetings Booked" },
          { value: profile.dealsClosed.toString(), label: "Deals Closed" },
          { value: profile.totalEarnings, label: "Total Earnings" },
        ].map((s, i) => (
          <div key={s.label} className={`flex-1 text-center ${i < 2 ? "border-r border-[#353535]" : ""}`}>
            <div className="text-[#ffffff] text-[28px] tracking-[-0.28px] font-normal">{s.value}</div>
            <div className="font-mono text-[11px] text-[#797979] uppercase tracking-wider mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── Bio ── */}
      <div className="card-dark mt-8">
        <h3 className="mono-eyebrow mb-3">ABOUT</h3>
        <p className="text-[#b9b9b9] text-[15px] leading-relaxed">{profile.bio}</p>
      </div>

      {/* ── Skills & Frameworks ── */}
      <div className="card-dark mt-4">
        <h3 className="mono-eyebrow mb-4">SKILLS & FRAMEWORKS</h3>
        <div className="mb-4">
          <span className="text-[#797979] text-[13px] mr-3">Industries:</span>
          <div className="inline-flex gap-2 flex-wrap">
            {profile.industries.map((ind) => (
              <span
                key={ind}
                className="bg-[#0b0b0b] border border-[#353535] text-[#b9b9b9] text-[13px] rounded-full px-3 py-1"
              >
                {ind}
              </span>
            ))}
          </div>
        </div>
        <div>
          <span className="text-[#797979] text-[13px] mr-3">Frameworks:</span>
          <div className="inline-flex gap-2 flex-wrap">
            {profile.frameworks.map((fw) => (
              <span
                key={fw}
                className="bg-[#0b0b0b] border border-[#353535] text-[#b9b9b9] text-[13px] rounded-full px-3 py-1"
              >
                {fw}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Work Preferences ── */}
      <div className="card-dark mt-4">
        <h3 className="mono-eyebrow mb-4">WORK PREFERENCES</h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <div className="text-[#797979] text-[13px]">Compensation</div>
            <div className="text-[#ffffff] text-[15px] mt-1">{profile.compensation}</div>
          </div>
          <div>
            <div className="text-[#797979] text-[13px]">Timezone</div>
            <div className="text-[#ffffff] text-[15px] mt-1">{profile.timezone}</div>
          </div>
          <div>
            <div className="text-[#797979] text-[13px]">Availability</div>
            <div className="text-[#ffffff] text-[15px] mt-1">{profile.availability}</div>
          </div>
        </div>
      </div>

      {/* ── Links ── */}
      <div className="card-dark mt-4">
        <h3 className="mono-eyebrow mb-4">LINKS</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-[#797979] text-[13px] w-24">LinkedIn</span>
            <a href={`https://${profile.linkedin}`} className="text-[#55beff] text-[14px] hover:underline">
              {profile.linkedin}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#797979] text-[13px] w-24">Portfolio</span>
            <a href={`https://${profile.portfolio}`} className="text-[#55beff] text-[14px] hover:underline">
              {profile.portfolio}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#797979] text-[13px] w-24">Video Intro</span>
            <a href={`https://${profile.videoIntro}`} className="text-[#55beff] text-[14px] hover:underline">
              {profile.videoIntro}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
