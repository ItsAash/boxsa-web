export default function OrderProgressRing({ progress }: { progress: number }) {
  return (
    <div className="relative size-16 hidden sm:block">
      <svg viewBox="0 0 36 36" className="size-full">
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          strokeWidth="3"
          className="text-gray-200 dark:text-gray-700 stroke-current"
        />
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          strokeWidth="3"
          strokeDasharray="100"
          strokeDashoffset={100 - progress}
          strokeLinecap="round"
          className="text-primary stroke-current"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-text-main dark:text-white">
        {progress}%
      </div>
    </div>
  );
}
