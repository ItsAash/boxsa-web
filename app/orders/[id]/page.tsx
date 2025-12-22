import OrderHeader from "./_components/order-header";
import OrderTimeline from "./_components/order-timeline";
import DeliveryAddress from "./_components/delivery-address";
import OrderItems from "./_components/order-items";
import OrderActions from "./_components/order-action";
import { OrderDetail } from "../_components/types";

const MOCK_ORDER: OrderDetail = {
  id: "BOX-8821",
  statusLabel: "In Transit",
  eta: "Arriving by Tuesday, Oct 24",
  placedAt: "Oct 20",
  progress: 75,
  timeline: [
    {
      step: "CONFIRMED",
      title: "Order Confirmed",
      timestamp: "Oct 20, 10:00 AM",
    },
    { step: "SOURCED", title: "Sourcing Items", timestamp: "Oct 21, 2:30 PM" },
    {
      step: "PACKED",
      title: "Packed",
      timestamp: "Oct 22, 9:00 AM",
    },
    {
      step: "OUT_FOR_DELIVERY",
      title: "Out for Delivery",
      timestamp: "Today, 8:45 AM",
      active: true,
      courier: {
        name: "Hari Krishna",
        phone: "+977 9841XXXXXX",
      },
    },
    {
      step: "DELIVERED",
      title: "Delivered",
      timestamp: "Expected Oct 24",
    },
  ],
  items: [
    {
      id: "1",
      name: "Premium Basmati Rice",
      variant: "50kg Sack",
      quantity: 2,
      price: 4500,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuApLQTZGxiu04MiGLSJfqs4rLQ4n6z5G0ZUy2r9OzymCL3ZW2NwMSGNUp2jaFgwMwSFe_laltHCef4r-AAlreLAiPKl_CTfRsyq6vDoDGn-0vBUberdXDfCAOuwrtCS7QAzmhi-XLkg80d-z6tFhDuNUsWbSj2Vgz-75iwPA-5zkjR80wMpTXDLhqsa1zI74oJaqhxRjsfLlNeuxnWfj3KhQTYAbGdRRxF9r76usVlESNDIpUNjN5lz46thA21yhKMgCXGO4IphgCQ",
    },
  ],
  totalAmount: 15300,
};

export default function OrderDetailPage() {
  return (
    <div className="flex flex-col gap-6 max-w-[1024px] mx-auto">
      <OrderHeader order={MOCK_ORDER} />

      <OrderTimeline timeline={MOCK_ORDER.timeline} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DeliveryAddress />
        <OrderItems order={MOCK_ORDER} />
      </div>

      <OrderActions />
    </div>
  );
}
