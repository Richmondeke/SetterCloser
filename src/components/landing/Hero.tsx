"use client";

const STATS = [
  { value: "500+", label: "Sales Pros" },
  { value: "120+", label: "Companies" },
  { value: "$2.3M+", label: "Verified Commissions" },
];

export default function Hero() {
  return (
    <section className="bg-[#0b0b0b] min-h-screen flex items-center justify-center pt-[64px]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col items-center text-center">
          {/* Mono Eyebrow */}
          <p
            className="font-mono text-[13px] text-[#797979] uppercase tracking-[0.05em] mb-6 animate-fade-in"
          >
            The Sales Hiring Platform
          </p>

          {/* Main Headline */}
          <h1
            className="text-[#ffffff] font-normal text-[40px] sm:text-[64px] md:text-[80px] lg:text-[112px] leading-[1.0] tracking-[-1.68px] sm:tracking-[-2.88px] lg:tracking-[-4.48px] max-w-5xl animate-slide-up"
          >
            Hire Your SDR Team on Autopilot
          </h1>

          {/* Sub-headline */}
          <p
            className="text-[#b9b9b9] text-[18px] tracking-[-0.18px] leading-[1.5] max-w-xl mt-8 animate-slide-up-delayed"
          >
            Find pre-vetted setters &amp; closers — or deploy an AI sales
            agent — in minutes, not months.
          </p>

          {/* CTA Row */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 animate-slide-up-delayed-2">
            <a href="/sign-up" className="btn-primary w-full sm:w-auto">
              Start Hiring
            </a>
            <a href="/sign-up" className="btn-ghost w-full sm:w-auto">
              I&apos;m a Sales Rep
            </a>
          </div>

          {/* Stats Strip */}
          <div
            className="mt-16 flex items-center justify-center gap-8 sm:gap-12 animate-fade-in"
            style={{ animationDelay: "0.5s" }}
          >
            {STATS.map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-8 sm:gap-12">
                <div className="flex flex-col items-center">
                  <span className="text-[#ffffff] text-[24px] sm:text-[32px] font-normal tracking-tight">
                    {stat.value}
                  </span>
                  <span className="font-mono text-[11px] sm:text-[13px] text-[#797979] uppercase tracking-[0.05em] mt-1">
                    {stat.label}
                  </span>
                </div>
                {i < STATS.length - 1 && (
                  <div className="w-px h-12 bg-[#353535]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
