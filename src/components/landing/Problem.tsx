"use client";

import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";

const OLD_WAY = [
  "Weeks spent posting on job boards",
  "Unvetted candidates waste your time",
  "No way to verify sales track record",
  "Expensive recruitment agency fees",
  "No AI agent option",
];

const NEW_WAY = [
  "Browse pre-vetted talent in minutes",
  "Verified earnings & performance data",
  "Trust scores based on real results",
  "Transparent, no hidden fees",
  "Deploy AI sales agents instantly",
];

export default function Problem() {
  return (
    <section id="features" className="bg-[#0b0b0b] py-[96px]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeIn>
          <div className="mb-16">
            <p className="font-mono text-[13px] text-[#797979] uppercase tracking-[0.05em] mb-6">
              Why SetterCloser
            </p>
            <h2 className="text-[#ffffff] font-normal text-[32px] sm:text-[40px] lg:text-[28px] sm:text-[36px] md:text-[48px] tracking-[-0.84px] md:tracking-[-1.68px] leading-[1.08] max-w-3xl">
              The old way of hiring sales reps is broken
            </h2>
          </div>
        </FadeIn>

        {/* Comparison Grid */}
        <StaggerContainer staggerDelay={0.15} className="grid md:grid-cols-2 gap-6">
          {/* Old Way */}
          <StaggerItem>
            <div className="card-dark">
              <h3 className="text-[24px] text-[#ffffff] tracking-[-0.24px] font-normal mb-6">
                The Old Way
              </h3>
              <ul className="space-y-4">
                {OLD_WAY.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-[#dd0000] font-bold text-[16px] leading-[1.5] shrink-0">
                      ✕
                    </span>
                    <span className="text-[#b9b9b9] text-[16px] leading-[1.5]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </StaggerItem>

          {/* New Way — brand card (coral) */}
          <StaggerItem>
            <div className="card-brand">
              <h3 className="text-[24px] text-[#0b0b0b] tracking-[-0.24px] font-normal mb-6">
                The SetterCloser Way
              </h3>
              <ul className="space-y-4">
                {NEW_WAY.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-[#0b0b0b] font-bold text-[16px] leading-[1.5] shrink-0">
                      ✓
                    </span>
                    <span className="text-[#0b0b0b] text-[16px] leading-[1.5]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
}
