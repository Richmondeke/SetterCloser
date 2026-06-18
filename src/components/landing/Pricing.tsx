"use client";

const starterFeatures = [
  "Browse talent profiles",
  "1 active job posting",
  "Basic search & filters",
  "In-app messaging",
  "Community support",
];

const proFeatures = [
  "Everything in Starter",
  "Unlimited job postings",
  "Verified earnings analytics",
  "1 AI sales agent",
  "Priority support",
  "Hiring pipeline management",
];

const enterpriseFeatures = [
  "Everything in Pro",
  "Unlimited AI agents",
  "White-label deployment",
  "Dedicated account manager",
  "API access",
  "Custom integrations",
  "SLA guarantee",
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-[#ffffff] py-[96px] px-6">
      <div className="max-w-5xl mx-auto">
        {/* Eyebrow */}
        <p className="font-mono text-[13px] text-[#797979] uppercase tracking-wider text-center">
          Pricing
        </p>

        {/* Headline */}
        <h2 className="text-[#0b0b0b] text-[48px] tracking-[-1.68px] font-normal text-center mt-4">
          Simple, transparent pricing
        </h2>

        {/* Subtitle */}
        <p className="text-[#797979] text-[18px] text-center mt-4">
          Start free. Scale when you&apos;re ready.
        </p>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-16 items-start">
          {/* Starter */}
          <div className="bg-[#ffffff] border border-[#ededed] rounded-[12px] p-8">
            <h3 className="text-[#0b0b0b] text-[24px] tracking-[-0.24px] font-normal">
              Starter
            </h3>
            <p className="text-[#0b0b0b] text-[48px] tracking-[-1.68px] font-normal mt-2">
              Free
            </p>
            <p className="text-[#797979] text-[16px] mt-2">
              For sales leaders exploring the marketplace
            </p>

            <a
              href="/sign-up"
              className="mt-6 w-full inline-flex items-center justify-center bg-[#0b0b0b] text-[#ffffff] rounded-full h-[44px] px-6 text-[15px] font-medium hover:opacity-90 transition-opacity"
            >
              Get Started
            </a>

            <ul className="mt-8 space-y-3">
              {starterFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <span className="text-[#37cd84] text-[15px] leading-6 shrink-0">✓</span>
                  <span className="text-[#0b0b0b] text-[15px]">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pro — Featured (inverted polarity) */}
          <div className="bg-[#0b0b0b] rounded-[12px] p-8">
            <h3 className="text-[#ffffff] text-[24px] tracking-[-0.24px] font-normal">
              Pro
            </h3>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-[#ffffff] text-[48px] tracking-[-1.68px] font-normal">
                $199
              </span>
              <span className="text-[#b9b9b9] text-[18px]">/mo</span>
            </div>
            <p className="text-[#b9b9b9] text-[16px] mt-2">
              For teams scaling their sales pipeline
            </p>

            <a
              href="/sign-up"
              className="mt-6 w-full inline-flex items-center justify-center bg-[#f36458] text-[#0b0b0b] rounded-full h-[44px] px-6 text-[15px] font-medium hover:opacity-90 transition-opacity"
            >
              Start Free Trial
            </a>

            <ul className="mt-8 space-y-3">
              {proFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <span className="text-[#37cd84] text-[15px] leading-6 shrink-0">✓</span>
                  <span className="text-[#ffffff] text-[15px]">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Enterprise */}
          <div className="bg-[#ffffff] border border-[#ededed] rounded-[12px] p-8">
            <h3 className="text-[#0b0b0b] text-[24px] tracking-[-0.24px] font-normal">
              Enterprise
            </h3>
            <p className="text-[#0b0b0b] text-[48px] tracking-[-1.68px] font-normal mt-2">
              Custom
            </p>
            <p className="text-[#797979] text-[16px] mt-2">
              For organizations with advanced needs
            </p>

            <a
              href="/sign-up"
              className="mt-6 w-full inline-flex items-center justify-center bg-[#0b0b0b] text-[#ffffff] rounded-full h-[44px] px-6 text-[15px] font-medium hover:opacity-90 transition-opacity"
            >
              Contact Sales
            </a>

            <ul className="mt-8 space-y-3">
              {enterpriseFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <span className="text-[#37cd84] text-[15px] leading-6 shrink-0">✓</span>
                  <span className="text-[#0b0b0b] text-[15px]">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
