import type { DishCard as DishCardData } from "@/lib/types";

export default function DishCard({ station, dish }: DishCardData) {
  return (
    <div className="panel px-3 py-2">
      <div className="font-mono text-xs tracking-wide text-neutral-600">{station}</div>
      <div className="font-mono text-base font-semibold leading-snug">{dish}</div>
    </div>
  );
}
