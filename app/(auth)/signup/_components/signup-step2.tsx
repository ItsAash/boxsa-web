"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Lock, Loader2 } from "lucide-react";
import { getSession } from "next-auth/react";

async function getBackendSessionToken() {
  const session = await getSession();
  return session?.user.sessionToken;
}

import SignupProgress from "./signup-progress";

const OTP_LENGTH = 6;
const RESEND_TIME = 30;
const NEPAL_MOBILE_REGEX = /^(97|98)\d{8}$/;

export default function SignupStep2({ onBack }: { onBack: () => void }) {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(RESEND_TIME);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const inputsRef = useRef<HTMLInputElement[]>([]);

  /* ---------------- Timer ---------------- */
  useEffect(() => {
    if (!otpSent || timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [otpSent, timer]);

  /* ---------------- OTP ---------------- */
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

  const sendOtp = async () => {
    setError("");

    if (!NEPAL_MOBILE_REGEX.test(phone)) {
      setError("Enter a valid Nepal mobile number (97XXXXXXXX or 98XXXXXXXX).");
      return;
    }

    setLoading(true);

    try {
      const sessionToken = await getBackendSessionToken();
      console.log(sessionToken);

      const res = await fetch(
        "http://localhost:3001/api/auth/send-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phone,
            sessionToken, // body-based auth (as discussed)
          }),
        }
      );

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
      const sessionToken = await getBackendSessionToken();

      const res = await fetch(
        "http://localhost:3001/api/auth/verify-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phone,
            otp: otp.join(""),
            sessionToken,
          }),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        setError(result?.message ?? "Invalid OTP");
        setLoading(false);
        return;
      }

      // ✅ Phone verified → proceed
      // Backend now has isPhoneVerified = true
      window.location.href = "/onboarding";
    } catch (err) {
      console.error(err);
      setError("OTP verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    if (timer > 0) return;
    setTimer(RESEND_TIME);
    await sendOtp();
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="flex-1 flex items-center justify-center px-4">
      <div className="w-full max-w-[520px] bg-surface-dark rounded-2xl shadow-xl border border-border-dark overflow-hidden">
        <SignupProgress step={2} label="Phone Verification" />

        <div className="p-8 sm:p-10 flex flex-col gap-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-text-main">
              Secure your account
            </h1>
            <p className="text-text-secondary">
              We’ll send a 6-digit code to verify your mobile number.
            </p>
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-text-main">
              Mobile Number
            </label>
            <div className="flex h-12 rounded-xl border border-border-dark bg-black/20 focus-within:ring-2 focus-within:ring-primary transition">
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
          </div>

          {/* Send OTP */}
          {!otpSent && (
            <button
              onClick={sendOtp}
              disabled={loading}
              className="h-12 rounded-xl bg-primary text-text-main font-bold flex items-center justify-center gap-2 hover:opacity-90 transition text-black"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Send OTP"}
            </button>
          )}

          {/* OTP */}
          {otpSent && (
            <>
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-text-main">
                    Enter 6-digit code
                  </label>
                  <button
                    onClick={() => setOtpSent(false)}
                    className="text-xs font-semibold text-primary hover:opacity-80"
                  >
                    Change number
                  </button>
                </div>

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
                  {timer > 0 && <span>Resend in {timer}s</span>}
                  <button
                    disabled={timer > 0}
                    onClick={resendOtp}
                    className={`font-semibold transition ${timer > 0
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
                className="h-12 rounded-xl bg-primary text-text-main font-bold flex items-center justify-center gap-2 hover:opacity-90 transition text-black"
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

          {/* Error */}
          {error && <p className="text-sm font-medium text-red-400">{error}</p>}

          {/* Trust */}
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
  );
}
