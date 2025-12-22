import { Package, Truck, Home } from "lucide-react";

export default function OrderTimelinePreview() {
  return (
    <div className="flex items-center gap-3 text-text-secondary dark:text-gray-400 text-sm">
      <Package size={16} />
      <span>→</span>
      <Truck size={16} />
      <span>→</span>
      <Home size={16} />
    </div>
  );
}
