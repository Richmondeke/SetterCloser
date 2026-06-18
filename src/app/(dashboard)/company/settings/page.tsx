"use client";

import { useState } from "react";

export default function CompanySettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [matchAlerts, setMatchAlerts] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(false);

  return (
    <div className="w-full max-w-3xl">
      {/* Header */}
      <p className="font-mono text-[11px] text-[#797979] uppercase tracking-wider">
        Account
      </p>
      <h1 className="text-[#ffffff] text-[38px] tracking-[-1.14px] font-normal mt-1">
        Settings
      </h1>

      {/* Company Details */}
      <div className="bg-[#212121] rounded-[12px] p-8 border border-[#353535] mt-8">
        <h2 className="text-[#ffffff] text-[24px] tracking-[-0.24px] font-normal">
          Company Details
        </h2>
        <div className="mt-6 space-y-4">
          <div>
            <label className="font-mono text-[11px] text-[#797979] uppercase tracking-wider mb-2 block">
              Company Name
            </label>
            <input
              type="text"
              defaultValue="ScaleUp.io"
              className="w-full bg-[#0b0b0b] border border-[#353535] rounded-[3px] text-[#b9b9b9] h-[44px] px-3 text-[16px] focus:border-[#f36458] focus:outline-none transition"
            />
          </div>
          <div>
            <label className="font-mono text-[11px] text-[#797979] uppercase tracking-wider mb-2 block">
              Admin Email
            </label>
            <input
              type="email"
              defaultValue="admin@scaleup.io"
              readOnly
              className="w-full bg-[#0b0b0b] border border-[#353535] rounded-[3px] text-[#797979] h-[44px] px-3 text-[16px] cursor-not-allowed"
            />
          </div>
          <div>
            <label className="font-mono text-[11px] text-[#797979] uppercase tracking-wider mb-2 block">
              Website
            </label>
            <input
              type="text"
              defaultValue="https://scaleup.io"
              className="w-full bg-[#0b0b0b] border border-[#353535] rounded-[3px] text-[#b9b9b9] h-[44px] px-3 text-[16px] focus:border-[#f36458] focus:outline-none transition"
            />
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-[#212121] rounded-[12px] p-8 border border-[#353535] mt-4">
        <h2 className="text-[#ffffff] text-[24px] tracking-[-0.24px] font-normal">
          Notifications
        </h2>
        <div className="mt-6 space-y-5">
          {[
            {
              label: "Email notifications",
              desc: "Receive updates about new applicants and messages",
              value: emailNotifications,
              setter: setEmailNotifications,
            },
            {
              label: "Autopilot match alerts",
              desc: "Get notified when new talent matches your criteria",
              value: matchAlerts,
              setter: setMatchAlerts,
            },
            {
              label: "Weekly hiring report",
              desc: "Receive a summary of your pipeline activity every Monday",
              value: weeklyReport,
              setter: setWeeklyReport,
            },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between"
            >
              <div>
                <p className="text-[#ffffff] text-[15px]">{item.label}</p>
                <p className="text-[#797979] text-[13px] mt-0.5">
                  {item.desc}
                </p>
              </div>
              <button
                type="button"
                onClick={() => item.setter(!item.value)}
                className={`relative w-10 h-5 rounded-full transition-colors cursor-pointer ${
                  item.value ? "bg-[#f36458]" : "bg-[#353535]"
                }`}
              >
                <span
                  className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                    item.value ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Billing */}
      <div className="bg-[#212121] rounded-[12px] p-8 border border-[#353535] mt-4">
        <h2 className="text-[#ffffff] text-[24px] tracking-[-0.24px] font-normal">
          Billing
        </h2>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-[#ffffff] text-[15px]">Current plan</p>
            <p className="text-[#37cd84] text-[13px] font-mono uppercase mt-0.5">
              Pro — $199/mo
            </p>
          </div>
          <button className="bg-transparent text-[#b9b9b9] rounded-full h-[36px] px-4 text-[13px] border border-[#353535] hover:text-white hover:border-[#b9b9b9] transition-colors cursor-pointer">
            Manage Billing
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-[#212121] rounded-[12px] p-8 border border-[#dd0000] mt-4">
        <h2 className="text-[#ffffff] text-[24px] tracking-[-0.24px] font-normal">
          Danger Zone
        </h2>
        <p className="text-[#797979] text-[15px] mt-2">
          Permanently delete your company account and all associated data.
        </p>
        <button className="mt-4 text-[#dd0000] text-[15px] font-medium hover:underline cursor-pointer">
          Delete Account
        </button>
      </div>
    </div>
  );
}
