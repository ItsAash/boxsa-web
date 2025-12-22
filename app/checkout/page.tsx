"use client";

import { useState } from "react";
import Link from "next/link";
import CheckoutStepper from "./_components/checkout-stepper";
import AddressStep from "./_components/address-step";
import DeliveryStep from "./_components/delivery-step";
import PaymentStep from "./_components/payment-step";
import OrderSummaryCard from "./_components/order-summary";

export interface CheckoutData {
  // Address
  selectedAddressId?: string;
  customAddress?: {
    fullName: string;
    mobile: string;
    city: string;
    area: string;
    street: string;
    landmark?: string;
    saveAddress: boolean;
  };
  // Delivery
  deliveryMethod?: "standard" | "express" | "scheduled";
  deliveryDate?: string;
  deliveryTime?: string;
  // Payment
  paymentMethod?: "esewa" | "khalti" | "cod" | "card";
  cardDetails?: {
    cardNumber: string;
    cardName: string;
    expiryDate: string;
    cvv: string;
  };
}

const STEPS = [
  { id: 1, name: "Address", label: "Delivery Address" },
  { id: 2, name: "Method", label: "Delivery Method" },
  { id: 3, name: "Payment", label: "Payment Method" },
];

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [checkoutData, setCheckoutData] = useState<CheckoutData>({});

  // Mock order data
  const orderItems = [
    {
      id: "1",
      name: "Premium Jira Masino Rice",
      brand: "Nepal Rice",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBptOuj4tOuKywzfyLopfLzVCjpaIRaCqx8cl1tqb--HS3N4L-eEClN1cRFf7avuYyPR6j4N0Mr6STgbQ7mmKUCrImy7lrJ9ac3JxmbmFhli95Rb9gnqOXpCufb_kVTpqD4H6q_bVawoljoBl7SSFm9PLPrVdkGiARe7sc6LgYEfIjRm1ZheuobD4Kwq8U2jZlH6RpiLL_7q0Mb8ZFsYGef6PCo3b2bsEeoeIxQGjqUTJtcciYBr0OnX82Z5V9xEXf-5fyFtSaH2TM",
      packSize: "25kg",
      quantity: 2,
      price: 2250,
    },
    {
      id: "2",
      name: "Sunflower Oil (1 Liter x 10 Pack)",
      brand: "Dhara",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAa_TwlESqprMRe0LI9LS5njqp6DGDA5Uh7Rv-xjE4J0AE5AX7EEiXce0HlX7zDDS2U-8JygWS_0qkVTXBiSZQ3UwgpqB41M0hDpLG67N7r1R5A9T_SmI_UV_UBEc0b2KZ-A2YQATWHrqP7xnWSG4A-mI1JKVEK8mUDu0DXkRwMr1X5YFSmXn0ODVM-B_X3XZYVAjJ5FVcAQjlpmCCmoOA1YEaeiS1Zj-0IEXMLNeXa16gBmwVLhcG4tofQMWH4Cp6K-hvEwXdB3Ok",
      packSize: "10L",
      quantity: 5,
      price: 1600,
    },
  ];

  const subtotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryFee = 150;
  const discount = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryFee - discount;

  const updateCheckoutData = (data: Partial<CheckoutData>) => {
    setCheckoutData((prev) => ({ ...prev, ...data }));
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return (
          checkoutData.selectedAddressId || checkoutData.customAddress?.fullName
        );
      case 2:
        return checkoutData.deliveryMethod;
      case 3:
        return checkoutData.paymentMethod;
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <AddressStep
            data={checkoutData}
            onUpdate={updateCheckoutData}
            onNext={handleNextStep}
          />
        );
      case 2:
        return (
          <DeliveryStep
            data={checkoutData}
            onUpdate={updateCheckoutData}
            onNext={handleNextStep}
            onBack={handlePreviousStep}
          />
        );
      case 3:
        return (
          <PaymentStep
            data={checkoutData}
            onUpdate={updateCheckoutData}
            onBack={handlePreviousStep}
            total={total}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Breadcrumbs */}
      <nav className="flex flex-wrap gap-2 text-sm font-medium">
        <Link
          href="/cart"
          className="text-gray-500 hover:text-[#2bee79] transition-colors"
        >
          Cart
        </Link>
        <span className="text-gray-300">/</span>
        <span className="text-[#111814] dark:text-white font-bold">
          Checkout
        </span>
      </nav>

      {/* Stepper */}
      <CheckoutStepper steps={STEPS} currentStep={currentStep} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left: Steps Content */}
        <div className="lg:col-span-8 flex flex-col gap-6">{renderStep()}</div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-4">
          <OrderSummaryCard
            items={orderItems}
            subtotal={subtotal}
            deliveryFee={deliveryFee}
            discount={discount}
            total={total}
            currentStep={currentStep}
            canProceed={canProceed()}
            onProceed={handleNextStep}
            buttonLabel={
              currentStep === 1
                ? "Continue to Delivery"
                : currentStep === 2
                ? "Continue to Payment"
                : "Place Order"
            }
          />
        </div>
      </div>
    </div>
  );
}
