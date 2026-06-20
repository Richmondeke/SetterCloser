"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@/context/UserContext";

type Role = "talent" | "company" | null;

export default function SignUpPage() {
  const router = useRouter();
  const { signUp } = useUser();
  const [role, setRole] = useState<Role>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) {
      setError("Name must be at least 2 characters.");
      return;
    }
    if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (!role) {
      setError("Please select a role.");
      return;
    }
    setError("");
    await signUp(name, email, role);
    if (role === "talent") {
      router.push("/talent/onboarding");
    } else if (role === "company") {
      router.push("/company/onboarding");
    }
  };

  return (
    <div className="bg-[#212121] rounded-[12px] p-8 border border-[#353535]">
      {/* Logo */}
      <div className="flex items-center justify-center gap-2 mb-8">
        <Image src="/favicon.png" alt="SetterCloser" width={24} height={24} />
        <span className="text-[15px] font-medium text-[#ffffff] tracking-[-0.2px]">
          SetterCloser
        </span>
      </div>

      {/* Heading */}
      <h1 className="text-[#ffffff] text-[32px] tracking-[-0.32px] font-normal text-center">
        Create your account
      </h1>
      <p className="text-[#797979] text-[16px] text-center mt-2">
        Join the sales hiring marketplace
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        {/* Full Name */}
        <div>
          <label className="font-mono text-[11px] text-[#797979] uppercase tracking-wider mb-2 block">
            Full name
          </label>
          <input
            type="text"
            placeholder="Jane Smith"
            value={name}
            onChange={(e) => { setName(e.target.value); setError(""); }}
            className="w-full bg-[#0b0b0b] border border-[#353535] rounded-[3px] text-[#b9b9b9] h-[44px] px-3 text-[16px] focus:border-[#f36458] focus:outline-none transition placeholder:text-[#353535]"
          />
        </div>

        {/* Email */}
        <div>
          <label className="font-mono text-[11px] text-[#797979] uppercase tracking-wider mb-2 block">
            Email
          </label>
          <input
            type="email"
            placeholder="jane@company.com"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(""); }}
            className="w-full bg-[#0b0b0b] border border-[#353535] rounded-[3px] text-[#b9b9b9] h-[44px] px-3 text-[16px] focus:border-[#f36458] focus:outline-none transition placeholder:text-[#353535]"
          />
        </div>

        {/* Password */}
        <div>
          <label className="font-mono text-[11px] text-[#797979] uppercase tracking-wider mb-2 block">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(""); }}
            className="w-full bg-[#0b0b0b] border border-[#353535] rounded-[3px] text-[#b9b9b9] h-[44px] px-3 text-[16px] focus:border-[#f36458] focus:outline-none transition placeholder:text-[#353535]"
          />
        </div>

        {/* Role Selection */}
        <div className="mt-6 pt-2">
          <label className="font-mono text-[11px] text-[#797979] uppercase tracking-wider mb-2 block">
            I am a&hellip;
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => { setRole("talent"); setError(""); }}
              className={`bg-[#0b0b0b] border rounded-[5px] p-4 cursor-pointer transition text-left ${
                role === "talent"
                  ? "border-[#f36458]"
                  : "border-[#353535] hover:border-[#797979]"
              }`}
            >
              <span className="text-[#ffffff] text-[16px] block">
                Sales Rep
              </span>
              <span className="text-[#797979] text-[13px] block mt-1">
                Setter, Closer, or Both
              </span>
            </button>

            <button
              type="button"
              onClick={() => { setRole("company"); setError(""); }}
              className={`bg-[#0b0b0b] border rounded-[5px] p-4 cursor-pointer transition text-left ${
                role === "company"
                  ? "border-[#f36458]"
                  : "border-[#353535] hover:border-[#797979]"
              }`}
            >
              <span className="text-[#ffffff] text-[16px] block">
                Hiring Company
              </span>
              <span className="text-[#797979] text-[13px] block mt-1">
                Find &amp; hire sales talent
              </span>
            </button>
          </div>
        </div>

        {/* Submit */}
        <div className="mt-6 pt-2">
          <button
            type="submit"
            disabled={!role}
            className="w-full bg-[#ffffff] text-[#0b0b0b] rounded-full h-[44px] font-medium text-[16px] cursor-pointer transition hover:opacity-90 hover:-translate-y-px disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Create Account
          </button>
          {error && (
            <p className="text-[#f36458] text-[13px] mt-2">{error}</p>
          )}
        </div>
      </form>

      {/* Footer link */}
      <p className="mt-6 text-center text-[#797979] text-[14px]">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="text-[#55beff] hover:underline transition"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
