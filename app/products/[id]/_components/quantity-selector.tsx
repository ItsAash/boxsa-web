"use client";

import { Minus, Plus } from "lucide-react";

export default function QuantitySelector({
  quantity,
  onChange,
}: {
  quantity: number;
  onChange: (v: number) => void;
}) {
  const handleDecrement = () => {
    if (quantity > 1) {
      onChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    onChange(quantity + 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1) {
      onChange(value);
    }
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Quantity
      </label>
      <div className="flex items-center h-11 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-black/20 w-36">
        <button
          onClick={handleDecrement}
          className="w-10 h-full flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-[#2bee79] hover:bg-gray-50 dark:hover:bg-white/5 rounded-l-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={quantity <= 1}
        >
          <Minus className="w-5 h-5" />
        </button>

        <input
          type="number"
          value={quantity}
          onChange={handleInputChange}
          min="1"
          className="flex-1 w-full h-full text-center border-none bg-transparent focus:ring-0 p-0 font-bold text-[#111814] dark:text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />

        <button
          onClick={handleIncrement}
          className="w-10 h-full flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-[#2bee79] hover:bg-gray-50 dark:hover:bg-white/5 rounded-r-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
