import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/landing/hero-section";
import { ProductTeaser } from "@/components/landing/product-teaser";
import { HowItWorksSection } from "@/components/landing/how-it-works";
import { ValueComparisonSection } from "@/components/landing/value-comparison";
import { TrustAndGuaranteesSection } from "@/components/landing/trust-and-guarantees";
import { PopularBulkItemsCarousel } from "@/components/landing/popular-bulk-items";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background-dark text-text-dark">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <HowItWorksSection />
        <ValueComparisonSection />
        <TrustAndGuaranteesSection />
        <ProductTeaser />
        <PopularBulkItemsCarousel />
      </main>
      <Footer />
    </div>
  );
}
