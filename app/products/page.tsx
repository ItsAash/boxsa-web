"use client";

import ProductCard from "./_components/product-card";
import BundleCard from "./_components/bundle-card";
import { useState } from "react";
import type { ComponentProps } from "react";

type ProductCardProps = ComponentProps<typeof ProductCard>;

export default function Page() {
  const [search] = useState("");

  const bundles = [
    {
      title: "Starter Bulk Box",
      description:
        "Curated monthly essentials including rice, pasta, and beans.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuALJDIdaFVyUE9IsDLUqITyRmE4C9Z4GY52TKrzIwrqBHPbcM3IpbOT6A0L6LV8sQU71xtCDDl-LfkNxU004n64i85MpFoU0kcFd9poowtwIyKCSOByGsg0dl1NuE1RfHqHTqTSHuWyeRUgU_PqLxxTCyNRuau3L_kA0qx1nzTeHCwJ-pabRRTNqblKuz7dy2l26QPwa1I11tZjGm_ovHYIOOhan2YITgin8X5V0_GflvPOeomqlbLMQxsn-4elKzUryUuzv0OIiGU",
      price: 45.0,
    },
    {
      title: "Student Pantry",
      description:
        "Quick meals and snacks perfect for late night study sessions.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDFu9l56bUjVqck6tDhBtNcnwqDIQxNQYUOiIOBMYxjA5rmFV3fVFyGWjGs31NxjfVdZA4sIpwj9oNvSY3AV_tYr0e5TO9Wtw9ciOSwDbK5wsSBrkV90VBFajFUGa5QfvLtdryuitzH8pNMkRg5gwtwlVM2OwMS7DNUNB0KgUvBe52U_zDeRmge1GTqg5rmEE4nYlKyeFyQ4swnP8eFsMSMv8ZZwSLQqB4Jv0h_6wzUmPF8XGKouELoYn5W7aTMFqTuVbR65UrMwgY",
      price: 32.5,
    },
    {
      title: "Home Care Kit",
      description:
        "Eco-friendly detergents and cleaning supplies for the month.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD8ewgu5XsosByghiC6vKXQjg0gI0YjeNiBxmDUZAt0PkerUWxnU12SoH7bVOdoebwWcWwQ7M7eqYM1Labb6UtiIAF5OJRgZvBlnGBd0b8rtmToBBwL6W9TIlE8aY7vVNo4iiIGk9NuO50x0j_ztkWnScqD3UvX6n9gs-711Sz2tSd_9pDsExhtp-AhPeK_0YQr8xIkRetWlcg6TYEhiZZZDluHE7B2lLzwQ9AauZIsWGtnPuJykbpz1crYfzK7Fsn2SbOazFXXNAk",
      price: 55.0,
    },
  ];

  const products: ProductCardProps[] = [
    {
      id: "1",
      title: "Arabica Coffee Beans - 5lb Bag",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCUT4VXEABfGFdZWfVzc7VkNX4-PkeYl6_3wkBk2O-JGgrztPhXf9ngJifO2UhN_G4iHbqy04_os6h8DsZRVJ4A_xbVa4poYy9W6U6D33bfqaNLkRK3Q0F4e2lE72bUDg4ZvPeszkQyxK5jE2pXx-gkt6K8RS9_dxX2-zVKxZHejJpa-NYzLeqV69bpG_l-Yzr5cW7jLomOII90Bn7_J_AWlyDxqOO0xlHrZDbly6x_pCeZZuoajtEhR2ImKHjShrLNGvu9eKQLDqM",
      price: 42.0,
      unitPrice: "$8.40 / lb",
      minQty: "Min Qty: 2",
      tag: "Hot Deal",
      tagColor: "red",
    },
    {
      id: "2",
      title: "Almond Breeze Milk - Case of 12",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBpu0-MhamtcBJlw1uU0RkQL-UjAH6VPiHNm9F5MHMjI6RwnrfxXUGkb7_NuDwiAdMHPkTVLZiKMExtcY1uv5-4v5gTDGh82TgDHME8NROvigcxpZTHylsNLN-XJttUHnSfEzKXseXfEmhkB10SIgS783tbMkJER4XXNIoAVPo_GwekMixQdIMPUIav0ZXffdfZ2qVPM-ifU60sKYlIya6gw_KNNGd8lEy8L_qMWGdQVR2zS5sHA-GzBhkwYKmR0a6s5RoYh2lEHdA",
      price: 38.5,
      unitPrice: "$3.20 / unit",
      minQty: "Min Qty: 1",
      tag: "Best Seller",
      tagColor: "green",
    },
    {
      id: "3",
      title: "Ultra Soft Paper Towels - 12 Rolls",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBGzKHZP_yaA8QoK5SVElt5qezhsIw05YLKgfiSAC5vJgARTecP7qKND4BcfNm6xRA74x1GEY-Y59wzEhs-I7a7vEK0BpmVcekjJd_9Jg1FewHWL_R6Ssomjq_q9dqXIVxL3GZchKnEMnyLl1sSFGpblnecnEuiyQwTaLAef_-c5IQiNv8lu4YhDq3PSD8-k-tP7Ophb0oufT1fGxHEqG2oE0MXtB2-e7bjc3H901Msz9A8C9dhYb6dPcSNc-c7KXr8IFSu9Z8-wiM",
      price: 24.99,
      unitPrice: "$2.08 / roll",
      minQty: "Min Qty: 3",
    },
    {
      id: "4",
      title: "Organic Diced Tomatoes - Case of 24",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBzfjlFdMQC64GWkMDNwDLkj1hO2_8zRnWW-8f1wB2QI_-1yHmJGCzEYVoQsph7cVa0HDjkxhm3AZtPqxXcKr-UUuZahWivMnzBsLyTfp2DK4IjGoaU__MhzgARLcc4M1StrFBrVRstXeNFemMbiWbC4tirT2GFNxuxN275SxKMVs4TpDE6jU6Znimu6pcUtlEot6aEr8QKD7VDh-HkfoQI8dDYhKmYGaL7LsBw__prPbP87-gEWe2GEKz7Bru9NTBXbfFKF4PI4rQ",
      price: 28.0,
      unitPrice: "$1.16 / can",
      minQty: "Min Qty: 1",
    },
    {
      id: "5",
      title: "Eco Dish Soap (Lemon) - 6 Pack",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBCuHIhfVGXFx_DGZ03sspsKkllVoCIf8wITMlYlnUTLuopptt70oV_BXYNNjElR1W_ECQXQDrr-DZGcpJtqzz0hrM2CrM4l_qOm2NAD9lONpuCDaOEs3Ub9jGiL0bUKEEoW5tsPUzOTWPbBq6Zr-I0n2_IyjjeuW3ugL68kEiXSgUUC3yrjLg4nvhfkkMX8lv7edG6ik7UAHcZaJc3pU62_w_rxgYiGh7Xs1tC11QSycmQZ2qBF7R23BI02VwM8K9HOIFL43SuBvQ",
      price: 18.5,
      unitPrice: "$22.00",
      originalPrice: 22.0,
      minQty: "Min Qty: 2",
      tag: "Sale",
      tagColor: "red",
    },
    {
      id: "6",
      title: "Sparkling Water Variety - 24 Pack",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD38AjiT4WAV3yt1MOyvhg4oatb2OPnbyCKmwsxxN5ffWXc1Aa0SOIz73PLFrUM_5l85J-Go7c8xZ-vsQ7dmchLmy57nk3OxhcwTQV_WKef-JGIFXBILUgtdbmvml98XTcs_vP3405nDePU7t7ar7biF0uvR2k7aEH7Dnnan8Z-geKkz_D-X6TtWDaZSzRJfcmipCODM2a9fuPKzW_Waxx-SynFJpHhwYzJWuARPqPfC-T8l_A0SFLc5MN_kv8Vz933UsoNKJaqVjE",
      price: 16.0,
      unitPrice: "$0.66 / unit",
      minQty: "Min Qty: 4",
    },
  ];

  const categories = [
    "All Items",
    "Groceries",
    "Household",
    "Packaged",
    "Beverages",
    "Wellness",
  ];

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <section className="w-full overflow-hidden">
        <div className="flex gap-3 overflow-x-auto no-scrollbar py-1">
          {categories.map((category, i) => (
            <button
              key={i}
              className={`flex h-9 shrink-0 items-center justify-center rounded-full px-5 transition-all ${
                i === 0
                  ? "bg-[#2bee79] text-[#0f1c15] shadow-[0_0_10px_rgba(43,238,121,0.2)] hover:scale-105 active:scale-95 font-bold"
                  : "bg-[#234832] text-white hover:bg-[#2e5c40] hover:scale-105 active:scale-95 font-medium"
              } text-sm`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Filters Row */}
      <section className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-3 flex-wrap">
          <button className="group flex h-9 items-center justify-center gap-2 rounded-full border border-[#234832] bg-transparent px-4 hover:border-[#2bee79]/50 hover:bg-[#1f352b] transition-all">
            <span className="text-white text-sm font-medium group-hover:text-[#2bee79]">
              Sort
            </span>
            <span className="text-white text-[18px] group-hover:text-[#2bee79]">
              ↕
            </span>
          </button>
          <button className="group flex h-9 items-center justify-center gap-2 rounded-full border border-[#234832] bg-transparent px-4 hover:border-[#2bee79]/50 hover:bg-[#1f352b] transition-all">
            <span className="text-white text-sm font-medium group-hover:text-[#2bee79]">
              Min Qty
            </span>
            <span className="text-white text-[18px] group-hover:text-[#2bee79]">
              ▼
            </span>
          </button>
        </div>
        <label className="flex items-center gap-3 cursor-pointer">
          <span className="text-sm font-medium text-[#94a3b8]">Popular</span>
          <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-[#234832]">
            <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-[#2bee79] transition"></span>
          </div>
        </label>
      </section>

      {/* Bundle Boxes Section */}
      <section>
        <div className="flex items-center justify-between mb-4 px-1">
          <h2 className="text-white text-[22px] font-bold tracking-tight">
            Bundle Boxes
          </h2>
          <a
            className="text-sm text-[#2bee79] font-medium hover:underline"
            href="#"
          >
            View All
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bundles.map((bundle, i) => (
            <BundleCard key={i} {...bundle} />
          ))}
        </div>
      </section>

      {/* Product Grid Section */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-white text-[22px] font-bold tracking-tight">
            Bulk Deals
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8">
          {filteredProducts.map((product, i) => (
            <ProductCard key={i} {...product} />
          ))}
        </div>
        <div className="flex justify-center mt-8 pb-8">
          <button className="group flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-[#1f352b] hover:bg-[#234832] text-white font-semibold shadow-lg hover:shadow-xl transition-all border border-[#234832]">
            <span>Load More Products</span>
            <span className="group-hover:translate-y-1 transition-transform">
              ▼
            </span>
          </button>
        </div>
      </section>
    </>
  );
}
