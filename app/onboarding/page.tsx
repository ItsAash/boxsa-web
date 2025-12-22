"use client";

import { ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/layout/header";

export default function OnboardingCongratsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-[1024px] text-center space-y-8">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="h-16 w-16 rounded-full bg-primary/15 flex items-center justify-center">
              <CheckCircle size={32} className="text-primary" />
            </div>
          </div>

          {/* Text */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-main dark:text-white">
              Your account is ready 🎉
            </h1>
            <p className="text-text-secondary dark:text-gray-400 text-lg">
              Welcome to Boxsa. Let’s quickly set things up so we can
              personalize your experience.
            </p>
          </div>

          {/* CTA */}
          <Link
            href="/onboarding/buyer-type"
            className="
              inline-flex items-center justify-center gap-2
              h-12 px-8 rounded-full
              bg-primary text-background-dark
              font-bold
              hover:bg-green-400
              active:scale-[0.98]
              transition shadow-sm shadow-primary/30
            "
          >
            Start onboarding
            <ArrowRight size={18} />
          </Link>

          {/* Trust */}
          <p className="text-xs text-text-secondary dark:text-gray-500">
            This takes less than a minute.
          </p>
        </div>
      </main>
    </div>
  );
}
