import { Layers, CreditCard, Truck } from "lucide-react";

export function HowItWorksSection() {
  return (
    <section className="flex justify-center px-4 py-20 lg:px-40">
      <div className="w-full max-w-[1024px] space-y-10">
        {/* Header */}
        <div className="space-y-3">
          <h2 className="text-3xl font-semibold text-white">How Boxsa works</h2>
          <p className="max-w-xl text-base text-gray-400">
            We simplify bulk buying by pooling household demand and handling
            sourcing, pricing, and delivery for you.
          </p>
        </div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Connector line (desktop) */}
          <div className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px bg-white/5 md:block" />

          {/* Step 1 */}
          <div className="relative space-y-4 rounded-2xl border border-white/5 bg-surface-dark p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Layers className="h-5 w-5" />
              </div>
              <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
                Step 1
              </span>
            </div>
            <h3 className="text-lg font-semibold text-white">
              Select bulk essentials
            </h3>
            <p className="text-sm leading-relaxed text-gray-400">
              Choose everyday items in wholesale quantities from our curated
              catalog to unlock lower per-unit pricing.
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative space-y-4 rounded-2xl border border-white/5 bg-surface-dark p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <CreditCard className="h-5 w-5" />
              </div>
              <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
                Step 2
              </span>
            </div>
            <h3 className="text-lg font-semibold text-white">
              Confirm and pay
            </h3>
            <p className="text-sm leading-relaxed text-gray-400">
              Review your order and pay securely online or choose cash on
              delivery. Final prices are locked before dispatch.
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative space-y-4 rounded-2xl border border-white/5 bg-surface-dark p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Truck className="h-5 w-5" />
              </div>
              <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
                Step 3
              </span>
            </div>
            <h3 className="text-lg font-semibold text-white">
              Receive on schedule
            </h3>
            <p className="text-sm leading-relaxed text-gray-400">
              Orders are delivered in fixed time slots by area, ensuring
              predictable delivery and reduced logistics cost.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
