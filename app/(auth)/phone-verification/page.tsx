"use client";

import PhoneVerificationForm from "./_components/phone-verification-form";


export default function SignupPage() {
  return (
    <main className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col py-10">
      <PhoneVerificationForm />
    </main>
  );
}
