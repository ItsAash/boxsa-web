"use client";

import Image from "next/image";
import { ArrowRight, Tag, Truck, ShieldCheck } from "lucide-react";

interface OrderItem {
  id: string;
  name: string;
  brand: string;
  image: string;
  packSize: string;
  quantity: number;
  price: number;
}

interface OrderSummaryCardProps {
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  currentStep: number;
  canProceed: boolean | string | undefined;
  onProceed: () => void;
  buttonLabel: string;
}

export default function OrderSummaryCard({
  items,
  subtotal,
  deliveryFee,
  discount,
  total,
  currentStep,
  canProceed,
  onProceed,
  buttonLabel,
}: OrderSummaryCardProps) {
  return (
    <div className="space-y-6">
      {/* Main Summary Card */}
      <div className="bg-white dark:bg-[#1A2C23] rounded-2xl border border-gray-200 dark:border-white/10 p-6 md:p-8 sticky top-28 shadow-lg">
        <h3 className="text-xl font-bold mb-6 pb-4 border-b border-gray-200 dark:border-white/10 text-[#111814] dark:text-white">
          Order Summary
        </h3>

        {/* Order Items */}
        <div className="flex flex-col gap-5 mb-6 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4 group">
              <div className="w-20 h-20 rounded-xl bg-gray-100 dark:bg-white/10 overflow-hidden shrink-0 border border-gray-100 dark:border-white/5 relative">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute bottom-0 right-0 bg-[#2bee79] text-[#0f1c15] text-[10px] font-bold px-1.5 py-0.5 rounded-tl-lg">
                  {item.packSize}
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-between py-0.5">
                <div>
                  <h4 className="font-semibold text-sm leading-snug text-[#111814] dark:text-white line-clamp-2">
                    {item.name}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Brand: {item.brand}
                  </p>
                </div>
                <div className="flex justify-between items-end mt-2">
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-white/10 px-2 py-0.5 rounded">
                    Qty: {item.quantity}
                  </p>
                  <p className="font-bold text-sm text-[#111814] dark:text-white">
                    Rs {(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Price Breakdown */}
        <div className="space-y-3 pt-6 border-t border-gray-200 dark:border-white/10 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
            <span className="font-medium text-[#111814] dark:text-white">
              Rs {subtotal.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              Delivery Fee
            </span>
            <span className="font-medium text-[#111814] dark:text-white">
              Rs {deliveryFee.toLocaleString()}
            </span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-3 py-2 rounded-lg border border-green-100 dark:border-green-800/30">
              <span className="flex items-center gap-1">
                <Tag className="w-4 h-4" /> Bulk Discount (5%)
              </span>
              <span className="font-bold">
                - Rs {discount.toLocaleString()}
              </span>
            </div>
          )}
        </div>

        {/* Total */}
        <div className="flex justify-between items-end mb-8 pt-4 border-t border-dashed border-gray-300 dark:border-gray-600">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Total to pay
            </span>
            <span className="font-bold text-2xl text-[#111814] dark:text-white">
              Rs {total.toLocaleString()}
            </span>
          </div>
          <div className="text-xs text-gray-400 mb-1">Inc. VAT</div>
        </div>

        {/* Action Button */}
        <button
          onClick={onProceed}
          disabled={!canProceed}
          className="w-full bg-[#2bee79] hover:bg-[#1fce65] disabled:bg-gray-300 disabled:cursor-not-allowed text-[#0f1c15] font-bold h-14 rounded-xl shadow-[0_4px_14px_rgba(43,238,121,0.4)] hover:shadow-[0_6px_20px_rgba(43,238,121,0.6)] disabled:shadow-none flex items-center justify-center gap-2 transition-all transform active:scale-[0.98] disabled:active:scale-100"
        >
          <span>{buttonLabel}</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        {/* Payment Methods */}
        <div className="mt-6 flex flex-col items-center gap-3">
          <div className="flex items-center justify-center gap-3 opacity-60 hover:opacity-100 transition-opacity">
            <div className="relative w-12 h-7">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8_DVsW_-AFXU3SXPXR32wX_8pfOUfSRBTl1yeMlJW7xeHF2HiSvd336GZX8N_nUIomewfXCT8y51BDVp6Rikn_XVvXkkcwMa3G2UZ7Is8zOBD4Wq39tJVceG1nltWkMkSr0kYpMd1ZZAiZpZOu6FMEQUYTiAQhTrWGvOScGSNjabesstJ8z0eI5igPY0Z1cou-kBEyttDuyD3rLUMw2KITH-MFDVB3JpXNsbaER1K6kd4xglnrhNYxxQWEk8gah332S0s76wlGSs"
                alt="eSewa"
                fill
                className="object-contain"
              />
            </div>
            <div className="relative w-12 h-7">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnEEQzrybHM7stf9hi-j815fOrpEEnQjF1g1NcYv7UHM5q28JKRDiZuiagbpseidEY30-Giz2IThxvlcQt82D2kmbXUaFj9iPUCcHMGg3sRtWC4yBX8oxB2ulNQrNV38pd1HizdL6mWGceE-2UYjZDS5Lv1g8-RcFfrVLpPwu2sueUNtQecCv_1VeCPU8TyPQpXFsAQScUqZKNrA7lpbkH6Z16KuEjdtkNeI9wYIvYqYbD5zDSk6xO_IfxNPI059FAsFzJizYrgDQ"
                alt="Khalti"
                fill
                className="object-contain"
              />
            </div>
            <div className="relative w-10 h-7">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMgZbesHD3b2956SQMB2JaPlfkJwgA0bBl-4KX2ba2XKg-1kEIL0BO9Z55ubifkmYwjMDhU5x7sxaKqPMDu0jPIy5LlZMKH5NMun_GwOBKp8teclnosWU45Cm3yHA9Gya0sQQnOC56rv3WYYZ3ULN4UH3EGiv2aQflzmV0VLQY0SJNejQMB0JgV4LXUD7d7gqK3Eng4wbAE8LQNKgh0MNcBjJxUFsCBOpm2HBXkUeB0u7ZNDtn6QYTJbgXLXQVlSR40V5l1wbDkpk"
                alt="Visa"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <p className="text-center text-[11px] text-gray-400 leading-relaxed px-2">
            By placing this order, you agree to Boxsa&apos;`s{" "}
            <a
              href="#"
              className="underline hover:text-[#2bee79] transition-colors"
            >
              Terms
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="underline hover:text-[#2bee79] transition-colors"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
