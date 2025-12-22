import { OrderStatus } from "./types";
import clsx from "clsx";

export default function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span
      className={clsx(
        "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide",
        {
          "bg-primary/20 text-green-700 dark:text-primary":
            status === "IN_TRANSIT",
          "bg-green-100 text-green-700": status === "DELIVERED",
          "bg-yellow-100 text-yellow-700": status === "CONFIRMED",
          "bg-blue-100 text-blue-700": status === "PACKED",
          "bg-red-100 text-red-700": status === "CANCELLED",
        }
      )}
    >
      {status.replace("_", " ")}
    </span>
  );
}
