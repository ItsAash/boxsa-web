"use client";

import { useEffect, useRef, useState, ChangeEvent } from "react";
import { ArrowRight, Lock, Loader2, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

const OTP_LENGTH = 6;
const RESEND_TIME = 30;
const NEPAL_MOBILE_REGEX = /^(97|98)\d{8}$/;

// SET TO true FOR TESTING OTP UI WITHOUT BACKEND
const TESTING_MODE = false;

export default function PhoneSignupPage() {
  const router = useRouter();
  
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(RESEND_TIME);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const inputsRef = useRef<HTMLInputElement[]>([]);

  /* ---------------- Timer ---------------- */
  useEffect(() => {
    if (!otpSent || timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [otpSent, timer]);

  /* ---------------- OTP Input Handlers ---------------- */
  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const next = [...otp];
    next[index] = value;
    setOtp(next);
    setError("");

    if (value && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);

    if (!pasted) return;

    const next = pasted.split("");
    setOtp(next);

    next.forEach((d, i) => {
      if (inputsRef.current[i]) {
        inputsRef.current[i].value = d;
      }
    });

    inputsRef.current[Math.min(next.length, OTP_LENGTH - 1)]?.focus();
  };

  /* ---------------- Validation ---------------- */
  const validateBeforeSendOtp = (): boolean => {
    setError("");
    setNameError("");
    setPasswordError("");

    let isValid = true;

    if (!fullName.trim()) {
      setNameError("Full name is required");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      isValid = false;
    } else if (passwordScore(password) < 3) {
      setPasswordError("Password is too weak");
      isValid = false;
    }

    if (!confirmPassword) {
      setPasswordError("Please confirm your password");
      isValid = false;
    } else if (confirmPassword !== password) {
      setPasswordError("Passwords do not match");
      isValid = false;
    }

    if (!NEPAL_MOBILE_REGEX.test(phone)) {
      setError("Enter a valid Nepal mobile number (97XXXXXXXX or 98XXXXXXXX).");
      isValid = false;
    }

    return isValid;
  };

  /* ---------------- API Calls ---------------- */
  const sendOtp = async () => {
    if (!validateBeforeSendOtp()) return;

    setLoading(true);

    try {
      // TESTING MODE: Skip API call
      if (TESTING_MODE) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
        setOtpSent(true);
        setTimer(RESEND_TIME);
        setTimeout(() => inputsRef.current[0]?.focus(), 100);
        setLoading(false);
        return;
      }

      const res = await fetch("http://localhost:3001/api/auth/signup/phone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          phone,
          password,
          passwordConfirmation: confirmPassword,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result?.message ?? "Failed to send OTP");
        setLoading(false);
        return;
      }

      setOtpSent(true);
      setTimer(RESEND_TIME);

      setTimeout(() => inputsRef.current[0]?.focus(), 100);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while sending OTP.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (otp.some((d) => !d)) {
      setError("Please enter the complete 6-digit code.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // TESTING MODE: Skip API call
      if (TESTING_MODE) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
        router.push("/onboarding");
        return;
      }

      const res = await fetch("http://localhost:3001/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone,
          otp: otp.join(""),
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result?.message ?? "Invalid OTP");
        setLoading(false);
        return;
      }

      // Store backend session in NextAuth
      await signIn("credentials", {
        redirect: false,
        phone: result.user.phone,
        sessionToken: result.sessionToken,
      });

      // Phone verified → redirect to onboarding
      router.push("/onboarding");
    } catch (err) {
      console.error(err);
      setError("OTP verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    if (timer > 0) return;
    setOtp(Array(OTP_LENGTH).fill(""));
    setTimer(RESEND_TIME);
    await sendOtp();
  };

  const strength = passwordScore(password);

  /* ---------------- UI ---------------- */
  return (
    <main className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col py-10 px-4">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-[520px] bg-surface-dark rounded-2xl shadow-xl border border-border-dark overflow-hidden">
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
                Phone Signup
              </span>
            </div>
            <h2 className="text-sm font-bold text-text-main">
              Account Registration
            </h2>
          </div>

          <div className="p-8 sm:p-10 flex flex-col gap-6">
            {/* Header */}
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl font-bold text-text-main">
                {otpSent ? "Verify your number" : "Create your account"}
              </h1>
              <p className="text-text-secondary">
                {otpSent
                  ? "We've sent a 6-digit code to your mobile number."
                  : "Start saving on bulk essentials today."}
              </p>
            </div>

            {/* Form Fields (only before OTP sent) */}
            {!otpSent && (
              <>
                {/* Name Input */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-text-main">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Jane Doe"
                    className={`h-11 px-4 rounded-lg border bg-black/20 outline-none focus:ring-2 focus:ring-primary ${
                      nameError ? "border-red-500" : "border-border-dark"
                    }`}
                  />
                  {nameError && (
                    <p className="text-xs text-red-400">{nameError}</p>
                  )}
                </div>

                {/* Phone Input */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-text-main">
                    Mobile Number
                  </label>
                  <div className={`flex h-11 rounded-lg border bg-black/20 focus-within:ring-2 focus-within:ring-primary transition ${
                    error ? "border-red-500" : "border-border-dark"
                  }`}>
                    <select className="px-3 bg-transparent border-r border-border-dark text-sm font-medium">
                      <option>🇳🇵 +977</option>
                    </select>
                    <input
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                      placeholder="98XXXXXXXX"
                      className="flex-1 px-4 bg-transparent focus:outline-none text-text-main placeholder:text-text-secondary"
                    />
                  </div>
                  {error && (
                    <p className="text-xs text-red-400">{error}</p>
                  )}
                </div>

                {/* Password Fields */}
                <div className="grid md:grid-cols-2 gap-5">
                  <PasswordInput
                  label="Password"
                  value={password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  error={passwordError && !confirmPassword ? passwordError : ""}
                  placeholder="Min. 8 characters"
                  show={showPassword}
                  onToggle={() => setShowPassword((v) => !v)}
                />

                <PasswordInput
                  label="Confirm Password"
                  value={confirmPassword}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                  error={passwordError && confirmPassword ? passwordError : ""}
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
              </>
            )}

            {/* Phone Display (after OTP sent) */}
            {otpSent && (
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-text-main">
                  Mobile Number
                </label>
                <div className="flex h-11 rounded-lg border border-border-dark bg-black/20">
                  <div className="px-3 bg-transparent border-r border-border-dark text-sm font-medium flex items-center">
                    🇳🇵 +977
                  </div>
                  <div className="flex-1 px-4 flex items-center text-text-main">
                    {phone}
                  </div>
                </div>
                <button
                  onClick={() => {
                    setOtpSent(false);
                    setOtp(Array(OTP_LENGTH).fill(""));
                  }}
                  className="text-xs font-semibold text-primary hover:opacity-80 text-left"
                >
                  Change number
                </button>
              </div>
            )}

            {/* Send OTP Button */}
            {!otpSent && (
              <button
                onClick={sendOtp}
                disabled={loading}
                className="mt-2 h-12 rounded-xl bg-primary text-text-main font-bold flex items-center justify-center gap-2 hover:opacity-90 transition text-black disabled:opacity-50"
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            )}

            {/* OTP Input Section */}
            {otpSent && (
              <>
                <div className="flex flex-col gap-4">
                  <label className="text-sm font-semibold text-text-main">
                    Enter 6-digit code
                  </label>

                  <div className="grid grid-cols-6 gap-2">
                    {otp.map((_, i) => (
                      <input
                        key={i}
                        ref={(el) => {
                          if (el) inputsRef.current[i] = el;
                        }}
                        maxLength={1}
                        inputMode="numeric"
                        pattern="[0-9]*"
                        onChange={(e) => handleOtpChange(e.target.value, i)}
                        onKeyDown={(e) => handleOtpKeyDown(e, i)}
                        onPaste={handleOtpPaste}
                        className="h-12 text-center text-lg font-bold rounded-lg border border-border-dark bg-black/20 focus:ring-2 focus:ring-primary outline-none text-text-main"
                      />
                    ))}
                  </div>

                  <div className="flex justify-between items-center text-xs text-text-secondary">
                    {timer > 0 ? (
                      <span>Resend in {timer}s</span>
                    ) : (
                      <span></span>
                    )}
                    <button
                      disabled={timer > 0}
                      onClick={resendOtp}
                      className={`font-semibold transition ${
                        timer > 0
                          ? "cursor-not-allowed opacity-50"
                          : "text-primary hover:opacity-80"
                      }`}
                    >
                      Resend
                    </button>
                  </div>
                </div>

                <button
                  onClick={verifyOtp}
                  disabled={loading}
                  className="h-12 rounded-xl bg-primary text-text-main font-bold flex items-center justify-center gap-2 hover:opacity-90 transition text-black disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <>
                      Verify & Continue <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </>
            )}

            {/* Error Message */}
            {error && otpSent && (
              <p className="text-sm font-medium text-red-400 text-center">
                {error}
              </p>
            )}

            {/* Trust Badge */}
            <div className="flex items-start gap-3 bg-black/20 p-4 rounded-xl border border-border-dark">
              <div className="p-2 rounded-lg bg-white/10 text-primary">
                <Lock size={18} />
              </div>
              <p className="text-xs text-text-secondary">
                We only use your number for order & delivery notifications.
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

/* ---------- Password Input Component ---------- */
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