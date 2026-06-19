'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Play, Square, Terminal, Send, Search, CheckCircle, ArrowRight, Loader2, Sparkles, Database, Mail, Phone, CreditCard, HelpCircle } from 'lucide-react';

interface LogEntry {
  id: string;
  timestamp: string;
  type: 'info' | 'success' | 'warning' | 'tool';
  message: string;
  category: 'system' | 'apify' | 'crm' | 'outreach' | 'payment';
}

interface ScrapedLead {
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  status: 'scraped' | 'crm_added' | 'email_sent' | 'replied' | 'paid';
}

export default function AgentPlaygroundPage() {
  const [prompt, setPrompt] = useState(
    "Given our $5,000/mo SDR automation offer, scrape B2B SaaS founders in San Francisco, add them to our CRM, send a personalized email, and provide a pilot payment link if they show interest."
  );
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [leads, setLeads] = useState<ScrapedLead[]>([]);
  const [campaignStats, setCampaignStats] = useState({
    scraped: 0,
    crm: 0,
    emailed: 0,
    closed: 0,
  });

  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  const addLog = (message: string, type: LogEntry['type'] = 'info', category: LogEntry['category'] = 'system') => {
    const newLog: LogEntry = {
      id: Math.random().toString(),
      timestamp: new Date().toLocaleTimeString(),
      type,
      message,
      category,
    };
    setLogs((prev) => [...prev, newLog]);
  };

  const runCampaign = async () => {
    setIsRunning(true);
    setLogs([]);
    setLeads([]);
    setCampaignStats({ scraped: 0, crm: 0, emailed: 0, closed: 0 });
    
    // Step 0: Initializing
    setCurrentStep(0);
    addLog("Initializing autonomous AI agent workflow...", 'info', 'system');
    await delay(1200);
    addLog("Analyzing offer: '$5,000/mo SDR automation pilot'...", 'info', 'system');
    await delay(1000);
    addLog("Generated Ideal Customer Persona (ICP): B2B SaaS Founders, Location: San Francisco, Team Size: 10-50.", 'success', 'system');
    await delay(1500);

    // Step 1: Scrape Leads (Apify)
    setCurrentStep(1);
    addLog("Invoking Apify Actor: @apify/linkedin-people-scraper...", 'tool', 'apify');
    await delay(2000);
    addLog("Apify: Querying LinkedIn for 'Founder' + 'SaaS' + 'San Francisco'...", 'info', 'apify');
    await delay(1800);
    
    const initialLeads: ScrapedLead[] = [
      { name: "Sarah Jenkins", title: "Founder & CEO", company: "FlowState AI", email: "sarah@flowstate.io", phone: "+1 (415) 555-0192", status: 'scraped' },
      { name: "David Miller", title: "Co-Founder", company: "HyperScale", email: "david@hyperscale.co", phone: "+1 (415) 555-0143", status: 'scraped' },
      { name: "Elena Rostova", title: "CEO", company: "ZetaAuth", email: "elena@zetaauth.com", phone: "+1 (415) 555-0188", status: 'scraped' },
    ];
    setLeads(initialLeads);
    setCampaignStats(prev => ({ ...prev, scraped: 3 }));
    addLog(`Apify: Successfully scraped ${initialLeads.length} leads.`, 'success', 'apify');
    await delay(1500);

    // Step 2: CRM Integration
    setCurrentStep(2);
    addLog("Connecting to CRM (HubSpot API)...", 'tool', 'crm');
    await delay(1200);
    
    setLeads(prev => prev.map(l => ({ ...l, status: 'crm_added' })));
    setCampaignStats(prev => ({ ...prev, crm: 3 }));
    addLog("CRM: Created contacts and sync completed for Sarah Jenkins, David Miller, and Elena Rostova.", 'success', 'crm');
    addLog("CRM: Created Deal Pipelines: '$5k SDR Pilot Campaign'.", 'info', 'crm');
    await delay(1800);

    // Step 3: Outreach (Emails & Calls)
    setCurrentStep(3);
    addLog("Drafting highly personalized cold email templates utilizing GPT-4o...", 'info', 'outreach');
    await delay(1500);
    
    addLog("Outreach: Sending email to sarah@flowstate.io...", 'tool', 'outreach');
    setLeads(prev => prev.map((l, i) => i === 0 ? { ...l, status: 'email_sent' } : l));
    setCampaignStats(prev => ({ ...prev, emailed: 1 }));
    await delay(1000);
    
    addLog("Outreach: Sending email to david@hyperscale.co...", 'tool', 'outreach');
    setLeads(prev => prev.map((l, i) => i === 1 ? { ...l, status: 'email_sent' } : l));
    setCampaignStats(prev => ({ ...prev, emailed: 2 }));
    await delay(1000);

    addLog("Outreach: Sending email to elena@zetaauth.com...", 'tool', 'outreach');
    setLeads(prev => prev.map((l, i) => i === 2 ? { ...l, status: 'email_sent' } : l));
    setCampaignStats(prev => ({ ...prev, emailed: 3 }));
    await delay(1500);

    addLog("Outreach: All emails sent. Monitoring replies...", 'info', 'outreach');
    await delay(2000);

    // Simulated reply
    addLog("Notification: Reply received from Sarah Jenkins (FlowState AI)!", 'success', 'outreach');
    setLeads(prev => prev.map((l, i) => i === 0 ? { ...l, status: 'replied' } : l));
    addLog("Sarah: 'Hey Aria, this actually sounds perfect. We need this next week. Send over a payment link to lock in the setup.'", 'info', 'outreach');
    await delay(2000);

    // Step 4: Closing & Payment Link
    setCurrentStep(4);
    addLog("Payment: Generating Stripe checkout link for '$5,000/mo setup'...", 'tool', 'payment');
    await delay(1500);
    addLog("Payment: Generated link: https://checkout.stripe.com/pay/trysettercloser_flowstate_sdr", 'info', 'payment');
    addLog("Payment: Automatically sent checkout link to sarah@flowstate.io.", 'success', 'payment');
    await delay(2200);

    addLog("Stripe Webhook: Received successful payment confirmation of $5,000 from FlowState AI!", 'success', 'payment');
    setLeads(prev => prev.map((l, i) => i === 0 ? { ...l, status: 'paid' } : l));
    setCampaignStats(prev => ({ ...prev, closed: 1 }));
    addLog("CRM: Updated deal status for FlowState AI to 'CLOSED WON'.", 'success', 'crm');
    await delay(1500);

    addLog("Autonomous campaign successfully completed! Closed 1 deal ($5,000 ARR added).", 'success', 'system');
    setIsRunning(false);
  };

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  return (
    <div>
      <div className="flex items-center gap-2">
        <Link href="/company/ai-agents" className="text-[#797979] hover:text-[#ffffff] transition text-sm">
          ← AI Agents
        </Link>
      </div>

      <div className="flex items-center justify-between mt-3">
        <div>
          <p className="font-mono text-[11px] text-[#797979] uppercase tracking-wider">Playground</p>
          <h1 className="text-[#ffffff] text-[38px] font-normal tracking-[-0.38px] mt-1 flex items-center gap-2">
            End-to-End Sales Workspace <Sparkles className="w-6 h-6 text-[#f36458] animate-pulse" />
          </h1>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mt-8">
        {/* Left Column: Configuration & Trigger */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#212121] rounded-[12px] p-6 border border-[#353535] h-full">
            <h3 className="text-[#ffffff] text-[18px] font-medium flex items-center gap-2">
              Prompt Agent Workflows
            </h3>
            <p className="text-[#797979] text-[13px] mt-1 leading-relaxed">
              Describe your offer, criteria, and CRM integration requirements. The agent will run autonomously.
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <label className="block font-mono text-[11px] text-[#797979] uppercase tracking-wider mb-2">
                  Campaign Instruction Prompt
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  disabled={isRunning}
                  rows={6}
                  className="w-full bg-[#0b0b0b] border border-[#353535] rounded-[5px] text-[#b9b9b9] p-4 text-[14px] focus:border-[#f36458] focus:outline-none transition resize-none disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] text-[#797979] uppercase tracking-wider mb-2">
                  Integration Stack
                </label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-[#0b0b0b] border border-[#353535] rounded-[5px]">
                    <div className="flex items-center gap-2">
                      <Search className="w-4 h-4 text-[#f36458]" />
                      <span className="text-[13px] text-[#ffffff]">Apify Lead Scraping</span>
                    </div>
                    <span className="text-[11px] text-[#37cd84] font-mono uppercase bg-[#37cd84]/10 px-2 py-0.5 rounded">Active</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-[#0b0b0b] border border-[#353535] rounded-[5px]">
                    <div className="flex items-center gap-2">
                      <Database className="w-4 h-4 text-[#55beff]" />
                      <span className="text-[13px] text-[#ffffff]">HubSpot CRM Sync</span>
                    </div>
                    <span className="text-[11px] text-[#37cd84] font-mono uppercase bg-[#37cd84]/10 px-2 py-0.5 rounded">Active</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-[#0b0b0b] border border-[#353535] rounded-[5px]">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-[#e9c46a]" />
                      <span className="text-[13px] text-[#ffffff]">Stripe Payment Links</span>
                    </div>
                    <span className="text-[11px] text-[#37cd84] font-mono uppercase bg-[#37cd84]/10 px-2 py-0.5 rounded">Active</span>
                  </div>
                </div>
              </div>

              {!isRunning ? (
                <button
                  onClick={runCampaign}
                  className="w-full bg-[#f36458] text-[#0b0b0b] rounded-full h-[48px] text-[15px] font-medium hover:opacity-90 transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4 fill-current" /> Trigger Agent Campaign
                </button>
              ) : (
                <button
                  disabled
                  className="w-full bg-[#353535] text-[#797979] rounded-full h-[48px] text-[15px] font-medium cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Loader2 className="w-4 h-4 animate-spin" /> Agent Closing Deals...
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Execution Terminal & Output */}
        <div className="lg:col-span-2 space-y-6">
          {/* Progress Tracker */}
          <div className="bg-[#212121] rounded-[12px] p-6 border border-[#353535]">
            <h3 className="text-[#ffffff] text-[15px] font-medium uppercase tracking-wider font-mono">Workflow Status</h3>
            <div className="grid grid-cols-5 gap-2 mt-4 text-center">
              {[
                { label: 'Scraping', icon: Search, index: 1 },
                { label: 'CRM Upload', icon: Database, index: 2 },
                { label: 'Outreach', icon: Mail, index: 3 },
                { label: 'Followup', icon: Phone, index: 3 },
                { label: 'Closed Won', icon: CreditCard, index: 4 }
              ].map((stepInfo, idx) => {
                const isActive = currentStep === stepInfo.index || (stepInfo.index === 3 && currentStep === 3);
                const isCompleted = currentStep > stepInfo.index;
                return (
                  <div key={idx} className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 ${
                      isCompleted ? 'bg-[#37cd84]/15 border-[#37cd84] text-[#37cd84]' :
                      isActive ? 'bg-[#f36458]/15 border-[#f36458] text-[#f36458] animate-pulse' :
                      'border-[#353535] text-[#797979]'
                    }`}>
                      <stepInfo.icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[11px] font-mono mt-2 ${isActive ? 'text-[#ffffff]' : 'text-[#797979]'}`}>
                      {stepInfo.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Terminal / Real-time Logs */}
          <div className="bg-[#0b0b0b] rounded-[12px] border border-[#353535] overflow-hidden flex flex-col h-[320px]">
            <div className="bg-[#212121] px-4 py-3 border-b border-[#353535] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#797979]" />
                <span className="text-[#ffffff] text-[13px] font-mono font-medium">agent_execution_logs.sh</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
              </div>
            </div>
            <div className="p-4 flex-1 overflow-y-auto font-mono text-[12px] space-y-2.5">
              {logs.length === 0 && (
                <div className="text-[#797979] text-center py-16">
                  Agent idle. Input prompt and trigger campaign to start.
                </div>
              )}
              {logs.map((log) => {
                let colorClass = 'text-[#b9b9b9]';
                if (log.type === 'success') colorClass = 'text-[#37cd84]';
                if (log.type === 'warning') colorClass = 'text-[#e9c46a]';
                if (log.type === 'tool') colorClass = 'text-[#55beff]';

                return (
                  <div key={log.id} className="flex items-start gap-2 leading-relaxed">
                    <span className="text-[#797979] select-none">[{log.timestamp}]</span>
                    <span className={`${colorClass}`}>
                      {log.type === 'tool' ? '⚡ ' : ''}
                      {log.message}
                    </span>
                  </div>
                );
              })}
              <div ref={logsEndRef} />
            </div>
          </div>

          {/* Output: Scraped & Contacted Leads */}
          <div className="bg-[#212121] rounded-[12px] p-6 border border-[#353535]">
            <div className="flex items-center justify-between">
              <h3 className="text-[#ffffff] text-[16px] font-medium">Scraped & Enrolled Leads</h3>
              <div className="flex items-center gap-4 text-[12px] font-mono">
                <span className="text-[#797979]">Scraped: <b className="text-[#ffffff]">{campaignStats.scraped}</b></span>
                <span className="text-[#797979]">CRM: <b className="text-[#ffffff]">{campaignStats.crm}</b></span>
                <span className="text-[#797979]">Emailed: <b className="text-[#ffffff]">{campaignStats.emailed}</b></span>
                <span className="text-[#797979]">Paid: <b className="text-[#37cd84]">{campaignStats.closed}</b></span>
              </div>
            </div>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#353535] text-[11px] font-mono text-[#797979] uppercase">
                    <th className="pb-2">Name</th>
                    <th className="pb-2">Company</th>
                    <th className="pb-2">Contact Info</th>
                    <th className="pb-2 text-right">Workflow Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#353535] text-[13px]">
                  {leads.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-6 text-center text-[#797979] font-mono">
                        No leads scraped yet.
                      </td>
                    </tr>
                  ) : (
                    leads.map((lead, idx) => (
                      <tr key={idx} className="hover:bg-[#0b0b0b]/20 transition">
                        <td className="py-3">
                          <p className="text-[#ffffff] font-medium">{lead.name}</p>
                          <p className="text-[#797979] text-[11px]">{lead.title}</p>
                        </td>
                        <td className="py-3 text-[#b9b9b9]">{lead.company}</td>
                        <td className="py-3 font-mono text-[11px]">
                          <p className="text-[#ffffff]">{lead.email}</p>
                          <p className="text-[#797979]">{lead.phone}</p>
                        </td>
                        <td className="py-3 text-right">
                          <span className={`inline-flex items-center gap-1 text-[11px] font-mono uppercase px-2 py-0.5 rounded ${
                            lead.status === 'paid' ? 'bg-[#37cd84]/10 text-[#37cd84]' :
                            lead.status === 'replied' ? 'bg-[#e9c46a]/10 text-[#e9c46a]' :
                            lead.status === 'email_sent' ? 'bg-[#55beff]/10 text-[#55beff]' :
                            'bg-[#353535]/30 text-[#b9b9b9]'
                          }`}>
                            {lead.status === 'paid' && 'Paid $5,000 Won'}
                            {lead.status === 'replied' && 'Replied / Link Sent'}
                            {lead.status === 'email_sent' && 'Emailed / Enrolled'}
                            {lead.status === 'crm_added' && 'Sync to CRM'}
                            {lead.status === 'scraped' && 'Scraped'}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
