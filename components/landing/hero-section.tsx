export function HeroSection() {
  return (
    <section className="flex justify-center px-4 py-8 lg:px-40 lg:py-12">
      <div className="w-full max-w-[1024px]">
        <div className="group relative flex min-h-[500px] items-center justify-center overflow-hidden rounded-xl p-6 text-center lg:p-12">
          {/* Background image + overlay */}
          <div
            className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{
              backgroundImage: `
                linear-gradient(
                  to bottom,
                  rgba(16, 34, 23, 0.7) 0%,
                  rgba(16, 34, 23, 0.9) 100%
                ),
                url("https://lh3.googleusercontent.com/aida-public/AB6AXuAjZbq6bVEshjUZsMkUXp_r7FYPAu7qJOFWVzuKmAUb6zYpSpKm8-6_FjxXKbboEIp9fcx1mTnbLXt_Z3gyuBW_bCxBklNR6Y11uhYvBOn__6yOjQUidU3jrQixZGevA0FpQAAoOvTpPCZuLiUPysCLH81HeSAiIPy9RHm6lMy04rptUA1C-O8kEzycoixg3uPry47Ssy8eA7Y3RPRDTdOaR1XqyPtuYCMXHVz7TwQf7PLLPoEsIStruTHjkPT_QX5X8MDZOR-Apyc")
              `,
            }}
          />

          {/* Content */}
          <div className="relative z-10 flex max-w-2xl flex-col items-center gap-6">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium text-primary backdrop-blur-sm">
              <span className="material-symbols-outlined text-[16px]">
                location_on
              </span>
              Currently serving Butwal
            </div>

            <h1 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Wholesale Prices for{" "}
              <span className="text-primary">Everyday Essentials</span>
            </h1>

            <p className="max-w-lg text-base text-gray-300 sm:text-lg">
              Order groceries and household items in bulk — save more on every
              purchase
            </p>

            <button className="mt-4 flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-8 text-base font-bold text-background-dark shadow-[0_0_20px_rgba(43,238,121,0.3)] transition-all hover:scale-105 hover:bg-green-400 sm:h-14 sm:text-lg">
              Start Bulk Ordering
              <span className="material-symbols-outlined text-xl">
                arrow_forward
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
