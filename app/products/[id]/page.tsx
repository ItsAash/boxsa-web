"use client";

import { useMemo, useState, use } from "react";
import Link from "next/link";
import ImageGallery from "./_components/image-gallery";
import PricingTable from "./_components/pricing-table";
import QuantitySelector from "./_components/quantity-selector";
import { ChevronRight, Package, Truck, ShoppingCart } from "lucide-react";

interface PricingTier {
  minQty: number;
  maxQty: number | null;
  unitPrice: number;
  savings?: number | null;
}

interface Product {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  distributor: string;
  badge?: string;
  images: string[];
  pricingTiers: PricingTier[];
  stock: number;
  estimatedDelivery: string;
  breadcrumbs: string[];
}

const getProduct = (id: string): Product => ({
  id,
  name: "Nepal Organic Coffee Beans - 1kg",
  shortDescription:
    "Premium medium-roast arabica beans. Best for espresso & filter.",
  description:
    "Sourced directly from the high-altitude farms of Gulmi, these Arabica beans are medium-roasted to preserve their nutty and fruity undertones. Perfect for bulk brewing in cafes, offices, or large households.",
  distributor: "Himalayan Java",
  badge: "Organic",
  images: [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuABdX10VRFDVxzsCXkWh5lO_LRf0hhgj95uTWQdqtXNEGT28YgxaQ6tN1MZmkFzswad2EXSqHK7Qcjuhe3-H7W9HV-TXAwuOKFbpPi4LYRoL5Y5ZSbWRtHgX4N42wxFfNpqTtG2BE7M41201J9ZNLu00piDc1qCUT0YAQgpcgYyRu36cLQrTQ5eDspHsz8j3iWhIkQm0064wqFleAhgOeqyIsvlN_6ubAzODDqRxgXIDgZG5ZH3MrSLH_ZjbUOKDuSMEEx9ME1448Y",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBEN7Jf9BeUO7esdv5xJrfE_AAbXQsNN_98TbsrlC3460nZxG_en_ZP7MT8K5QWDTYCGmUI54S89ttlL75uiZ9kggpTBfg30Lv5jjYm4pW3v6SDtL9PCgqP109QdVVf8M-ZfNBhcIxbDOkur7AbFEzzwKeLUT41U4_6EvY2cbJOpHKnGXjKTMQ0hfyrYmGuRQeZW05mv7mVEvYtRQp9Duga9tvSBxvgPwmbdv8JoCrtxPfITBgf5c6H7L7F8kUeOzjz_ZnlYve48D8",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCQNTRLOCPzp98K_NyrjXGMXC_dgJz5zjP42iQrgN1NTp4wCnprhSI19Y4N_IaQ71Qkp7iQt2AYGp5TH_Ll3sLRKPn-oUKiExtrnOsppCqiQRjnuSoSpALjW9Sr7t-Ehe-Le0ZspcGb6OdfBYnRAViQg2mPrlW4LH1eE_81fVJhMOMEfE9fqtymlMnQxdMgUGZ8K6ML26XD0IYOLBHk21ruTQLUqRj7e3NPocwdA05DM13webQM60hj0X8OwHjPsuItiR6x4GVuA9w",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBKd8Zgt65bMEBvnnpaVCnAEwHs0mr_D6LrYILbkMi6ipEHbQ_Qlqg7L3nEmSzwgdcmTcH548M6YDdG51Gyh71DfSN8i_NB-iIeJ-p7SYZvlUZLeAwXI9GoVEBsXdxTznWyezH5acTNdfazmVkeO5EHmRZ5PnmXHe7zts6cNDYykm7yaVUTJeEuX-WKTpQ1IXkFDIjtVS_fCpCxlSQVX2JiATKpQsWjQ0SMpmPY-UozzCbVbZtqpjxnUx0vIlmyGAjfOuV8DTr9S0k",
  ],
  pricingTiers: [
    { minQty: 1, maxQty: 5, unitPrice: 1200, savings: null },
    { minQty: 6, maxQty: 20, unitPrice: 1050, savings: 12 },
    { minQty: 21, maxQty: null, unitPrice: 980, savings: 18 },
  ],
  stock: 999,
  estimatedDelivery: "Oct 24 - Oct 25",
  breadcrumbs: ["Home", "Groceries", "Beverages", "Coffee"],
});

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const product = useMemo(() => getProduct(id), [id]);
  const [quantity, setQuantity] = useState(10);

  const activeTier = useMemo(() => {
    return (
      product.pricingTiers.find(
        (t) =>
          quantity >= t.minQty && (t.maxQty === null || quantity <= t.maxQty)
      ) || product.pricingTiers[0]
    );
  }, [quantity, product.pricingTiers]);

  const total = quantity * activeTier.unitPrice;
  const originalTotal = quantity * product.pricingTiers[0].unitPrice;
  const savings = activeTier.savings ? originalTotal - total : 0;

  return (
    <div className="flex flex-col gap-6">
      {/* Breadcrumbs */}
      <nav className="flex flex-wrap items-center gap-2 text-sm text-[#618971] dark:text-gray-400">
        {product.breadcrumbs.map((crumb, i) => (
          <div key={i} className="flex items-center gap-2">
            {i !== 0 && <ChevronRight className="w-4 h-4" />}
            {i < product.breadcrumbs.length - 1 ? (
              <Link href="#" className="hover:text-[#2bee79] transition-colors">
                {crumb}
              </Link>
            ) : (
              <span className="font-medium text-[#111814] dark:text-white">
                {crumb}
              </span>
            )}
          </div>
        ))}
      </nav>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <ImageGallery images={product.images} badge={product.badge} />

          {/* Desktop Description */}
          <div className="hidden lg:block">
            <h3 className="text-lg font-bold mb-3 text-[#111814] dark:text-white">
              About this item
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              {product.description}
            </p>

            {/* Expandable Sections */}
            <div className="flex flex-col gap-3">
              <details className="group bg-white dark:bg-[#1A2C23] border border-gray-200 dark:border-white/10 rounded-lg overflow-hidden">
                <summary className="flex justify-between items-center p-4 font-medium cursor-pointer list-none select-none hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                  <span>Why buy in bulk?</span>
                  <ChevronRight className="w-5 h-5 transition-transform group-open:rotate-90" />
                </summary>
                <div className="px-4 pb-4 text-sm text-gray-500 dark:text-gray-400">
                  Buying in bulk reduces packaging waste and transportation
                  emissions. Additionally, you save up to 15% on retail prices
                  by ordering larger quantities directly from our authorized
                  distributors.
                </div>
              </details>

              <Link
                href="#"
                className="flex items-center justify-between p-4 bg-white dark:bg-[#1A2C23] border border-gray-200 dark:border-white/10 rounded-lg hover:border-[#2bee79]/50 transition-colors group"
              >
                <span className="font-medium text-sm">
                  Return & replacement policy
                </span>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#2bee79] transition-colors" />
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Header */}
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                <svg
                  className="w-3.5 h-3.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Authorized Distributor
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {product.distributor}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-[#111814] dark:text-white leading-tight mb-2">
              {product.name}
            </h1>
            <p className="text-base text-gray-600 dark:text-gray-300">
              {product.shortDescription}
            </p>
          </div>

          {/* Purchase Card */}
          <div className="flex flex-col gap-6 p-5 bg-white dark:bg-[#1A2C23] rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
            <PricingTable tiers={product.pricingTiers} activeQty={quantity} />

            <div className="flex flex-col gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
              <div className="flex justify-between items-end">
                <QuantitySelector quantity={quantity} onChange={setQuantity} />

                <div className="text-right">
                  <div className="text-xs text-gray-500 mb-0.5">
                    Total Price
                  </div>
                  <div className="text-2xl font-black text-[#111814] dark:text-white">
                    Rs {total.toLocaleString()}
                  </div>
                  {savings > 0 && (
                    <div className="text-xs font-medium text-green-600 dark:text-[#2bee79]">
                      You save Rs {savings.toLocaleString()}
                    </div>
                  )}
                </div>
              </div>

              {/* Meta Info */}
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-2 rounded">
                  <Package className="w-[18px] h-[18px]" />
                  <span className="font-medium">
                    Available on order (2–3 days)
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 px-2">
                  <Truck className="w-[18px] h-[18px]" />
                  <span>
                    Est. delivery:{" "}
                    <span className="font-semibold text-[#111814] dark:text-white">
                      {product.estimatedDelivery}
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <button className="w-full h-12 bg-[#2bee79] hover:bg-[#1fce65] active:scale-[0.98] transition-all rounded-lg font-bold text-[#0f1c15] text-base flex items-center justify-center gap-2 shadow-sm">
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button className="w-full h-10 bg-transparent border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-white/5 text-[#111814] dark:text-white font-medium rounded-lg text-sm transition-colors">
                Add to Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Description */}
      <div className="lg:hidden">
        <h3 className="text-lg font-bold mb-2 text-[#111814] dark:text-white">
          Product Description
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
          {product.description}
        </p>
        <div className="flex flex-col gap-3">
          <Link
            href="#"
            className="flex items-center justify-between p-3 bg-white dark:bg-[#1A2C23] border border-gray-200 dark:border-white/10 rounded-lg hover:border-[#2bee79]/50 transition-colors"
          >
            <span className="font-medium text-sm">Why buy in bulk?</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </Link>
        </div>
      </div>
    </div>
  );
}
