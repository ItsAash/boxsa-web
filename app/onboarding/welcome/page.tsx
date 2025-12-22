"use client";

import { ArrowRight, Package, Sparkles } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/layout/header";

export default function WelcomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-[560px] text-center space-y-10">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="h-16 w-16 rounded-full bg-primary/15 flex items-center justify-center">
              <Package size={30} className="text-primary" />
            </div>
          </div>

          {/* Text */}
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-main dark:text-white">
              Welcome to Boxsa
            </h1>

            <p className="text-text-secondary dark:text-gray-400 text-lg">
              You’re all set. You can now explore products, place bulk orders,
              and manage deliveries with confidence.
            </p>
          </div>

          {/* Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            {[
              "Wholesale pricing",
              "Reliable bulk delivery",
              "Transparent order tracking",
            ].map((text) => (
              <div
                key={text}
                className="
                  flex items-start gap-3
                  p-4 rounded-xl
                  bg-surface-light dark:bg-surface-dark
                  border border-border-light dark:border-border-dark
                "
              >
                <Sparkles size={16} className="text-primary mt-1" />
                <span className="text-sm font-medium text-text-main dark:text-white">
                  {text}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex justify-center">
            <Link
              href="/products"
              className="
                inline-flex items-center gap-2
                h-12 px-10 rounded-full
                bg-primary text-background-dark
                font-bold
                hover:bg-green-400
                transition shadow-sm shadow-primary/30
              "
            >
              Start shopping
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
