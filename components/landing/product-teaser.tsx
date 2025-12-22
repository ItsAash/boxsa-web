import { ShoppingCart } from "lucide-react";

const featuredProducts = [
  {
    name: "Monthly staples bundle",
    description:
      "Rice, oil, dal, salt, sugar — designed for a 4–6 person household.",
    price: "From Rs. 4,990",
    tag: "Most common",
  },
  {
    name: "Cleaning & laundry pack",
    description:
      "Detergent, dishwash, cleaners, tissue — stocked for the whole month.",
    price: "From Rs. 2,150",
    tag: "Add-on box",
  },
  {
    name: "Office pantry starter",
    description:
      "Tea, coffee, biscuits, and basics for small offices or co-working spaces.",
    price: "From Rs. 3,600",
    tag: "For businesses",
  },
];

export function ProductTeaser() {
  return (
    <section
      id="products"
      className="flex justify-center py-20  px-4 lg:px-40 lg:py-20"
    >
      <div className="w-full max-w-[1024px] space-y-10">
        {/* Header */}
        <div className="text-center md:text-left space-y-3">
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">
            Simple, predictable monthly boxes
          </h2>
          <p className="max-w-2xl text-gray-400 text-sm sm:text-base leading-relaxed">
            Choose bulk packages curated for households and businesses. Lock
            your quantities each cycle and receive your items delivered
            reliably.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {featuredProducts.map((product) => (
            <article
              key={product.name}
              className="flex flex-col justify-between rounded-2xl border border-white/10 bg-surface-dark p-6 shadow-lg transition hover:shadow-xl"
            >
              <div className="space-y-4">
                {/* Tag & Icon */}
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span className="inline-flex items-center gap-2 rounded-full bg-surface-darker px-3 py-1 uppercase tracking-widest text-[10px] font-medium">
                    <span className="h-2 w-2 rounded-full bg-primary block" />
                    {product.tag}
                  </span>
                  <ShoppingCart className="h-4 w-4 text-gray-400" />
                </div>

                {/* Product Info */}
                <h3 className="text-lg font-semibold text-white">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Price */}
              <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-sm">
                <span className="text-gray-400">Indicative Boxsa price</span>
                <span className="font-semibold text-primary">
                  {product.price}
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Footer Note */}
        <p className="mt-6 text-center text-gray-500 text-xs sm:text-sm">
          Prices are indicative for Butwal City. Lock quantities early to
          guarantee delivery and pricing each month.
        </p>
      </div>
    </section>
  );
}
