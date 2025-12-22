import OrdersHeader from "./_components/order-header";
import OrderCard from "./_components/order-card";
import EmptyOrders from "./_components/empty-orders";
import { Order } from "./_components/types";

const MOCK_ORDERS: Order[] = [
  {
    id: "BOX-8821",
    placedAt: "Oct 20, 2024",
    status: "IN_TRANSIT",
    totalAmount: 15300,
    itemsCount: 3,
    eta: "Arriving by Oct 24",
  },
  {
    id: "BOX-8794",
    placedAt: "Oct 12, 2024",
    status: "DELIVERED",
    totalAmount: 8400,
    itemsCount: 2,
    eta: "Delivered",
  },
];

export default function OrdersPage() {
  return (
    <div className="flex flex-col gap-8 max-w-[1024px] mx-auto">
      <OrdersHeader />

      {MOCK_ORDERS.length === 0 ? (
        <EmptyOrders />
      ) : (
        <div className="flex flex-col gap-4">
          {MOCK_ORDERS.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
