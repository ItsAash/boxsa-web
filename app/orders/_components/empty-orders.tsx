import Link from "next/link";
import { PackageOpen } from "lucide-react";

export default function EmptyOrders() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
      <PackageOpen className="w-10 h-10 text-text-secondary dark:text-gray-500" />
      <h3 className="text-lg font-semibold text-text-main dark:text-white">
        No orders yet
      </h3>
      <p className="text-text-secondary dark:text-gray-400 max-w-sm">
        Once you place an order, you’ll be able to track it here in real time.
      </p>
      <Link
        href="/products"
        className="mt-4 px-6 py-2.5 rounded-full bg-primary
          text-background-dark font-bold hover:bg-green-400 transition"
      >
        Start Shopping
      </Link>
    </div>
  );
}
