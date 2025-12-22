"use client";

import { TimelineEvent } from "../../_components/types";
import { Check, Home, Truck, Phone } from "lucide-react";

export default function OrderTimeline({
  timeline,
}: {
  timeline: TimelineEvent[];
}) {
  return (
    <div className="rounded-2xl bg-[#15281e] border border-gray-800 p-6 sm:p-8">
      <h3 className="mb-6 text-lg font-bold text-white">Tracking Timeline</h3>

      <div className="grid grid-cols-[36px_1fr] gap-x-4">
        {timeline.map((event, idx) => {
          const isLast = idx === timeline.length - 1;
          const isActive = event.active;
          const isDelivered = event.step === "DELIVERED";
          const isOutForDelivery = event.step === "OUT_FOR_DELIVERY";

          return (
            <div key={idx} className="contents">
              {/* Timeline Icon + Line */}
              <div className="flex flex-col items-center">
                {/* Icon */}
                <div className="relative z-10">
                  {isActive && (
                    <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
                  )}

                  <div
                    className={`
                      flex h-8 w-8 items-center justify-center rounded-full
                      ${
                        isDelivered
                          ? "bg-primary text-black"
                          : isActive
                          ? "bg-primary text-black"
                          : "bg-[#1f3a2b] text-gray-400 border border-gray-700"
                      }
                    `}
                  >
                    {isDelivered ? (
                      <Home size={16} />
                    ) : isOutForDelivery ? (
                      <Truck size={16} />
                    ) : (
                      <Check size={16} />
                    )}
                  </div>
                </div>

                {/* Connector */}
                {!isLast && (
                  <div
                    className={`
                      w-0.5 flex-1 min-h-[40px]
                      ${
                        isActive || isDelivered
                          ? "bg-primary/40"
                          : "bg-gray-700 border-l border-dotted"
                      }
                    `}
                  />
                )}
              </div>

              {/* Content */}
              <div className="pb-8 pt-1">
                <p
                  className={`text-base font-semibold ${
                    isActive ? "text-primary" : "text-white"
                  }`}
                >
                  {event.title}
                </p>

                <p className="mt-0.5 text-sm text-gray-400">
                  {event.timestamp}
                </p>

                {/* Courier Card (Only for Out for Delivery) */}
                {isOutForDelivery && event.courier && (
                  <div className="mt-4 flex items-center gap-3 rounded-xl border border-gray-700 bg-[#1a2e23] p-4 shadow-sm">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#223f31] text-primary">
                      <Truck size={18} />
                    </div>

                    <div className="flex-1">
                      <p className="text-sm font-semibold text-white">
                        Courier: {event.courier.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {event.courier.phone}
                      </p>
                    </div>

                    <button
                      type="button"
                      className="
                        inline-flex items-center justify-center
                        rounded-lg p-2
                        text-primary
                        hover:bg-primary/10
                        transition
                      "
                    >
                      <Phone size={18} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
