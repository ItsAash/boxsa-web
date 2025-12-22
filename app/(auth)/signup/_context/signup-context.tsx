"use client";

import { createContext, useContext, useState } from "react";
import { SignupPayload } from "../types";

type SignupContextType = {
  data: SignupPayload;
  update: (values: Partial<SignupPayload>) => void;
  reset: () => void;
};

const SignupContext = createContext<SignupContextType | null>(null);

export function SignupProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<SignupPayload>({
    uid: "",
    fullName: "",
    email: "",
    password: "",
    cPassword: "",
    provider: "",
  });

  const update = (values: Partial<SignupPayload>) => {
    setData((prev) => ({ ...prev, ...values }));
  };

  const reset = () =>
    setData({
      uid: "",
      fullName: "",
      email: "",
      password: "",
      cPassword: "",
      provider: "",
    });

  return (
    <SignupContext.Provider value={{ data, update, reset }}>
      {children}
    </SignupContext.Provider>
  );
}

export function useSignup() {
  const ctx = useContext(SignupContext);
  if (!ctx) throw new Error("useSignup must be used inside SignupProvider");
  return ctx;
}
