"use client";

import { Package } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 whitespace-nowrap border-b border-white/10 bg-background-dark/80 backdrop-blur-md px-4 py-4">
      <div className="mx-auto flex w-full max-w-[1024px] items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1 text-white">
          <Package className="h-7 w-7 text-primary" />
          <h2 className="text-2xl font-bold tracking-tight">Boxsa</h2>
        </Link>

        {/* Auth Actions */}
        <div className="flex gap-3">
          <Link
            href="/login"
            className="flex h-10 items-center justify-center rounded-full bg-surface-dark px-5 text-sm font-bold text-white transition-colors hover:bg-white/10"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="flex h-10 items-center justify-center rounded-full bg-primary px-5 text-sm font-bold text-background-dark transition-colors hover:bg-green-400"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}
