"use client";

import { FadeIn } from "@/components/motion";

const productLinks = [
  "Browse Talent",
  "AI Agents",
  "Pricing",
  "Verified Earnings",
  "API",
];

const companyLinks = ["About", "Blog", "Careers", "Press"];

const resourceLinks = ["Documentation", "Help Center", "Community", "Status"];

const legalLinks = ["Privacy", "Terms", "Security", "Cookie Policy"];

const socialLinks = ["Twitter", "LinkedIn", "GitHub", "Discord"];

export default function Footer() {
  return (
    <footer className="bg-[#0b0b0b] py-10 md:py-[64px] px-4 md:px-6 border-t border-[#353535]">
      <FadeIn>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 md:gap-12">
          {/* Brand lockup — spans 2 columns */}
          <div className="md:col-span-2">
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-[#f36458] inline-block" />
              <span className="text-[#ffffff] text-lg font-normal tracking-tight ml-2">
                SetterCloser
              </span>
            </div>
            <p className="text-[#797979] text-[15px] mt-4 max-w-xs">
              The hiring platform for sales setters, closers, and AI agents.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-mono text-[11px] text-[#797979] uppercase tracking-wider mb-4">
              Product
            </h4>
            {productLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-[#b9b9b9] text-[13px] hover:text-white transition-colors block mb-3"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Company */}
          <div>
            <h4 className="font-mono text-[11px] text-[#797979] uppercase tracking-wider mb-4">
              Company
            </h4>
            {companyLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-[#b9b9b9] text-[13px] hover:text-white transition-colors block mb-3"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-mono text-[11px] text-[#797979] uppercase tracking-wider mb-4">
              Resources
            </h4>
            {resourceLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-[#b9b9b9] text-[13px] hover:text-white transition-colors block mb-3"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-mono text-[11px] text-[#797979] uppercase tracking-wider mb-4">
              Legal
            </h4>
            {legalLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-[#b9b9b9] text-[13px] hover:text-white transition-colors block mb-3"
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom strip */}
        <div className="mt-16 pt-8 border-t border-[#353535] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[#797979] text-[13px]">
            &copy; 2026 SetterCloser. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {socialLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-[#797979] text-[13px] hover:text-white transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
      </FadeIn>
    </footer>
  );
}
