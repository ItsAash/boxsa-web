"use client";

import Link from "next/link";
import { Mail, Smartphone, ShieldCheck } from "lucide-react";

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col py-10 px-4">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-[520px] bg-surface-light dark:bg-surface-dark rounded-2xl shadow-xl border border-border-light dark:border-border-dark overflow-hidden">
          {/* Header */}
          <div className="p-8 sm:p-10 flex flex-col gap-6">
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl font-bold">
                Create your account
              </h1>
              <p className="text-text-secondary">
                Choose your preferred signup method
              </p>
            </div>

            {/* Email Signup Option */}
            <Link
              href="/signup/email"
              className="group relative h-24 rounded-xl border-2 border-border-light dark:border-border-dark hover:border-primary transition-all overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative h-full p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Mail size={24} />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-lg font-semibold">Sign up with Email</h3>
                  <p className="text-sm text-text-secondary">
                    Use your email and password
                  </p>
                </div>
                <div className="text-text-secondary group-hover:text-primary transition-colors">
                  →
                </div>
              </div>
            </Link>

            {/* Phone Signup Option */}
            <Link
              href="/signup/phone"
              className="group relative h-24 rounded-xl border-2 border-border-light dark:border-border-dark hover:border-primary transition-all overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative h-full p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Smartphone size={24} />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-lg font-semibold">Sign up with Phone</h3>
                  <p className="text-sm text-text-secondary">
                    Verify with OTP code
                  </p>
                </div>
                <div className="text-text-secondary group-hover:text-primary transition-colors">
                  →
                </div>
              </div>
            </Link>

            {/* Footer */}
            <div className="flex flex-col items-center gap-3 pt-4">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <ShieldCheck size={18} className="text-primary" />
                No membership fees required
              </div>
              <p className="text-xs text-gray-500 text-center">
                By continuing, you agree to Boxsa's{" "}
                <Link href="#" className="underline hover:text-primary">
                  Terms
                </Link>{" "}
                and{" "}
                <Link href="#" className="underline hover:text-primary">
                  Privacy Policy
                </Link>
                .
              </p>
              <p className="text-sm text-text-secondary pt-2">
                Already have an account?{" "}
                <Link href="/login" className="text-primary font-semibold hover:opacity-80">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}