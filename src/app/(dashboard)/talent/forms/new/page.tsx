"use client";

import { useState } from "react";
import Link from "next/link";

export default function NewFormPage() {
  const [title, setTitle] = useState("");
  const [clientName, setClientName] = useState("");
  const [message, setMessage] = useState("");
  const [duration, setDuration] = useState("30");
  const [generated, setGenerated] = useState(false);
  const [slug, setSlug] = useState("");
  const [copied, setCopied] = useState(false);

  const generateSlug = () => {
    return (
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
        .slice(0, 30) +
      "-" +
      Math.random().toString(36).slice(2, 6)
    );
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const newSlug = generateSlug();
    setSlug(newSlug);
    setGenerated(true);
    // TODO: Save to Supabase confirmation_forms table
  };

  const fullLink = `https://settercloser.guava.earth/confirm/${slug}`;

  const copyLink = () => {
    navigator.clipboard.writeText(fullLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-2xl">
      {/* ── Header ── */}
      <div className="flex items-center gap-3 mb-2">
        <Link
          href="/talent/forms"
          className="text-[#797979] hover:text-[#ffffff] transition text-[15px]"
        >
          ← Back
        </Link>
      </div>
      <p className="mono-eyebrow">NEW FORM</p>
      <h1 className="text-[#ffffff] text-[38px] tracking-[-1.14px] font-normal mt-1">
        Generate Confirmation Link
      </h1>
      <p className="text-[#797979] text-[15px] mt-2">
        Create a unique form link to send to your prospect. When they fill it out, your meeting is automatically confirmed and your earnings are credited.
      </p>

      {/* ── Form ── */}
      <form onSubmit={handleGenerate} className="mt-8">
        <div className="bg-[#212121] rounded-[12px] p-6 border border-[#353535] space-y-5">
          <p className="mono-eyebrow">FORM DETAILS</p>

          {/* Title */}
          <div>
            <label className="font-mono text-[11px] text-[#797979] uppercase tracking-wider block mb-1.5">
              Form Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Discovery Call with Acme Corp"
              className="w-full bg-[#0b0b0b] border border-[#353535] rounded-[3px] h-[44px] text-[#ffffff] px-4 text-[15px] focus:border-[#f36458] focus:outline-none transition placeholder:text-[#353535]"
            />
          </div>

          {/* Client Name */}
          <div>
            <label className="font-mono text-[11px] text-[#797979] uppercase tracking-wider block mb-1.5">
              Company / Client Name *
            </label>
            <input
              type="text"
              required
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="e.g. Acme Corp"
              className="w-full bg-[#0b0b0b] border border-[#353535] rounded-[3px] h-[44px] text-[#ffffff] px-4 text-[15px] focus:border-[#f36458] focus:outline-none transition placeholder:text-[#353535]"
            />
          </div>

          {/* Custom Message */}
          <div>
            <label className="font-mono text-[11px] text-[#797979] uppercase tracking-wider block mb-1.5">
              Custom Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              placeholder="Optional message shown to the prospect on the form"
              className="w-full bg-[#0b0b0b] border border-[#353535] rounded-[3px] text-[#ffffff] px-4 py-3 text-[15px] focus:border-[#f36458] focus:outline-none transition resize-none placeholder:text-[#353535]"
            />
          </div>

          {/* Duration */}
          <div>
            <label className="font-mono text-[11px] text-[#797979] uppercase tracking-wider block mb-1.5">
              Meeting Duration
            </label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full bg-[#0b0b0b] border border-[#353535] rounded-[3px] h-[44px] text-[#ffffff] px-4 text-[15px] focus:border-[#f36458] focus:outline-none transition cursor-pointer"
            >
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="45">45 minutes</option>
              <option value="60">60 minutes</option>
            </select>
          </div>
        </div>

        {!generated && (
          <button
            type="submit"
            className="mt-6 bg-[#f36458] text-[#ffffff] rounded-full px-8 py-3 text-[15px] font-medium hover:opacity-90 transition cursor-pointer"
          >
            Generate Link
          </button>
        )}
      </form>

      {/* ── Generated Link ── */}
      {generated && (
        <div className="mt-6 bg-[#212121] rounded-[12px] p-6 border border-[#37cd84]/30 shadow-[0_0_30px_rgba(55,205,132,0.05)]">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-full bg-[#37cd84]/10 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#37cd84" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <span className="text-[#37cd84] text-[15px] font-medium">Link Generated!</span>
          </div>
          <p className="text-[#797979] text-[13px] mb-3">
            Share this link with your prospect. When they fill out the form, your meeting will be automatically confirmed.
          </p>

          {/* Link Box */}
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-[#0b0b0b] border border-[#353535] rounded-[3px] h-[44px] flex items-center px-4 overflow-hidden">
              <span className="text-[#b9b9b9] text-[13px] truncate">{fullLink}</span>
            </div>
            <button
              onClick={copyLink}
              className={`shrink-0 rounded-[3px] h-[44px] px-5 text-[13px] font-medium transition cursor-pointer ${
                copied
                  ? "bg-[#37cd84] text-[#ffffff]"
                  : "bg-[#f36458] text-[#ffffff] hover:opacity-90"
              }`}
            >
              {copied ? "Copied!" : "Copy Link"}
            </button>
          </div>

          <div className="flex gap-4 mt-4">
            <Link
              href="/talent/forms"
              className="text-[#55beff] text-[13px] hover:underline"
            >
              ← View All Forms
            </Link>
            <button
              onClick={() => {
                setGenerated(false);
                setTitle("");
                setClientName("");
                setMessage("");
                setSlug("");
              }}
              className="text-[#797979] text-[13px] hover:text-[#ffffff] transition cursor-pointer"
            >
              Generate Another
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
