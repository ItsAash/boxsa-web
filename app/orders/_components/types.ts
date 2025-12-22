export type OrderStatus =
  | "CONFIRMED"
  | "PACKED"
  | "IN_TRANSIT"
  | "DELIVERED"
  | "CANCELLED";

export interface Order {
  id: string;
  placedAt: string;
  status: OrderStatus;
  totalAmount: number;
  itemsCount: number;
  eta: string;
}

export type OrderStep =
  | "CONFIRMED"
  | "SOURCED"
  | "PACKED"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED";

export type TimelineEvent = {
  step: "CONFIRMED" | "SOURCED" | "PACKED" | "OUT_FOR_DELIVERY" | "DELIVERED";
  title: string;
  timestamp: string;
  active?: boolean;
  courier?: {
    name: string;
    phone: string;
  };
};

export interface OrderItem {
  id: string;
  name: string;
  variant: string;
  quantity: number;
  price: number;
  image: string;
}

export interface OrderDetail {
  id: string;
  statusLabel: string;
  eta: string;
  placedAt: string;
  progress: number;
  timeline: TimelineEvent[];
  items: OrderItem[];
  totalAmount: number;
}
