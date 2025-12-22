export type SignupPayload = {
  uid: string;
  fullName: string;
  email: string;
  password: string;
  cPassword: string;
  provider: string;

  phone?: string;
  otpVerified?: boolean;
};
