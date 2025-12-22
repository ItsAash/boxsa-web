"use client";

import { Download, XCircle } from "lucide-react";

export default function OrderActions() {
  return (
    <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 pb-8">
      {/* Download Invoice */}
      <button
        type="button"
        className="
          w-full sm:w-auto min-w-[200px]
          inline-flex items-center justify-center gap-2
          rounded-xl px-6 py-3
          border border-gray-700
          bg-[#1a2e23]
          text-white
          font-semibold text-sm
          transition-all
          hover:bg-[#1f3a2b]
          hover:border-gray-600
          focus:outline-none focus:ring-2 focus:ring-primary/40
          active:scale-[0.98]
        "
      >
        <Download size={18} className="text-gray-300" />
        Download Invoice
      </button>

      {/* Cancel Order (Destructive) */}
      <button
        type="button"
        className="
          w-full sm:w-auto min-w-[200px]
          inline-flex items-center justify-center gap-2
          rounded-xl px-6 py-3
          bg-red-600
          text-white
          font-semibold text-sm
          transition-all
          hover:bg-red-500
          focus:outline-none focus:ring-2 focus:ring-red-500/40
          active:scale-[0.98]
        "
      >
        <XCircle size={18} />
        Cancel Order
      </button>
    </div>
  );
}
