"use client";

import { useState } from "react";
import { CreditCard, Wallet, Banknote, ShieldCheck } from "lucide-react";
import { CheckoutData } from "../page";
import Image from "next/image";

interface PaymentStepProps {
  data: CheckoutData;
  onUpdate: (data: Partial<CheckoutData>) => void;
  onBack: () => void;
  total: number;
}

const PAYMENT_METHODS = [
  {
    id: "esewa",
    name: "eSewa",
    icon: Wallet,
    description: "Pay securely with eSewa wallet",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8_DVsW_-AFXU3SXPXR32wX_8pfOUfSRBTl1yeMlJW7xeHF2HiSvd336GZX8N_nUIomewfXCT8y51BDVp6Rikn_XVvXkkcwMa3G2UZ7Is8zOBD4Wq39tJVceG1nltWkMkSr0kYpMd1ZZAiZpZOu6FMEQUYTiAQhTrWGvOScGSNjabesstJ8z0eI5igPY0Z1cou-kBEyttDuyD3rLUMw2KITH-MFDVB3JpXNsbaER1K6kd4xglnrhNYxxQWEk8gah332S0s76wlGSs",
  },
  {
    id: "khalti",
    name: "Khalti",
    icon: Wallet,
    description: "Quick payment through Khalti",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuBnEEQzrybHM7stf9hi-j815fOrpEEnQjF1g1NcYv7UHM5q28JKRDiZuiagbpseidEY30-Giz2IThxvlcQt82D2kmbXUaFj9iPUCcHMGg3sRtWC4yBX8oxB2ulNQrNV38pd1HizdL6mWGceE-2UYjZDS5Lv1g8-RcFfrVLpPwu2sueUNtQecCv_1VeCPU8TyPQpXFsAQScUqZKNrA7lpbkH6Z16KuEjdtkNeI9wYIvYqYbD5zDSk6xO_IfxNPI059FAsFzJizYrgDQ",
  },
  {
    id: "card",
    name: "Credit / Debit Card",
    icon: CreditCard,
    description: "Visa, Mastercard, UnionPay accepted",
    logo: null,
  },
  {
    id: "cod",
    name: "Cash on Delivery",
    icon: Banknote,
    description: "Pay when you receive the order",
    logo: null,
  },
];

