export default function DeliveryAddress() {
  return (
    <div className="bg-white dark:bg-[#1a2e23] rounded-2xl border border-border-light dark:border-border-dark p-6">
      <h3 className="text-lg font-bold mb-4 text-text-main dark:text-white">
        Delivery Address
      </h3>

      <div className="pl-4 border-l-2 border-primary/20 space-y-1">
        <p className="font-semibold">Ram Bahadur</p>
        <p className="text-sm text-text-secondary">
          Kumaripati, Lalitpur, Kathmandu
        </p>
        <p className="text-sm text-text-secondary">+977 9800000000</p>
      </div>
    </div>
  );
}
