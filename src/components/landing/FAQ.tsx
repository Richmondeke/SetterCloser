"use client";

import { useState } from "react";
import { FadeIn } from "@/components/motion";

const faqs = [
  {
    question: "What types of sales reps can I find?",
    answer:
      "SetterCloser connects you with pre-vetted appointment setters (SDRs), closers, and hybrid reps across B2B SaaS, coaching, e-commerce, and agency verticals. Every rep on the platform has been screened for communication skills, sales framework proficiency, and track record.",
  },
  {
    question: "How does the verified earnings system work?",
    answer:
      "When a setter books a meeting or a closer signs a deal, they log it in SetterCloser. The hiring company then confirms the activity took place. We cross-reference this with calendar integrations and CRM data to build a verified performance history \u2014 like a credit score for sales professionals.",
  },
  {
    question: "What is an AI Sales Agent?",
    answer:
      "An AI Sales Agent is an autonomous SDR built into SetterCloser that handles prospecting, personalized outreach, lead qualification, and meeting scheduling \u2014 24 hours a day, 7 days a week. You configure it with your ICP, messaging, and CRM, and it starts working immediately.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Browsing talent and posting your first job is free. Our Pro plan at $199/mo unlocks unlimited postings, verified analytics, and your first AI sales agent. Enterprise plans are custom-priced for larger teams.",
  },
  {
    question: "Can I try before I commit?",
    answer:
      "Absolutely. Start with our free Starter plan to browse the marketplace and post a role. Upgrade to Pro when you\u2019re ready to access verified data and AI agents \u2014 you can cancel anytime.",
  },
  {
    question: "How quickly can I hire someone?",
    answer:
      "Most companies find qualified candidates within 48 hours of posting. Since every rep on SetterCloser has a verified profile with real performance data, the typical time-to-hire is 3\u20135 days \u2014 compared to 4\u20138 weeks with traditional recruiting.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-[#0b0b0b] py-12 md:py-[96px] px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Eyebrow + Headline */}
        <FadeIn>
          <p className="font-mono text-[13px] text-[#797979] uppercase tracking-wider text-center">
            FAQ
          </p>
          <h2 className="text-[#ffffff] text-[28px] sm:text-[36px] md:text-[48px] tracking-[-0.84px] md:tracking-[-1.68px] font-normal text-center mt-4">
            Questions &amp; answers
          </h2>
        </FadeIn>

        {/* Accordion */}
        <div className="mt-16">
          {faqs.map((faq, index) => (
            <FadeIn key={index} delay={index * 0.05}>
            <div className="border-b border-[#353535]">
              <button
                onClick={() => toggle(index)}
                className="flex justify-between items-center py-6 w-full text-left group"
              >
                <span className="text-[#ffffff] text-[18px] tracking-[-0.18px] font-normal pr-8">
                  {faq.question}
                </span>
                <span
                  className={`text-[#b9b9b9] text-[24px] leading-none shrink-0 transition-transform duration-200 ${
                    openIndex === index ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              <div
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{
                  maxHeight: openIndex === index ? "400px" : "0px",
                  opacity: openIndex === index ? 1 : 0,
                }}
              >
                <p className="text-[#b9b9b9] text-[16px] leading-relaxed pb-6">
                  {faq.answer}
                </p>
              </div>
            </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
