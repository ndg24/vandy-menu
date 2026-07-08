import DishCard from "./DishCard";
import type { DishCard as DishCardData, MealPeriodName } from "@/lib/types";

interface MenuSectionProps {
  period: MealPeriodName;
  dishes: DishCardData[];
}

export default function MenuSection({ period, dishes }: MenuSectionProps) {
  return (
    <section className="px-4 py-3">
      <div className="mb-3 flex items-center gap-2">
        <h2 className="font-display text-sm tracking-widest">{period}</h2>
        <div className="h-0.5 flex-1 bg-border-black" />
      </div>
      {dishes.length === 0 ? (
        <p className="font-mono text-sm text-neutral-600">NO SERVICE</p>
      ) : (
        <div className="flex flex-col gap-2">
          {dishes.map((d) => (
            <DishCard key={`${d.station}-${d.dish}`} station={d.station} dish={d.dish} />
          ))}
        </div>
      )}
    </section>
  );
}
