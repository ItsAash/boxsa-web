import { Check } from "lucide-react";

interface Step {
  id: number;
  name: string;
  label: string;
}

interface CheckoutStepperProps {
  steps: Step[];
  currentStep: number;
}

export default function CheckoutStepper({
  steps,
  currentStep,
}: CheckoutStepperProps) {
  return (
    <div className="w-full pb-6">
      <div className="relative flex items-center justify-between w-full max-w-md mx-auto">
        {/* Progress Bar Background */}
        <div className="absolute left-0 top-5 w-full h-1 bg-gray-200 dark:bg-white/10 -z-0 rounded-full" />

        {/* Progress Bar Fill */}
        <div
          className="absolute left-0 top-5 h-1 bg-[#2bee79] -z-0 rounded-full shadow-[0_0_10px_rgba(43,238,121,0.5)] transition-all duration-500 ease-out"
          style={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
          }}
        />

        {/* Steps */}
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;
          const isUpcoming = currentStep < step.id;

          return (
            <div
              key={step.id}
              className="relative z-10 flex flex-col items-center cursor-pointer group"
            >
              {/* Circle */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ring-4 ring-[#f6f8f7] dark:ring-[#102217] ${
                  isCompleted
                    ? "bg-[#2bee79] text-[#0f1c15] shadow-md scale-100"
                    : isCurrent
                    ? "bg-[#2bee79] text-[#0f1c15] shadow-md scale-110"
                    : "bg-white dark:bg-white/5 border-2 border-gray-200 dark:border-white/10 text-gray-400 dark:text-gray-500"
                }`}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span>{step.id}</span>
                )}
              </div>

              {/* Label */}
              <span
                className={`absolute top-12 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors duration-300 ${
                  isCurrent
                    ? "text-[#111814] dark:text-white"
                    : isCompleted
                    ? "text-[#2bee79]"
                    : "text-gray-400 dark:text-gray-500"
                }`}
              >
                {step.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
