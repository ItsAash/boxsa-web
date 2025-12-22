"use client";

import { useState } from "react";
import Image from "next/image";

export default function ImageGallery({
  images,
  badge,
}: {
  images: string[];
  badge?: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative w-full aspect-[4/3] md:aspect-square lg:aspect-[4/3] bg-white dark:bg-[#1A2C23] rounded-xl overflow-hidden border border-[#f0f4f2] dark:border-white/5 shadow-sm group">
        <div className="w-full h-full relative transition-transform duration-500 group-hover:scale-105">
          <Image
            src={images[activeIndex]}
            alt="Product image"
            fill
            className="object-contain p-4"
            priority
          />
        </div>

        {badge && (
          <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/80 backdrop-blur text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm border border-gray-100 dark:border-gray-700">
            {badge}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all ${
              index === activeIndex
                ? "border-2 border-[#2bee79] opacity-100"
                : "border border-transparent hover:border-gray-300 dark:hover:border-gray-600 opacity-70 hover:opacity-100"
            }`}
          >
            <div className="w-full h-full relative bg-white dark:bg-[#1A2C23]">
              <Image
                src={image}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
