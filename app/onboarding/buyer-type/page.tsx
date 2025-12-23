"use client";

import { useState } from "react";
import { ArrowRight, Home, Store } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import OnboardingProgress from "../_components/onboarding-progress";
import BuyerTypeCard from "./_components/buyer-type-card";
import BusinessDetailsForm from "./_components/business-detail-form";
import PersonalDetailsForm from "./_components/personal-detail-form";

type BuyerType = "personal" | "business";

export default function BuyerTypePage() {
  const [buyerType, setBuyerType] = useState<BuyerType>("business");

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark">
      {/* Header */}
      <Header />

      {/* Main */}
      <main className="flex-1 px-4 sm:px-6 py-8 flex justify-center">
        <div className="w-full max-w-[1024px] flex flex-col gap-8">
          {/* Progress */}
          <OnboardingProgress step={1} total={3} />

          {/* Heading */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-text-main dark:text-white">
              How are you planning to shop?
            </h1>
            <p className="text-text-secondary dark:text-gray-400 text-lg">
              We'll tailor recommendations and pricing based on your needs.
            </p>
          </div>

          {/* Buyer Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <BuyerTypeCard
              icon={Home}
              title="Personal / Household"
              description="For family essentials and daily needs."
              selected={buyerType === "personal"}
              onClick={() => setBuyerType("personal")}
            />

            <BuyerTypeCard
              icon={Store}
              title="Business / Office"
              description="Office supplies, retail stock & tax invoices."
              selected={buyerType === "business"}
              onClick={() => setBuyerType("business")}
            />
          </div>

          {/* Conditional Forms */}
          {buyerType === "personal" && <PersonalDetailsForm />}
          {buyerType === "business" && <BusinessDetailsForm />}

          {/* Navigation */}
          <div className="flex items-center justify-end pt-6 border-t border-border-light dark:border-border-dark">
            <Link
              href="/onboarding/location"
              className="h-11 px-8 rounded-full
                bg-primary hover:bg-green-400
                text-background-dark font-bold
                flex items-center gap-2
                transition shadow-sm shadow-primary/30"
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