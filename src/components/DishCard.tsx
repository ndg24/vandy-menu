import type { DishCard as DishCardData } from "@/lib/types";

interface DishCardProps extends DishCardData {
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export default function DishCard({ station, dish, isFavorite, onToggleFavorite }: DishCardProps) {
  return (
    <div className="panel flex items-start justify-between gap-2 px-3 py-2">
      <div>
        <div className="font-mono text-xs tracking-wide text-neutral-600">{station}</div>
        <div className="font-mono text-base font-semibold leading-snug">{dish}</div>
      </div>
      <button
        type="button"
        onClick={onToggleFavorite}
        aria-label={isFavorite ? "Remove favorite" : "Add favorite"}
        className={`shrink-0 border-2 border-border-black px-2 py-1 font-mono text-sm ${
          isFavorite ? "bg-accent text-black" : "bg-card text-black"
        }`}
      >
        {isFavorite ? "★" : "☆"}
      </button>
    </div>
  );
}