export default function PaymentStep({
  data,
  onUpdate,
  onBack,
  total,
}: PaymentStepProps) {
  const selectedMethod = data.paymentMethod || "esewa";
  const [cardDetails, setCardDetails] = useState(
    data.cardDetails || {
      cardNumber: "",
      cardName: "",
      expiryDate: "",
      cvv: "",
    }
  );

  const handleMethodSelect = (method: "esewa" | "khalti" | "cod" | "card") => {
    onUpdate({ paymentMethod: method });
  };

  const handleCardDetailChange = (field: string, value: string) => {
    const updated = { ...cardDetails, [field]: value };
    setCardDetails(updated);
    onUpdate({ cardDetails: updated });
  };

  return (
    <>
      <section className="bg-white dark:bg-[#1A2C23] rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md">
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-white/5">
          <h2 className="text-xl font-bold flex items-center gap-3 text-[#111814] dark:text-white">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#2bee79] text-[#0f1c15] text-sm font-bold shadow-sm">
              3
            </span>
            Payment Method
          </h2>
        </div>

        <div className="p-6 md:p-8 space-y-4">
          {/* Payment Methods */}
          {PAYMENT_METHODS.map((method) => {
            const Icon = method.icon;
            const isSelected = selectedMethod === method.id;

            return (
              <label
                key={method.id}
                className="relative group cursor-pointer block"
              >
                <input
                  type="radio"
                  name="payment_method"
                  value={method.id}
                  checked={isSelected}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onChange={() => handleMethodSelect(method.id as any)}
                  className="peer sr-only"
                />
                <div
                  className={`p-5 rounded-xl border-2 transition-all flex items-center gap-4 ${
                    isSelected
                      ? "border-[#2bee79] bg-[#2bee79]/5 dark:bg-[#2bee79]/10 shadow-sm"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-transparent"
                  }`}
                >
                  {/* Icon or Logo */}
                  <div className="shrink-0">
                    {method.logo ? (
                      <div className="w-16 h-10 relative">
                        <Image
                          src={method.logo}
                          alt={method.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                          isSelected
                            ? "bg-[#2bee79]/20 dark:bg-[#2bee79]/30"
                            : "bg-gray-100 dark:bg-white/10"
                        }`}
                      >
                        <Icon
                          className={`w-6 h-6 ${
                            isSelected ? "text-[#2bee79]" : "text-gray-400"
                          }`}
                        />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3
                      className={`font-bold text-base ${
                        isSelected
                          ? "text-[#111814] dark:text-white"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {method.name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {method.description}
                    </p>
                  </div>

                  {/* Radio Button */}
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? "border-[#2bee79]"
                        : "border-gray-300 dark:border-gray-600"
                    }`}
                  >
                    {isSelected && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[#2bee79]" />
                    )}
                  </div>
                </div>
              </label>
            );
          })}

          {/* Card Details Form */}
          {selectedMethod === "card" && (
            <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-6 border border-gray-100 dark:border-white/5 space-y-5 animate-in fade-in duration-300">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                <ShieldCheck className="w-4 h-4 text-[#2bee79]" />
                <span>Your card details are encrypted and secure</span>
              </div>

              <div className="grid grid-cols-1 gap-5">
                <label className="flex flex-col">
                  <span className="text-sm font-medium pb-2 text-gray-700 dark:text-gray-300">
                    Card Number
                  </span>
                  <input
                    type="text"
                    value={cardDetails.cardNumber}
                    onChange={(e) =>
                      handleCardDetailChange("cardNumber", e.target.value)
                    }
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    className="form-input w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-black/20 focus:border-[#2bee79] focus:ring-[#2bee79] h-11 px-4 placeholder:text-gray-400 dark:text-white shadow-sm font-mono"
                  />
                </label>

                <label className="flex flex-col">
                  <span className="text-sm font-medium pb-2 text-gray-700 dark:text-gray-300">
                    Cardholder Name
                  </span>
                  <input
                    type="text"
                    value={cardDetails.cardName}
                    onChange={(e) =>
                      handleCardDetailChange("cardName", e.target.value)
                    }
                    placeholder="RAM BAHADUR"
                    className="form-input w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-black/20 focus:border-[#2bee79] focus:ring-[#2bee79] h-11 px-4 placeholder:text-gray-400 dark:text-white shadow-sm uppercase"
                  />
                </label>

                <div className="grid grid-cols-2 gap-4">
                  <label className="flex flex-col">
                    <span className="text-sm font-medium pb-2 text-gray-700 dark:text-gray-300">
                      Expiry Date
                    </span>
                    <input
                      type="text"
                      value={cardDetails.expiryDate}
                      onChange={(e) =>
                        handleCardDetailChange("expiryDate", e.target.value)
                      }
                      placeholder="MM/YY"
                      maxLength={5}
                      className="form-input w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-black/20 focus:border-[#2bee79] focus:ring-[#2bee79] h-11 px-4 placeholder:text-gray-400 dark:text-white shadow-sm font-mono"
                    />
                  </label>

                  <label className="flex flex-col">
                    <span className="text-sm font-medium pb-2 text-gray-700 dark:text-gray-300">
                      CVV
                    </span>
                    <input
                      type="text"
                      value={cardDetails.cvv}
                      onChange={(e) =>
                        handleCardDetailChange("cvv", e.target.value)
                      }
                      placeholder="123"
                      maxLength={4}
                      className="form-input w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-black/20 focus:border-[#2bee79] focus:ring-[#2bee79] h-11 px-4 placeholder:text-gray-400 dark:text-white shadow-sm font-mono"
                    />
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* COD Notice */}
          {selectedMethod === "cod" && (
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 border border-amber-100 dark:border-amber-800/30">
              <p className="text-sm text-amber-800 dark:text-amber-200">
                <strong>Note:</strong> Please keep exact cash ready. Our
                delivery agent will collect Rs {total.toLocaleString()} upon
                delivery.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Navigation Button */}
      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 h-12 rounded-lg border border-gray-300 dark:border-gray-600 text-[#111814] dark:text-white font-semibold hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
        >
          Back to Delivery
        </button>
      </div>
    </>
  );
}
