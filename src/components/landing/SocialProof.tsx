"use client";

const testimonials = [
  {
    quote:
      "We hired three closers in under a week. The verified earnings data gave us confidence we\u2019d never had with traditional recruiting.",
    name: "Sarah Chen",
    role: "VP Sales at ScaleUp.io",
    initials: "SC",
  },
  {
    quote:
      "The AI agent booked 47 qualified meetings in its first month. It outperformed our junior SDR team by 3x.",
    name: "Marcus Williams",
    role: "Founder at RevOps Labs",
    initials: "MW",
  },
  {
    quote:
      "Finally, a platform that treats sales hiring like a marketplace, not a job board. The trust scores are game-changing.",
    name: "Priya Sharma",
    role: "Head of Growth at CloseFast",
    initials: "PS",
  },
];

export default function SocialProof() {
  return (
    <section className="bg-[#ededed] py-[96px] px-6">
      <div className="max-w-5xl mx-auto">
        {/* Eyebrow */}
        <p className="font-mono text-[13px] text-[#797979] uppercase tracking-wider text-center">
          Trusted By Sales Leaders
        </p>

        {/* Headline */}
        <h2 className="text-[#0b0b0b] text-[48px] tracking-[-1.68px] font-normal text-center mt-4">
          Results that speak for themselves
        </h2>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-[#ffffff] rounded-[12px] p-8 border border-[#ededed]"
            >
              <p className="text-[#0b0b0b] text-[16px] italic leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0b0b0b] flex items-center justify-center text-white text-sm font-medium shrink-0">
                  {t.initials}
                </div>
                <div>
                  <p className="text-[#0b0b0b] text-[15px] font-medium">
                    {t.name}
                  </p>
                  <p className="text-[#797979] text-[13px]">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
