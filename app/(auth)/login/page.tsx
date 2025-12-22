"use client";

import { useState } from "react";
import Link from "next/link";
import { Lock, Mail, Eye, EyeOff, ArrowRight, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="w-full max-w-[420px]">
      {/* Card */}
      <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-2xl shadow-lg">
        <div className="p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-text-main-light dark:text-text-main-dark">
              Welcome back
            </h1>
            <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
              Bulk buying made simple and affordable
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted-light" />
                <input
                  type="email"
                  placeholder="name@company.com"
                  className="w-full h-12 pl-10 pr-4 rounded-xl bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted-light" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full h-12 pl-10 pr-10 rounded-xl bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted-light hover:text-text-main-light transition"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              <div className="flex justify-end">
                <Link
                  href="#"
                  className="text-sm text-text-muted-light hover:text-primary transition"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-primary hover:bg-primary-hover text-primary-content font-semibold flex items-center justify-center gap-2 transition shadow-md text-black"
            >
              Login
              <ArrowRight className="h-4 w-4" />
            </button>

            {/* Trust microcopy */}
            <div className="flex items-center justify-center gap-2 text-xs text-text-muted-light">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Secure login • No hidden fees
            </div>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border-light dark:border-border-dark" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-surface-light dark:bg-surface-dark px-3 text-xs text-text-muted-light">
                or continue with
              </span>
            </div>
          </div>

          {/* Google */}
          <button
            type="button"
            className="w-full h-12 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-transparent hover:bg-gray-50 dark:hover:bg-white/5 transition flex items-center justify-center gap-3 text-sm font-medium"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              className="h-5 w-5"
            />
            Continue with Google
          </button>
        </div>

        {/* Footer */}
        <div className="border-t border-border-light dark:border-border-dark px-8 py-4 text-center text-sm">
          <span className="text-text-muted-light">Don’t have an account?</span>
          {"  "}
          <Link
            href="/signup"
            className="font-semibold text-white hover:text-primary transition"
          >
            Create account
          </Link>
        </div>
      </div>

      {/* Legal */}
      <div className="mt-6 flex justify-center gap-6 text-xs text-text-muted-light">
        <Link href="#">Terms</Link>
        <Link href="#">Privacy</Link>
        <Link href="#">Help</Link>
      </div>
    </section>
  );
}
