import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ReactNode } from "react";

export default function CartLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f6f8f7] dark:bg-[#102217] text-slate-900 dark:text-white transition-colors">
      <Header />
      <main className="flex-grow w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}
