"use client";
import Image from "next/image";
import { Tag, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const popularBulkItems = [
  {
    name: "Rice 50kg Sack",
    description:
      "High-quality, locally sourced rice for households and small businesses.",
    price: "Rs. 5,200",
    tag: "Staple",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAvOaJy5pqLciA7JvFfldMPpFzRQXjvImjoOuq1S-HUq0MkLE_LpIiq66gFmzO4HRTPOdPTHbhqy0LgOAoRiZhteZAXIImWC2myx0JeaMu23obuZ-K7UFMlD1YM9O0HkwNQRqpWpKMyqExdbJLmtveFfMiXFJQcOemum0ds_t5bHioMOw6PBt1fML4_c34bYG8LDdQJcWXzQI4tv0zLX4drs66G9_KJCxf6sHkMdsTUWIMU0zIJFwC8ijd6WkFm6-NmP-UjXyAkIo4",
  },
  {
    name: "Cooking Oil 20L Pack",
    description: "Refined sunflower oil in bulk",
    price: "Rs. 6,750",
    tag: "Essentials",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCGRB-4PeFLcxUPZA1mdi3jND62NafdW4-pP5CEY6LTCZbzY50sSvDYlzR8S2Rk96WdqCk_4UdezdD-TpGCNW-Lzwm4k6Fvns_8P7PT5anZN5HymZQ5zNwf7NodT2cY_ld90h8afhbEn818DWeOboxNVDxfTHDa8MIQ6L4_rjKrF5z-WMVqa1oHyHRYbMKiVwWv3X1e2qOov0X4DICyHCun92iqp2PRg7yPZ2kMJgluw4uaXlslxNn1huvF3mPXji-izwVYL5oAnxI",
  },
  {
    name: "Dal 25kg Bag",
    description: "Mixed lentils, perfect for families and community kitchens.",
    price: "Rs. 4,500",
    tag: "Staple",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBVlpUbMZOajeF_x_B-wxP4OlDxvXZ_3jO6O6zWlpwIF0CdVIqiMnHQOwMgRN_myyPbWZhkaBI4V5elPhfr7QHOmURInMiVYZHWPW4cZy7oQbJU-ufbNmHUO-rnDVtGm6Ivxf_HfMq8nH7OwaU21mcV6L0JZZJBkU9cWoKpsLI67sK9illq5WILNJ9s3qsIKU55jDEapBvwn5I0Xa7adnvlYil16ARLVunNw8YHdoWx7_yiXX3d3iHB__NxRxzSf-3uNFWfm4sC6vg",
  },
  {
    name: "Dishwasher",
    description: "Bulk tissue pack for office or home usage.",
    price: "Rs. 1,200",
    tag: "Add-on",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCHRadnqDBlax-0dwI4xSOR_MT-dhEo85GN0Lb3N6d2HasacSNt5C4PvMnXxVfrZXo_KR1r8vSgB6Vf7NVB9INFEEUtABKCUnvdyfVJKPjGQaFVWCMPZerMWbLwAAFvx6dvX5hHdpA-xlVcicHnP6S7NQbKCfcQeONT17vzHgEpdVr-Bqemzpf6WbYogmNyZPYyglRzhaq1_7I-8l069iZMkm70VuaSEhTS6fbLO3lQgzBxweya_4ndUuNmEO4U0KUCA8xQYLTzBvw",
  },
  {
    name: "Dishwasher",
    description: "Bulk tissue pack for office or home usage.",
    price: "Rs. 1,200",
    tag: "Add-on",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCHRadnqDBlax-0dwI4xSOR_MT-dhEo85GN0Lb3N6d2HasacSNt5C4PvMnXxVfrZXo_KR1r8vSgB6Vf7NVB9INFEEUtABKCUnvdyfVJKPjGQaFVWCMPZerMWbLwAAFvx6dvX5hHdpA-xlVcicHnP6S7NQbKCfcQeONT17vzHgEpdVr-Bqemzpf6WbYogmNyZPYyglRzhaq1_7I-8l069iZMkm70VuaSEhTS6fbLO3lQgzBxweya_4ndUuNmEO4U0KUCA8xQYLTzBvw",
  },
  {
    name: "Dishwasher",
    description: "Bulk tissue pack for office or home usage.",
    price: "Rs. 1,200",
    tag: "Add-on",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCHRadnqDBlax-0dwI4xSOR_MT-dhEo85GN0Lb3N6d2HasacSNt5C4PvMnXxVfrZXo_KR1r8vSgB6Vf7NVB9INFEEUtABKCUnvdyfVJKPjGQaFVWCMPZerMWbLwAAFvx6dvX5hHdpA-xlVcicHnP6S7NQbKCfcQeONT17vzHgEpdVr-Bqemzpf6WbYogmNyZPYyglRzhaq1_7I-8l069iZMkm70VuaSEhTS6fbLO3lQgzBxweya_4ndUuNmEO4U0KUCA8xQYLTzBvw",
  },
  {
    name: "Dishwasher",
    description: "Bulk tissue pack for office or home usage.",
    price: "Rs. 1,200",
    tag: "Add-on",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCHRadnqDBlax-0dwI4xSOR_MT-dhEo85GN0Lb3N6d2HasacSNt5C4PvMnXxVfrZXo_KR1r8vSgB6Vf7NVB9INFEEUtABKCUnvdyfVJKPjGQaFVWCMPZerMWbLwAAFvx6dvX5hHdpA-xlVcicHnP6S7NQbKCfcQeONT17vzHgEpdVr-Bqemzpf6WbYogmNyZPYyglRzhaq1_7I-8l069iZMkm70VuaSEhTS6fbLO3lQgzBxweya_4ndUuNmEO4U0KUCA8xQYLTzBvw",
  },
  {
    name: "Dishwasher",
    description: "Bulk tissue pack for office or home usage.",
    price: "Rs. 1,200",
    tag: "Add-on",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCHRadnqDBlax-0dwI4xSOR_MT-dhEo85GN0Lb3N6d2HasacSNt5C4PvMnXxVfrZXo_KR1r8vSgB6Vf7NVB9INFEEUtABKCUnvdyfVJKPjGQaFVWCMPZerMWbLwAAFvx6dvX5hHdpA-xlVcicHnP6S7NQbKCfcQeONT17vzHgEpdVr-Bqemzpf6WbYogmNyZPYyglRzhaq1_7I-8l069iZMkm70VuaSEhTS6fbLO3lQgzBxweya_4ndUuNmEO4U0KUCA8xQYLTzBvw",
  },
];

export function PopularBulkItemsCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  const scroll = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const cardWidth = 280; // fixed card width + gap
    carouselRef.current.scrollBy({
      left: direction === "right" ? cardWidth : -cardWidth,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    updateScrollButtons();
    if (!carouselRef.current) return;
    const carousel = carouselRef.current;
    carousel.addEventListener("scroll", updateScrollButtons);
    window.addEventListener("resize", updateScrollButtons);
    return () => {
      carousel.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, []);

  return (
    <section className="flex justify-center py-20  px-4 lg:px-40 lg:py-20">
      <div className="w-full max-w-[1024px] space-y-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Popular Bulk Items
            </h2>
            <p className="max-w-2xl text-gray-400 text-sm sm:text-base">
              Frequently ordered bulk items by households and businesses. Lock
              your quantities for predictable monthly deliveries.
            </p>
          </div>
          <a
            href="#"
            className="flex items-center text-primary font-medium text-sm hover:underline gap-1"
          >
            View All <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div ref={carouselRef} className="flex gap-6 overflow-hidden py-2">
            {popularBulkItems.map((item, i) => (
              <div
                key={i}
                className="relative w-[260px] flex-shrink-0 rounded-xl border border-white/10 bg-surface-dark shadow-md"
              >
                <div className="h-40 w-full relative rounded-t-xl overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 flex flex-col justify-between space-y-2">
                  <span className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-full bg-surface-darker px-2 py-0.5 uppercase tracking-widest text-[10px] font-medium text-gray-400">
                    <Tag className="h-3 w-3 text-primary" />
                    {item.tag}
                  </span>
                  <h3 className="text-lg font-semibold text-white">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="mt-3 flex items-center justify-between text-sm border-t border-white/10 pt-2">
                    <span className="text-gray-400">Indicative price</span>
                    <span className="font-semibold text-primary">
                      {item.price}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Left Button */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute top-1/2 left-0 -translate-y-1/2 rounded-full bg-surface-dark/80 p-3 shadow-md hover:bg-surface-dark/90 transition"
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </button>
          )}
          {/* Right Button */}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute top-1/2 right-0 -translate-y-1/2 rounded-full bg-surface-dark/80 p-3 shadow-md hover:bg-surface-dark/90 transition"
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </button>
          )}
        </div>

        {/* Footer Note */}
        <p className="mt-4 text-center text-gray-500 text-xs sm:text-sm">
          Prices are indicative and may vary slightly based on supplier batches.
        </p>
      </div>
    </section>
  );
}
