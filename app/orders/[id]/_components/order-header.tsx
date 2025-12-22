import OrderStatusSummary from "./order-status-summary";
import { OrderDetail } from "../../_components/types";

export default function OrderHeader({ order }: { order: OrderDetail }) {
  return (
    <div className="bg-white dark:bg-[#1a2e23] rounded-2xl border border-border-light dark:border-border-dark overflow-hidden">
      <div className="p-6 sm:p-8 flex flex-col sm:flex-row justify-between gap-6">
        <OrderStatusSummary order={order} />
      </div>
    </div>
  );
}
