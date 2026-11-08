import type { DishCard as DishCardData } from "@/lib/types";

interface DishCardProps extends DishCardData {
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export default function DishCard({ station, dish, isFavorite, onToggleFavorite }: DishCardProps) {
  return (
    <div className="panel flex items-start justify-between gap-2 px-3 py-2">
      <div className="min-w-0">
        <div className="font-mono text-xs tracking-wide text-neutral-600">{station}</div>
        <div className="font-mono text-base font-semibold leading-snug text-pretty">{dish}</div>
      </div>
      <button
        type="button"
        onClick={onToggleFavorite}
        aria-label={`Favorite ${dish}`}
        aria-pressed={isFavorite}
        className={`flex size-11 shrink-0 items-center justify-center border-2 border-border-black font-mono text-lg transition-[background-color,scale] duration-150 ease-out active:scale-[0.96] ${
          isFavorite ? "bg-accent text-black" : "bg-card text-black"
        }`}
      >
        {isFavorite ? "★" : "☆"}
      </button>
    </div>
  );
}
