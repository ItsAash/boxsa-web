"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import CartItem from "./_components/cart-item";
import OrderSummary from "./_components/order-summary";

interface CartItemType {
  id: string;
  name: string;
  image: string;
  packSize: string;
  pricePerUnit: number;
  quantity: number;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItemType[]>([
    {
      id: "1",
      name: "Sona Mansuli Rice",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAunFbxai7WF1FvuiNzzgJ_1H5sacApoThWctMaEmeHgiocMs1faQnemyt0lWywKD7oWlhxSnvtYO62C3lVdtYqHpLf2wgovIFdHqcYHQneKTw_oqVp8hAH9NjWOVH8-3lvD0wBJY2P8b_NPxCzI-QkzCSWp6w76Jd6pbeZZgo1Nn3HRlNIz-AmmfDsJnohitzBXJOrZvdnf5A58wpGWsY8YKQYFTpK942IQCuLuyvtednTI0rqieSxSlHWdrkVr38D9O9S2Kyjsa8",
      packSize: "25kg",
      pricePerUnit: 3200,
      quantity: 2,
    },
    {
      id: "2",
      name: "Sunflower Oil (Carton)",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBjcwKSRD4NB1AcVpy3fTXRgO33IL0fqmL4jieVNLz2IwZ6CslYhs5siniYdw36f4ndfToIAUBwcL8t6nLYtUkLXsj69WBw7_cZOZJGArP1LIESRgoITFsFq3PrzB5GJQM6WN2rWLd7NMUiIjNJlrBhgorSKzzkx1dLECEgUbnQ5Qd29KqQKFtiD7SL9VklsoTjpcvAqh6J6T3PYprQIgt3i--pb_aUjqh7ZPC4-e4xDTvkyZMXL1cJwlF5UXQ6Q-p6ZpDa1nUdBNM",
      packSize: "10 Liters",
      pricePerUnit: 2400,
      quantity: 1,
    },
    {
      id: "3",
      name: "Red Lentils (Massoor Dal)",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD7MEvYddDiItBOn6-7Gi9DDA9T9Y6y4Wqu9k-meAlzUyMQLCGECr6M9p6L1iMALN1nOjxjRtOJ6hPsptXS_0UILL5UeTi8uGxHFm4zALN2K9W6q-gmbWIvPOSnzwmTnDpIj88mtYlOjyNXPbn88N4gGVxCLVlK-vRwxSqGB-MFtQut2oAzz5U1fG4D7ER_RLtEQvS1qOnOUK7gDYIQ4fYaRx9XkB3L50Wil9gNM1HhvhH9CvudHYXCYxInkcpRPqoF8_ErhI0ADMY",
      packSize: "5kg",
      pricePerUnit: 900,
      quantity: 3,
    },
  ]);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.pricePerUnit * item.quantity,
    0
  );
  const deliveryFee = 150;
  const total = subtotal + deliveryFee;
  const savings = 500;

  return (
    <div className="flex flex-col gap-8 max-w-[1024px] mx-auto">
      {/* Breadcrumbs & Heading */}
      <div>
        <nav className="flex mb-4" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2">
            <li className="inline-flex items-center">
              <Link
                href="#"
                className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-[#2bee79] dark:text-slate-400 dark:hover:text-white transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 text-slate-400 mx-1" />
                <span className="ms-1 text-sm font-medium text-slate-900 md:ms-2 dark:text-white">
                  Cart
                </span>
              </div>
            </li>
          </ol>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Your Cart{" "}
          <span className="text-slate-400 dark:text-slate-600 text-2xl font-bold ml-2">
            ({cartItems.length} items)
          </span>
        </h1>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Cart Items */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {cartItems.length === 0 ? (
            <div className="bg-white dark:bg-[#1e293b] rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 p-12 text-center">
              <p className="text-slate-500 dark:text-slate-400 text-lg">
                Your cart is empty
              </p>
              <Link
                href="/products"
                className="inline-block mt-4 text-[#2bee79] hover:underline"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemoveItem}
              />
            ))
          )}
        </div>

        {/* Right Column: Summary */}
        {cartItems.length > 0 && (
          <div className="lg:col-span-4">
            <OrderSummary
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              total={total}
              savings={savings}
            />
          </div>
        )}
      </div>
    </div>
  );
}
