"use client";

import { Truck, Zap, Calendar, Clock } from "lucide-react";
import { CheckoutData } from "../page";

interface DeliveryStepProps {
  data: CheckoutData;
  onUpdate: (data: Partial<CheckoutData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const DELIVERY_OPTIONS = [
  {
    id: "standard",
    name: "Standard Delivery",
    icon: Truck,
    time: "2-3 Business Days",
    price: 150,
    description: "Regular delivery within valley",
  },
  {
    id: "express",
    name: "Express Delivery",
    icon: Zap,
    time: "Same Day / Next Day",
    price: 300,
    description: "Priority fast delivery",
  },
  {
    id: "scheduled",
    name: "Scheduled Delivery",
    icon: Calendar,
    time: "Choose Your Date",
    price: 200,
    description: "Pick your preferred date & time",
  },
];

export default function DeliveryStep({
  data,
  onUpdate,
  onNext,
  onBack,
}: DeliveryStepProps) {
  const selectedMethod = data.deliveryMethod || "standard";

  const handleMethodSelect = (method: "standard" | "express" | "scheduled") => {
    onUpdate({ deliveryMethod: method });
  };

  return (
    <>
      <section className="bg-white dark:bg-[#1A2C23] rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md">
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-white/5">
          <h2 className="text-xl font-bold flex items-center gap-3 text-[#111814] dark:text-white">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#2bee79] text-[#0f1c15] text-sm font-bold shadow-sm">
              2
            </span>
            Delivery Method
          </h2>
        </div>

        <div className="p-6 md:p-8 space-y-4">
          {DELIVERY_OPTIONS.map((option) => {
            const Icon = option.icon;
            const isSelected = selectedMethod === option.id;

            return (
              <label
                key={option.id}
                className="relative group cursor-pointer block"
              >
                <input
                  type="radio"
                  name="delivery_method"
                  value={option.id}
                  checked={isSelected}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onChange={() => handleMethodSelect(option.id as any)}
                  className="peer sr-only"
                />
                <div
                  className={`p-5 rounded-xl border-2 transition-all flex items-start gap-4 ${
                    isSelected
                      ? "border-[#2bee79] bg-[#2bee79]/5 dark:bg-[#2bee79]/10 shadow-sm"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-transparent"
                  }`}
                >
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-colors ${
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

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3
                          className={`font-bold text-base ${
                            isSelected
                              ? "text-[#111814] dark:text-white"
                              : "text-gray-700 dark:text-gray-300"
                          }`}
                        >
                          {option.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {option.time}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                          {option.description}
                        </p>
                      </div>

                      {/* Price & Radio */}
                      <div className="flex flex-col items-end gap-2">
                        <span
                          className={`font-bold ${
                            isSelected
                              ? "text-[#2bee79]"
                              : "text-gray-700 dark:text-gray-300"
                          }`}
                        >
                          Rs {option.price}
                        </span>
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
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
                    </div>
                  </div>
                </div>
              </label>
            );
          })}

          {/* Scheduled Delivery Date/Time Picker */}
          {selectedMethod === "scheduled" && (
            <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-5 border border-gray-100 dark:border-white/5 space-y-4 animate-in fade-in duration-300">
              <h4 className="font-bold text-sm text-[#111814] dark:text-white mb-3">
                Select Delivery Date & Time
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex flex-col">
                  <span className="text-sm font-medium pb-2 text-gray-700 dark:text-gray-300">
                    Preferred Date
                  </span>
                  <input
                    type="date"
                    value={data.deliveryDate || ""}
                    onChange={(e) => onUpdate({ deliveryDate: e.target.value })}
                    min={new Date().toISOString().split("T")[0]}
                    className="form-input w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-black/20 focus:border-[#2bee79] focus:ring-[#2bee79] h-11 px-4 dark:text-white shadow-sm"
                  />
                </label>

                <label className="flex flex-col">
                  <span className="text-sm font-medium pb-2 text-gray-700 dark:text-gray-300">
                    Preferred Time
                  </span>
                  <select
                    value={data.deliveryTime || ""}
                    onChange={(e) => onUpdate({ deliveryTime: e.target.value })}
                    className="form-select w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-black/20 focus:border-[#2bee79] focus:ring-[#2bee79] h-11 px-4 text-gray-700 dark:text-white shadow-sm cursor-pointer"
                  >
                    <option value="">Select time slot</option>
                    <option value="morning">Morning (9 AM - 12 PM)</option>
                    <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
                    <option value="evening">Evening (4 PM - 7 PM)</option>
                  </select>
                </label>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Navigation Buttons */}
      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 h-12 rounded-lg border border-gray-300 dark:border-gray-600 text-[#111814] dark:text-white font-semibold hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
        >
          Back to Address
        </button>
      </div>
    </>
  );
}
