import { ReactNode } from "react";

export default function ProductDetailLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-[#111814] dark:text-white transition-colors">
      <main className="w-full flex justify-center py-6">
        <div className="w-full max-w-[1024px]">{children}</div>
      </main>
    </div>
  );
}
