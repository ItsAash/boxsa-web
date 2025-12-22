import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type TagColor = "red" | "green" | "blue";

interface ProductCardProps {
  id?: string;
  title: string;
  image: string;
  price: number;
  unitPrice?: string;
  originalPrice?: number;
  minQty: string;
  tag?: string;
  tagColor?: TagColor;
}

const tagColors: Record<TagColor, string> = {
  red: "bg-[#e85c33]",
  green: "bg-[#2bee79] text-[#0f1c15]",
  blue: "bg-blue-500",
};

export default function ProductCard({
  id = "1",
  title,
  image,
  price,
  unitPrice,
  originalPrice,
  minQty,
  tag,
  tagColor = "green",
}: ProductCardProps) {
  return (
    <Link
      href={`/products/${id}`}
      className="group flex flex-col gap-3 hover:scale-[1.02] transition-transform"
    >
      {/* Image Container */}
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-[#1f352b]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(min-width: 768px) 33vw, 50vw"
        />
        {tag && (
          <div
            className={`absolute top-3 left-3 ${
              tagColors[tagColor ?? "green"]
            } text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide z-10`}
          >
            {tag}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex flex-col gap-1.5 px-1">
        <div className="flex justify-between items-start">
          <h3 className="text-white font-semibold text-base leading-tight line-clamp-2">
            {title}
          </h3>
        </div>

        {/* Min Quantity Badge */}
        <div className="inline-flex">
          <span className="bg-[#234832] text-[#92c9a8] text-[10px] font-medium px-2 py-0.5 rounded-full">
            {minQty}
          </span>
        </div>

        {/* Price */}
        <div className="flex items-end gap-2 mt-1">
          <span className="text-[#2bee79] text-lg font-bold">
            NPR {price.toFixed(2)}
          </span>
          {originalPrice ? (
            <span className="text-[#94a3b8] text-xs mb-1 line-through decoration-red-400 decoration-2 mr-1">
              ${originalPrice.toFixed(2)}
            </span>
          ) : (
            unitPrice && (
              <span className="text-[#94a3b8] text-xs mb-1">{unitPrice}</span>
            )
          )}
        </div>

        {/* Add to Cart Button */}
        <button className="mt-2 w-full h-10 rounded-full bg-[#1f352b] hover:bg-[#2bee79] text-white hover:text-[#0f1c15] font-semibold text-sm transition-all flex items-center justify-center gap-2 group/btn border border-[#234832] hover:border-[#2bee79]">
          <span>Add to cart</span>
          <ShoppingCart className="w-[18px] h-[18px]" />
        </button>
      </div>
    </Link>
  );
}
