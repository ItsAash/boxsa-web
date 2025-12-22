interface Props {
  step: number;
  total: number;
}

export default function OnboardingProgress({ step, total }: Props) {
  const percent = Math.round((step / total) * 100);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-sm font-semibold">
        <span className="uppercase tracking-wide text-text-secondary">
          Step {step} of {total}
        </span>
        <span className="text-primary">{percent}%</span>
      </div>

      <div className="h-2 w-full rounded-full bg-border-light dark:bg-border-dark overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
