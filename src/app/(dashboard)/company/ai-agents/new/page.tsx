'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const STEPS = ['Choose Template', 'Configure', 'Review & Deploy'];

const TEMPLATES = [
  {
    id: 'cold-outbound',
    name: 'Cold Outbound SDR',
    desc: 'Automated prospecting and outreach via email and LinkedIn',
  },
  {
    id: 'inbound-qualifier',
    name: 'Inbound Qualifier',
    desc: 'Qualify incoming leads via chat and email',
  },
  {
    id: 'meeting-booker',
    name: 'Meeting Booker',
    desc: 'Book qualified meetings into your team\'s calendar',
  },
  {
    id: 'full-cycle',
    name: 'Full Cycle',
    desc: 'End-to-end: prospect, qualify, and book meetings',
  },
];

const TOOLS = [
  { id: 'crm', name: 'CRM', detail: 'HubSpot / Salesforce' },
  { id: 'email', name: 'Email', detail: 'Gmail / Outlook' },
  { id: 'calendar', name: 'Calendar', detail: 'Google / Calendly' },
  { id: 'linkedin', name: 'LinkedIn', detail: 'LinkedIn Sales Navigator' },
];

export default function NewAIAgentPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [agentName, setAgentName] = useState('');
  
  const [connectingTool, setConnectingTool] = useState<string | null>(null);
  const [connectedAccounts, setConnectedAccounts] = useState<Record<string, string>>(() => {
    if (typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem("settercloser_composio_accounts");
        return raw ? JSON.parse(raw) : {};
      } catch {
        return {};
      }
    }
    return {};
  });

  const [connectedTools, setConnectedTools] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem("settercloser_composio_accounts");
        return raw ? Object.keys(JSON.parse(raw)) : [];
      } catch {
        return [];
      }
    }
    return [];
  });

  const [dailyLimit, setDailyLimit] = useState('50');
  const [autonomous, setAutonomous] = useState(false);
  const [operatingHours, setOperatingHours] = useState('9am-6pm EST');

  const toggleTool = (toolId: string) => {
    if (connectedTools.includes(toolId)) {
      setConnectedTools(prev => prev.filter(t => t !== toolId));
      setConnectedAccounts(prev => {
        const next = { ...prev };
        delete next[toolId];
        if (typeof window !== "undefined") {
          localStorage.setItem("settercloser_composio_accounts", JSON.stringify(next));
        }
        return next;
      });
    } else {
      setConnectingTool(toolId);
    }
  };

  const selectedTemplateData = TEMPLATES.find((t) => t.id === selectedTemplate);

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

      {/* Step 1: Choose Template */}
      {step === 0 && (
        <div className="bg-[#212121] rounded-[12px] p-8 border border-[#353535]">
          <h1 className="text-[#ffffff] text-[32px] tracking-[-0.32px] font-normal mb-8">
            Choose a Template
          </h1>

          <div className="grid grid-cols-2 gap-4">
            {TEMPLATES.map((tmpl) => (
              <button
                key={tmpl.id}
                onClick={() => setSelectedTemplate(tmpl.id)}
                className={`bg-[#0b0b0b] border rounded-[5px] p-6 cursor-pointer text-left transition ${
                  selectedTemplate === tmpl.id
                    ? 'border-[#f36458]'
                    : 'border-[#353535]'
                }`}
              >
                <p
                  className={`text-[16px] font-medium mb-2 ${
                    selectedTemplate === tmpl.id ? 'text-[#ffffff]' : 'text-[#b9b9b9]'
                  }`}
                >
                  {tmpl.name}
                </p>
                <p className="text-[#797979] text-[13px] leading-relaxed">{tmpl.desc}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Configure */}
      {step === 1 && (
        <div className="bg-[#212121] rounded-[12px] p-8 border border-[#353535]">
          <h1 className="text-[#ffffff] text-[32px] tracking-[-0.32px] font-normal mb-8">
            Configure Your Agent
          </h1>

          <div className="space-y-6">
            {/* Agent Name */}
            <div>
              <label className="block font-mono text-[11px] text-[#797979] uppercase tracking-wider mb-2">
                Agent Name
              </label>
              <input
                type="text"
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
                className="w-full bg-[#0b0b0b] border border-[#353535] rounded-[3px] h-[44px] text-[#b9b9b9] px-3 focus:border-[#f36458] focus:outline-none transition"
                placeholder="e.g., Aria"
              />
            </div>

            {/* Connected Tools */}
            <div>
              <label className="block font-mono text-[11px] text-[#797979] uppercase tracking-wider mb-2">
                Connected Tools
              </label>
              <p className="text-[#b9b9b9] text-[13px] mb-4">
                Connect your tools to power your agent
              </p>
              <div className="grid grid-cols-2 gap-3">
                {TOOLS.map((tool) => {
                  const isConnected = connectedTools.includes(tool.id);
                  return (
                    <div
                      key={tool.id}
                      className={`bg-[#0b0b0b] border rounded-[5px] p-4 flex items-center justify-between transition ${
                        isConnected ? 'border-[#37cd84]' : 'border-[#353535]'
                      }`}
                    >
                      <div className="min-w-0">
                        <p className="text-[#ffffff] text-[14px]">{tool.name}</p>
                        <p className="text-[#797979] text-[11px] mt-0.5 truncate">
                          {isConnected ? (
                            <span className="text-[#37cd84]">{connectedAccounts[tool.id]}</span>
                          ) : (
                            tool.detail
                          )}
                        </p>
                      </div>
                      <button
                        onClick={() => toggleTool(tool.id)}
                        className={`text-[13px] px-3 py-1 rounded-full border transition cursor-pointer shrink-0 ${
                          isConnected
                            ? 'border-[#37cd84] text-[#37cd84]'
                            : 'border-[#353535] text-[#b9b9b9] hover:border-[#797979]'
                        }`}
                      >
                        {isConnected ? 'Connected' : 'Connect'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Daily outreach limit */}
            <div>
              <label className="block font-mono text-[11px] text-[#797979] uppercase tracking-wider mb-2">
                Daily Outreach Limit
              </label>
              <input
                type="number"
                value={dailyLimit}
                onChange={(e) => setDailyLimit(e.target.value)}
                className="w-full bg-[#0b0b0b] border border-[#353535] rounded-[3px] h-[44px] text-[#b9b9b9] px-3 focus:border-[#f36458] focus:outline-none transition"
              />
            </div>

            {/* Operating Mode */}
            <div className="flex items-center justify-between">
              <div>
                <label className="block font-mono text-[11px] text-[#797979] uppercase tracking-wider">
                  Operating Mode
                </label>
                <p className="text-[#b9b9b9] text-[13px] mt-1">
                  {autonomous ? 'Fully autonomous' : 'Human-in-the-loop'}
                </p>
              </div>
              <button
                onClick={() => setAutonomous(!autonomous)}
                className={`relative w-[52px] h-[28px] rounded-full transition cursor-pointer ${
                  autonomous ? 'bg-[#f36458]' : 'bg-[#353535]'
                }`}
              >
                <div
                  className={`absolute top-[3px] w-[22px] h-[22px] rounded-full bg-[#ffffff] transition-transform ${
                    autonomous ? 'translate-x-[27px]' : 'translate-x-[3px]'
                  }`}
                />
              </button>
            </div>

            {/* Operating Hours */}
            <div>
              <label className="block font-mono text-[11px] text-[#797979] uppercase tracking-wider mb-2">
                Operating Hours
              </label>
              <input
                type="text"
                value={operatingHours}
                onChange={(e) => setOperatingHours(e.target.value)}
                className="w-full bg-[#0b0b0b] border border-[#353535] rounded-[3px] h-[44px] text-[#b9b9b9] px-3 focus:border-[#f36458] focus:outline-none transition"
                placeholder="e.g., 9am-6pm EST"
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Review & Deploy */}
      {step === 2 && (
        <div className="bg-[#212121] rounded-[12px] p-8 border border-[#353535]">
          <h1 className="text-[#ffffff] text-[32px] tracking-[-0.32px] font-normal mb-8">
            Review & Deploy
          </h1>

          <div className="space-y-6">
            <div className="bg-[#0b0b0b] rounded-[5px] p-6 border border-[#353535]">
              <p className="font-mono text-[11px] text-[#797979] uppercase tracking-wider mb-3">Agent Configuration</p>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-[#797979] text-[14px]">Agent Name</span>
                  <span className="text-[#ffffff] text-[14px]">{agentName || '—'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#797979] text-[14px]">Template</span>
                  <span className="text-[#ffffff] text-[14px]">{selectedTemplateData?.name || '—'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#797979] text-[14px]">Daily Limit</span>
                  <span className="text-[#ffffff] text-[14px]">{dailyLimit} contacts/day</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#797979] text-[14px]">Mode</span>
                  <span className="text-[#ffffff] text-[14px]">
                    {autonomous ? 'Fully autonomous' : 'Human-in-the-loop'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#797979] text-[14px]">Operating Hours</span>
                  <span className="text-[#ffffff] text-[14px]">{operatingHours}</span>
                </div>
              </div>
            </div>

            <div className="bg-[#0b0b0b] rounded-[5px] p-6 border border-[#353535]">
              <p className="font-mono text-[11px] text-[#797979] uppercase tracking-wider mb-3">Connected Tools</p>
              {connectedTools.length > 0 ? (
                <div className="space-y-2">
                  {connectedTools.map((toolId) => {
                    const tool = TOOLS.find((t) => t.id === toolId);
                    return (
                      <div
                        key={toolId}
                        className="flex justify-between items-center bg-[#212121] text-[#37cd84] text-[13px] rounded-[5px] px-3 py-2 border border-[#37cd84]/30"
                      >
                        <span className="font-medium text-white">{tool?.name}</span>
                        <span className="font-mono text-[11px] text-[#797979]">{connectedAccounts[toolId]}</span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-[#797979] text-[14px]">No tools connected</p>
              )}
            </div>

            <button
              onClick={() => {
                const newAgent = {
                  name: agentName,
                  template: (selectedTemplateData?.name || selectedTemplate).toUpperCase(),
                  status: 'Active',
                  leadsContacted: 0,
                  replies: 0,
                  meetingsBooked: 0,
                  mode: autonomous ? 'Fully autonomous' : 'Human-in-the-loop',
                };

                if (typeof window !== "undefined") {
                  try {
                    const raw = localStorage.getItem("settercloser_custom_agents");
                    const existing = raw ? JSON.parse(raw) : [];
                    localStorage.setItem(
                      "settercloser_custom_agents",
                      JSON.stringify([...existing, newAgent])
                    );
                  } catch (e) {
                    console.error("Failed to deploy agent:", e);
                  }
                }

                alert(`${agentName} deployed successfully!`);
                router.push('/company/ai-agents');
              }}
              className="w-full bg-[#f36458] text-[#0b0b0b] rounded-full h-[48px] text-[15px] font-medium hover:opacity-90 transition cursor-pointer"
            >
              Deploy Agent
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
            onClick={() => setStep((s) => s + 1)}
            disabled={
              (step === 0 && !selectedTemplate) ||
              (step === 1 && !agentName.trim())
            }
            className={`bg-[#ffffff] text-[#0b0b0b] rounded-full px-8 h-[44px] text-[14px] font-medium hover:opacity-90 transition cursor-pointer ${
              (step === 0 && !selectedTemplate) ||
              (step === 1 && !agentName.trim())
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
          >
            Continue
          </button>
        )}
      </div>

      {/* Composio Authorization Modal */}
      {connectingTool && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#212121] border border-[#353535] rounded-[12px] p-6 max-w-sm w-full">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[#f36458] text-[20px]">⚡</span>
              <h3 className="text-[#ffffff] text-[18px] font-medium">Composio Authorization</h3>
            </div>
            <p className="text-[#b9b9b9] text-[13px] leading-relaxed mb-6">
              Authorize <b>{TOOLS.find(t => t.id === connectingTool)?.name}</b> connection to grant the AI agent secure API access.
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block font-mono text-[11px] text-[#797979] uppercase tracking-wider mb-2">
                  Select Account / Email
                </label>
                <input
                  type="text"
                  id="composio-account-input"
                  defaultValue={
                    connectingTool === 'email' ? 'troyhodinni@gmail.com' :
                    connectingTool === 'crm' ? 'trysettercloser-hubspot' :
                    connectingTool === 'calendar' ? 'troy_cal' :
                    'Troy Hodinni (LinkedIn)'
                  }
                  className="w-full bg-[#0b0b0b] border border-[#353535] rounded-[3px] h-[40px] text-[#b9b9b9] px-3 focus:border-[#f36458] focus:outline-none text-[14px]"
                />
              </div>
              
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setConnectingTool(null)}
                  className="flex-1 border border-[#353535] text-[#b9b9b9] rounded-full h-[40px] text-[13px] font-medium hover:border-[#797979] transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    const inputVal = (document.getElementById('composio-account-input') as HTMLInputElement)?.value || 'Connected Account';
                    setConnectedAccounts(prev => {
                      const next = { ...prev, [connectingTool]: inputVal };
                      if (typeof window !== "undefined") {
                        localStorage.setItem("settercloser_composio_accounts", JSON.stringify(next));
                      }
                      return next;
                    });
                    setConnectedTools(prev => [...prev, connectingTool]);
                    setConnectingTool(null);
                  }}
                  className="flex-1 bg-[#37cd84] text-[#0b0b0b] rounded-full h-[40px] text-[13px] font-medium hover:opacity-90 transition cursor-pointer"
                >
                  Authorize ✓
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
