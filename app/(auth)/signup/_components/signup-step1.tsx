"use client";

import { ChangeEvent, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Eye, EyeOff } from "lucide-react";
import SignupProgress from "./signup-progress";
import { useSignup } from "../_context/signup-context";
import { getSession, signIn } from "next-auth/react";

type Errors = Partial<
  Record<"fullName" | "email" | "password" | "confirmPassword", string>
>;

export default function SignupStep1({ onNext }: { onNext: () => void }) {
  const { data, update } = useSignup();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const hydrateFromGoogle = useCallback(async () => {
    const session = await getSession();

    if (!session?.user) return;

    update({
      fullName: session.user.name ?? "",
      email: session.user.email ?? "",
      provider: "google",
    });

    onNext();
  }, [update, onNext]);

  useEffect(() => {
    hydrateFromGoogle();
  }, [hydrateFromGoogle]);

  const handleGoogleSignup = async () => {
    await signIn("google", { callbackUrl: "/signup" });
  };

  /* ---------- Validation ---------- */

  const validate = (): boolean => {
    const nextErrors: Errors = {};

    if (!data.fullName.trim()) {
      nextErrors.fullName = "Full name is required";
    }

    if (!data.email.trim()) {
      nextErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      nextErrors.email = "Enter a valid email address";
    }

    if (!data.password) {
      nextErrors.password = "Password is required";
    } else if (data.password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters";
    } else if (passwordScore(data.password) < 3) {
      nextErrors.password = "Password is too weak";
    }

    if (!data.cPassword) {
      nextErrors.confirmPassword = "Please confirm your password";
    } else if (data.cPassword !== data.password) {
      nextErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleContinue = (e: React.MouseEvent) => {
    e.preventDefault();
    if (validate()) onNext();
  };

  const strength = passwordScore(data.password);

  return (
    <div className="flex-1 flex flex-col">
      <section className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-[520px] bg-surface-light dark:bg-surface-dark rounded-2xl shadow-xl border border-border-light dark:border-border-dark overflow-hidden">
          <SignupProgress step={1} label="Account Registration" />

          <div className="p-8 sm:p-10 flex flex-col gap-6">
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl font-bold">
                Create your account
              </h1>
              <p className="text-text-secondary">
                Start saving on bulk essentials today.
              </p>
            </div>

            {/* Google */}
            <button
              onClick={handleGoogleSignup}
              className="h-12 rounded-xl border border-border-light dark:border-white/10 flex items-center justify-center gap-3 hover:bg-white/10 transition"
            >
              <img
                src="https://www.google.com/favicon.ico"
                alt="Google"
                className="w-5 h-5"
              />
              <span className="font-semibold">Sign up with Google</span>
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-700" />
              <span className="text-sm text-gray-400">
                Or continue with email
              </span>
              <div className="flex-1 h-px bg-gray-700" />
            </div>

            {/* Form */}
            <form className="flex flex-col gap-5">
              <Input
                label="Full Name"
                value={data.fullName}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  update({ fullName: e.target.value })
                }
                error={errors.fullName}
                placeholder="Jane Doe"
              />

              <Input
                label="Email"
                value={data.email}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  update({ email: e.target.value })
                }
                error={errors.email}
                placeholder="name@company.com"
                type="email"
              />

              <div className="grid md:grid-cols-2 gap-5">
                <PasswordInput
                  label="Password"
                  value={data.password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    update({ password: e.target.value })
                  }
                  error={errors.password}
                  placeholder="Min. 8 characters"
                  show={showPassword}
                  onToggle={() => setShowPassword((v) => !v)}
                />

                <PasswordInput
                  label="Confirm Password"
                  value={data.cPassword}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    update({ cPassword: e.target.value })
                  }
                  error={errors.confirmPassword}
                  placeholder="Confirm password"
                  show={showConfirmPassword}
                  onToggle={() => setShowConfirmPassword((v) => !v)}
                />
              </div>

              {/* Password Strength */}
              <div className="flex flex-col gap-2">
                <div className="flex gap-1 h-1">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`w-1/4 rounded-full ${
                        strength > i ? strengthColor(strength) : "bg-gray-700"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-400">
                  Password strength:{" "}
                  <span className="font-medium">{strengthLabel(strength)}</span>
                </p>
              </div>

              <button
                onClick={handleContinue}
                className="mt-2 h-12 rounded-xl bg-primary text-text-main font-bold flex items-center justify-center gap-2 hover:opacity-90 transition text-black"
              >
                Continue <ArrowRight size={18} />
              </button>
            </form>

            {/* Footer */}
            <div className="flex flex-col items-center gap-3 pt-2">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <ShieldCheck size={18} className="text-primary" />
                No membership fees required
              </div>
              <p className="text-xs text-gray-500 text-center">
                By continuing, you agree to Boxsa’s{" "}
                <Link href="#" className="underline hover:text-primary">
                  Terms
                </Link>{" "}
                and{" "}
                <Link href="#" className="underline hover:text-primary">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------- Helpers ---------- */

function passwordScore(password: string) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

const strengthLabel = (s: number) =>
  ["Very weak", "Weak", "Okay", "Strong", "Very strong"][s] || "Weak";

const strengthColor = (s: number) =>
  s <= 1 ? "bg-red-500" : s === 2 ? "bg-yellow-500" : "bg-green-500";

/* ---------- Inputs ---------- */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Input({ label, error, ...props }: any) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold">{label}</label>
      <input
        {...props}
        className={`h-11 px-4 rounded-lg border bg-black/20 outline-none focus:ring-2 focus:ring-primary ${
          error ? "border-red-500" : "border-border-dark"
        }`}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function PasswordInput({ label, error, show, onToggle, ...props }: any) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold">{label}</label>
      <div className="relative">
        <input
          {...props}
          type={show ? "text" : "password"}
          className={`h-11 w-full px-4 pr-10 rounded-lg border bg-black/20 outline-none focus:ring-2 focus:ring-primary ${
            error ? "border-red-500" : "border-border-dark"
          }`}
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
