import { ShieldCheck, Lock, RefreshCcw, Truck } from "lucide-react";

export function TrustAndGuaranteesSection() {
  return (
    <section className="flex justify-center px-4 py-20 lg:px-40">
      <div className="w-full max-w-[1024px] space-y-10">
        {/* Header */}
        <div className="space-y-3">
          <h2 className="text-3xl font-semibold text-white">
            Trust built into the system
          </h2>
          <p className="max-w-xl text-base text-gray-400">
            Bulk buying only works when pricing, quality, and delivery are
            predictable. Boxsa is engineered for consistency — not shortcuts.
          </p>
        </div>

        {/* Guarantees */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Item */}
          <TrustItem
            icon={<ShieldCheck className="h-5 w-5" />}
            title="Verified sourcing"
            description="Products come directly from authorized distributors and established wholesalers. No grey market inventory."
          />

          <TrustItem
            icon={<Lock className="h-5 w-5" />}
            title="Locked pricing"
            description="Final prices are confirmed before dispatch. No hidden charges or last-minute adjustments."
          />

          <TrustItem
            icon={<RefreshCcw className="h-5 w-5" />}
            title="Simple replacements"
            description="Missing or damaged items are replaced or refunded quickly, without unnecessary escalation."
          />

          <TrustItem
            icon={<Truck className="h-5 w-5" />}
            title="Scheduled delivery"
            description="Area-based delivery windows ensure predictable arrivals and optimized logistics."
          />
        </div>

        {/* Principle note */}
        <div className="rounded-2xl border border-white/10 bg-surface-darker p-6 text-sm text-gray-400">
          <p>
            Boxsa lowers prices by pooling demand and reducing intermediaries —
            not by compromising on product quality or delivery standards.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- Subcomponent ---------- */

function TrustItem({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="space-y-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="text-base font-semibold text-white">{title}</h3>
      <p className="text-sm leading-relaxed text-gray-400">{description}</p>
    </div>
  );
}
