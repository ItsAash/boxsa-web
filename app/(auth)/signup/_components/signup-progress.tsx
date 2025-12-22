interface SignupProgressProps {
  step: number;
  totalSteps?: number;
  label: string;
}

export default function SignupProgress({
  step,
  totalSteps = 2,
  label,
}: SignupProgressProps) {
  const percent = (step / totalSteps) * 100;

  return (
    <div className="px-8 py-4 border-b border-border-light dark:border-border-dark bg-green-50/60 dark:bg-black/20">
      <div className="flex justify-between text-sm font-semibold mb-2">
        <span>
          Step {step} of {totalSteps}
        </span>
        <span className="text-text-secondary">{percent}% completed</span>
      </div>

      <div className="h-1.5 w-full bg-green-100 dark:bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>

      <p className="mt-2 text-sm font-medium text-primary">{label}</p>
    </div>
  );
}
