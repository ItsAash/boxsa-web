import { OrderDetail } from "../../_components/types";

export default function OrderItems({ order }: { order: OrderDetail }) {
  return (
    <div className="bg-white dark:bg-[#1a2e23] rounded-2xl border border-border-light dark:border-border-dark p-6 flex flex-col">
      <h3 className="text-lg font-bold mb-4">Order Items</h3>

      <div className="space-y-4 flex-1 overflow-y-auto">
        {order.items.map((item) => (
          <div key={item.id} className="flex gap-3">
            <img
              src={item.image}
              className="h-14 w-14 rounded-lg object-cover border"
            />
            <div className="flex-1">
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-text-secondary">{item.variant}</p>
            </div>
            <div className="text-right">
              <p className="font-bold">x{item.quantity}</p>
              <p className="text-sm text-text-secondary">
                NPR {item.price.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t flex justify-between font-bold">
        <span>Total</span>
        <span>NPR {order.totalAmount.toLocaleString()}</span>
      </div>
    </div>
  );
}
