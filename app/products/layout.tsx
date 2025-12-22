import React, { ReactNode } from "react";
import { Header } from "@/components/layout/header"; // use your existing Header
import { Footer } from "@/components/layout/footer"; // optional Footer

export default function ProductLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen  flex flex-col bg-background-light dark:bg-background-dark text-[#111814] dark:text-text-main-dark">
      <Header />
      <main className="mx-auto px-4 py-6 ">
        <div className="flex-1 flex flex-col gap-10 w-full max-w-[1024px]">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
