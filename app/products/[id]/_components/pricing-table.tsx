"use client";

interface PricingTier {
  minQty: number;
  maxQty: number | null;
  unitPrice: number;
  savings?: number | null;
}

export default function PricingTable({
  tiers,
  activeQty,
}: {
  tiers: PricingTier[];
  activeQty: number;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-lg text-[#111814] dark:text-white">
          Bulk Pricing
        </h3>
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
          Prices inclusive of VAT
        </span>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 dark:bg-white/5 text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
            <tr>
              <th className="px-4 py-3 font-medium">Quantity</th>
              <th className="px-4 py-3 font-medium text-right">Price / Unit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {tiers.map((tier, i) => {
              const isActive =
                activeQty >= tier.minQty &&
                (tier.maxQty === null || activeQty <= tier.maxQty);

              return (
                <tr
                  key={i}
                  className={`group transition-colors ${
                    isActive
                      ? "bg-[#2bee79]/10 dark:bg-[#2bee79]/5 hover:bg-[#2bee79]/20 dark:hover:bg-[#2bee79]/10"
                      : "hover:bg-gray-50 dark:hover:bg-white/5"
                  }`}
                >
                  <td className="px-4 py-3 font-medium text-[#111814] dark:text-white">
                    <div className="flex items-center gap-2">
                      {tier.minQty} - {tier.maxQty ?? "∞"} units
                      {tier.savings && (
                        <span className="bg-[#2bee79] text-[#0f1c15] text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">
                          SAVE {tier.savings}%
                        </span>
                      )}
                    </div>
                  </td>
                  <td
                    className={`px-4 py-3 text-right font-bold ${
                      isActive
                        ? "text-green-700 dark:text-[#2bee79]"
                        : "text-[#111814] dark:text-white"
                    }`}
                  >
                    Rs {tier.unitPrice.toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
