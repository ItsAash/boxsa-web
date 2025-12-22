export default function OrdersHeader() {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-text-main dark:text-white">
        Your Orders
      </h1>
      <p className="text-text-secondary dark:text-gray-400">
        Track, review and manage your Boxsa orders.
      </p>
    </div>
  );
}
