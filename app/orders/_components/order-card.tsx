import Link from "next/link";
import OrderStatusBadge from "./order-status-badge";
import OrderTimelinePreview from "./order-timeline-preview";
import { Order } from "./types";

export default function OrderCard({ order }: { order: Order }) {
  return (
    <Link
      href={`/orders/${order.id}`}
      className="group rounded-2xl border border-border-light dark:border-border-dark
        bg-white dark:bg-[#1a2e23]
        p-5 flex flex-col gap-4
        hover:shadow-md transition"
    >
      <div className="flex justify-between items-start gap-4">
        <div>
          <p className="text-sm text-text-secondary dark:text-gray-400">
            Order #{order.id}
          </p>
          <p className="font-semibold text-text-main dark:text-white">
            {order.eta}
          </p>
        </div>

        <OrderStatusBadge status={order.status} />
      </div>

      <OrderTimelinePreview />

      <div className="flex justify-between items-center pt-2 border-t border-border-light dark:border-border-dark">
        <p className="text-sm text-text-secondary dark:text-gray-400">
          {order.itemsCount} items • {order.placedAt}
        </p>
        <p className="font-bold text-text-main dark:text-white">
          NPR {order.totalAmount.toLocaleString()}
        </p>
      </div>
    </Link>
  );
}
