"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";

interface CartItemProps {
  item: {
    id: string;
    name: string;
    image: string;
    packSize: string;
    pricePerUnit: number;
    quantity: number;
  };
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export default function CartItem({
  item,
  onQuantityChange,
  onRemove,
}: CartItemProps) {
  const total = item.pricePerUnit * item.quantity;

  const handleDecrement = () => {
    if (item.quantity > 1) {
      onQuantityChange(item.id, item.quantity - 1);
    }
  };

  const handleIncrement = () => {
    onQuantityChange(item.id, item.quantity + 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1) {
      onQuantityChange(item.id, value);
    } else if (e.target.value === "") {
      // Allow empty for editing, will default to 1 on blur
      return;
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (isNaN(value) || value < 1) {
      onQuantityChange(item.id, 1);
    }
  };

  return (
    <div className="bg-white dark:bg-[#1A2C23] rounded-xl border border-gray-200 dark:border-white/10 shadow-sm p-4 sm:p-5 flex flex-col sm:flex-row gap-4 sm:gap-5 hover:border-gray-300 dark:hover:border-white/20 transition-all group">
      {/* Image */}
      <div className="w-full sm:w-28 h-28 shrink-0 rounded-lg bg-gray-100 dark:bg-black/20 border border-gray-200 dark:border-white/10 relative overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 112px"
        />
      </div>

      {/* Content Wrapper */}
      <div className="flex-1 flex flex-col gap-3 min-w-0">
        {/* Title and Delete */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-base sm:text-lg font-bold text-[#111814] dark:text-white leading-tight line-clamp-2">
              {item.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Pack size: {item.packSize}
            </p>
          </div>

          {/* Delete button - Always visible on mobile, hover on desktop */}
          <button
            onClick={() => onRemove(item.id)}
            className="shrink-0 p-2 -m-2 sm:p-1.5 sm:-m-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all sm:opacity-0 sm:group-hover:opacity-100"
            aria-label="Remove item"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>

        {/* Price, Quantity and Total Row */}
        <div className="flex flex-wrap items-end justify-between gap-4 mt-auto">
          {/* Price per unit */}
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium">
              Price / unit
            </span>
            <span className="text-base font-semibold text-[#111814] dark:text-white mt-0.5">
              Rs {item.pricePerUnit.toLocaleString()}
            </span>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center h-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-black/20 shadow-sm">
            <button
              onClick={handleDecrement}
              disabled={item.quantity <= 1}
              className="w-9 h-full flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-[#2bee79] hover:bg-gray-50 dark:hover:bg-white/5 rounded-l-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:text-gray-500 disabled:hover:bg-transparent"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>

            <input
              type="number"
              value={item.quantity}
              onChange={handleInputChange}
              onBlur={handleBlur}
              min="1"
              className="w-12 h-full text-center bg-transparent border-none font-bold text-[#111814] dark:text-white focus:ring-0 focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              aria-label="Quantity"
            />

            <button
              onClick={handleIncrement}
              className="w-9 h-full flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-[#2bee79] hover:bg-gray-50 dark:hover:bg-white/5 rounded-r-lg transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Total - Better aligned on mobile */}
          <div className="flex flex-col sm:text-right">
            <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium">
              Total
            </span>
            <span className="text-lg sm:text-xl font-black text-[#111814] dark:text-white mt-0.5">
              Rs {total.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
