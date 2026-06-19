"use client";

import { FadeIn, FadeInLeft, FadeInRight } from "@/components/motion";
import Link from "next/link";

const humanFeatures = [
  "Pre-vetted setters & closers",
  "Verified performance history",
  "Commission-based or salary",
  "Direct messaging & interviews",
  "Flexible contract terms",
];

const aiFeatures = [
  "24/7 autonomous outreach",
  "Advanced AI sales engine",
  "Multi-channel sequences",
  "Pay per qualified meeting",
  "Human-in-the-loop option",
];

export default function DualPath() {
  return (
    <section className="bg-[#0b0b0b] py-12 md:py-[96px] px-4 md:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Eyebrow + Headline */}
        <FadeIn>
          <p className="font-mono text-[13px] text-[#797979] uppercase tracking-wider text-center">
            Choose Your Path
          </p>
          <h2 className="text-[#ffffff] text-[28px] sm:text-[36px] md:text-[48px] tracking-[-0.84px] md:tracking-[-1.68px] font-normal text-center max-w-3xl mx-auto mt-4">
            Human reps or AI agents — your call
          </h2>
        </FadeIn>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6 mt-16">
          {/* Left Card — Hire Human Reps */}
          <FadeInLeft delay={0.1}>
          <div className="bg-[#212121] rounded-[12px] p-8 border border-[#353535] hover:-translate-y-[2px] transition-transform duration-200">
            <h3 className="text-[#ffffff] text-[24px] tracking-[-0.24px] font-normal">
              Hire Human Reps
            </h3>
            <p className="text-[#b9b9b9] text-[16px] mt-2">
              Access a curated marketplace of pre-vetted sales professionals
              with verified track records and transparent earnings history.
            </p>

            <ul className="mt-6 space-y-4">
              {humanFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <span className="text-[#37cd84] text-[16px] leading-6 shrink-0">✓</span>
                  <span className="text-[#b9b9b9] text-[16px]">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Link
                href="/sign-up"
                className="inline-flex items-center justify-center bg-[#ffffff] text-[#0b0b0b] rounded-full h-[44px] px-6 text-[15px] font-medium hover:opacity-90 transition-opacity"
              >
                Browse Talent →
              </Link>
            </div>
          </div>
          </FadeInLeft>

          {/* Right Card — Deploy AI Sales Agents */}
          <FadeInRight delay={0.2}>
          <div className="bg-[#212121] rounded-[12px] p-8 border border-[#353535] hover:-translate-y-[2px] transition-transform duration-200">
            {/* Coral dot accent */}
            <div className="w-2 h-2 rounded-full bg-[#f36458] mb-4" />

            <h3 className="text-[#ffffff] text-[24px] tracking-[-0.24px] font-normal">
              Deploy AI Sales Agents
            </h3>
            <p className="text-[#b9b9b9] text-[16px] mt-2">
              Launch autonomous AI agents that prospect, qualify, and book
              meetings around the clock — built into SetterCloser.
            </p>

            <ul className="mt-6 space-y-4">
              {aiFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <span className="text-[#37cd84] text-[16px] leading-6 shrink-0">✓</span>
                  <span className="text-[#b9b9b9] text-[16px]">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Link
                href="/sign-up"
                className="inline-flex items-center justify-center bg-transparent text-[#b9b9b9] rounded-full h-[44px] px-6 text-[15px] font-medium border border-[#353535] hover:text-white hover:border-[#b9b9b9] transition-colors"
              >
                Deploy an Agent →
              </Link>
            </div>
          </div>
          </FadeInRight>
        </div>
      </div>
    </section>
  );
}
