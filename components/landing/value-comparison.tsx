export function ValueComparisonSection() {
  return (
    <section className="flex justify-center px-4 py-14 lg:px-40">
      <div className="w-full max-w-[1024px] space-y-10">
        {/* Header */}
        <div className="space-y-3">
          <h2 className="text-3xl font-bold text-white">
            Why Boxsa costs less
          </h2>
          <p className="max-w-xl text-base text-gray-400">
            See how pooling items demand unlocks wholesale pricing compared to
            buying the same items at local retail stores.
          </p>
        </div>

        {/* Comparison Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Retail */}
          <div className="rounded-2xl border border-white/5 bg-surface-dark p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Local Retail</h3>
              <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-gray-400">
                Individual purchase
              </span>
            </div>

            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center justify-between">
                <span>Jeera Masino Rice · 25kg</span>
                <span>Rs. 3,200</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Sunflower Oil · 5L</span>
                <span>Rs. 1,900</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Mixed Dal · 2kg</span>
                <span>Rs. 620</span>
              </li>
            </ul>

            <div className="mt-6 border-t border-white/5 pt-4 text-sm">
              <div className="flex items-center justify-between text-gray-400">
                <span>Total</span>
                <span className="line-through">Rs. 5,720</span>
              </div>
            </div>
          </div>

          {/* Boxsa */}
          <div className="relative rounded-2xl border border-primary/30 bg-surface-dark p-6 shadow-[0_0_0_1px_rgba(43,238,121,0.15)]">
            <div className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-background-dark">
              Boxsa price
            </div>

            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">
                Boxsa Wholesale
              </h3>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">
                Pooled items
              </span>
            </div>

            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center justify-between">
                <span>Jeera Masino Rice · 25kg</span>
                <span className="text-white">Rs. 2,850</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Sunflower Oil · 5L</span>
                <span className="text-white">Rs. 1,620</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Mixed Dal · 2kg</span>
                <span className="text-white">Rs. 520</span>
              </li>
            </ul>

            <div className="mt-6 border-t border-white/5 pt-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Your total</span>
                <span className="text-xl font-semibold text-primary">
                  Rs. 4,990
                </span>
              </div>
              <p className="mt-2 text-xs text-gray-400">
                Average savings of 18-25% compared to neighborhood retail
                prices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
