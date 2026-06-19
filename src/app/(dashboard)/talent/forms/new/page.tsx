"use client";

import { useState } from "react";
import Link from "next/link";

/* ── Field Types ── */
type FieldType = "text" | "email" | "phone" | "url" | "number" | "textarea" | "select" | "date";

interface CustomField {
  id: string;
  label: string;
  type: FieldType;
  placeholder: string;
  required: boolean;
  options: string[]; // for select type
}

const FIELD_TYPE_OPTIONS: { value: FieldType; label: string; icon: string }[] = [
  { value: "text", label: "Short Text", icon: "Aa" },
  { value: "email", label: "Email", icon: "✉" },
  { value: "phone", label: "Phone Number", icon: "📞" },
  { value: "url", label: "URL / Link", icon: "🔗" },
  { value: "number", label: "Number", icon: "#" },
  { value: "textarea", label: "Long Text", icon: "¶" },
  { value: "select", label: "Dropdown", icon: "▾" },
  { value: "date", label: "Date", icon: "📅" },
];

/* ── Preset Templates ── */
const PRESET_FIELDS: { label: string; fields: Omit<CustomField, "id">[] }[] = [
  {
    label: "Discovery Call",
    fields: [
      { label: "Company Size", type: "select", placeholder: "", required: true, options: ["1-10", "11-50", "51-200", "201-500", "500+"] },
      { label: "Current Revenue", type: "select", placeholder: "", required: false, options: ["Pre-revenue", "$0-$100K", "$100K-$500K", "$500K-$1M", "$1M-$5M", "$5M+"] },
      { label: "Biggest Sales Challenge", type: "textarea", placeholder: "What's the #1 challenge your sales team faces?", required: true, options: [] },
      { label: "Decision Timeline", type: "select", placeholder: "", required: true, options: ["Immediately", "Within 2 weeks", "Within 1 month", "Within 3 months", "Just exploring"] },
    ],
  },
  {
    label: "Coaching Intake",
    fields: [
      { label: "Years of Sales Experience", type: "select", placeholder: "", required: true, options: ["<1 year", "1-3 years", "3-5 years", "5-10 years", "10+ years"] },
      { label: "What are you selling?", type: "text", placeholder: "e.g. SaaS, coaching, agency services", required: true, options: [] },
      { label: "Monthly Revenue Goal", type: "text", placeholder: "e.g. $10,000/month", required: false, options: [] },
      { label: "Why are you interested?", type: "textarea", placeholder: "What motivated you to book this call?", required: true, options: [] },
    ],
  },
  {
    label: "Lead Qualification",
    fields: [
      { label: "Job Title", type: "text", placeholder: "e.g. VP of Sales", required: true, options: [] },
      { label: "Company Website", type: "url", placeholder: "https://", required: false, options: [] },
      { label: "Budget Range", type: "select", placeholder: "", required: true, options: ["Under $1K", "$1K-$5K", "$5K-$15K", "$15K-$50K", "$50K+"] },
      { label: "How did you hear about us?", type: "select", placeholder: "", required: false, options: ["LinkedIn", "Twitter/X", "Referral", "Google Search", "Cold Email", "Other"] },
    ],
  },
];

