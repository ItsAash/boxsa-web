import { Header } from "@/components/layout/header";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="min-h-screen w-full flex items-center justify-center bg-background-light dark:bg-background-dark px-4">
        {children}
      </main>
    </>
  );
}
