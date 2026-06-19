"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUser } from "@/context/UserContext";

type Role = "talent" | "company" | null;

export default function SignInPage() {
  const router = useRouter();
  const { signIn } = useUser();
  const [role, setRole] = useState<Role>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 1) {
      setError("Please enter your password.");
      return;
    }
    if (!role) {
      setError("Please select a role.");
      return;
    }
    setError("");
    signIn(email, role);
    if (role === "talent") {
      router.push("/talent/dashboard");
    } else if (role === "company") {
      router.push("/company/dashboard");
    }
  };

  return (
    <div className="bg-[#212121] rounded-[12px] p-8 border border-[#353535]">
      {/* Logo */}
      <div className="flex items-center justify-center gap-2 mb-8">
        <span className="w-2 h-2 rounded-full bg-[#f36458]" />
        <span className="text-[15px] font-medium text-[#ffffff] tracking-[-0.2px]">
          SetterCloser
        </span>
      </div>

      {/* Heading */}
      <h1 className="text-[#ffffff] text-[32px] tracking-[-0.32px] font-normal text-center">
        Welcome back
      </h1>
      <p className="text-[#797979] text-[16px] text-center mt-2">
        Sign in to your account
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
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
          <span
            onClick={() => alert("Password reset coming soon")}
            className="text-[#55beff] text-[13px] text-right block mt-1 cursor-pointer hover:underline transition"
          >
            Forgot password?
          </span>
        </div>

        {/* Role Selection */}
        <div className="pt-2">
          <label className="font-mono text-[11px] text-[#797979] uppercase tracking-wider mb-2 block">
            Sign in as&hellip;
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
                Setter or Closer
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
                Sales leader
              </span>
            </button>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={!role}
            className="w-full bg-[#ffffff] text-[#0b0b0b] rounded-full h-[44px] font-medium text-[16px] cursor-pointer transition hover:opacity-90 hover:-translate-y-px disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Sign In
          </button>
          {error && (
            <p className="text-[#f36458] text-[13px] mt-2">{error}</p>
          )}
        </div>
      </form>

      {/* Footer link */}
      <p className="mt-6 text-center text-[#797979] text-[14px]">
        Don&apos;t have an account?{" "}
        <Link
          href="/sign-up"
          className="text-[#55beff] hover:underline transition"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
