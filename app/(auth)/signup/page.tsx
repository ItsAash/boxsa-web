"use client";

import SignupForm from "./_components/signup-form";
import SignupStep2 from "./_components/signup-step2";
import { SignupProvider } from "./_context/signup-context";

export default function SignupPage() {
  return (
    <SignupProvider>
      <main className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col py-10">
        <SignupForm />
      </main>
    </SignupProvider>
  );
}
