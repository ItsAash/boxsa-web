import { LucideIcon, CheckCircle2 } from "lucide-react";

interface Props {
  icon: LucideIcon;
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}

export default function BuyerTypeCard({
  icon: Icon,
  title,
  description,
  selected,
  onClick,
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative text-left p-5 rounded-xl border transition-all
        ${
          selected
            ? "border-primary bg-primary/5 shadow-md"
            : "border-border-light hover:border-primary/40 hover:shadow-sm"
        }
      `}
    >
      <div className="flex justify-between items-start">
        <div className="size-12 rounded-lg bg-border-dark flex items-center justify-center text-primary">
          <Icon size={22} />
        </div>

        {selected && <CheckCircle2 className="text-primary" size={22} />}
      </div>

      <div className="mt-4">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-sm text-text-secondary">{description}</p>
      </div>
    </button>
  );
}
