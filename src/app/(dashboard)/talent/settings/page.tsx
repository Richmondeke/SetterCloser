"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

function Toggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`w-10 h-5 rounded-full relative transition-colors cursor-pointer ${
        enabled ? "bg-[#f36458]" : "bg-[#353535]"
      }`}
    >
      <div
        className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform ${
          enabled ? "translate-x-5" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

export default function SettingsPage() {
  const router = useRouter();
  const { userName, userEmail, demoMode, signOut } = useUser();

  const [name, setName] = useState(demoMode ? "Alex Rivera" : (userName || ""));
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [smsNotifs, setSmsNotifs] = useState(false);
  const [jobAlerts, setJobAlerts] = useState(true);

  const displayEmail = demoMode ? "alex.rivera@email.com" : (userEmail || "");

  return (
    <div className="w-full max-w-3xl">
      {/* ── Header ── */}
      <p className="mono-eyebrow">ACCOUNT</p>
      <h1 className="text-[#ffffff] text-[28px] md:text-[38px] tracking-[-0.84px] md:tracking-[-1.14px] font-normal mt-1">Settings</h1>

      {/* ── Account Details ── */}
      <div className="card-dark mt-8">
        <h2 className="text-[#ffffff] text-[20px] tracking-[-0.2px] font-normal mb-6">Account Details</h2>

        {/* Email (read-only) */}
        <div className="mb-5">
          <label className="font-mono text-[11px] text-[#797979] uppercase tracking-wider block mb-2">Email</label>
          <input
            type="email"
            value={displayEmail}
            readOnly
            className="w-full bg-[#0b0b0b] border border-[#353535] rounded-[3px] text-[#797979] h-[44px] px-3 cursor-not-allowed"
          />
        </div>

        {/* Name */}
        <div className="mb-5">
          <label className="font-mono text-[11px] text-[#797979] uppercase tracking-wider block mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-[#0b0b0b] border border-[#353535] rounded-[3px] text-[#b9b9b9] h-[44px] px-3 focus:border-[#f36458] focus:outline-none transition"
          />
        </div>

        {/* Change Password */}
        <button
          onClick={() => alert("Password reset coming soon")}
          className="text-[#55beff] text-[14px] hover:underline cursor-pointer"
        >
          Change Password →
        </button>
      </div>

      {/* ── Notifications ── */}
      <div className="card-dark mt-4">
        <h2 className="text-[#ffffff] text-[20px] tracking-[-0.2px] font-normal mb-6">Notifications</h2>

        <div className="space-y-5">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-[#ffffff] text-[15px]">Email notifications</div>
              <div className="text-[#797979] text-[13px] mt-0.5">Receive updates about your earnings and jobs</div>
            </div>
            <Toggle enabled={emailNotifs} onToggle={() => setEmailNotifs(!emailNotifs)} />
          </div>

          <div className="flex justify-between items-center border-t border-[#353535] pt-5">
            <div>
              <div className="text-[#ffffff] text-[15px]">SMS notifications</div>
              <div className="text-[#797979] text-[13px] mt-0.5">Get text messages for urgent updates</div>
            </div>
            <Toggle enabled={smsNotifs} onToggle={() => setSmsNotifs(!smsNotifs)} />
          </div>

          <div className="flex justify-between items-center border-t border-[#353535] pt-5">
            <div>
              <div className="text-[#ffffff] text-[15px]">Job match alerts</div>
              <div className="text-[#797979] text-[13px] mt-0.5">Be notified when new jobs match your profile</div>
            </div>
            <Toggle enabled={jobAlerts} onToggle={() => setJobAlerts(!jobAlerts)} />
          </div>
        </div>
      </div>

      {/* ── Save Changes ── */}
      <div className="mt-4">
        <button
          onClick={() => alert("Settings saved!")}
          className="bg-[#ffffff] text-[#0b0b0b] rounded-full h-[44px] px-6 font-medium cursor-pointer transition hover:opacity-90"
        >
          Save Changes
        </button>
      </div>

      {/* ── Danger Zone ── */}
      <div className="bg-[#212121] rounded-[12px] p-8 border border-[#dd0000] mt-4">
        <h2 className="text-[#ffffff] text-[20px] tracking-[-0.2px] font-normal mb-2">Danger Zone</h2>
        <p className="text-[#797979] text-[14px] mb-6">
          Once you delete your account, there is no going back. Please be certain.
        </p>
        <button
          onClick={() => {
            if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
              signOut();
              router.push("/");
            }
          }}
          className="text-[#dd0000] border border-[#dd0000] rounded-full h-[44px] px-6 font-medium cursor-pointer transition hover:bg-[#dd0000] hover:text-[#ffffff]"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}
