"use client";

import SignupStep1 from "./_components/signup-step1";
import { useState } from "react";
import SignupStep2 from "./_components/signup-step2";
import { SignupProvider } from "./_context/signup-context";

export default function SignupPage() {
  const [step, setStep] = useState<1 | 2>(1);
  return (
    <SignupProvider>
      <main className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col py-10">
        {step === 1 && <SignupStep1 onNext={() => setStep(2)} />}
        {step === 2 && <SignupStep2 onBack={() => setStep(1)} />}
      </main>
    </SignupProvider>
  );
}
