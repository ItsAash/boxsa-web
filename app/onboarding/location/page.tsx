"use client";

import { ArrowLeft, ArrowRight, MapPin, Flag } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import OnboardingProgress from "../_components/onboarding-progress";

export default function DeliveryLocationPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark">
      {/* Header */}
      <Header />

      {/* Main */}
      <main className="flex-1 px-4 sm:px-6 py-10 flex justify-center">
        <div className="w-full max-w-[1024px] flex flex-col gap-10">
          {/* Progress */}
          <OnboardingProgress step={2} total={3} />

          {/* Header */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-primary">
              <MapPin size={22} />
              <span className="text-sm font-semibold uppercase tracking-wide">
                Delivery Location
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-main dark:text-white">
              Where should we deliver?
            </h1>

            <p className="text-text-secondary dark:text-gray-400 text-lg max-w-[520px]">
              This helps us calculate delivery timelines and ensure bulk order
              availability in your area.
            </p>
          </div>

          {/* Form */}
          <div className="flex flex-col gap-6">
            {/* City */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-text-main dark:text-white">
                City / Area
              </label>
              <select
                className="
                  w-full h-12 rounded-xl px-4
                  bg-background-light dark:bg-black/20
                  border border-border-light dark:border-border-dark
                  text-text-main dark:text-white
                  focus:ring-2 focus:ring-primary outline-none
                "
              >
                <option value="">Select your city</option>
                <option>Kathmandu</option>
                <option>Lalitpur</option>
                <option>Bhaktapur</option>
              </select>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-text-main dark:text-white">
                Delivery Address
              </label>
              <textarea
                rows={3}
                placeholder="Street, building number, floor, unit..."
                className="
                  w-full rounded-xl px-4 py-3
                  bg-background-light dark:bg-black/20
                  border border-border-light dark:border-border-dark
                  text-text-main dark:text-white
                  placeholder:text-text-secondary
                  focus:ring-2 focus:ring-primary outline-none
                  resize-none
                "
              />
            </div>

            {/* Landmark */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-text-main dark:text-white">
                  Landmark
                </label>
                <span className="text-xs text-text-secondary">Optional</span>
              </div>

              <div className="relative">
                <Flag
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary"
                />
                <input
                  type="text"
                  placeholder="Near central park, opposite mall..."
                  className="
                    w-full h-12 pl-10 pr-4 rounded-xl
                    bg-background-light dark:bg-black/20
                    border border-border-light dark:border-border-dark
                    text-text-main dark:text-white
                    placeholder:text-text-secondary
                    focus:ring-2 focus:ring-primary outline-none
                  "
                />
              </div>
            </div>

            {/* Info Banner */}
            <div className="flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/10 dark:bg-primary/5 p-4">
              <div className="h-6 w-6 flex items-center justify-center rounded-full bg-primary text-background-dark font-bold">
                ✓
              </div>
              <div>
                <p className="text-sm font-semibold text-text-main dark:text-white">
                  Bulk delivery supported
                </p>
                <p className="text-xs text-text-secondary dark:text-gray-400">
                  Large pallet and wholesale orders are available in this
                  region.
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-6 border-t border-border-light dark:border-border-dark">
            <Link
              href="/onboarding/buyer-type"
              className="
                h-11 px-6 rounded-full
                border border-border-light dark:border-border-dark
                text-text-main dark:text-white
                font-semibold
                hover:bg-black/5 dark:hover:bg-white/10
                transition
                flex items-center gap-2
              "
            >
              <ArrowLeft size={16} />
              Back
            </Link>

            <Link
              href="/onboarding/welcome"
              className="
                h-11 px-8 rounded-full
                bg-primary text-background-dark
                font-bold
                flex items-center gap-2
                hover:bg-green-400
                active:scale-[0.98]
                transition shadow-sm shadow-primary/30
              "
            >
              Continue
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}