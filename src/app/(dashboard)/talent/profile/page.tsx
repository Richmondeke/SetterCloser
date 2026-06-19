"use client";

import { useState } from "react";
import { useUser } from "@/context/UserContext";

const DEMO_PROFILE = {
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

export default function ProfilePage() {
  const { userName, userInitials, talentData, demoMode, updateTalentData } = useUser();
  const [editing, setEditing] = useState(false);

  // Editable fields local state
  const [editHeadline, setEditHeadline] = useState("");
  const [editBio, setEditBio] = useState("");
  const [editLinkedin, setEditLinkedin] = useState("");
  const [editPortfolio, setEditPortfolio] = useState("");
  const [editVideoIntro, setEditVideoIntro] = useState("");

  // Derive displayed profile from demo vs live
  const profile = demoMode
    ? DEMO_PROFILE
    : {
        name: userName || "Your Name",
        initials: userInitials || "??",
        headline: talentData.headline || "",
        role: talentData.roleType || "—",
        trustScore: 0,
        meetingsBooked: 0,
        dealsClosed: 0,
        totalEarnings: "$0",
        bio: talentData.bio || "",
        industries: talentData.industries.length > 0 ? talentData.industries : [],
        frameworks: talentData.frameworks.length > 0 ? talentData.frameworks : [],
        compensation: talentData.compensationPreference || "—",
        timezone: talentData.timezone || "—",
        availability: "—",
        linkedin: talentData.linkedinUrl || "",
        portfolio: talentData.portfolioUrl || "",
        videoIntro: talentData.videoIntroUrl || "",
      };

  const handleEditToggle = () => {
    if (!editing) {
      // Populate edit fields with current values
      setEditHeadline(profile.headline);
      setEditBio(profile.bio);
      setEditLinkedin(profile.linkedin);
      setEditPortfolio(profile.portfolio);
      setEditVideoIntro(profile.videoIntro);
    }
    setEditing(!editing);
  };

  const handleSave = () => {
    updateTalentData({
      headline: editHeadline,
      bio: editBio,
      linkedinUrl: editLinkedin,
      portfolioUrl: editPortfolio,
      videoIntroUrl: editVideoIntro,
    });
    setEditing(false);
  };

  // Check if profile is empty (live mode, no data)
  const isEmptyProfile = !demoMode && !talentData.headline && !talentData.bio;

  return (
    <div className="w-full">
      {/* ── Header ── */}
      <div className="flex justify-between items-start">
        <div>
          <p className="mono-eyebrow">PROFILE</p>
          <h1 className="text-[#ffffff] text-[28px] md:text-[38px] tracking-[-0.84px] md:tracking-[-1.14px] font-normal mt-1">My Profile</h1>
        </div>
        <div className="flex items-center gap-3 mt-2">
          {editing && (
            <button
              onClick={handleSave}
              className="bg-[#37cd84] text-[#0b0b0b] rounded-full px-5 py-2 text-[14px] font-medium cursor-pointer hover:opacity-90 transition"
            >
              Save
            </button>
          )}
          <button onClick={handleEditToggle} className="btn-ghost">
            {editing ? "Cancel" : "Edit Profile"}
          </button>
        </div>
      </div>

      {isEmptyProfile && !editing ? (
        /* ── Empty State ── */
        <div className="flex flex-col items-center justify-center py-16 text-center mt-8">
          <span className="text-[32px] mb-3 opacity-30">👤</span>
          <p className="text-[#ffffff] text-[16px]">Your profile is empty</p>
          <p className="text-[#797979] text-[14px] mt-1 max-w-xs">
            Click &quot;Edit Profile&quot; to add your headline, bio, and links
          </p>
          <button
            onClick={handleEditToggle}
            className="mt-4 bg-[#ffffff] text-[#0b0b0b] rounded-full px-6 h-[40px] text-[14px] font-medium hover:opacity-90 transition cursor-pointer"
          >
            Set Up Profile
          </button>
        </div>
      ) : (
        <>
          {/* ── Top Section ── */}
          <div className="flex gap-8 items-start mt-8">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-full bg-[#353535] flex items-center justify-center text-[#ffffff] text-[24px] font-medium shrink-0">
              {profile.initials}
            </div>
            {/* Info */}
            <div>
              <h2 className="text-[#ffffff] text-[32px] tracking-[-0.32px] font-normal">{profile.name}</h2>
              {editing ? (
                <input
                  type="text"
                  value={editHeadline}
                  onChange={(e) => setEditHeadline(e.target.value)}
                  placeholder="Your headline..."
                  className="w-full bg-[#0b0b0b] border border-[#353535] rounded-[3px] text-[#b9b9b9] h-[40px] px-3 mt-1 focus:border-[#f36458] focus:outline-none transition"
                />
              ) : (
                <p className="text-[#b9b9b9] text-[18px] mt-1">{profile.headline || "No headline set"}</p>
              )}
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
            {editing ? (
              <textarea
                value={editBio}
                onChange={(e) => setEditBio(e.target.value)}
                placeholder="Tell companies about yourself..."
                className="w-full bg-[#0b0b0b] border border-[#353535] rounded-[3px] text-[#b9b9b9] px-3 py-3 focus:border-[#f36458] focus:outline-none transition min-h-[120px] resize-none"
              />
            ) : (
              <p className="text-[#b9b9b9] text-[15px] leading-relaxed">{profile.bio || "No bio added yet."}</p>
            )}
          </div>

          {/* ── Skills & Frameworks ── */}
          <div className="card-dark mt-4">
            <h3 className="mono-eyebrow mb-4">SKILLS & FRAMEWORKS</h3>
            <div className="mb-4">
              <span className="text-[#797979] text-[13px] mr-3">Industries:</span>
              <div className="inline-flex gap-2 flex-wrap">
                {profile.industries.length > 0 ? (
                  profile.industries.map((ind) => (
                    <span
                      key={ind}
                      className="bg-[#0b0b0b] border border-[#353535] text-[#b9b9b9] text-[13px] rounded-full px-3 py-1"
                    >
                      {ind}
                    </span>
                  ))
                ) : (
                  <span className="text-[#797979] text-[13px]">None set</span>
                )}
              </div>
            </div>
            <div>
              <span className="text-[#797979] text-[13px] mr-3">Frameworks:</span>
              <div className="inline-flex gap-2 flex-wrap">
                {profile.frameworks.length > 0 ? (
                  profile.frameworks.map((fw) => (
                    <span
                      key={fw}
                      className="bg-[#0b0b0b] border border-[#353535] text-[#b9b9b9] text-[13px] rounded-full px-3 py-1"
                    >
                      {fw}
                    </span>
                  ))
                ) : (
                  <span className="text-[#797979] text-[13px]">None set</span>
                )}
              </div>
            </div>
          </div>

          {/* ── Work Preferences ── */}
          <div className="card-dark mt-4">
            <h3 className="mono-eyebrow mb-4">WORK PREFERENCES</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
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
            {editing ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-[#797979] text-[13px] w-24">LinkedIn</span>
                  <input
                    type="text"
                    value={editLinkedin}
                    onChange={(e) => setEditLinkedin(e.target.value)}
                    placeholder="linkedin.com/in/..."
                    className="flex-1 bg-[#0b0b0b] border border-[#353535] rounded-[3px] text-[#b9b9b9] h-[36px] px-3 focus:border-[#f36458] focus:outline-none transition"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#797979] text-[13px] w-24">Portfolio</span>
                  <input
                    type="text"
                    value={editPortfolio}
                    onChange={(e) => setEditPortfolio(e.target.value)}
                    placeholder="yoursite.com"
                    className="flex-1 bg-[#0b0b0b] border border-[#353535] rounded-[3px] text-[#b9b9b9] h-[36px] px-3 focus:border-[#f36458] focus:outline-none transition"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#797979] text-[13px] w-24">Video Intro</span>
                  <input
                    type="text"
                    value={editVideoIntro}
                    onChange={(e) => setEditVideoIntro(e.target.value)}
                    placeholder="loom.com/share/..."
                    className="flex-1 bg-[#0b0b0b] border border-[#353535] rounded-[3px] text-[#b9b9b9] h-[36px] px-3 focus:border-[#f36458] focus:outline-none transition"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-[#797979] text-[13px] w-24">LinkedIn</span>
                  {profile.linkedin ? (
                    <a href={`https://${profile.linkedin}`} className="text-[#55beff] text-[14px] hover:underline">
                      {profile.linkedin}
                    </a>
                  ) : (
                    <span className="text-[#797979] text-[14px]">Not set</span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#797979] text-[13px] w-24">Portfolio</span>
                  {profile.portfolio ? (
                    <a href={`https://${profile.portfolio}`} className="text-[#55beff] text-[14px] hover:underline">
                      {profile.portfolio}
                    </a>
                  ) : (
                    <span className="text-[#797979] text-[14px]">Not set</span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#797979] text-[13px] w-24">Video Intro</span>
                  {profile.videoIntro ? (
                    <a href={`https://${profile.videoIntro}`} className="text-[#55beff] text-[14px] hover:underline">
                      {profile.videoIntro}
                    </a>
                  ) : (
                    <span className="text-[#797979] text-[14px]">Not set</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