export default function NewFormPage() {
  const [title, setTitle] = useState("");
  const [clientName, setClientName] = useState("");
  const [message, setMessage] = useState("");
  const [duration, setDuration] = useState("30");
  const [generated, setGenerated] = useState(false);
  const [slug, setSlug] = useState("");
  const [copied, setCopied] = useState(false);

  // Custom fields
  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const [showFieldBuilder, setShowFieldBuilder] = useState(false);
  const [newFieldLabel, setNewFieldLabel] = useState("");
  const [newFieldType, setNewFieldType] = useState<FieldType>("text");
  const [newFieldRequired, setNewFieldRequired] = useState(false);
  const [newFieldPlaceholder, setNewFieldPlaceholder] = useState("");
  const [newFieldOptions, setNewFieldOptions] = useState("");

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
  };

  const addCustomField = () => {
    if (!newFieldLabel.trim()) return;
    const field: CustomField = {
      id: `field-${Date.now()}`,
      label: newFieldLabel.trim(),
      type: newFieldType,
      placeholder: newFieldPlaceholder.trim(),
      required: newFieldRequired,
      options: newFieldType === "select" ? newFieldOptions.split(",").map(o => o.trim()).filter(Boolean) : [],
    };
    setCustomFields(prev => [...prev, field]);
    resetFieldBuilder();
  };

  const resetFieldBuilder = () => {
    setNewFieldLabel("");
    setNewFieldType("text");
    setNewFieldRequired(false);
    setNewFieldPlaceholder("");
    setNewFieldOptions("");
    setShowFieldBuilder(false);
  };

  const removeField = (id: string) => {
    setCustomFields(prev => prev.filter(f => f.id !== id));
  };

  const moveField = (index: number, dir: -1 | 1) => {
    const newFields = [...customFields];
    const swapIdx = index + dir;
    if (swapIdx < 0 || swapIdx >= newFields.length) return;
    [newFields[index], newFields[swapIdx]] = [newFields[swapIdx], newFields[index]];
    setCustomFields(newFields);
  };

  const applyPreset = (preset: typeof PRESET_FIELDS[0]) => {
    const fields = preset.fields.map(f => ({
      ...f,
      id: `field-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`,
    }));
    setCustomFields(prev => [...prev, ...fields]);
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
      <h1 className="text-[#ffffff] text-[28px] md:text-[38px] tracking-[-0.84px] md:tracking-[-1.14px] font-normal mt-1">
        Generate Confirmation Link
      </h1>
      <p className="text-[#797979] text-[15px] mt-2">
        Create a unique form link to send to your prospect. When they fill it out, your meeting is automatically confirmed and your earnings are credited.
      </p>

      {/* ── Form ── */}
      <form onSubmit={handleGenerate} className="mt-8 space-y-6">
        {/* Basic Details */}
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

        {/* ═══ Custom Fields Section ═══ */}
        <div className="bg-[#212121] rounded-[12px] p-6 border border-[#353535]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="mono-eyebrow">CUSTOM FIELDS</p>
              <p className="text-[#797979] text-[13px] mt-1">
                Request specific information from your prospect
              </p>
            </div>
            <span className="text-[#797979] text-[12px] font-mono">
              {customFields.length} field{customFields.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Preset Templates */}
          <div className="mb-4">
            <p className="text-[#797979] text-[11px] font-mono uppercase tracking-wider mb-2">Quick Templates</p>
            <div className="flex gap-2 flex-wrap">
              {PRESET_FIELDS.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => applyPreset(preset)}
                  className="border border-[#353535] rounded-full px-3 py-1.5 text-[12px] text-[#b9b9b9] hover:border-[#797979] hover:text-[#ffffff] transition cursor-pointer"
                >
                  + {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Added Fields */}
          {customFields.length > 0 && (
            <div className="space-y-2 mb-4">
              {customFields.map((field, idx) => (
                <div
                  key={field.id}
                  className="bg-[#0b0b0b] rounded-[8px] p-3 border border-[#353535] flex items-center gap-3 group"
                >
                  {/* Drag handle / type icon */}
                  <span className="text-[14px] w-7 h-7 rounded bg-[#212121] flex items-center justify-center shrink-0 text-[#797979] font-mono text-[11px]">
                    {FIELD_TYPE_OPTIONS.find(t => t.value === field.type)?.icon || "Aa"}
                  </span>

                  {/* Label + meta */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[#ffffff] text-[14px] truncate">{field.label}</span>
                      {field.required && (
                        <span className="text-[#f36458] text-[10px] font-mono">REQ</span>
                      )}
                    </div>
                    <span className="text-[#797979] text-[11px] font-mono uppercase">
                      {FIELD_TYPE_OPTIONS.find(t => t.value === field.type)?.label}
                      {field.type === "select" && field.options.length > 0 && ` · ${field.options.length} options`}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                    <button
                      type="button"
                      onClick={() => moveField(idx, -1)}
                      disabled={idx === 0}
                      className="w-6 h-6 flex items-center justify-center rounded text-[#797979] hover:text-[#ffffff] hover:bg-[#353535] transition cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed text-[11px]"
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      onClick={() => moveField(idx, 1)}
                      disabled={idx === customFields.length - 1}
                      className="w-6 h-6 flex items-center justify-center rounded text-[#797979] hover:text-[#ffffff] hover:bg-[#353535] transition cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed text-[11px]"
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      onClick={() => removeField(field.id)}
                      className="w-6 h-6 flex items-center justify-center rounded text-[#797979] hover:text-[#f36458] hover:bg-[#f36458]/10 transition cursor-pointer text-[11px]"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add Field Builder */}
          {showFieldBuilder ? (
            <div className="bg-[#0b0b0b] rounded-[8px] p-4 border border-[#f36458]/30 space-y-4">
              <p className="text-[#ffffff] text-[13px] font-medium">New Field</p>

              {/* Label */}
              <div>
                <label className="font-mono text-[11px] text-[#797979] uppercase tracking-wider block mb-1">
                  Field Label *
                </label>
                <input
                  type="text"
                  value={newFieldLabel}
                  onChange={(e) => setNewFieldLabel(e.target.value)}
                  placeholder="e.g. Company Size, Budget, Job Title"
                  className="w-full bg-[#212121] border border-[#353535] rounded-[3px] h-[40px] text-[#ffffff] px-3 text-[14px] focus:border-[#f36458] focus:outline-none transition placeholder:text-[#353535]"
                />
              </div>

              {/* Type */}
              <div>
                <label className="font-mono text-[11px] text-[#797979] uppercase tracking-wider block mb-1">
                  Field Type
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {FIELD_TYPE_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setNewFieldType(opt.value)}
                      className={`border rounded-[4px] px-2 py-2 text-[11px] cursor-pointer transition flex items-center gap-1.5 justify-center ${
                        newFieldType === opt.value
                          ? "border-[#f36458] text-[#ffffff] bg-[#212121]"
                          : "border-[#353535] text-[#797979] hover:border-[#797979]"
                      }`}
                    >
                      <span>{opt.icon}</span>
                      <span className="truncate">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Placeholder (for text types) */}
              {["text", "email", "phone", "url", "number", "textarea"].includes(newFieldType) && (
                <div>
                  <label className="font-mono text-[11px] text-[#797979] uppercase tracking-wider block mb-1">
                    Placeholder Text
                  </label>
                  <input
                    type="text"
                    value={newFieldPlaceholder}
                    onChange={(e) => setNewFieldPlaceholder(e.target.value)}
                    placeholder="e.g. Enter your company size..."
                    className="w-full bg-[#212121] border border-[#353535] rounded-[3px] h-[40px] text-[#ffffff] px-3 text-[14px] focus:border-[#f36458] focus:outline-none transition placeholder:text-[#353535]"
                  />
                </div>
              )}

              {/* Options (for select type) */}
              {newFieldType === "select" && (
                <div>
                  <label className="font-mono text-[11px] text-[#797979] uppercase tracking-wider block mb-1">
                    Options (comma separated)
                  </label>
                  <input
                    type="text"
                    value={newFieldOptions}
                    onChange={(e) => setNewFieldOptions(e.target.value)}
                    placeholder="e.g. Small, Medium, Large, Enterprise"
                    className="w-full bg-[#212121] border border-[#353535] rounded-[3px] h-[40px] text-[#ffffff] px-3 text-[14px] focus:border-[#f36458] focus:outline-none transition placeholder:text-[#353535]"
                  />
                  {newFieldOptions && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {newFieldOptions.split(",").map((opt, i) => opt.trim() && (
                        <span key={i} className="bg-[#212121] text-[#b9b9b9] text-[11px] rounded-full px-2 py-0.5 border border-[#353535]">
                          {opt.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Required toggle */}
              <div className="flex items-center justify-between">
                <span className="text-[#b9b9b9] text-[13px]">Required field</span>
                <button
                  type="button"
                  onClick={() => setNewFieldRequired(!newFieldRequired)}
                  className={`relative w-9 h-5 rounded-full transition-colors cursor-pointer ${
                    newFieldRequired ? "bg-[#f36458]" : "bg-[#353535]"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                      newFieldRequired ? "translate-x-4" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>

              {/* Builder Actions */}
              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={addCustomField}
                  disabled={!newFieldLabel.trim()}
                  className="bg-[#f36458] text-[#ffffff] rounded-full px-4 py-2 text-[13px] font-medium hover:opacity-90 transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Add Field
                </button>
                <button
                  type="button"
                  onClick={resetFieldBuilder}
                  className="text-[#797979] text-[13px] hover:text-[#ffffff] transition cursor-pointer px-3 py-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowFieldBuilder(true)}
              className="w-full border border-dashed border-[#353535] rounded-[8px] py-3 text-[13px] text-[#797979] hover:border-[#797979] hover:text-[#b9b9b9] transition cursor-pointer"
            >
              + Add Custom Field
            </button>
          )}
        </div>

        {/* ── Preview ── */}
        {customFields.length > 0 && (
          <div className="bg-[#212121] rounded-[12px] p-6 border border-[#353535]">
            <p className="mono-eyebrow mb-4">FORM PREVIEW</p>
            <p className="text-[#797979] text-[13px] mb-4">This is how your prospect will see the fields:</p>
            <div className="space-y-4">
              {/* Default fields */}
              <div className="opacity-50">
                <label className="font-mono text-[11px] text-[#797979] uppercase tracking-wider block mb-1">Full Name *</label>
                <div className="w-full bg-[#0b0b0b] border border-[#353535] rounded-[3px] h-[40px]" />
              </div>
              <div className="opacity-50">
                <label className="font-mono text-[11px] text-[#797979] uppercase tracking-wider block mb-1">Email *</label>
                <div className="w-full bg-[#0b0b0b] border border-[#353535] rounded-[3px] h-[40px]" />
              </div>

              {/* Custom fields preview */}
              {customFields.map((field) => (
                <div key={field.id}>
                  <label className="font-mono text-[11px] text-[#ffffff] uppercase tracking-wider block mb-1">
                    {field.label} {field.required && <span className="text-[#f36458]">*</span>}
                  </label>
                  {field.type === "textarea" ? (
                    <div className="w-full bg-[#0b0b0b] border border-[#55beff]/30 rounded-[3px] h-[60px] flex items-start px-3 pt-2">
                      <span className="text-[#353535] text-[13px]">{field.placeholder || `Enter ${field.label.toLowerCase()}...`}</span>
                    </div>
                  ) : field.type === "select" ? (
                    <div className="w-full bg-[#0b0b0b] border border-[#55beff]/30 rounded-[3px] h-[40px] flex items-center px-3">
                      <span className="text-[#353535] text-[13px]">
                        {field.options.length > 0 ? field.options[0] : "Select an option..."}
                      </span>
                    </div>
                  ) : (
                    <div className="w-full bg-[#0b0b0b] border border-[#55beff]/30 rounded-[3px] h-[40px] flex items-center px-3">
                      <span className="text-[#353535] text-[13px]">{field.placeholder || `Enter ${field.label.toLowerCase()}...`}</span>
                    </div>
                  )}
                </div>
              ))}

              {/* Default fields */}
              <div className="opacity-50">
                <label className="font-mono text-[11px] text-[#797979] uppercase tracking-wider block mb-1">Preferred Meeting Date *</label>
                <div className="w-full bg-[#0b0b0b] border border-[#353535] rounded-[3px] h-[40px]" />
              </div>
            </div>
          </div>
        )}

        {!generated && (
          <button
            type="submit"
            className="bg-[#f36458] text-[#ffffff] rounded-full px-8 py-3 text-[15px] font-medium hover:opacity-90 transition cursor-pointer"
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

          {customFields.length > 0 && (
            <div className="bg-[#0b0b0b] rounded-[8px] p-3 border border-[#353535] mb-4">
              <p className="text-[#797979] text-[11px] font-mono uppercase mb-2">Form includes {customFields.length} custom field{customFields.length !== 1 ? "s" : ""}</p>
              <div className="flex flex-wrap gap-1.5">
                {customFields.map((f) => (
                  <span key={f.id} className="bg-[#212121] text-[#b9b9b9] text-[11px] rounded-full px-2.5 py-0.5 border border-[#353535]">
                    {f.label}
                  </span>
                ))}
              </div>
            </div>
          )}

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
                setCustomFields([]);
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
