"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

export default function ConfirmFormPage() {
  const params = useParams();
  const formId = params.formId as string;

  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    meetingDate: "",
    meetingLink: "",
    notes: "",
  });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Save to Supabase confirmation_forms table
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0b0b0b] flex items-center justify-center px-4">
        <div className="max-w-lg w-full text-center">
          <div className="w-16 h-16 rounded-full bg-[#37cd84]/10 flex items-center justify-center mx-auto mb-6">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#37cd84" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h1 className="text-[#ffffff] text-[28px] font-normal tracking-[-0.28px]">
            Meeting Confirmed!
          </h1>
          <p className="text-[#b9b9b9] text-[16px] mt-3 max-w-sm mx-auto">
            Your meeting details have been received. Your sales rep will follow up with a calendar invite shortly.
          </p>
          <div className="mt-8 bg-[#212121] rounded-[12px] p-6 border border-[#353535] text-left">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-[#797979] text-[13px]">Name</span>
                <span className="text-[#ffffff] text-[13px]">{form.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#797979] text-[13px]">Company</span>
                <span className="text-[#ffffff] text-[13px]">{form.company}</span>
              </div>
              {form.meetingDate && (
                <div className="flex justify-between">
                  <span className="text-[#797979] text-[13px]">Meeting</span>
                  <span className="text-[#ffffff] text-[13px]">
                    {new Date(form.meetingDate).toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </div>
          <p className="text-[#797979] text-[11px] font-mono mt-8">
            REF: {formId}
          </p>
          <p className="text-[#353535] text-[11px] mt-4">Powered by SetterCloser</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0b0b] flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full">
        {/* Branding */}
        <div className="flex items-center gap-2 justify-center mb-8">
          <span className="w-2 h-2 rounded-full bg-[#f36458]" />
          <span className="text-[15px] font-medium text-[#ffffff] tracking-[-0.2px]">
            SetterCloser
          </span>
        </div>

        {/* Form Card */}
        <div className="bg-[#212121] rounded-[16px] p-8 border border-[#353535] shadow-[0_0_60px_rgba(243,100,88,0.04)]">
          <p className="font-mono text-[11px] text-[#797979] uppercase tracking-wider text-center">
            Meeting Confirmation
          </p>
          <h1 className="text-[#ffffff] text-[28px] font-normal tracking-[-0.28px] text-center mt-2">
            Confirm Your Meeting
          </h1>
          <p className="text-[#797979] text-[15px] text-center mt-2 max-w-sm mx-auto">
            Please fill out the details below to confirm your upcoming meeting.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            {/* Name */}
            <div>
              <label className="font-mono text-[11px] text-[#797979] uppercase tracking-wider block mb-1.5">
                Your Name *
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="John Smith"
                className="w-full bg-[#0b0b0b] border border-[#353535] rounded-[3px] h-[44px] text-[#ffffff] px-4 text-[15px] focus:border-[#f36458] focus:outline-none transition placeholder:text-[#353535]"
              />
            </div>

            {/* Email */}
            <div>
              <label className="font-mono text-[11px] text-[#797979] uppercase tracking-wider block mb-1.5">
                Your Email *
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="john@company.com"
                className="w-full bg-[#0b0b0b] border border-[#353535] rounded-[3px] h-[44px] text-[#ffffff] px-4 text-[15px] focus:border-[#f36458] focus:outline-none transition placeholder:text-[#353535]"
              />
            </div>

            {/* Company */}
            <div>
              <label className="font-mono text-[11px] text-[#797979] uppercase tracking-wider block mb-1.5">
                Your Company *
              </label>
              <input
                type="text"
                required
                value={form.company}
                onChange={(e) => update("company", e.target.value)}
                placeholder="Acme Corp"
                className="w-full bg-[#0b0b0b] border border-[#353535] rounded-[3px] h-[44px] text-[#ffffff] px-4 text-[15px] focus:border-[#f36458] focus:outline-none transition placeholder:text-[#353535]"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="font-mono text-[11px] text-[#797979] uppercase tracking-wider block mb-1.5">
                Phone Number
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full bg-[#0b0b0b] border border-[#353535] rounded-[3px] h-[44px] text-[#ffffff] px-4 text-[15px] focus:border-[#f36458] focus:outline-none transition placeholder:text-[#353535]"
              />
            </div>

            {/* Meeting Date */}
            <div>
              <label className="font-mono text-[11px] text-[#797979] uppercase tracking-wider block mb-1.5">
                Preferred Meeting Date & Time *
              </label>
              <input
                type="datetime-local"
                required
                value={form.meetingDate}
                onChange={(e) => update("meetingDate", e.target.value)}
                className="w-full bg-[#0b0b0b] border border-[#353535] rounded-[3px] h-[44px] text-[#ffffff] px-4 text-[15px] focus:border-[#f36458] focus:outline-none transition [color-scheme:dark]"
              />
            </div>

            {/* Meeting Link */}
            <div>
              <label className="font-mono text-[11px] text-[#797979] uppercase tracking-wider block mb-1.5">
                Meeting Link
              </label>
              <input
                type="url"
                value={form.meetingLink}
                onChange={(e) => update("meetingLink", e.target.value)}
                placeholder="Zoom, Google Meet, or Calendly link"
                className="w-full bg-[#0b0b0b] border border-[#353535] rounded-[3px] h-[44px] text-[#ffffff] px-4 text-[15px] focus:border-[#f36458] focus:outline-none transition placeholder:text-[#353535]"
              />
            </div>

            {/* Notes */}
            <div>
              <label className="font-mono text-[11px] text-[#797979] uppercase tracking-wider block mb-1.5">
                Additional Notes
              </label>
              <textarea
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
                rows={3}
                placeholder="Anything you'd like us to know..."
                className="w-full bg-[#0b0b0b] border border-[#353535] rounded-[3px] text-[#ffffff] px-4 py-3 text-[15px] focus:border-[#f36458] focus:outline-none transition resize-none placeholder:text-[#353535]"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-[#f36458] text-[#ffffff] rounded-full h-[48px] text-[15px] font-medium hover:opacity-90 transition cursor-pointer mt-2"
            >
              Confirm Meeting
            </button>
          </form>

          <p className="text-[#353535] text-[11px] text-center mt-6 font-mono">
            REF: {formId}
          </p>
        </div>

        <p className="text-[#353535] text-[11px] text-center mt-6">
          Powered by SetterCloser
        </p>
      </div>
    </div>
  );
}
