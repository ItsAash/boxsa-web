import type { ReactNode } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function CheckoutLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-boxsa-black dark:text-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">{children}</main>
      <Footer />
    </div>
  );
}
