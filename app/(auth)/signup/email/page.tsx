"use client";

import { ChangeEvent, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { getSession, signIn } from "next-auth/react";

type Errors = Partial<
  Record<"fullName" | "email" | "password" | "confirmPassword", string>
>;

export default function EmailSignupPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const hydrateFromGoogle = useCallback(async () => {
    const session = await getSession();
    if (!session?.user) return;

    setFullName(session.user.name ?? "");
    setEmail(session.user.email ?? "");
  }, []);

  useEffect(() => {
    hydrateFromGoogle();
  }, [hydrateFromGoogle]);

  const handleGoogleSignup = async () => {
    await signIn("google", { callbackUrl: "/signup/email" });
  };

  /* ---------- Validation ---------- */
  const validate = (): boolean => {
    const nextErrors: Errors = {};

    if (!fullName.trim()) {
      nextErrors.fullName = "Full name is required";
    }

    if (!email.trim()) {
      nextErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Enter a valid email address";
    }

    if (!password) {
      nextErrors.password = "Password is required";
    } else if (password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters";
    } else if (passwordScore(password) < 3) {
      nextErrors.password = "Password is too weak";
    }

    if (!confirmPassword) {
      nextErrors.confirmPassword = "Please confirm your password";
    } else if (confirmPassword !== password) {
      nextErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleContinue = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const res = await fetch("http://localhost:3001/api/auth/signup/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          password,
          passwordConfirmation: confirmPassword,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        const nextErrors: Errors = {};

        if (result?.errors && Array.isArray(result.errors)) {
          result.errors.forEach((err: any) => {
            const message = err.messages?.[0] ?? "Invalid value";

            switch (err.field) {
              case "fullName":
                nextErrors.fullName = message;
                break;
              case "email":
                nextErrors.email = message;
                break;
              case "password":
                nextErrors.password = message;
                break;
              case "passwordConfirmation":
                nextErrors.confirmPassword = message;
                break;
              default:
                nextErrors.email = message;
            }
          });
        } else if (result?.message) {
          nextErrors.email = result.message;
        }

        setErrors(nextErrors);
        setLoading(false);
        return;
      }

      // Store backend session in NextAuth
      await signIn("credentials", {
        redirect: false,
        email: result.user.email,
        sessionToken: result.sessionToken,
      });

      // Redirect directly to onboarding (email flow is complete)
      router.push("/onboarding");
    } catch (err) {
      console.error("Signup failed:", err);
      setErrors({
        email: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const strength = passwordScore(password);

  return (
    <main className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col py-10 px-4">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-[520px] bg-surface-light dark:bg-surface-dark rounded-2xl shadow-xl border border-border-light dark:border-border-dark overflow-hidden">
          {/* Progress Header */}
          <div className="bg-black/20 px-8 py-5 border-b border-border-dark">
            <div className="flex items-center justify-between mb-2">
              <Link 
                href="/signup"
                className="flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition"
              >
                <ArrowLeft size={16} />
                Back
              </Link>
              <span className="text-sm font-semibold text-text-secondary">
                Email Signup
              </span>
            </div>
            <h2 className="text-sm font-bold text-text-main">
              Account Registration
            </h2>
          </div>

          <div className="p-8 sm:p-10 flex flex-col gap-6">
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl font-bold">
                Create your account
              </h1>
              <p className="text-text-secondary">
                Start saving on bulk essentials today.
              </p>
            </div>

            {/* Form */}
            <form className="flex flex-col gap-5">
              <Input
                label="Full Name"
                value={fullName}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setFullName(e.target.value)
                }
                error={errors.fullName}
                placeholder="Jane Doe"
              />

              <Input
                label="Email"
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                error={errors.email}
                placeholder="name@company.com"
                type="email"
              />

              <div className="grid md:grid-cols-2 gap-5">
                <PasswordInput
                  label="Password"
                  value={password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                  error={errors.password}
                  placeholder="Min. 8 characters"
                  show={showPassword}
                  onToggle={() => setShowPassword((v) => !v)}
                />

                <PasswordInput
                  label="Confirm Password"
                  value={confirmPassword}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setConfirmPassword(e.target.value)
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
                disabled={loading}
                className="mt-2 h-12 rounded-xl bg-primary text-text-main font-bold flex items-center justify-center gap-2 hover:opacity-90 transition text-black disabled:opacity-50"
              >
                {loading ? "Creating account..." : "Continue"}{" "}
                <ArrowRight size={18} />
              </button>
            </form>

            {/* Footer */}
            <div className="flex flex-col items-center gap-3 pt-2">
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
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

/* ---------- Helpers ---------- */
function passwordScore(password: string) {
  if (!password) return 0;
  
  let score = 0;
  if (password.length >= 8) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  
  return Math.min(score - 1, 4);
}

const strengthLabel = (s: number) =>
  ["Very weak", "Weak", "Okay", "Strong", "Very strong"][s] || "Weak";

const strengthColor = (s: number) =>
  s <= 1 ? "bg-red-500" : s === 2 ? "bg-yellow-500" : "bg-green-500";

/* ---------- Input Components ---------- */
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