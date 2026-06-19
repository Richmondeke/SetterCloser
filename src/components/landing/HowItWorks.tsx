"use client";

import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";

const STEPS = [
  {
    number: "1",
    title: "Post your role",
    description:
      "Define what you need — setter, closer, or AI agent. Set your compensation model and go live in seconds.",
  },
  {
    number: "2",
    title: "Review verified talent",
    description:
      "Browse profiles with verified earnings, trust scores, and real performance data. No guesswork.",
  },
  {
    number: "3",
    title: "Hire & deploy",
    description:
      "Extend an offer, sign a contract, and start tracking results — all inside SetterCloser.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[#ffffff] py-[96px]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeIn>
          <div className="mb-16">
            <p className="font-mono text-[13px] text-[#797979] uppercase tracking-[0.05em] mb-6">
              How It Works
            </p>
            <h2 className="text-[#0b0b0b] font-normal text-[32px] sm:text-[40px] lg:text-[28px] sm:text-[36px] md:text-[48px] tracking-[-0.84px] md:tracking-[-1.68px] leading-[1.08] max-w-3xl">
              From posting to hiring in three steps
            </h2>
          </div>
        </FadeIn>

        {/* Steps Grid */}
        <StaggerContainer className="relative grid md:grid-cols-3 gap-6">
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 -translate-y-1/2 z-0">
            <div className="mx-16 h-px bg-[#ededed]" />
          </div>

          {STEPS.map((step) => (
            <StaggerItem key={step.number}>
              <div
                className="relative z-10 card-light hover:-translate-y-[2px] hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-all duration-300"
              >
                {/* Watermark Number */}
                <span className="block text-[#0b0b0b] text-[72px] tracking-[-2.88px] font-normal opacity-10 leading-none mb-4 select-none">
                  {step.number}
                </span>

                {/* Title */}
                <h3 className="text-[#0b0b0b] text-[24px] tracking-[-0.24px] font-normal mb-3">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-[#797979] text-[16px] leading-[1.5]">
                  {step.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
