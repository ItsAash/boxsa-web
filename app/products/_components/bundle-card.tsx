interface BundleCardProps {
  title: string;
  description: string;
  image: string;
  price: number;
}

export default function BundleCard({
  title,
  description,
  image,
  price,
}: BundleCardProps) {
  return (
    <div className="flex flex-col bg-[#16261f] rounded-xl overflow-hidden shadow-lg border border-transparent hover:border-[#234832] transition-all group">
      {/* Image */}
      <div
        className="w-full aspect-video bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
        style={{ backgroundImage: `url('${image}')` }}
      />

      {/* Content */}
      <div className="p-5 flex flex-col grow gap-3 relative bg-[#16261f]">
        <div className="flex flex-col gap-1">
          <h3 className="text-white text-lg font-bold leading-tight">
            {title}
          </h3>
          <p className="text-[#94a3b8] text-sm leading-snug">{description}</p>
        </div>

        {/* Price and Subscribe Button */}
        <div className="mt-auto pt-2 flex items-center justify-between">
          <span className="text-[#2bee79] font-bold">
            NPR {price.toFixed(2)}
          </span>
          <button className="bg-[#2bee79] hover:bg-[#1fce65] text-[#0f1c15] px-4 py-1.5 rounded-full text-sm font-bold transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}
