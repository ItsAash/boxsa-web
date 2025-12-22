import OrderProgressRing from "./order-process-ring";
import { OrderDetail } from "../../_components/types";

export default function OrderStatusSummary({ order }: { order: OrderDetail }) {
  return (
    <>
      <div>
        <span className="inline-block mb-2 px-3 py-1 rounded-full bg-primary/20 text-green-700 dark:text-primary text-xs font-bold uppercase">
          {order.statusLabel}
        </span>

        <h1 className="text-2xl sm:text-3xl font-bold text-text-main dark:text-white">
          {order.eta}
        </h1>

        <p className="mt-2 text-text-secondary dark:text-gray-400 text-sm">
          Order #{order.id} • Placed on {order.placedAt}
        </p>
      </div>

      <OrderProgressRing progress={order.progress} />
    </>
  );
}
