"use client";

import { useState } from "react";
import { ArrowRight, HelpCircle, Wallet, ShoppingBag } from "lucide-react";
import Link from "next/link";

interface OrderSummaryProps {
  subtotal: number;
  deliveryFee: number;
  total: number;
  savings: number;
}

export default function OrderSummary({
  subtotal,
  deliveryFee,
  total,
  savings,
}: OrderSummaryProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="bg-white dark:bg-[#1A2C23] rounded-xl border border-gray-200 dark:border-white/10 shadow-lg p-6 sticky top-24">
      <h2 className="text-xl font-black text-[#111814] dark:text-white mb-6 flex items-center gap-2">
        <ShoppingBag className="w-5 h-5 text-[#2bee79]" />
        Order Summary
      </h2>

      {/* Price Breakdown */}
      <div className="space-y-3 pb-5 mb-5 border-b border-gray-200 dark:border-white/10">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
          <span className="font-semibold text-[#111814] dark:text-white">
            Rs {subtotal.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-1.5 relative">
            <span className="text-gray-600 dark:text-gray-300">
              Delivery Fee
            </span>
            <div
              className="relative"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <HelpCircle className="w-4 h-4 text-gray-400 hover:text-[#2bee79] cursor-help transition-colors" />

              {/* Tooltip */}
              {showTooltip && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-slate-900 dark:bg-slate-800 text-white text-xs rounded-lg shadow-xl z-50 pointer-events-none">
                  <div className="relative">
                    <p className="leading-relaxed">
                      Free delivery on orders above Rs 20,000 within Kathmandu
                      valley.
                    </p>
                    {/* Arrow */}
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900 dark:border-t-slate-800"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <span className="font-semibold text-[#111814] dark:text-white">
            Rs {deliveryFee.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Total */}
      <div className="flex justify-between items-end mb-6">
        <span className="text-lg font-bold text-[#111814] dark:text-white">
          Total
        </span>
        <div className="text-right">
          <div className="text-3xl font-black text-[#111814] dark:text-white tracking-tight">
            Rs {total.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Inclusive of all taxes
          </div>
        </div>
      </div>

      {/* Savings Badge */}
      {savings > 0 && (
        <div className="flex items-start gap-3 p-4 rounded-lg bg-gradient-to-br from-[#2bee79]/10 to-emerald-50/50 dark:from-[#2bee79]/10 dark:to-emerald-900/10 border border-[#2bee79]/30 mb-6 shadow-sm">
          <div className="shrink-0 w-10 h-10 rounded-full bg-[#2bee79]/20 dark:bg-[#2bee79]/30 flex items-center justify-center">
            <Wallet className="w-5 h-5 text-[#2bee79]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-green-900 dark:text-[#2bee79] text-sm">
              You&apos;re saving Rs {savings.toLocaleString()}!
            </div>
            <div className="text-xs text-green-800 dark:text-green-300 mt-0.5">
              Compared to standard retail prices
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col gap-3">
        <button className="w-full h-12 bg-[#2bee79] hover:bg-[#1fce65] active:scale-[0.98] rounded-lg font-bold text-[#0f1c15] flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all group">
          <span>Proceed to Checkout</span>
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </button>

        <Link
          href="/products"
          className="w-full h-10 flex items-center justify-center rounded-lg border border-gray-300 dark:border-gray-600 text-sm font-medium text-[#111814] dark:text-white hover:bg-gray-50 dark:hover:bg-white/5 hover:border-gray-400 dark:hover:border-gray-500 transition-all"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
